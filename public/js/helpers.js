define(['jquery', 'underscore'], function ($, _) {
	var createChart = function(chartID, data, valueField, type, observable) {
		var chart = new AmCharts.AmSerialChart();
		chart.dataProvider = data;
		chart.categoryField = 'date_time';
		var graph = new AmCharts.AmGraph();
		graph.valueField = valueField;
		graph.type = type;
		chart.addGraph(graph)
		var categoryAxis = chart.categoryAxis;
		categoryAxis.autoGridCount = true;
		// categoryAxis.gridCount = data.length
		categoryAxis.gridPosition = 'start'
		categoryAxis.labelRotation = 65
		graph.fillAlphas = 0.8;
		chart.angle = 30;
		chart.depth3D = 15;
		graph.balloonText = '[[value]] ' + observable + ' @ [[category]]'
		$(chartID).css('backgroundColor', '#282828')
		chart.write(chartID)
	}

	var createChartDiv = function(randomnumber) {
		var chartID = 'chart' + randomnumber
		var div = document.createElement('div')
		var nestedDiv = document.createElement('div')
		$(nestedDiv).attr('id', chartID).css({'height' : '250px', 'width' : '1500px', 'backgroundColor' : '#282828'})
		$(div).append(nestedDiv).attr('class', 'row')
		return $(div)
	}

	var createDiv = function(props) {
		var div = document.createElement('div')
		_.each(props, function (value, key) {
			$(div).attr(key, value)
		})
		return $(div)
	}

	var createMiscData = function() {
		var self = this;
		var fields = _.reduce(self.mappedFields(), function (memo, ele, index) {
			return self.selectedField() == ele ? memo += self.charts()[index] : memo
		}, '')

		if (self.selectedField() == 'all charts') {
			fields = mapToAllCharts.call(self, self.allCharts())
		}
		var row = document.createElement('div')
		$(row).attr('class', 'row')
		var peakActivity = createDiv({'class' : 'col-md-2', 'id' : 'data'})
		$(peakActivity).html('Peak Activity')
		var Activity = createDiv({'class' : 'col-md-2', 'id' : 'chartData'})
		$(Activity).html(maxActivity.call(self, 'date_time'))
		var field = createDiv({'class' : 'col-md-2', 'id' : 'data'})
		$(field).html(fields + ' : ')
		var maxValue = createDiv({'class' : 'col-md-2', 'id' : 'chartData'})
		$(maxValue).html(maxActivity.call(self, fields))
		$(row).append(peakActivity).append(Activity).append(field).append(maxValue)
		return $(row)
	}

	var drawChart = function(type) {
		var self = this;
		$(self.chart).empty()
		if (_.isArray(type)) {
			if(_.first(type) == '--') {
				type = 'column'
			} else {
				type = type.join('')
			}
		} else if (typeof type == 'string') {
			type = 'column'
		} else {
			type = type
		}
		if (self.finalField() == 'all') {
			_.each(self.allCharts(), function (ele) {
				var randomnumber = randomNumber(100)
				var chartDiv = createChartDiv(randomnumber)
				$(self.chart).append(createMiscData.call(self))
				$(self.chart).append(chartDiv)
				createChart('chart' + randomnumber, self.chartData(), ele, type, mapToAllCharts.call(self, self.allCharts(), true))
			})
			return
		}
		var randomnumber = randomNumber(100)
		var chartDiv = createChartDiv(randomnumber)
		$(self.chart).append(createMiscData.call(self))
		$(self.chart).append(chartDiv)
		createChart('chart' + randomnumber, self.chartData(), self.finalField(), type, self.selectedField())
	}

	var mapToAllCharts = function(value, identifier) {
		var self = this;
		return _.reduce(value, function (memo, ele, index) {

			if( identifier ) {
				if($(self.chart).children().length == 2 && index == 0) {
					return memo += ele
				} else if ($(self.chart).children().length / (index + 1) == 2 ) {
					return memo += ele
				} else {
					return memo
				}
			}

			if ($(self.chart).children().length == 0 && index == 0) {
				return memo += ele
			} else if ($(self.chart).children().length / index == 2 ) {
				return memo += ele
			} else {
				return memo
			}
		}, '')
	}

	var maxActivity = function (property) {
		var self = this;
		var max;
		var field = self.finalField()
		var property = _.isArray(property) ? property.join('') : property
		if (field == 'all') {
			var values = _.map(_.range(self.allCharts().length), function (ele, index) {
				var prop = self.allCharts()[index]
				var list = _.map(_.range(self.chartData().length), function (elem, ind) {
					return self.chartData()[ind][prop]
				})
				var max = Math.max.apply(null, list)
				return _.reduce(list, function (memo, ele, ind) {
					return self.chartData()[ind][prop] == max ? memo += self.chartData()[ind][property] : memo
				}, '')
			})
			return mapToAllCharts.call(self, values)
		} else {
			var values = _.map(self.chartData(), function (ele) {
				return ele[field]
			})
			var maxValue = Math.max.apply(null, values)
			return _.reduce(self.chartData(), function (memo, ele) {
				if (ele[field] == maxValue) {
					memo += ele[property]
					self.maxValue(ele[property])
					return memo
				}
				return memo
			}, '')
		}
	}

	var randomNumber = function(length, min, max) {
		var value = Math.floor(Math.random() * length);
		if (min && max && (value > max || value < min))
			return randomNumber(length, min, max)
		else if (min && value < min)
			return randomNumber(length, min)
		else if (max && value > max)
			return randomNumber(length, null, max)
		else
			return value
	};

	return {
		createChart : createChart,
		createChartDiv : createChartDiv,
		createDiv : createDiv,
		createMiscData : createMiscData,
		drawChart : drawChart,
		mapToAllCharts : mapToAllCharts,
		maxActivity : maxActivity,
		randomNumber : randomNumber
	}
})