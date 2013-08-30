# Angular PhoneGap

A workflow for building kick-ass mobile apps using PhoneGap and AngularJS. This README is biased toward iOS apps on PhoneGap, but it will aim to be platform-agnostic in the future.

## Getting Started

### Requirements

To use this tool, you'll need the following installed: `npm`, `grunt`, and `cordova` (3.0). Follow the instructions below. You'll also need XCode for iOS.

### Install the Grunt CLI

Install the [grunt](http://gruntjs.com) command line interface:

    npm install -g grunt-cli

### Install Bower

Bower is a package manager like NPM, mostly used for front-end components (like jQuery).

    npm install -g bower

### Install PhoneGap/Cordova

[Follow instructions here](http://docs.phonegap.com/en/3.0.0/guide_cli_index.md.html#The%20Cordova%20Command-line%20Interface)
to install PhoneGap/Cordova.

Then, generate a new cordova project:

    cordova 

### Installing Dev Dependencies

After you've created a PhoneGap project, navigate to the folder and run
the following command:

Next, run the following line:

    npm install && bower install && grunt build:development


### Get Started

Start the server:

    cordova serve ios

Start Grunt's `watch` process to build on-the-fly. See `Gruntfile.js`
for more information. Modifying files should happen inside the `src/`
directory, not the `build/` directory.

    grunt watch

Navigate to:

    http://localhost:8000

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
`1.0.0`  | `08-30-13` | Initial version.
