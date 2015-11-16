const $ = require('jquery');
require('gsap'); /* global TweenMax, Power4 */

const Lightbox = class {

    constructor() {

        this.$window = $(window);
        this.$body = $('body');
        this.$lightbox = $('#lightbox');
        this.$offset = this.$lightbox.find('.lightbox__offset');
        this.$scale = this.$lightbox.find('.lightbox__scale');
        this.$content = this.$lightbox.find('.lightbox__content');
        this.transition = this.testTransition();

    }

    listenersOn() {

        setTimeout(() => {

            this.$body.on('click.lightbox', (e) => {

                if (!$(e.target).closest('.lightbox__center').length) {

                    this.listenersOff();
                    this.changeState(false);

                }

            }).on('click.lightBox', '.lightbox__more', () => {

                this.listenersOff();
                this.changeState(false);

            });

        }, 0);

    }

    listenersOff() {

        this.$body.off('click.lightbox');
    }

    get content() {

        return this.$content;

    }

    testTransition() {

        this.$lightbox.addClass(`lightbox--${window.TweenMax ? 'greensock' : 'native'}`);
        this.$lightbox.removeClass(`lightbox--${!window.TweenMax ? 'greensock' : 'native'}`);
        return window.TweenMax ? 'javscript' : 'native';

    }

    expand($article) {

        this.$article = $article;
        this.changeState(true);
        this.listenersOn();

    }

    changeState(expand) {

        const speed = 0.5;
        const {x, y} = this.findOffset();

        this[`${this.transition}Transition`](expand, speed, x, y);

    }

    javscriptTransition(expand, speed, x, y) {

        if (expand) {

            TweenMax.set(this.$lightbox, {visibility: 'visible'});

        }

        setTimeout(() => {

            TweenMax.fromTo(this.$lightbox, speed, {opacity: expand ? 0 : 1}, {opacity: expand ? 1 : 0, onComplete: () => {

                if (!expand) {

                    TweenMax.set(this.$lightbox, {visibility: 'hidden'});

                }

            }});

            TweenMax.fromTo(this.$scale, speed, {scale: expand ? 0 : 1}, {scale: expand ? 1 : 0});
            TweenMax.fromTo(this.$offset, speed, {x: expand ? x : 0, y: expand ? y: 0}, {x: expand ? 0 : x, y: expand ? 0 : y, ease: Power4[`ease${expand ? 'In' : 'Out'}`]});

        }, 0);


    }

    nativeTransition(expand, speed, x, y) {

        if (expand) {

             this.$offset.css({
                 'transform': `translate(${x}px, ${y}px)`,
                 'transition-duration': '0s'
             });

         }

         this.$lightbox[`${expand ? 'add' : 'remove'}Class`]('lightbox--native-active');

         setTimeout(() => {

             this.$offset.css({
                 'transform': `translate(${expand ? 0 : x}px, ${expand ? 0 : y}px)`,
                 'transition-duration': '0.5s'
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

module.exports = new Lightbox();
