'use strict';
var util = require('util'),
	path = require('path'),
	yeoman = require('yeoman-generator'),
	chalk = require('chalk'),
	art = require('../util/art');


var EmiGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    
    var done = this.async();
	
    // Welcome art & description
    console.log(chalk.yellow(art.emi));
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
       	 return ''+answers.themeName+' custom theme';
        }
      }, {
        name: 'themeDesigner',
        message: 'themeDesigner',
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
      
      this.themeName = props.themeName;
      this.themeFunction = props.themeName.toLowerCase().trim().replace(/\s+/, "_");
      this.themeHandle = props.themeName.toLowerCase().trim().replace(/\s+/g, '-');
	    this.themeAuthor = props.themeAuthor;
      this.themeAuthorURI = props.themeAuthorURI;
      this.themeURI = props.themeURI;
      this.themeDescription = props.themeDescription;

      this.themeDesigner = props.themeDesigner;
      this.themeDesignerURI = props.themeDesignerURI;

      this.taskRunner = props.taskRunner;
      
      done();
    }.bind(this));
  },

  app: function () {
	this.directory( 'assets', 'assets' );
	this.directory( 'inc', 'inc' );
	this.directory( 'scss', 'scss' );
  },
  
  projectfiles: function () {
    this.template('404.php', '404.php');
    this.template('503.php', '503.php');
    this.template('comments.php', 'comments.php');
    this.template('content-page.php', 'content-page.php');
    this.template('content.php', 'content.php');
    this.template('footer.php', 'footer.php');
    this.template('front-page.php', 'front-page.php');
    this.template('functions.php', 'functions.php');
    this.template('header.php', 'header.php');
    this.template('index.php', 'index.php');
    this.template('page-full-width.php', 'page-full-width.php');
    this.template('page-redirect-url.php', 'page-redirect-url.php');
    this.template('page-redirect.php', 'page-redirect.php');
    this.template('page.php', 'page.php');
    this.template('search.php', 'search.php');
    this.template('searchform.php', 'searchform.php');
    this.template('sidebar.php', 'sidebar.php');
    this.template('single.php', 'single.php');
    
    this.copy('style.css', 'style.css');
    this.copy('gitignore', '.gitignore');
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('gulp-package.json', 'package.json');
    
  }
  
});

module.exports = EmiGenerator;