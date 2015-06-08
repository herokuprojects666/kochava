define(['underscore', 'knockout'], function (_, ko) {

	var chartViewModel = function() {
		var self = this;
		self.chartData = ko.observable($.parseJSON(sessionStorage.getItem('kochavaChart')))
		self.finalField = ko.observable('')
		self.chartTypes = ko.observableArray(['--', 'column', 'line'])
		self.selectedChartType = ko.observable('')
		self.maxValue = ko.observable('')
		self.charts = ko.observableArray(['--', 'conversion_rate', 'total_clicks', 'total_conversions', 'total_installs'])
		self.mappedFields = ko.observableArray(['--', 'conversion rate', 'total clicks', 'total conversions', 'total installs'])
		self.selectedField = ko.observable(null)
		self.updateField = ko.computed(function () {
			var field = self.selectedField()
			_.each(self.mappedFields(), function (ele, index) {
				var value = [self.mappedFields()[index]]
				if (field == '--') {
					console.log('found one')
					self.finalField('')
				}
				if (field == ele) {
					self.finalField(self.charts()[index])
					self.selectedField(value)
				}
			})
			drawChart.call(self, self.selectedChartType())
		})
		self.maxActivity = ko.computed(function () {
			var field = self.finalField()
			var values = _.map(self.chartData(), function (ele) {
				return ele[field]
			})
			var maxValue = Math.max.apply(null, values)
			return _.reduce(self.chartData(), function (memo, ele) {
				if (ele[field] == maxValue) {
					memo += ele.date_time
					self.maxValue(ele[field])
					return memo
				}
				return memo
			}, '')
		})
	}

	var createChart = function(data, valueField, type, observable, subType) {
		var chart = new AmCharts.AmSerialChart();
		chart.dataProvider = data;
		chart.categoryField = 'date_time';
		var graph = new AmCharts.AmGraph();
		graph.valueField = valueField;
		graph.type = type;
		chart.addGraph(graph)
		var categoryAxis = chart.categoryAxis;
		categoryAxis.autoGridCount = false;
		categoryAxis.gridCount = data.length
		categoryAxis.gridPosition = 'start'
		categoryAxis.labelRotation = 65
		graph.fillAlphas = 0.8;
		chart.angle = 30;
		chart.depth3D = 15;
		graph.balloonText = '[[value]] ' + observable + ' @ [[category]]'
		$('#chartdiv').css('backgroundColor', '#282828')
		chart.write('chartdiv')
	}

	var drawChart = function(type) {
		var self = this;
		if (_.isArray(type)) {
			if(_.first(type) == '--') {
				type = 'column'
			} else {
				type = type.join('')
			}
		} else if (typeof type == 'string') {
			console.log('to here')
			type = 'column'
		} else {
			type = type
		}
		createChart(self.chartData(), self.finalField(), type, self.selectedField())
	}

	return {
		chartViewModel : chartViewModel
	}
})