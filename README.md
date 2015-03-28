## Generate Emi, an automated WordPress Starter Theme

This is a Yeoman generator that lets you quickly and easily create a new WordPress theme based on Emi, a starter theme. The generated starter theme is ready to roll with naming conventions based on your generator input, and with Sass and [Gulp.js](gulpjs.com) for further automation as you work on your customizations.

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

Then, you should be able to initiate the generator. 

```
$ yo emi
```

You'll want to do this from your `/wp-content/themes/` directory or wherever you want your new theme folder to live. Your theme files will be created in their own directory, named based on your input.

That's all there is to it!

## Changelog
2.1 Updated ReadMe, version bump for refactor    
2.0.6 Updated to create the theme directory, fixed a few bugs  
2.0.3 Fix package.json so other subdirectories are downloaded  
2.0.2 Update installation directions  
2.0.1 Improve description  
2.0.0 Pulls Emi from the theme's repo  
1.0.0 Initial release


## License

MIT