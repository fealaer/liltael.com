#!/bin/bash
git checkout release
git pull origin master -qf
grunt build
git add .
git commit -m 'New Build'
git push heroku release:master
git checkout -