'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var EmiGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\re about to generate a new theme based on the Emi starter theme from Zoe Rooney Web Development. Just a few questions to get started...'));

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
      message: 'What is the final website URL, if you know it (where the theme will live)?',
    },{
      name: 'themeDescription',
      message: 'Please briefly describe this theme.',
      default: function( answers ) {
     	 return ''+answers.themeName+' custom theme.';
      }
    }, {
      type: 'confirm',
      name: 'taskRunner',
      message: 'Would you like to use Grunt instead of Gulp as your task runner?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      
      this.themeName = props.themeName;
      this.themeFunction = props.themeName.toLowerCase().trim().replace(/\s+/, "_");
      this.themeHandle = props.themeName.toLowerCase().trim().replace(/\s+/g, '');
	  this.themeAuthor = props.themeAuthor;
      this.themeAuthorURI = props.themeAuthorURI;
      this.themeURI = props.themeURI;
      this.themeDescription = props.themeDescription;
      this.taskRunner = props.taskRunner;
      
      cb();
    }.bind(this));
  },

  app: function () {
    this.mkdir( this.themeFolder );
	this.directory( 'assets', this.themeHandle + '/assets' );
	this.directory( 'inc', this.themeHandle + '/inc' );
	this.directory( 'scss', this.themeHandle + '/scss' );
	
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
	
	if ( this.taskRunner ) {
		this.copy('gruntfile.js', 'Gruntfile.js');
	    this.template('grunt-package.json', 'package.json');
    } else {
	    this.copy('gulpfile.js', 'gulpfile.js');
	    this.copy('gulp-package.json', 'package.json');
    }
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = EmiGenerator;