# jacobshack-splash
This is the jacobsHack! Splash Page.

Attribution
----------

This project is based on the HackMIT landing page.
`https://github.com/techx/hackmit-splash`

The `master` branch is deployed at https://jacobshack.com.


## Build ##

### Requirements
* ruby
* compass
* node.js 
* git

### Running the site locally

Make sure to have the required apps running on you machine. Then execute
~~~bash
npm i -g yarn gulp serve
yarn install 
npm run serve:dev
~~~

### Testing

To view the splash page on your own computer, simply run `python -m SimpleHTTPServer` in this directory. Then, go to `http://localhost:8000` to view your version.

### Dev

Make sure to compile your scss appropriately. Something like `sass --watch stylesheets/scss:stylesheets` suffices.
