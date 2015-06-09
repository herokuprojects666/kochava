require(['./requireConfig'], function () {
	require(['jquery'], function ($) {
		require(['kochavaChart', 'knockout', 'bootstrap'], function (kochava, ko) {
			$(document).ready(function() {
				$.ajax({
					url : '/chartApi',
					method : 'post',
					success : function(data) {
						sessionStorage.setItem('kochavaChart', JSON.stringify(data))
						return ko.applyBindings(new kochava.chartViewModel('#miscData'));
					}
				})
			})
		})
	})
})

