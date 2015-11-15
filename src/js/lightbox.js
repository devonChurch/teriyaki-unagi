const $ = require('jquery');

console.log('Lightbox 0.01');

$('h6').text('Working....');

const Lightbox = class {

    constructor() {

        console.log('Constructing Lightbox...');

        this.$window = $(window);
        this.$lightbox = $('#lightbox');
        this.$offset = this.$lightbox.find('.lightbox__offset');
        this.listeners();

    }

    listeners() {

        this.$lightbox.on('click', '.lightbox__more', () => {
            this.changeState(false);
        });

    }

    initialise($article) {

        console.log('Activating lightbox');

        this.$article = $article;
        this.changeState(true);

    }

    changeState(expand) {

        const {x, y} = this.findOffset();

        if (expand) {

            this.$offset.css({
                'transform': `translate(${x}px, ${y}px)`,
                'transition': '0s'
            });

        }

        this.$lightbox[`${expand ? 'add' : 'remove'}Class`]('lightbox--active');

        setTimeout(() => {

            this.$offset.css({
                'transform': `translate(${expand ? 0 : x}px, ${expand ? 0 : y}px)`,
                'transition': `0.5s`
            });

        }, 0);

    }

    findOffset() {

        const {x: articleX, y: articleY} = this.articleCenter();
        const {x: windowX, y: windowY} = this.windowCenter();
        const x = articleX - windowX;
        const y = articleY - windowY;

        return {x, y};

    }

    articleCenter() {

        const scroll = this.$window.scrollTop();
        const offset = this.$article.offset();
        const height = this.$article.outerHeight();
        const width = this.$article.outerWidth();
        const x = offset.left + (width / 2);
        const y = offset.top - scroll + (height / 2);

        console.log(`scroll: ${scroll} | offset: ${offset} | height: ${height} | width: ${width} | x: ${x} | y: ${y}`);

        return {x, y};

    }

    windowCenter() {

        const height = this.$window.height();
        const width = this.$window.width();
        const x = width / 2;
        const y = height / 2;

        return {x, y};

    }

};

module.exports = Lightbox;
