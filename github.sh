#!/bin/bash

if [ "$1" != "" ]; then
    git remote rename origin startingpointjs
    git remote add origin $1
    git push origin master
    git checkout develop
    git push origin develop
    git checkout release
    git push origin release
    git checkout develop
else
    echo "You have to run this script with url to your github repository
    ./github.sh <url-to-your-repository>"
fi