#!/bin/bash

BASE_DIR=`dirname $0`

karma start $BASE_DIR/karma-e2e.conf.js $*
