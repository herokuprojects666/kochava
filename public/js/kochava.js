define(['underscore', 'knockout', 'jquery'], function(_, ko, $) {
	var viewModel = function() {
		var self = this;
		self.appList = ko.observableArray();
		self.companyNames = ko.observableArray($.parseJSON(sessionStorage.getItem('kochava')));
		self.deviceList = ko.observableArray(['Blackberry', 'iOS', 'Kindle', 'Android'])
		self.filteredByDeviceList = ko.observableArray(null)
		self.filteredList = ko.observableArray();
		self.finalDevice = ko.observable(null);
		self.searchTerm = ko.observable('');
		self.mappedDeviceList = ko.observableArray(['bb', 'ios', 'kindle', 'android'])
		self.filteredbyDevice = ko.observable()
		self.selectedDevice = ko.observable()
		self.searchQuery = ko.observable('');
		self.displayInfo = ko.observableArray(ko.utils.arrayMap(self.companyNames(), function(ele) {
			self.appList.push(ele.apps)
			return ele.name + '(' + ele.id + ')'
		}));

		self.search = ko.computed({
			write : function () {
				self.finalDevice(null)
				self.filteredList = ko.observableArray()
				if(_.isEmpty(self.searchTerm()))
					return self.searchQuery(null)
				_.reduce(self.appList(), function (memo, ele) {
					var lowerCase = ele.name.toLowerCase()
					if (lowerCase.indexOf(self.searchTerm().toLowerCase()) != -1) {
						memo.push(ele)
						return memo
					}
					self.searchQuery(null)
					return memo
				}, self.filteredList())
				// console.log(self.filteredList())
				self.searchQuery(true);
				$('#searchField').val('')
				self.searchTerm('')

			},
			read : function () {
				self.appList(_.flatten(self.appList()))
				self.searchQuery(null);
			}
		})

		self.filter = ko.computed({
			read : function () {
				self.filteredByDeviceList(null)
			},
			write : function () {
				self.filteredByDeviceList([])
				var item = _.reduce(self.deviceList(), function (memo, ele, index) {
					if (self.selectedDevice() == ele) {
						return self.mappedDeviceList()[index]
					}
					return memo
				}, self.filteredbyDevice())
				_.reduce(self.appList(), function (memo, ele) {
					if (ele.platform == item) {
						memo.push(ele)
						return memo
					}
					self.finalDevice(null)
					return memo
				}, self.filteredByDeviceList())
				self.finalDevice(true)
				self.searchQuery(true)
				self.filteredList([])
			}
		})
	}

	// Used to read contents of the provided JSON files and upload them to the database
	var getJSON = function(route) {
		var reader = new FileReader;
		reader.onload = function() {
			var d = $.parseJSON(this.result);
			return $.ajax({
				url : route,
				contentType : 'application/json',
				data : JSON.stringify(d.data),
				method : 'post'
			})
		}
		reader.readAsText(this.files[0])
	}

	return {
		viewModel : viewModel,
	}
})