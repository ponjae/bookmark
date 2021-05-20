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
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target) === modal ? modal.classList.remove('show-modal') : false);
