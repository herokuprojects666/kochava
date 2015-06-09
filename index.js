var mongo = require('mongodb').MongoClient
	express = require('express')
	logger = require('morgan')
	bodyParser = require('body-parser')
	url = 'mongodb://craggoo:starcraft@ds039411.mongolab.com:39411/spider-express'
	mongo.connect(url, function (err, db) {
		console.log('connected to db')
		collections = {
			kochava : db.collection('kochava'),
			kochavaChart : db.collection('kochavaChart')
		}
	})
	engines = require('consolidate')
	routes = require('./routes')
	_ = require('underscore')

var app = express()
app.locals.appTitle = 'Kochava App'
var corsOptions = {credentials: true, origin: true}

app.use(function (req, res, next) {
	if (app.get('env') == 'production') {
		app.use(express.static(__dirname + '/gen/public'))
		app.set('views', process.cwd() + '/gen/views')
		return next()
	}
	app.use(express.static(__dirname + '/public'))
	app.set('views', process.cwd() + '/views')
	return next()
})

app.set('port', process.env.PORT || 4000)
app.engine('hbs', engines.handlebars)
app.set('view engine', 'hbs')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.listen(app.get('port'), function () {
	console.info('listening on ' + app.get('port'))
})

app.use(function (req, res, next) {
	if(!collections.kochava) {
		return new error('no collection found')
	}
	req.collections = collections
	return next()
})

app.use(function(req, res, next) {
	res.set('Access-Control-Allow-Origin', '*')
	res.set('Access-Control-Allow-Methods', 'get')
	res.set('Access-Control-Allow-Headers', "x-requested-with, content-type, accept")
	return next()
})

app.get('/', routes.index)
app.get('/chart', routes.chart)
app.post('/appApi', routes.api.kochava)
app.post('/chartApi', routes.api.kochavaChart)
app.get('/clientApi', routes.api.clientApi)