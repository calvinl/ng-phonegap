# Angular PhoneGap

An opinionated workflow for building kick-ass mobile apps using
 PhoneGap and AngularJS. This README is biased toward iOS apps
 on PhoneGap, but it will aim to be platform-agnostic in the
 future.

## Getting Started

### Requirements

To use this tool, you'll need the following installed:
 `npm`, `grunt`, and `cordova` (3.0). Follow the instructions
 below. You'll also need XCode for iOS.

### Install the Grunt CLI

Install the [grunt](http://gruntjs.com) command line interface:

    npm install -g grunt-cli

### Install Bower

Bower is a package manager like NPM, mostly used for front-end
 components (like jQuery).

    npm install -g bower

### Install the PhoneGap CLI

[Follow instructions here](http://docs.phonegap.com/en/3.0.0/guide_cli_index.md.html#The%20Cordova%20Command-line%20Interface)
to install PhoneGap/Cordova.

Then, navigate to this repo's root directory, and generate a
new phonegap project:

    phonegap create . com.example.hello HelloWorld

This will add relevant files into your project directory:

    .cordova/
    merges/
    platforms/
    plugins/
    www/

You can now run the following command:

    phonegap run ios

This should fire up your iOS Simulator and display a Phonegap
logo.

### Installing Dev Dependencies

After you've created a PhoneGap project, navigate to the folder
and run the following command:

Next, run the following line:

    npm install && bower install && grunt build:development


### Get Started

Start the server:

    scripts/web-server.js

Start Grunt's `watch` process to build on-the-fly. See `Gruntfile.js`
for more information. Modifying files should happen inside the `src/`
directory, not the `build/` directory.

    grunt watch

When you change any file in the `src/` directory, grunt will notice and
recompile the proper files and place them into the `www/` directory. The
`www` directory is then later used by phonegap to prepare the
application to be copied over to the device (or simulator).

`grunt watch` will only watch for files you change and only build out
related files. For example, if you change a .less file, grunt will only
rebuild all LESS files and copy them over to `www/`. If you want to
rebuild the entire project, use the following commands:

    grunt build:development

or

    grunt build:production

The latter will use UglifyJS to minify your files, setting them up for
production. It will also use the the file in
`src/js/config/environments/production.js`. This is useful for setting
up things like API routes and/or public keys that differ
per-environment.

Navigate to:

    http://localhost:8000/www/index.html

Developing in a Webkit-based browser is best. When you're ready to test
your app in the simulator or on a device, either fire off:

    phonegap run ios

Or open up XCode and build the project from there. 

You should see "It's working!". You can now start developing your
app!

### Directory Structure

The `src/` directory is your main AngularJS project folder. It consists
of several directories and initial files of interest:

    src/
      css/                   <-- For all LESS files.
        common/              <-- Place all CSS rules that are
                                 project-wide.
          base.less          <-- Main css file.
        config/              <-- Place LESS configuration files here,
                                 e.g. files with variables.
          colors.less        <-- Example configuration file for color
                                 variables.
      html/
        layouts/            
          application.tmpl   <-- Main application layout.
        partials/            <-- All view files loaded
          home/
            index.html       <-- Example view file.
      img/                   <-- for images.
      js/
        config/              <-- Configuration root. Place all `.config` run
                                 methods here, e.g. router.js below.
          environments/
            development.js   <-- Development environment global vars.
            production.js    <-- Production environment global vars.
          router.js          <-- Main routes.
          sanitizer.js       <-- Main $compileProvider for link sanitation.
        controllers/         <-- all Angular controllers
          home_controller.js <-- Example controller
        directives/          <-- All directives
        filters/             <-- All filters
        modules              <-- All modules
        services/            <-- All services
        app.js               <-- Main Angular initialization file.
        pg.js                <-- PhoneGap initialization class.


### bower.json

The `bower.json` contains all the components that your app requires.
You can add more components by installing via Bower.

    bower search <packagename>

Will run a search for packages. Use `bower install --save`

    bower install <packagename> --save

The `--save` option adds the components into your bower.json file.
This will also install the package into the `vendor/` directory as
specified in `.bowerrc`. You can change that directory, but you'll
also need to change it in `Gruntfile.js`, specified below, and add
the directory to `.gitignore`.

Keeping a bower.json is useful so you can keep package source files
out of version control, and have developers install them via Bower
after downloading your repository.


### Gruntfile.js

`Gruntfile.js` is where the magic happens. You will need to add
any Bower components you want into the `assets.css` and `assets.js`
properties. Angular, Bootstrap 3, and Font-Awesome are already
added for you.


## Writing kick ass code.


## Some Conventions to Keep in Mind

There are certain conventions to keep in mind. When creating a
controller, use the following syntax:

    angular.module(_CONTROLLERS_).controller('HomeController', function($scope) {

    });

The `_CONTROLLERS_` variable is defined in `src/js/app.js`, where it
takes the base application name and concatenates it with controllers.
This way you won't need to keep adding module names into your initial
top-level app module (in `src/js/app.js`).

Do the same for `_DIRECTIVES_`, `_SERVICES_`, and so on.


# Other Notes

## ngmin 

Due to AngularJS's dependency injection (DI), minifying files for
production messes things up since Angular uses argument names to look
up module/service/etc names. To solve this we can pass an array to our
angular modules with the string names of the dependencies. This is
annoying to continually do, so we use `grunt-ngmin` automatically
generate this, so you can use normal arguments in your modules.


## Vim Notes

If you're using Vim with `ctrlp`, you can add the following line to your
`~/.vimrc` file to exclude the `build/`, `tmp/`, and `release/` folders
from the search directories.

    set
wildignore+=/path/to/repo/tmp/*,/path/to/repo/build/*,/path/to/repo/release/*



# Version History

Version  | Date       | Description
-------- | ---------- | ------------
`1.0.1`  | `08-30-13` | Re-release as a simple workflow instead of npm module.
`1.0.0`  | `07-30-13` | Initial version.
