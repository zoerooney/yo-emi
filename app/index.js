'use strict';
var util	= require('util'),
	path	= require('path'),
	fs		= require('fs'),
	yeoman	= require('yeoman-generator'),
	chalk	= require('chalk'),
	art		= require('../util/art');

var EmiGenerator = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');

		// Welcome art & description
		this.log.writeln(chalk.yellow(art.emi));
		console.log(chalk.yellow('You\'re about to generate a new starter theme based on Emi. Just a few questions to get started...'));
	},
	prompting: function () {

		var done = this.async();

		var prompts = [{
			    name: 'themeName',
			    message: 'What do you want to name your theme?',
			},{
			    name: 'themeAuthor',
			    message: 'Who is the theme author?',
			    default: function( answers ) {
			    	return 'Zoe Rooney Web Development';
				}
		  	},{
				name: 'authorURI',
				message: 'What\'s their website URL (the author)?',
				default: function( answers ) {
					return 'http://www.zoerooney.com';
				}
			},{
				name: 'themeURI',
				message: 'What is the final website URL?'
			},{
				name: 'themeDescription',
				message: 'Please briefly describe this theme.',
				default: function( answers ) {
					return answers.themeName+' custom theme';
				}
			}, {
				name: 'themeDesigner',
				message: 'Who designed the theme?'
			}, {
				name: 'designerURI',
				message: 'Designer\'s website URL?'
			}
		];
			
		this.prompt(prompts, function (props) {
			
			//All the names
			this.themeName			= props.themeName;
			this.themeHandle		= props.themeName.trim().replace(/ /g,'_');
			this.themeFunction		= props.themeName.toLowerCase().trim().replace(/ /g,'_');
			this.themeTextDomain	= props.themeName.toLowerCase().trim().replace(/ /g,'-');
			this.themeAuthor		= props.themeAuthor;
			this.authorURI			= props.authorURI;
			this.themeURI			= props.themeURI;
			this.themeDescription 	= props.themeDescription;
			this.themeDesigner		= props.themeDesigner;
			this.designerURI 		= props.designerURI;

			done();
		}.bind(this));
	},
	configuring: function() {
		var	cb		= this.async(),
			self 	= this

		this.log.writeln(chalk.yellow('\n\nLet\'s grab the latest version of Emi...\n\n'));
		this.extract('https://github.com/zoerooney/Emi/archive/master.tar.gz', '.', cb);
		this.log.writeln(chalk.yellow(art.checkmark));
		this.log.writeln(chalk.yellow('\n\nGot it (that was quick)!\n\n'));
	},
	writing: function () {
		var complete	= this.async(),
			self		= this

		fs.rename('Emi-master', self.themeTextDomain);

		// parse recursively a directory
		function parseDirectory( path ) {

			fs.readdir( path, function(err, files) {		  
				files.forEach( function(file) {
					var filePath = fs.realpathSync( path + '/' + file), 
						isDirectory = fs.statSync( filePath ).isDirectory()

					if (isDirectory) {
						parseDirectory( filePath )
					} else {
						fs.readFile(filePath, 'utf8', function (err,data) {
							data = data.replace(/themeName/g, self.themeName)
							data = data.replace(/themeHandle/g, self.themeHandle)
							data = data.replace(/themeFunction/g, self.themeFunction)
							data = data.replace(/themeTextDomain/g, self.themeTextDomain)
							data = data.replace(/themeAuthor/g, self.themeAuthor)
							data = data.replace(/authorURI/g, self.authorURI)
							data = data.replace(/themeURI/g, self.themeURI)
							data = data.replace(/themeDescription/g, self.themeDescription)
							data = data.replace(/themeDesigner/g, self.themeDesigner)
							data = data.replace(/designerURI/g, self.designerURI)

							fs.writeFile(filePath, data, 'utf8',  function (err) {
								if (err) return console.log(err);
							});
						});
					} //endif
				})
			})
		}
		parseDirectory('.')	
		complete()
	},
	install: function(){		
		console.log(chalk.yellow('\n\nNext I\'ll install all the dependencies, so sit tight!\n\n'));
				
    	process.chdir(this.themeTextDomain);
		this.npmInstall('',function(){
			console.log(chalk.yellow(art.checkmark + '\nWhew, all installed! Last but not least, we\'ll set up style.css.\n\nOnce this last bit runs we\'re all done here!\n\n'));
		});
	},
	end: function(){
		this.spawnCommand('gulp', ['styles']);
	}

});
module.exports = EmiGenerator;