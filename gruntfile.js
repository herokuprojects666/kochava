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
					dest : process.cwd() + '/gen/',
					ext : '.js',
					cwd : process.cwd()
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
				dest : process.cwd() + '/gen/',
				ext : '.css',
				cwd : process.cwd()
			}
		},
		processhtml: {
		    js: {
				files : [{
					expand : true,
					src : 'views/*.hbs',
					dest : process.cwd() + '/gen/',
					ext : '.hbs',
					cwd : process.cwd()
				}]
		    }
		},
		sass : {
			options : {
				map : true
			},
			main : {
				expand : true,
				src : 'public/css/*.scss',
				dest : process.cwd(),
				ext : '.css',
				cwd : process.cwd(),
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('csswring');
	grunt.loadNpmTasks('grunt-processhtml')
	grunt.loadNpmTasks('grunt-sass')
	grunt.registerTask('populate', ['sass', 'uglify', 'csswring', 'processhtml'])
}
