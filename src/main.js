import elrUI from 'elr-ui';
const $ = require('jquery');

let ui = elrUI();

const elrModal = function({
    modalClass = 'elr-modal',
    lightboxClass = 'elr-blackout',
    closeClass = 'elr-modal-close',
    buttonClass = 'elr-modal-open',
    speed = 300
} = {}) {
    const self = {
        // createLightbox(speed, $modal) {
        //     const $close = ui.createElement('button', {
        //         class: 'close',
        //         text: 'x'
        //     });

        //     const $lightbox = ui.createElement('div', {
        //         class: lightboxClass
        //     });

        //     $lightbox.hide().appendTo('body').fadeIn(speed, function() {
        //         $close.appendTo($lightbox);
        //         $modal.appendTo($lightbox).css({'display': 'flex'});
        //     });
        // },
        showModal(speed) {
            const modalId = $(this).data('modal');
            const $modal = $(`#${modalId}`);

            ul.addOverlay(function() {
                $modal.appendTo($lightbox).css({'display': 'flex'});
            });
            // createLightbox(speed, $modal);
        },
        hideModal(speed) {
            const $lightbox = $(`.${lightboxClass}`);
            const $modal = $lightbox.find(`.${modalClass}`);

            $lightbox.fadeOut(speed, function() {
                $modal.hide().appendTo('body');
                $(this).remove();
            });
        }
    };

    const $modals = $(`.${modalClass}`);

    if ($modals.length) {
        const $body = $('body');

        $modals.hide().appendTo('body');

        $body.on('click', `.${buttonClass}`, function(e) {
            e.preventDefault();
            e.stopPropagation();
            self.showModal.call(this, speed);
        });

        $(`.${closeClass}`).on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            self.hideModal();
        });

        $body.on('click', `.${lightboxClass} .close`, function(e) {
            e.preventDefault();
            e.stopPropagation();
            self.hideModal();
        });

        $body.on('click', function() {
            self.hideModal();
        });

        $modals.on('click', function(e) {
            e.stopPropagation();
        });
    }

    return self;
};

export default elrModal;