#!/bin/bash

npm install
ls -lah

webpack-dev-server --hot --inline --config webpack-config.js
