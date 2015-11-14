const $ = require('jquery');

console.log('Lightbox 0.01');

$('h6').text('Working....');

const Lightbox = class {

    constructor(json) {

        console.log('Constructing Lightbox...');

        this.json = json;

    }

    activate() {

        console.log('Activating lightbox');

    }

};

module.exports = Lightbox;
