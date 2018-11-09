/**
 * Toscani gulpfile template.
 */

/**
 * Packages.
 *
 * Installation:
 * npm install --save-dev [package package package...]
 */
var gulp         = require( 'gulp' );
var autoprefixer = require( 'gulp-autoprefixer' );
var cleancss     = require( 'gulp-clean-css' );
var concat       = require( 'gulp-concat' );
var filter       = require( 'gulp-filter' );
var livereload   = require( 'gulp-livereload' );
var notify       = require( 'gulp-notify' );
var plumber      = require( 'gulp-plumber' );
var rename       = require( 'gulp-rename' );
var sass         = require( 'gulp-sass' );
var sassglob     = require( 'gulp-sass-glob' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var uglify       = require( 'gulp-uglify' );
var util         = require( 'gulp-util' );

/**
 * Config.
 */
var config = {
    env: ( util.env.env ? util.env.env : 'dev' ),
};

console.log( 'Environment: '+config.env );

/**
 * Directories.
 */
var dir = {
    php: 'public_html',
    input: {
        js:   'js',
        sass: 'sass',
    },
    output: {
        js:   'public_html/assets/js',
        sass: 'public_html/assets/css',
    },
};

/**
 * Procedures.
 */
var app = [];

app.processJS = function( args ) {
    // use all the files
    return gulp.src( args.inputFiles )
        // catch errors
        .pipe( plumber( { errorHandler: notify.onError( {
            title: args.name,
            message: '<%= error.type %> error on line <%= error.line %>\n\n<%= error.filename %>',
        } ) } ) )
        // start the sourcemap
        .pipe( config.env == 'dev' ? sourcemaps.init() : util.noop() )
        // concat the js
        .pipe( concat( args.outputFile ) )
        // minify the js
        .pipe( config.env == 'prod' ? uglify() : util.noop() )
        // finish the sourcemap
        .pipe( config.env == 'dev' ? sourcemaps.write( '.' ) : util.noop() )
        // place the output file
        .pipe( gulp.dest( args.outputDir ) )
        // remove the sourcemap from the stream
        .pipe( config.env == 'dev' ? filter( [ '**/*.js' ] ) : util.noop() )
        // reload the site
        .pipe( livereload() );
};

app.processSass = function( args ) {
    // use all the files
    return gulp.src( args.inputFiles )
        // catch errors
        .pipe( plumber( { errorHandler: notify.onError( {
            title: 'Error in ' + args.name,
            message: '<%= error.messageOriginal %>\n\n<%= error.relativePath %>\n\nLine <%= error.line %>, column <%= error.column %>.',
        } ) } ) )
        // start the sourcemap
        .pipe( config.env == 'dev' ? sourcemaps.init() : util.noop() )
        // analyse the globs
        .pipe( sassglob() )
        // compile the sass to css
        .pipe( sass( { includePaths: ['node_modules'] } ) )
        // autoprefix the css
        .pipe( autoprefixer( 'last 10 versions' ) )
        // minify the css
        .pipe( config.env == 'prod' ? cleancss( { keepSpecialComments: 0 } ) : util.noop() )
        // name the output file
        .pipe( rename( args.outputFile ) )
        // finish the sourcemap
        .pipe( config.env == 'dev' ? sourcemaps.write( '.' ) : util.noop() )
        // place the output file
        .pipe( gulp.dest( args.outputDir ) )
        // remove the sourcemap from the stream
        .pipe( config.env == 'dev' ? filter( [ '**/*.css' ] ) : util.noop() )
        // reload the site
        .pipe( livereload() );
};

/**
 * Tasks: JS.
 */
gulp.task( 'js_theme', function() {
    app.processJS( {
        'name'       : 'theme js',
        'inputFiles' : [ dir.input.js+'/theme.js' ],
        'outputDir'  : dir.output.js,
        'outputFile' : 'ip-theme.min.js',
    });
});

/**
 * Tasks: Sass.
 */
gulp.task( 'sass_theme', function() {
    app.processSass( {
        'name'       : 'theme sass',
        'inputFiles' : [ dir.input.sass+'/theme.scss' ],
        'outputDir'  : dir.output.sass,
        'outputFile' : 'ip-theme.min.css',
    });
});

/**
 * Task: livereload.
 */
gulp.task( 'livereload', function() {
    livereload.reload();
});

/**
 * Task: watch.
 */
gulp.task( 'watch', function() {
    // start livereload
    livereload.listen();
    // JavaScript
    gulp.watch( dir.input.js+'/theme.js', [ 'js_theme' ] );
    // Sass
    gulp.watch( dir.input.sass+'/**/*.scss', [ 'sass_theme' ] );
    // PHP
    gulp.watch( dir.php+'/**/*.php', [ 'livereload' ] );
    // notify
    gulp.src( 'node_modules/gulp-notify/test/fixtures/1.txt' ).pipe( notify( 'Gulp is watching.' ) );
});

/**
 * Task: default.
 */
gulp.task( 'default', [
    'js_theme',
    'sass_theme',
]);

