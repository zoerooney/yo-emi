'use strict';
var util	= require('util'),
	path	= require('path'),
	fs		= require('fs'),
	yeoman	= require('yeoman-generator'),
	chalk	= require('chalk'),
	art		= require('../util/art');

var EmiGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
       console.log(chalk.yellow('\n\nNext I\'ll install all the dependencies, so sit tight!\n\n'));
       this.installDependencies({
         bower: false,
         npm: true,
         skipInstall: false,
         callback: function () {
           	this.spawnCommand('gulp', ['styles']);
           	console.log(chalk.yellow('\n\nLast but not least, we\'ll set up style.css.\n\n'));
         }.bind(this)
       });
      }
    });
  },
  grab: function() {
	var	cb	= this.async(),
	self 	= this
	
	this.log.writeln(chalk.yellow(art.emi));
	this.log.writeln(chalk.yellow('\n\nLet\'s grab the latest version of Emi...\n\n'));
	this.tarball('https://github.com/zoerooney/Emi/archive/master.tar.gz', '.', cb);
	this.log.writeln(chalk.yellow('\n\nGot it!\n\n'));
  },
  askFor: function () {
    
    var done = this.async();
	
    // Welcome art & description
    
    console.log(chalk.yellow('You\'re about to generate a new starter theme based on Emi. Just a few questions to get started...'));

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
        name: 'themeAuthorURI',
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
        message: 'Who designed the theme?',
        default: function( answers ) {
          return answers.themeAuthor;
        }
      }, {
        name: 'themeDesignerURI',
        message: 'Designer\'s website URL?',
        default: function( answers ) {
          return answers.themeAuthorURI;
        }
      }
    ];
   	
    this.prompt(prompts, function (props) {
      
      this.themeName		= props.themeName;
      this.themeHandle		= props.themeName.trim().replace(/ /g,'_');
      this.themeFunction	= props.themeName.toLowerCase().trim().replace(/ /g,'_');
      this.themeTextDomain	= props.themeName.toLowerCase().trim().replace(/ /g,'-');
	  this.themeAuthor		= props.themeAuthor;
      this.themeAuthorURI	= props.themeAuthorURI;
      this.themeURI			= props.themeURI;
      this.themeDescription = props.themeDescription;
      this.themeDesigner	= props.themeDesigner;
      this.themeDesignerURI = props.themeDesignerURI;
      
      done();
    }.bind(this));
  },
  
  projectfiles: function () {
	var complete	= this.async(),
		self		= this
    
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
					data = data.replace(/themeAuthorURI/g, self.themeAuthorURI)
					data = data.replace(/themeURI/g, self.themeURI)
					data = data.replace(/themeDescription/g, self.themeDescription)
					data = data.replace(/themeDesigner/g, self.themeDesigner)
					data = data.replace(/themeDesignerURI/g, self.themeDesignerURI)
				  
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
  }
  
});
module.exports = EmiGenerator;