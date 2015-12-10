module.exports = function(mongoose) {
	var PermissionSchema = new mongoose.Schema({
		regex: { type: String, required: true, unique: true },
		roles: { type: [ String ], required: true },
		dateCreated: { type: Date, default: Date.now }
	});

	PermissionSchema.statics.findMatches = function (email, cb) {
		var collected = [];
		this.find({}, function(err, permissions) {
			if(err) {
				cb(err);

			}
			for(var i = 0; i < permissions.length; i++) {
				var regex = new RegExp(permissions[i].regex);
				if(email.search(regex) > -1) {
					collected.push(permissions[i]);
				}
			}
			cb(null,collected);
		});
	};

	mongoose.model('Permission', PermissionSchema);
};
