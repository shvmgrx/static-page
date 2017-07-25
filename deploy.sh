#!/bin/sh

git reset --hard HEAD
git pull

git checkout master

# Deploy main site
git checkout master
scss --update static-page/stylesheets/scss:static-page/stylesheets -f
cp . /var/www/jacobshack.com/ -Rf

