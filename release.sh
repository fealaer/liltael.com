#!/bin/bash
git checkout release
grunt build
git add .
git commit -m 'New Build'
git push heroku release:master
git checkout -