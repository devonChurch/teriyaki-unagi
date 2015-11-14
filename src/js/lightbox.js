const $ = require('jquery');

console.log('Lightbox 0.01');

$('h6').text('Working....');

const Lightbox = class {

    constructor() {

        console.log('Constructing Lightbox...');

        this.$window = $(window);

    }

    activate($article) {

        console.log('Activating lightbox');

        this.$article = $article;
        const position = this.findCenter();

    }

    findCenter() {

        const scroll = this.$window.scrollTop();
        const offset = this.$article.offset();
        const height = this.$article.outerHeight();
        const width = this.$article.outerWidth();
        const x = offset.left + (width / 2);
        const y = offset.top - scroll + (height / 2);

        console.log(`scroll: ${scroll} | offset: ${offset} | height: ${height} | width: ${width} | x: ${x} | y: ${y}`);

        return {x, y};

    }

};

module.exports = Lightbox;
