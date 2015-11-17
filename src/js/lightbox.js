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
        this.$article = null; // Retrieved via this.expand();

    }

    listenersOn() {

        // Wait for the next CPU cycle so that the listeners are not immediately
        // initiated resulting in the light box instantly closing again.

        setTimeout(() => {

            this.$body.on('click.lightbox', (e) => {

                // Refers to clicking anywhere except on the light box content.
                if (!$(e.target).closest('.lightbox__center').length) {

                    this.listenersOff();
                    this.changeState(false);

                }

            }).on('click.lightBox', '.lightbox__more', () => {

                this.listenersOff();
                this.changeState({expand: false});

            });

        }, 0);

    }

    listenersOff() {

        // Turn off all light box listeners when the unit is in its dormant
        // state i.e. on load / after being closed.

        this.$body.off('click.lightbox');

    }

    get content() {

        // Returns the DOM element in which to inject content into. Have left
        // the decision regarding the injection process up to the developer to
        // give freedom + keeping the base code lightweight.

        return this.$content;

    }

    testTransition() {

        // This is a test to see if the Greenock animation platform is present
        // (specifically TweenMax) - if not available then we use native CSS3
        // transitions. Depending on result we add / remove the appropriate
        // class names to set the DOM up for the transition phase.

        this.$lightbox.addClass(`lightbox--${window.TweenMax ? 'greensock' : 'native'}`);
        this.$lightbox.removeClass(`lightbox--${!window.TweenMax ? 'greensock' : 'native'}`);
        return window.TweenMax ? 'javscript' : 'native';

    }

    expand($article) {

        // The entry point to expand the light box. We pass in a reference
        // (optional) for where the light box should expand from, run the
        // animation and activate the listeners.

        this.$article = $article;
        this.changeState({expand: true});
        this.listenersOn();

    }

    changeState({expand}) {

        const speed = 0.5;
        const {x, y} = this.findOffset();

        // Run either the TweenMax or native transition. The applicable function
        // runs both the expand and contract animation and is determined via the
        // expand parameter (true = expand, false = contract).
        this[`${this.transition}Transition`](expand, speed, x, y);

    }

    javscriptTransition(expand, speed, x, y) {

        if (expand) {

            TweenMax.set(this.$lightbox, {visibility: 'visible'});

        }

        // Wait for the next CPU cycle so that any of the setup CSS above can be
        // injected into the DOM before being overridden when the animation begins.
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

         // Wait for the next CPU cycle so that any of the setup CSS above can be
         // injected into the DOM before being overridden when the animation begins.
         setTimeout(() => {

             this.$offset.css({
                 'transform': `translate(${expand ? 0 : x}px, ${expand ? 0 : y}px)`,
                 'transition-duration': '0.5s'
             });

         }, 0);

    }

    findOffset() {

        // Find how much to offset the light box before animating into view so
        // that it expands from the supplied article reference. If no article
        // reference is supplied then the light box will expand from the windows
        // centre.

        const {x: articleX, y: articleY} = this.$article ? this.articleCenter() : this.windowCenter();
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
