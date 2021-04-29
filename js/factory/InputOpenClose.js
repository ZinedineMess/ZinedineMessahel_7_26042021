'use strict';
///////////////////////////////////////

export default class inputOpenClose {
    // Open the ustensils menu, with the inputs
    openInput(btn, openArrow, hiddenPart) {
        btn.addEventListener('click', () => {
            btn.style.width = "35rem";
            openArrow.style.display = 'none';
            hiddenPart.style.display = 'block';
        })
    }

    // Close the ustensils menu
    closeInput(btn, openArrow, closeArrow, hiddenPart) {
        closeArrow.addEventListener('click', () => {
            btn.style.width = "11rem";
            openArrow.style.display = 'block';
            hiddenPart.style.display = 'none';
        })
    }
}
