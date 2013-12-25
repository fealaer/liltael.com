#!/bin/bash

if [ "$1" != "" ]; then
    heroku apps:create --app $1 --addons mongohq:sandbox
else
    echo "You have to run this script with name of your project on heroku
    ./heroku.sh <name-of-your-project>"
fi