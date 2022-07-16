
// flash-active-scrolling

function flashActiveScrolling() {

	var buttons = document.querySelectorAll('.fl-wait-to-be-active-link');
	var mdButtons = document.querySelectorAll('.fl-wait-to-be-active-md-link');
	const elements = document.querySelectorAll(".fl-active-scrolling");

	function active() {
		let len = elements.length;
		while (--len && window.scrollY + 250 < elements[len].offsetTop) {}
		buttons.forEach(btn => btn.classList.remove('fl-active'));
		mdButtons.forEach(btn => btn.classList.remove('fl-active'));
		buttons[len].classList.add('fl-active');
		mdButtons[len].classList.add('fl-active');  
	}

	active();

	window.addEventListener('scroll', active);

}	

// the-end-of-flash-active-scrolling
