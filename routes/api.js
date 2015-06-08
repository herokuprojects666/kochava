var _ = require('underscore')

exports.clientApi = function(req, res, next) {
	var name = req.query.name ? req.query.name.split(',') : []
	var platform = req.query.platform ? req.query.platform.split(',') : []
	var guid = req.query.guid ? req.query.guid.split(',') : []
	req.collections.kochava.find({
		$or : [ {'apps.name' : {$in : name} }, {'apps.platform' : {$in : platform} }, {'apps.guid' : {$in : guid} } ]
	}).toArray(function (err, docs) {
		var arr = _.map(docs, function (ele) {
			return _.reduce(ele.apps, function (memo, elem) {
				return _.contains(name, elem.name) || _.contains(platform, elem.platform) || _.contains(guid, elem.guid) ? [].concat.call([], memo, elem) : memo
			}, [])
		})
		var list = _.reduce(_.flatten(arr), function (memo, ele) {
			var duplicates = _.reduce(memo, function (mem, elem) {
				return _.isEqual(elem, ele) ? [].concat.call([], mem, elem) : mem
			}, [])
			return duplicates.length >= 1 ? memo : [].concat.call([], memo, ele)
		}, [])
		res.send({data : list})
	})
}

exports.kochava = function(req, res, next) {
	req.collections.kochava.find({}).toArray(function (err, doc) {
		res.send(doc)
	})
}

exports.kochavaChart = function(req, res, next) {
	req.collections.kochavaChart.find({}).toArray(function (err, doc) {
		res.send(doc)
	})
}

//used to initially load the data from JSON files

// exports.insertDocument = function(req, res, next) {
// 	var bulk = req.collections.kochava.initializeUnorderedBulkOp()
// 	_.each(req.body, function (ele, index, arr) {
// 		bulk.insert({id : ele.id, name : ele.name, apps : ele.apps, total : ele.total })
// 		if (index == arr.length - 1)
// 			bulk.execute(function (err, doc) {
// 				return next()
// 			})
// 	})
// }

// exports.insertAgain = function(req, res, next) {
// 	var bulk = req.collections.kochavaChart.initializeUnorderedBulkOp()
// 	_.each(req.body, function (ele, index, arr) {
// 		bulk.insert({conversion_rate : ele.conversion_rate, date_time : ele.date_time, total_clicks : ele.total_clicks, total_conversions : ele.total_conversions, total_installs : ele.total_installs })
// 		if (index == arr.length - 1)
// 			bulk.execute(function (err, doc) {
// 				return next()
// 			})
// 	})
// }