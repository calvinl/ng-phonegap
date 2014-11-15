# Angular PhoneGap

An opinionated workflow for building kick-ass mobile apps using
 Cordova and AngularJS. This README is biased toward iOS apps
 on Cordova, but it will aim to be platform-agnostic in the
 future.

## Getting Started

### Requirements

To use this tool, you'll need the following installed:
`npm`, `grunt`, `cordova` (3.5.0 at this time of this writing).
Follow the instructions below. You'll also need either `ios-deploy`
or XCode, depending on whether you want to build, test and debug
your app with XCode or not.

### Install the Grunt CLI

Install the [grunt](http://gruntjs.com) command line interface:

    npm install -g grunt-cli

### Install Bower

Bower is a package manager like NPM, mostly used for front-end
components (like jQuery).

    npm install -g bower

### Install ios-sim

If you don't want to use XCode, you can use
[`ios-sim`](https://github.com/phonegap/ios-sim) to install
and debug iPhone apps without using XCode.

    npm install -g ios-sim

### Install the Cordova CLI

    npm install -g cordova

Then, navigate to this repo's root directory, and generate a
new cordova project in your `app/` folder:

    cordova create app <bundle_id> <app_name>

For example:

    cordova create app com.example.hello HelloWorld

This will add relevant files into your `app/` directory:

    .cordova/
    merges/
    platforms/
    plugins/
    www/

Next, navigate to your app directory and run the following command:

    cd app/

    cordova platform add <platform_name>

In our case, we want to build an iOS app, so run:

    cordova platform add ios

This will add iOS-specific files into your `app/platforms` directory
so you can start building your app and running it in simulator.

Next, run:

    cordova prepare

Cordova will build and compile your application.

To make sure things are working, fire off the following command:

    cordova emulate ios

This will fire up your iOS Simulator and display a Cordova logo.

### Installing Dev Dependencies

After you've created your Cordova project, navigate back to the root
directory and run the following commands:

    npm install
    bower install

### Get Started

Start the main grunt task:

    grunt dev

This will build the initial development files, start up a web server,
and run `watch` on our files so they can can be compiled on the fly as
they are changed. Browser opens automatically and navigates to `http://localhost:9001/`

Developing in a Webkit-based browser is best. When you're ready to test
your app in the simulator or on a device, either fire off:

    cordova run ios

Or open up XCode and build the project from there.

You should see "Hello World!". You can now start developing your
app!

### Start Building

As mentioned above, use the following command to start the dev process:

    grunt dev

This is essentially like running the following commands consecutively:

    grunt build:development // builds initial files
    grunt connect           // starts up a local server
    grunt watch             // watches your src files for changes

When you change any file in the `src/` directory, grunt will notice and
recompile the proper files and place them into the `www/` directory. The
`www` directory is then later used by cordova to prepare the
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

You can as well start the dev process as your simulator or device is running.
For this run the `idev` task instead of `dev`:

    grunt idev

Now start your device simulator in another terminal and watch as your app gets
started (when the question pops up if you want to use `GapReload` answer the
question with `OK`):

    cd app && cordova emulate

Now watch how your app gets "hot-deployed" as you edit the assets!

You can always remove the Cordova GapReload plugin whenever you don't need
it anymore::

    grunt gapreload-remove

Note that the next execution of `idev` task would install this Cordova plugin
again if it's missing.

### Running unit- and e2e tests

First, you'll need to install the karma CLI if you haven't already:

    npm install -g karma-cli

If you wish to a browser other than Firefox to run your tests, just replace
karma-chrome-launcher in `package.json` with your preferred launcher. You
need to change the settings in `/test/karma-*.conf.js` files accordingly.

#### Unit Tests

The following command will run all tests found in the `/test/unit` folder:

    test\test.bat // for Windows
    test/test.sh  // for Linux/Mac OS

#### End-to-end (e2e) Tests

To run all end to end tests in the `/test/e2e` folder, run:

    grunt dev         // if not already started
    test\e2e-test.bat // for Windows
    test/e2e-test.sh  // for Linux/Mac OS


### Directory Structure

The `src/` directory is your main AngularJS project folder. It consists
of several directories and initial files of interest:

    src/
      |- css/                   <-- For all LESS files.
      | |- common/              <-- Project-wide CSS rules.
      | | |- base.less          <-- Main css file.
      | |- config/              <-- LESS config files, e.g. vars, mixins.
      | | |- colors.less        <-- Example config file with color vars.
      |- html/
      | |- layouts/
      | | |- application.tmpl   <-- Main application layout.
      | |- partials/            <-- All view files loaded
      | | |- home/
      | | | |- index.html       <-- Example view file.
      |- img/                   <-- Images go here.
      |- js/
      | |- config/              <-- Config root. Run methods, route, sanitization, etc.
      | | |- environments/
      | | | |- development.js   <-- Development environment global vars.
      | | | |- production.js    <-- Production environment global vars.
      | | |- router.js          <-- Router.
      | | |- sanitizer.js       <-- $compileProvider for link sanitation.
      | |- controllers/         <-- All Angular controllers
      | | |- home_controller.js <-- Example controller
      | |- directives/          <-- All directives
      | |- filters/             <-- All filters
      | |- modules              <-- All modules
      | |- services/            <-- All services
      | |- app.js               <-- Main Angular initialization file.
      | |- pg.js                <-- PhoneGap initialization class.


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

    set wildignore+=/path/to/repo/tmp/*,/path/to/repo/build/*,/path/to/repo/release/*



# Version History

Version  | Date       | Description
-------- | ---------- | ------------
`1.2.0`  | `06-04-14` | Working unit and e2e tests. Thanks [mikkoviitala](https://github.com/mikkoviitala). Update Angular to 1.2.16, karma, grunt, bower, Fontawesome.
`1.1.1`  | `01-14-14` | Update angular to 1.2.8, readme changes.
`1.1.0`  | `12-22-13` | Use Cordova instead of PG CLI, upgrade to 3.3.0, update documentation, and manage some breaking changes to directory structure.
`1.0.2`  | `08-30-13` | Hotfixes.
`1.0.1`  | `08-30-13` | Re-release as a simple workflow instead of npm module.
`1.0.0`  | `07-30-13` | Initial version.
