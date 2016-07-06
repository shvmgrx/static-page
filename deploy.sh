#!/bin/sh

git reset --hard HEAD
git pull

git checkout master

# Deploy main site
scss --update static-page/stylesheets/scss:static-page/stylesheets -f
cp static-page/* /var/www/2016.jacobshack.com/ -Rf

# Update staging site
git checkout gh-pages
scss --update static-page/stylesheets/scss:static-page/stylesheets -f
cp static-page/* /var/www/2016.jacobshack.com/dev/ -Rf
