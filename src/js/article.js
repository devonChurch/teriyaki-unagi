const $ = require('jquery');
const bridget = require('jquery-bridget');
const Masonry = require('masonry-layout');

console.log('Article 0.02');

const Article = class {

    constructor(lightbox) {

        console.log('Constructing Article...');
        console.log(lightbox);

        this.lightbox = lightbox;
        this.$wrapper = $('.articles__wrapper');
        // this.$articles = this.$wrapper.find$('.articles');
        this.createGrid();

    }

    listeners() {

        this.$wrapper.on('click', '.article__more', (e) => {

            const $article = $(e.currentTarget).closest('.article');
            const json = this.getJson();
            this.lightbox.activate();

        });

    }

    getJson() {

        console.log('Getting article JSON');

    }

    createGrid() {

        console.log('Create grid');
        // console.log(Masonry);

        // convert constructor to jQuery plugin
        $.bridget( 'masonry', Masonry );

        const column = 960 / 3;

        console.log(Masonry);
        console.dir(Masonry);

        this.$wrapper.masonry({
          // options
          itemSelector: '.article',
          columnWidth: '.article--small',
          percentPosition: true
          // columnWidth: function () { console.log('Column width'); }

        });

        // console.log(this.$wrapper.masonry.data);

    }

};

module.exports = Article;
