// load native modules
var p = require('path');
var fs = require('fs');

// load 3rd party modules
var gm = require('gm');

var formidable = require('formidable');

// some default values
var defaultRatio = null,
	defaultMaxWidth = 1024,
	defaultMediumWidth = 600,
	defaultThumbWidth = 300;

var config = require('./config');

module.exports = function(req, res, next) {
	var ratio = req.query.ratio || defaultRatio,
		maxWidth = req.query.max || defaultMaxWidth,
		mediumWidth = req.query.medium || defaultMediumWidth,
		thumbWidth = req.query.thumb || defaultThumbWidth,
		maxHeight = ratio ? Math.floor(maxWidth / ratio) : null,
		mediumHeight = ratio ? Math.floor(mediumWidth / ratio) : null,
		thumbHeight = ratio ? Math.floor(thumbWidth / ratio) : null,
		type = req.query.type ? req.query.type + '-' : '';

	var form = new formidable.IncomingForm();

	form.onPart = function (part) {
		var done = _.after(3, function() {
			// from original Formidable.handlePart
			form._flushing--;
			form.emit('file', part.name, file);
			form._maybeEnd();
		});

		if (part.filename === undefined) {
			// let formidable handle everything besides files
			return this.handlePart(part);
		}

		// from original Formidable.handlePart
		this._flushing++;

		var basename = type + new Date().toISOString().split(':').join('_');
		var ext = p.extname(part.filename);

		var file = {
			basename: basename,
			filePath: p.join(config.dir.uploads, 'img', basename + ext),
			mediumFilePath: p.join(config.dir.uploads, 'img', basename + '-medium' + ext),
			thumbFilePath: p.join(config.dir.uploads, 'img', basename + '-thumb' + ext),
			urlPath: p.join('/uploads/img', basename + ext),
			mediumUrlPath: p.join('/uploads/img', basename + '-medium' + ext),
			thumbUrlPath: p.join('/uploads/img', basename + '-thumb' + ext),
			ext: ext,
			uploadDate: new Date(),
			mime: part.mime,
			hash: form.hash,
			thumbnail: {
				width: thumbWidth,
				height: thumbHeight
			}
		};

		// noProfile removes all EXIF data
		gm(part).noProfile()
			// if you need data from read functions (eg size), you need to
			// pass options obj with bufferStream: true and call all manipulations inside
			// the callback
			.size({ bufferStream: true }, function(err, value) {
				var width,
					height,
					imgRatio = value.width / value.height,
					shaveHeight,
					shaveWidth;

				// calculate how much to shave off to make thumbnail correct ratio
				if(ratio) {
					if(imgRatio >= ratio) {
						shaveWidth = (1 - ratio / imgRatio) * 50;// 50 = 100% / 2
						shaveHeight = 0;
						if(value.width > maxWidth)
							width = maxWidth;
					} else {
						shaveWidth = 0;
						shaveHeight = (1 - imgRatio / ratio) * 50;// 50 = 100% / 2
						if(value.height > maxHeight)
							height = maxHeight;
					}
				}

				// only downsize large version if it is large than max size
				((width || height) ? this.resize(width, height) : this )
					.stream(function (err, stdout, stderr) {

						file.width = width || value.width;
						file.height = height || value.height;

						var size = 0;
						stdout.on('data', function(chunk) {
							size += chunk.length;
						});

						stdout.on('end', function() {
							file.contentSize = size;
						});

						// write large image
						var writeStream = fs.createWriteStream(file.filePath);
						stdout.pipe(writeStream);
						writeStream.on('finish', function() {
							done();
						});

						(ratio ?
							gm(stdout)
							// crop thumbnail so it is correct ratio
								.shave(shaveWidth, shaveHeight, true) :
							gm(stdout))
							.stream(function(err, stdout, stderr) {
								gm(stdout)
									.resize(mediumWidth, null)
									// write medium image
									.write(file.mediumFilePath, function(err) {
										if(err) return next(err);

										done();
									});

								gm(stdout)
									// resize thumbnail
									.resize(thumbWidth, null)
									// write thumbnail
									.stream(function(err, stdout, stderr) {
										var size = 0;
										stdout.on('data', function(chunk) {
											size += chunk.length;
										});

										stdout.on('end', function() {
											file.thumbnail.contentSize = size;
										});

										var writeStream = fs.createWriteStream(file.thumbFilePath);

										stdout.pipe(writeStream);

										writeStream.on('finish', function() {
											done();
										});
									});

							});
				});
			});
	};

	form.parse(req, function(err, fields, files) {
		if(err) return next(err);

		res.status(201).json(files);
	});
};
