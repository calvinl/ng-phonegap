@echo off

REM Windows script for running karma unit tests

set BASE_DIR=%~dp0
karma start "%BASE_DIR%\karma-unit.conf.js" %*