define(['underscore', 'knockout', 'helpers'], function (_, ko, helpers) {

	var chartViewModel = function(chart) {
		var self = this;
		self.chart = chart;
		self.maxValue = ko.observable('');
		self.allCharts = ko.observableArray(['conversion_rate', 'total_clicks', 'total_conversions', 'total_installs']);
		self.chartData = ko.observable($.parseJSON(sessionStorage.getItem('kochavaChart')));
		self.finalField = ko.observable('');
		self.chartTypes = ko.observableArray(['--', 'column', 'line']);
		self.selectedChartType = ko.observable('');
		self.charts = ko.observableArray(['--', 'all', 'conversion_rate', 'total_clicks', 'total_conversions', 'total_installs']);
		self.mappedFields = ko.observableArray(['--', 'all charts', 'conversion rate', 'total clicks', 'total conversions', 'total installs']);
		self.selectedField = ko.observable(null);
		self.updateField = ko.computed(function() {
			if (self.selectedChartType() == '') {
				return
			}
			var field = self.selectedField();
			_.each(self.mappedFields(), function (ele, index) {
				var value = [self.mappedFields()[index]];
				if (field == '--') {
					console.log('found one')
					self.finalField('')
				}
				if (field == ele) {
					self.finalField(self.charts()[index])
					self.selectedField(value)
				}
			})
			helpers.drawChart.call(self, self.selectedChartType())
		});
	};

	return {
		chartViewModel : chartViewModel
	}
})