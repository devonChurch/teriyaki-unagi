const $ = require('jquery');
const lightbox = require('./lightbox');
const bridget = require('jquery-bridget');
const Masonry = require('masonry-layout');

const Article = class {

    constructor() {

        this.$wrapper = $('.articles__wrapper');
        this.createGrid();
        this.listeners();

    }

    listeners() {

        this.$wrapper.on('click', '.article__more', (e) => {

            const $article = $(e.currentTarget).closest('.article');

            lightbox.expand($article);
            this.addContent();

        });

    }

    createGrid() {

        // convert constructor to jQuery plugin
        $.bridget( 'masonry', Masonry );

        this.$wrapper.masonry({
          itemSelector: '.article',
          columnWidth: '.article--small',
          percentPosition: true
        });

    }

    addContent() {

        // lightbox.content.html('<h2>Put your HTML content in here</h2>');

    }

};

module.exports = new Article();
