@echo off

REM Windows script for running e2e tests

set BASE_DIR=%~dp0
karma start "%BASE_DIR%\karma-e2e.conf.js" %*
