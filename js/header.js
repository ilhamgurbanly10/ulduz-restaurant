
// getting-elements

const modalBtn = document.querySelector('.modal-container-closer');

// the-end-of-getting-elements



// calling

hideModal(modalBtn);

hideNavbarSearchModal();

flashNavbarAnimations();

flashActiveScrolling();

// the-end-of-calling-functions



// modal-container

function hideModal(btn) {
	const tar = btn.getAttribute('target');
	const modal = document.querySelector(''+tar+'');
	const hide = () => modal.classList.remove('fl-show');
	btn.addEventListener('click', hide);
}

// the-end-of-modal-container



// hide-navbar-search-modal

function hideNavbarSearchModal() {

	const btn = document.querySelector('.fl-navbar-search-toggler');
	const navbar = document.querySelector('#navbarSearchModal');

	function hide() { if (!btn.className.includes('fl-active')) navbar.classList.remove('fl-show'); }

	btn.addEventListener('click', hide);

}

// the-end-of-hide-navbar-search-modal

