const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameElem = document.getElementById('website-name');
const websiteUrlElem = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

function showModal() {
    modal.classList.add('show-modal');
    websiteNameElem.focus();
}

modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {
    modal.classList.remove('show-modal');
    bookmarkForm.reset();
});
window.addEventListener('click', (e) => (e.target) === modal ? modal.classList.remove('show-modal') : false);

function formValidator(url) {
    const expr = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expr);
    if (url.match(regex)) {
        return true;
    } else {
        alert('Please provide a valid website address');
        return false;
    }
}

function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameElem.value;
    let urlValue = websiteUrlElem.value;
    if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
        urlValue = `https://${urlValue}`;
    }
    const valid = formValidator(urlValue);
    if (!valid) {
        return false;
    }
}

bookmarkForm.addEventListener('submit', storeBookmark);

