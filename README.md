## Emi, an automated WordPress Starter Theme

Emi is a WordPress starter theme package that has been automated to include a generator (using [Yeoman](http://yeoman.io)). The generated themes is set up with Sass and [Gulp.js](gulpjs.com) for further automation.

## Getting Started

### Install Yeoman

If you don't already have Yeoman installed, you'll need to take care of that:

```
$ npm install -g yo
```

Or, if you get errors related to permissions, try:

```
$ sudo npm install -g yo
```

### Install Emi


You can install the Emi generator using the command:

```
$ npm install -g generator-emi
```

Then, you should be able to initiate the generator. You'll want to do this from your /themes/ directory or wherever you want your new theme folder to live. Your theme files will be created in their own directory, named based on your inputs.

```
$ yo emi
```

## Changelog
2.0.6 Updated to create the theme directory, fixed a few bugs
2.0.3 Fix package.json so other subdirectories are downloaded
2.0.2 Update installation directions  
2.0.1 Improve description  
2.0.0 Pulls Emi from the theme's repo  
1.0.0 Initial release


## License

MIT
