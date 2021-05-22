const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameElem = document.getElementById('website-name');
const websiteUrlElem = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');


let bookmarks = [];

function showModal() {
    modal.classList.add('show-modal');
    websiteNameElem.focus();
}

modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {
    modal.classList.remove('show-modal');
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

function buildBookmarks() {
    bookmarks.forEach(mark => {
        const { name, url } = mark;
        const item = document.createElement('div');
        item.classList.add('item');
        const closeIcon = document.createElement('i');

        closeIcon.classList.add('fas', 'fa-times-circle', 'close-icon');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);

        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');

        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://www.google.com/s2/u/0/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');

        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;

        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.append(item);
    });
}

function fetchBookmarks() {
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        bookmarks = [
            {
                name: 'Google',
                url: 'https://www.google.com/'
            }
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    buildBookmarks();
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
    const bookmark = {
        name: nameValue,
        url: urlValue
    };
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameElem.focus();
}

bookmarkForm.addEventListener('submit', storeBookmark);

fetchBookmarks();
