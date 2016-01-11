# Teriyaki Unagi

A light box that expands from the location of its source module.

## Demo

[Click here](http://codepen.io/DevonChurch/full/KdJKej/)

## Installation

- Clone this repository
```
git clone https://github.com/devonChurch/teriyaki-unagi.git
```

- Install project dependancies
```
npm install
```

- Start up a [Webpack](https://webpack.github.io/docs/webpack-dev-server.html) development server at http://localhost:8080/webpack-dev-server/
```
npm start
```

## Usage

- To expand the light box from a given articles location call the expand function and pass in a jQuery objet of the article.
```javascript
TeriyakiUnagi.expand($article);
```
If no object is given to the function as a reference then the expansion begins from the centre of the page.

- To populate the light-box with content call the content function which returns a jQuery object of the light-box content area. You can populate this area however you see fit - a simple way is to inject HTML generated from a tempting engine.
```javascript
TeriyakiUnagi.content.html('<h2>Put your generated HTML content in here</h2>');
```

- This execution runs on the GSAP platform (specifically TweenMax). If you would rather not use TweenMax simply remove as a dependancy and the code will automatically fall back to using CSS3 transitions :smiley:

## License

MIT
