require(['./requireConfig'], function (config) {
	require(['jquery'], function () {
		require(['kochava', 'knockout', 'bootstrap'], function (kochava, ko) {
			$(document).ready(function() {
				$.ajax({
					url : '/appApi',
					method : 'post',
					success : function(data) {
						console.log(data)
						sessionStorage.setItem('kochava', JSON.stringify(data))
						return ko.applyBindings(new kochava.viewModel());
					}
				})

				//test case for backend API. Would have moved into jasmine test if I had more time.

				// $.ajax({
				// 	url : '/clientApi',
				// 	method : 'get',
				// 	contentType : 'application/json',
				// 	data : {'guid' : 'kokochavabingodemo1347526e855c56f14', 'name' : 'Test App (Android),stuff' },
				// 	success : function(data) {
				// 		console.log(data)
				// 	}
				// })
			})
		})
	})
})