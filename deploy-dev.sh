#!/bin/sh

git reset --hard HEAD
git pull

git checkout master

# Deploy staging site
git checkout develop
scss --update static-page/stylesheets/scss:static-page/stylesheets -f
cp ./ /var/www/2017f.jacobshack.com/ -Rf

