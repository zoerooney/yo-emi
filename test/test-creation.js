/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('emi generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('emi:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.gitignore',
      '404.php',
      '503.php',
      'assets/theme.js',
      'assets/vendor/html5.js',
      'comments.php',
      'content-page.php',
      'content.php',
      'footer.php',
      'front-page.php',
      'functions.php',
      'header.php',
      'inc/aq_resizer.php',
      'index.php',
      'page-full-width.php',
      'page-redirect-url.php',
      'page-redirect.php',
      'page.php',
      'scss/style.max.scss',
      'search.php',
      'searchform.php',
      'sidebar.php',
      'single.php',
      'style.css'
    ];

    helpers.mockPrompt(this.app, {
      'themeName': true,
      'themeAuthor': true,
      'themeAuthorURI': true,
      'themeURI': true,
      'themeDescription': true,
      'taskRunner': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
