require('../sass/style.scss');
const Lightbox = require('./lightbox');
const Article = require('./article');

const lightbox = new Lightbox();
const article = new Article(lightbox);



console.log('Entry 0.01');
