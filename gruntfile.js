module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			options : {
				maxLineLen : 0
			},
			build : {
				files : [{
					expand : true,
					src : 'public/js/*.js',
					dest : '/kochava/gen/',
					ext : '.js',
					cwd : '/kochava/'
				}]
			}
		},
		csswring : {
			options : {
				map : true
			},
			main : {
				expand : true,
				src : 'public/css/*.css',
				dest : '/kochava/gen/',
				ext : '.css',
				cwd : '/kochava/'
			}
		},
		processhtml: {
		    js: {
				files : [{
					expand : true,
					src : 'views/*.hbs',
					dest : '/kochava/gen/',
					ext : '.hbs',
				}]
		    }
		}
	})

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('csswring');
	grunt.loadNpmTasks('grunt-processhtml')
	grunt.registerTask('default', ['uglify', 'csswring', 'processhtml'])
	grunt.registerTask('html', ['processhtml'])
}
