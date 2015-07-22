module.exports = {
	events:
	{
		"click input#contact-submit": "validateAndSend"
	},
	initialize: function(options)
	{
		console.log('init')
	},
	attach: function()
	{
		console.log('att')
	},
	validateAndSend: function(e)
	{
		e.preventDefault();
		out = {}
		var inputs = $('input, textarea', this.el);
		for(var ip=0;ip<inputs.length;ip++)
		{
			out[inputs[ip].id] = inputs[ip].value || inputs[ip].textContent
		}

		console.log(out)

		//Validate
		$.ajax({
		  type: "POST",
		  url: '/contact',
		  data: out,
		  success: function(data)
		  {
		  	console.log(data.data)
		  	$('#formStatus').text(data.data.formStatus.message);
		  },
		  dataType: "json"
		});
	}
}