define(function(require) {
	var kochava = require('kochava');
	var _ = require('underscore');
	var $ = require('jquery');
	var helpers = require('helpers');
	var kochavaChart = require('kochavaChart');

	beforeEach(function() {
		jasmine.addMatchers({
			isAtLeast : function () {
				return {
					compare : function (actual, expected) {
						return { pass : actual >= expected }
					}
				}
			},
			notGreaterThan : function() {
				return {
					compare : function (actual, expected) {
						return { pass : actual <= expected }
					}
				}
			}
		})
	})

	describe('it should return the kochava view', function () {
		it('will return true', function () {
			var d = _.map(kochava, function (ele) {
				return ele
			});
			expect(d.length).toEqual(1)
		})
	})

	describe('it should return the kochavaChart view', function () {
		it('will return true', function () {
			var exposedApi = _.map(kochavaChart, function (value, key) {
				return key
			}).join('');
			expect(exposedApi).toEqual('chartViewModel')
		})
	})
	describe('it should fail', function () {
		it('will fail', function () {
			var exposedApi = _.map(kochava, function (value, key) {
				return key
			}).join('');
			expect(exposedApi).toEqual('stuff')
		})
	})
	describe('aysnc stuff', function () {
		it('should be a length of 1', function (done) {
			$.ajax({
				url : 'http://localhost:4000/clientApi',
				method : 'get',
				contentType : 'application/json',
			 	data : {'guid' : 'kokochavabingodemo1347526e855c56f14'},
				success : function(data) {
					expect(data.data.length).toEqual(1)
					done()
				}
			})
		})

		it('should be a length over 1', function (done) {
			$.ajax({
				url : 'http://localhost:4000/clientapi',
				method : 'get',
				contentType : 'application/json',
				data : {'platform' : 'ios'},
				success : function(data) {
					expect(data.data.length).isAtLeast(1)
					done()
				}
			})
		})

		it('should be a length of 0', function (done) {
			$.ajax({
				url : 'http://localhost:4000/clientapi',
				method : 'get',
				contentType : 'application/json',
				data : {'platform' : 'kindle'},
				success : function(data) {
					expect(data.data.length).toEqual(0)
					done()
				}
			})
		})
		it('should not be empty app api', function (done) {
			$.ajax({
				url : 'http://localhost:4000/appApi',
				method : 'post',
				success : function(data) {
					expect(data.length).isAtLeast(1)
					done()
				}
			})
		})

		it('should not be empty chart api', function (done) {
			$.ajax({
				url : 'http://localhost:4000/chartApi',
				method : 'post',
				success : function(data) {
					expect(data.length).isAtLeast(1)
					done()
				}
			})
		})
	})

	describe('random number', function() {
		it('should return a number 10 or less', function () {
			expect(helpers.randomNumber(10)).notGreaterThan(10)
		})
		it('should return a minimum number', function () {
			expect(helpers.randomNumber(10, 5)).isAtLeast(5)
		})
		it('should return a number no higher than the maximum', function () {
			expect(helpers.randomNumber(10, 5, 10)).notGreaterThan(10)
		})
	})

})