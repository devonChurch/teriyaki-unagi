const $ = require('jquery');
const bridget = require('jquery-bridget');
const Masonry = require('masonry-layout');

console.log('Article 0.02');

const Article = class {

    constructor(lightbox) {

        console.log('Constructing Article...');

        this.lightbox = lightbox;
        this.$wrapper = $('.articles__wrapper');
        // this.$articles = this.$wrapper.find$('.articles');
        this.createGrid();
        this.listeners();

    }

    listeners() {

        this.$wrapper.on('click', '.article__more', (e) => {

            const $article = $(e.currentTarget).closest('.article');
            // const json = this.getJson();
            this.lightbox.activate($article);

        });

    }

    getJson() {

        console.log('Getting article JSON');

    }

    createGrid() {

        console.log('Create grid');

        // convert constructor to jQuery plugin
        $.bridget( 'masonry', Masonry );

        this.$wrapper.masonry({
          itemSelector: '.article',
          columnWidth: '.article--small',
          percentPosition: true
        });

    }

};

module.exports = Article;
