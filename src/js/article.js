const $ = require('jquery');
require('jquery-bridget');
const lightbox = require('./lightbox');
const Masonry = require('masonry-layout');

const Article = class {

    // This is simply demo code to simulate a layout of articles that act as a
    // conduit to activate the light box code.

    constructor() {

        this.$wrapper = $('.articles__wrapper');
        this.createGrid();
        this.listeners();

    }

    listeners() {

        this.$wrapper.on('click', '.article__more', (e) => {

            const $article = $(e.currentTarget).closest('.article');

            // Triggers the light box to expand into view. We can pass in a
            // reference to the article that the user clicked to simulate the
            // article expanding from that particular location. If no positioning
            // reference is passed through then the light box will expand from
            // the window center.
            lightbox.expand($article);
            this.addContent();

        });

    }

    createGrid() {

        // Converts the Masonry constructor to a jQuery plugin.
        $.bridget( 'masonry', Masonry );

        // Run Masonry to create a tiled layout. target a article class name
        // rather than a fixed number of the column width parameter so that
        // design will work well in a responsive environment.
        this.$wrapper.masonry({
            itemSelector: '.article',
            columnWidth: '.article--small',
            percentPosition: true
        });

    }

    addContent() {

        // Add content to the light box in whatever way you see fit. Target the
        // light box content wrapper for easy HTML injection.

        // lightbox.content.html('<h2>Put your HTML content in here</h2>');

    }

};

module.exports = new Article();
