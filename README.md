# Angular PhoneGap

A workflow for building kick-ass mobile apps using PhoneGap and
AngularJS.

## Getting Started

### Requirements

    To use this tool, you'll need the following installed: `npm`, `Grunt`, `PhoneGap` (install instructions below).

### Install PhoneGap/Cordova

[Follow instructions here](http://docs.phonegap.com/en/2.9.0/guide_cli_index.md.html#The%20Cordova%20Command-line%20Interface)
to install PhoneGap/Cordova and to generate a new project.

### Installing Dev Dependencies

After you've created a PhoneGap project, navigate to the folder and run
the following command:x1

Next, run the following line:

    npm install && bower install && grunt build:development


### XCode Settings

Create an `environment.plist` in your home directory:

    mkdir ~/.MacOSX/
    touch ~/.MacOSX/environment.plist

Add the following into `environment.plist`

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
    	<key>NVM_BIN_PATH</key>
    	<string>/path/to/your/nvm/bin</string>
    </dict>
    </plist>

In the above, replace `/path/to/your/nvm/bin` with the path where 
your `grunt` binary is located. In most cases you'll be using nvm
so locate the path to that. Use `which grunt` to locate your
grunt binary.

### Get Started

Start the server:

    ./scripts/web-server.js

Start Grunt's `watch` process to build on-the-fly. See `Gruntfile.js`
for more information. Modifying files should happen inside the `src/`
directory, not the `build/` directory.

    grunt watch

Navigate to:

    http://localhost:8000/build/app/index.html    

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
`1.0.0`  | `07-17-13` | Initial version.
