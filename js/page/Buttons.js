'use strict';

export default class Buttons {
    static launchButtons(btn, open, close, hiddenPart) {
        btn.addEventListener('click', () => {
            this.displayBtn(btn);
            this.hideArrow(open);
            this.displayHidden(hiddenPart);
        });

        close.addEventListener('click', () => {
            this.hideButtonsOnClick(btn, open, hiddenPart);
        })
    }

    static hideButtonsOnClick(btn, open, hiddenPart) {
        this.hideBtn(btn);
        this.displayArrow(open);
        this.hideHidden(hiddenPart);
    }

    static displayBtn(btn) {
        return btn.style.width = "35rem";
    }

    static hideBtn(btn) {
        return btn.style.width = "11rem";
    }

    static displayArrow(open) {
        return open.style.display = 'block';
    }

    static hideArrow(open) {
        return open.style.display = 'none';
    }

    static displayHidden(hiddenPart) {
        return hiddenPart.style.display = 'block';
    }

    static hideHidden(hiddenPart) {
        return hiddenPart.style.display = 'none';
    }
}
