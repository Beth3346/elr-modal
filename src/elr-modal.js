import elrUtlities from 'elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

const elrModal = function({
    modalClass = 'elr-modal',
    lightboxClass = 'elr-blackout',
    closeClass = 'elr-modal-close',
    buttonClass = 'elr-modal-open',
    speed = 300
} = {}) {
    const self = {};
    const $modals = $(`.${modalClass}`);

    const createLightbox = function(speed, $modal) {
        const $close = elr.createElement('button', {
            class: 'close',
            text: 'x'
        });

        const $lightbox = elr.createElement('div', {
            class: lightboxClass
        });

        $lightbox.hide().appendTo('body').fadeIn(speed, function() {
            $close.appendTo($lightbox);
            $modal.appendTo($lightbox).css({'display': 'flex'});
        });
    };

    const showModal = function(speed) {
        const modalId = $(this).data('modal');
        const $modal = $(`#${modalId}`);

        createLightbox(speed, $modal);
    };

    const hideModal = function(speed) {
        const $lightbox = $(`.${lightboxClass}`);
        const $modal = $lightbox.find(`.${modalClass}`);

        $lightbox.fadeOut(speed, function() {
            $modal.hide().appendTo('body');
            $(this).remove();
        });
    };

    if ($modals.length) {
        const $body = $('body');

        $modals.hide().appendTo('body');

        $body.on('click', `.${buttonClass}`, function(e) {
            e.preventDefault();
            e.stopPropagation();
            showModal.call(this, speed);
        });

        $(`.${closeClass}`).on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hideModal();
        });

        $body.on('click', `.${lightboxClass} .close`, function(e) {
            e.preventDefault();
            e.stopPropagation();
            hideModal();
        });

        $body.on('click', function() {
            hideModal();
        });

        $modals.on('click', function(e) {
            e.stopPropagation();
        });
    }

    return self;
};

export default elrModal;