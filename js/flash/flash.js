// using-functions

flashPreventDefault();

flashBackToTop();

flashFontSizeChanger();

flashModalContainer();

flashDropdown();

flashForm();

flashClicker();

flashCustomSelect();

flashToggler();

flashList();

flashChat();

flashGrowingDropdown();

flashChangeContainers();

// the-end-of-using-functions



// functions



// flash-clicker

function flashClicker() {

	// elements-and-values
	const buttons = document.querySelectorAll('.fl-clicker');

	// avoiding-errors
	if(buttons[0] == undefined) return;

	// functions
	function clickBtn() {

		const target = this.getAttribute('click-target');
		document.querySelector(''+target+'').click();

	}
	
	// adding-functions
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', clickBtn);
	}
}

// the-end-of-flash-clicker



// flash-form

flashForm();

function flashForm() {

	const forms = document.querySelectorAll('.fl-form');

	for (let i = 0; i < forms.length; i++) { 

		flashFormCheck(forms[i]);
		flashFormGallery(forms[i]);
		flashFormImage(forms[i]);
		flashFormTogglePassword(forms[i]);
		flashFormIcon(forms[i]);

	}

}

// flash-form-icon
function flashFormIcon(form) {
	const icons = form.querySelectorAll('.fl-form-icon');
	function focusIn() { this.closest('.fl-form-container').querySelector('.fl-form-input').focus(); }
	for (let i = 0; i < icons.length; i++) { icons[i].addEventListener('click', focusIn); }
}

// flash-form-check
function flashFormCheck(form) {

	const fields = form.querySelectorAll('.fl-form-required');
	const limitedFields = form.querySelectorAll('.fl-form-limit');
	const fileFields = form.querySelectorAll('.fl-form-required-file');
	const len = fields.length;
	const submit = form.querySelector('.fl-form-submit');
	const email = form.querySelector('.fl-form-email');
	const emailMes = form.querySelector('.fl-form-email-message');
	const messages = form.querySelectorAll('.fl-form-error-message');
	var isValid = false;

	if (!fields[0]) return;

	// functions
	// -requirement-
	function checkOnFocusOut() {
		const message = this.closest('.fl-form-container').querySelector('.fl-form-required-message');
		this.value == "" ? requiredMessage(this, message) : removeRequiredMessage(this, message); 
		validation() ? disableSubmit() : enableSubmit();
		this.addEventListener('keyup', check);
		this.removeEventListener('focusout', checkOnFocusOut);
	}

	function check() {
		const message = this.closest('.fl-form-container').querySelector('.fl-form-required-message');
		this.value == "" ? requiredMessage(this, message) : removeRequiredMessage(this, message); 
		validation() ? disableSubmit() : enableSubmit();
	}


	function checkFile() {
		alert("Hi");
		const message = this.closest('.fl-form-container').querySelector('.fl-form-required-message');
		this.files.length < 1 ? requiredMessage(this, message) : removeRequiredMessage(this, message); 
		validation() ? disableSubmit() : enableSubmit();
	}

	const requiredMessage = (input, message) => {
		input.classList.add('fl-form-required-error'); 
		if (message) message.classList.add('fl-show');
	}

	const removeRequiredMessage = (input, message) => {
		input.classList.remove('fl-form-required-error'); 
		if (message) message.classList.remove('fl-show');
	}

	// -character-limit-
	function checkLimitOnFocusOut() {

		const message = this.closest('.fl-form-container').querySelector('.fl-form-limit-message');
		const min = this.getAttribute('fl-form-min');
		const max = this.getAttribute('fl-form-max');
		const len = this.value.trim().length;
		len > 0 & len < min || len > max ? 
		limitMessage(this, message) : removeLimitMessage(this, message); 
		validation() ? disableSubmit() : enableSubmit();
		this.addEventListener('keyup', checkLimit);
		this.removeEventListener('focusout', checkLimitOnFocusOut);
	}

	function checkLimit() {

		const message = this.closest('.fl-form-container').querySelector('.fl-form-limit-message');
		const min = this.getAttribute('fl-form-min');
		const max = this.getAttribute('fl-form-max');
		const len = this.value.trim().length;
		len > 0 & len < min || len > max ? 
		limitMessage(this, message) : removeLimitMessage(this, message); 
		validation() ? disableSubmit() : enableSubmit();

	}

	const limitMessage = (input, message) => {
		input.classList.add('fl-form-limit-error'); 
		if (message) message.classList.add('fl-show');
	}

	const removeLimitMessage = (input, message) => {
		input.classList.remove('fl-form-limit-error'); 
		if (message) message.classList.remove('fl-show');
	}

	// -submit-
	const enableSubmit = () => submit.removeAttribute('disabled');

	const disableSubmit = () => submit.setAttribute('disabled', '');

	const toggleSubmit = () => isValid ? enableSubmit() : disableSubmit();

	const validation = () => {

		var countErrors = 0;

		for (let i = 0; i < fields.length; i++) { 
			if (fields[i].className.includes('error')) countErrors++;	
		}

		countErrors === 0 ? isValid = false : isValid = true;
		return isValid;

	}

	// -email-
	function emailOnFocusOut() {
		!flashIsEmail(this.value) & this.value != "" ? emailMessage() : removeEmailMessage(); 
		validation() ? disableSubmit() : enableSubmit();
		email.addEventListener('keyup', emailValidation);
		email.removeEventListener('focusout', emailOnFocusOut);
	} 

	function emailValidation() {
		!flashIsEmail(this.value) & this.value != "" ? emailMessage() : removeEmailMessage(); 
		validation() ? disableSubmit() : enableSubmit();
	} 

	const emailMessage = () => {
		email.classList.add('fl-form-email-error'); 
		if (emailMes) emailMes.classList.add('fl-show');
	}

	const removeEmailMessage = () => {
		email.classList.remove('fl-form-email-error'); 
		if (emailMes) emailMes.classList.remove('fl-show');
	}

	// -others-
	const checkAll = (e) => {

		for (let i = 0; i < len; i++) {

			if (fields[i].value == "") { 
				e.preventDefault();
				let mes = fields[i].closest('.fl-form-container').querySelector('.fl-form-required-message');
				requiredMessage(fields[i], mes); 
				disableSubmit();
			}
				
		}

		for (let i = 0; i < fileFields.length; i++) {

			if (fileFields[i].files.length < 1) { 
				e.preventDefault();
				let mes = fileFields[i].closest('.fl-form-container').querySelector('.fl-form-required-message');
				requiredMessage(fileFields[i], mes); 
				disableSubmit();
			}
				
		}

		startChecking();

	}

	const startChecking = () => {

		for (let i = 0; i < len; i++) { fields[i].addEventListener('keyup', check); }

		for (let i = 0; i < limitedFields.length; i++) { 
			limitedFields[i].addEventListener('keyup', checkLimit);  
		}		

		if (email) email.addEventListener('keyup', emailValidation);

	}

	const resetAll = () => {

		if (email) { 
			email.classList.remove('fl-form-required-error');
			email.classList.remove('fl-form-email-error');
		}

		for (let i = 0; i < messages.length; i++) { messages[i].classList.remove('fl-show'); }

		for (let i = 0; i < len; i++) { fields[i].classList.remove('fl-form-required-error');}

		for (let i = 0; i < limitedFields.length; i++) { 
			limitedFields[i].classList.remove('fl-form-limit-error');
		}

		enableSubmit();
		addEvents();

	}

	const addEvents = () => {

		for (let i = 0; i < len; i++) { 
			fields[i].addEventListener('focusout', checkOnFocusOut); 
		}

		for (let i = 0; i < limitedFields.length; i++) { 
			limitedFields[i].addEventListener('focusout', checkLimitOnFocusOut); 
		}

		for (let i = 0; i < fileFields.length; i++) { 
			fileFields[i].addEventListener('change', checkFile); 
		}

		if (email) email.addEventListener('focusout', emailOnFocusOut);

	}

	// adding-functions
	addEvents();	

	form.addEventListener('submit', checkAll);
	form.addEventListener('reset', resetAll);

}
	
// flash-form-form-image
function flashFormImage(form) {
	
		// get-elements-and-values
		const input = form.querySelector('.fl-form-img-input');
		const img = form.querySelector('.fl-form-img');

		if(!input || !img) return;

		const defaultSrc = img.src;

		// functions
		const change = () => img.src = URL.createObjectURL(event.target.files[0]);
		const reset = () => img.src = defaultSrc;

		// adding-functions
		input.addEventListener('change', change);
		form.addEventListener('reset', reset);	

}

// flash-form-toggle-password
function flashFormTogglePassword(form) {

	const inputs = form.querySelectorAll('.fl-form-password-input');
	const icons = form.querySelectorAll('.fl-form-password-icon');

	if (!inputs[0] || !icons[0]) return;

	function toggle() {

		const i = this.getAttribute('data-index');
		const type = inputs[i].getAttribute('type') === 'password' ? 'text' : 'password';
		inputs[i].setAttribute('type', type);
		inputs[i].focus();
		this.classList.toggle('fa-eye-slash');

	}

	for (let i = 0; i < inputs.length; i++) {
		icons[i].addEventListener('click', toggle);
		icons[i].setAttribute('data-index', i);
	}
	

}

// flash-form-gallery
function flashFormGallery(form) {
	
		// get-elements-and-values
		const input = form.querySelector('.fl-form-gallery-input');
		const galleryContainerExists = form.querySelector('.fl-form-gallery');
		var gallery;

		if(!input) return;

		if (galleryContainerExists) gallery = galleryContainerExists;
		else gallery = flashCreateElement("DIV","", {
				class: "fl-form-gallery",
			}, input.parentElement, "last-child");


		// functions
		const create = () => {

			reset();

			for (var i = 0, containers = []; i < event.target.files.length; i++) {

				containers[i] = flashCreateElement("DIV","", {
					class: "fl-form-gallery-img-container fl-form-img-animation",
				}, gallery, "last-child");

				flashCreateElement("IMG","", {
					class: "fl-form-gallery-img",
					src: ""+URL.createObjectURL(event.target.files[i])+""
				}, containers[i], "last-child");
				
			}

		}

		const reset = () => {

			var images = gallery.querySelectorAll('.fl-form-gallery-img-container');
			if (!images[0]) return;
			for (let i = 0; i < images.length; i++) { images[i].remove(); }

		}

		// adding-functions
		input.addEventListener('change', create);
		form.addEventListener('reset', reset);	

}

// the-end-of-flash-form



// flash-modal-container

function flashModalContainer() {

	// elements-and-values
	const modals = document.querySelectorAll('.fl-modal-con');

	// avoiding-errors
	if (modals[0] == undefined) return;

	const showers = document.querySelectorAll('.fl-modal-con-shower');
	const closers = document.querySelectorAll('.fl-modal-con-closer');
	var mouseIsOver = false;

	// functions
	function show() { 

		const target = this.getAttribute('target');
		const el = document.querySelector(''+target+'');
		el.classList.add('fl-show');

	}

	function close() { if (!mouseIsOver) this.classList.remove('fl-show'); }

	function closeWithBtn() { this.parentElement.classList.remove('fl-show'); }

	function isHovered() { mouseIsOver = true; }

	function isNotHovered() { mouseIsOver = false; }

	// adding-functions
	for (var i = 0, children = []; i < showers.length; i++) { 

		showers[i].addEventListener('click', show);

		if (modals[i]) closers[i].addEventListener('click', closeWithBtn);

		if (modals[i] == undefined || modals[i].getAttribute('bg-click') != "true") 
			continue;
		
		modals[i].addEventListener('click', close);
		
		children[i] = modals[i].querySelectorAll('.fl-modal-child');

		for (var x = 0; x < children[i].length; x++) {
			
				children[i][x].addEventListener('mouseover', isHovered);
				children[i][x].addEventListener('mouseout', isNotHovered);

		}

	}

}

// the-end-of-flash-modal-container



// flash-dropdown

function flashDropdown() {

	// elements-and-values
	const dropdowns = document.querySelectorAll('.fl-dropdown-el');

	// avoiding-errors
	if (dropdowns[0] == undefined) return;

	const togglers = document.querySelectorAll('.fl-dropdown-toggler');
	const events = [];

	// functions
	function toggle() {

		const target = this.getAttribute('target');
		const el = document.querySelector(''+target+'');
		this.classList.toggle('fl-active');
		el.classList.toggle('fl-show');

	}

	function show() {

		const target = this.getAttribute('target');
		const el = document.querySelector(''+target+'');
		this.classList.add('fl-active');
		el.classList.add('fl-show');

	}

	function hide() {

		const target = this.getAttribute('target');
		const el = document.querySelector(''+target+'');
		this.classList.remove('fl-active');
		el.classList.remove('fl-show');

	}

	// adding-functions
	for (var i = 0; i < dropdowns.length; i++) {
		
		events[i] = togglers[i].getAttribute('event');

		if (events[i] == "click") togglers[i].addEventListener('click', toggle);

		else if (events[i] == "hover") { 
			togglers[i].addEventListener('mouseover', show);
			togglers[i].addEventListener('mouseout', hide);
		}

	}

}

// the-end-of-flash-dropdown



// flash-prevent-default

// !!! - to do that give links this class - .fl-link-disabled

function flashPreventDefault() {

	// elements-and-values
	var links = document.querySelectorAll('.fl-link-disabled');

	// avoiding-errors
	if(links[0] == undefined) return;

	// loop	
	for (var i = 0; i < links.length; i++) {

		links[i].onclick = function(event) { event.preventDefault(); }

	}	

}

// the-end-of-flash-prevent-default


// flash-is-scrolled

// !!! - Wenn element is scrolled, it gives to element class '.fl-is-scrolled'
// !!! - It works one time

function flashIsScrolled(el) {

	function addClass() {

		if (isInView(el)) {

			el.classList.add('fl-is-scrolled');
			window.removeEventListener('scroll', addClass);

		}	

	}	
	
	function isInView(el, percentageScroll = 100) {

	  const elementTop = el.getBoundingClientRect().top;

	  return (
	    elementTop <= 
	    ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
	  );

	}

	window.addEventListener('load', addClass);
	window.addEventListener('scroll', addClass);

}	

// the-end-of-flash-is-scrolled



// flash-back-to-top-button

function flashBackToTop() {

	// elements-and-values
	const btn = document.querySelector('.fl-back-to-top-btn');

	// avodiding-errors
	if (btn == undefined) return;

	// functions
	function show() { 

		if (document.documentElement.scrollTop > 700) btn.classList.add('fl-show');

		else hide();

	}

	function hide() { btn.classList.remove('fl-show'); }

	function toTop() { document.documentElement.scrollTop = 0; }

	// adding-functions
	btn.addEventListener('click', hide);
	btn.addEventListener('click', toTop);
	window.addEventListener('scroll', show);

}

// the-end-of-flash-back-to-top-button



// flash-font-size-changer

function flashFontSizeChanger() {

	// elements-and-values
	var containers = document.querySelectorAll('.fl-font-size-changer-con');

	// avoiding-errors
	if (containers[0] == undefined) return;

	var length = containers.length;
	var targets = [];
	var elements = [];
	var minusButtons = [];
	var plusButtons = [];
	var steps = 5;
	var nextIndexes = [];
	var prevIndexes = [];

	// for-loop
	for (var i = 0; i < length; i++) {

		minusButtons[i] = containers[i].querySelector('.fl-font-size-changer-minus');
		plusButtons[i] = containers[i].querySelector('.fl-font-size-changer-plus');

		minusButtons[i].setAttribute('index',''+i+'');
		plusButtons[i].setAttribute('index',''+i+'');

		targets[i] = containers[i].getAttribute('target');
		elements[i] = document.querySelector(''+targets[i]+'');

		minusButtons[i].addEventListener('click', minus);
		plusButtons[i].addEventListener('click', plus);
		elements[i].classList.add('ffsc-font-size-1');

		nextIndexes[i] = 1;

	}

	// functions

	function minus() {

		var y = this.getAttribute('index');

		changeClasses(y, prevIndexes[y]); 

	
		if (prevIndexes[y] == 0)  { 

			disableMinus(this); 
			nextIndexes[y] = 1; }

		else { 

			nextIndexes[y] = prevIndexes[y] + 1;
			prevIndexes[y] -= 1;

		}	

		enablePlus(plusButtons[y]);

	}

	function plus() {

		var y = this.getAttribute('index');

	    changeClasses(y, nextIndexes[y]);

		if (nextIndexes[y] == steps - 1) { 

			disablePlus(this); 
			prevIndexes[y] = steps - 2; 

		}

		else { 

			prevIndexes[y] = nextIndexes[y] - 1;
			nextIndexes[y] += 1;

		}	

		enableMinus(minusButtons[y]);

	}

	function disableMinus(btn) { btn.setAttribute('disabled', ''); }

	function enableMinus(btn) { btn.removeAttribute('disabled'); }

	function disablePlus(btn) { btn.setAttribute('disabled', ''); }

	function enablePlus(btn) { btn.removeAttribute('disabled'); }

	function changeClasses(x, loop) {

		switch (loop) {
		  case 0:
		    flashAddClassRemovingOthers(elements[x], "ffsc-font-size-1", 
		    	["ffsc-font-size-2", "ffsc-font-size-3", "ffsc-font-size-4", "ffsc-font-size-5"]);
		    break;
		  case 1:
		    flashAddClassRemovingOthers(elements[x], "ffsc-font-size-2", 
		    	["ffsc-font-size-1", "ffsc-font-size-3", "ffsc-font-size-4", "ffsc-font-size-5"]);
		    break;
		  case 2:
		    flashAddClassRemovingOthers(elements[x], "ffsc-font-size-3", 
		    	["ffsc-font-size-1", "ffsc-font-size-2", "ffsc-font-size-4", "ffsc-font-size-5"]);
		    break;
		  case 3:
		    flashAddClassRemovingOthers(elements[x], "ffsc-font-size-4", 
		    	["ffsc-font-size-1", "ffsc-font-size-2", "ffsc-font-size-3", "ffsc-font-size-5"]);
		    break;
		  case 4:
		    flashAddClassRemovingOthers(elements[x], "ffsc-font-size-5", 
		    	["ffsc-font-size-1", "ffsc-font-size-2", "ffsc-font-size-3", "ffsc-font-size-4"]);
		    break;
		}

	}

}

// the-end-of-flash-font-size-changer



// class-functions

function flashAddClassRemovingOthers(el, className, classes = []) {

	el.classList.add(''+className+'');

	for (var i = 0; i < classes.length; i++) {
	
			el.classList.remove(''+classes[i]+'');

	}

}

// the-end-of-class-functions



// characters

function flashGetCharactersLength(el, is_value, trim = false) {

	if (is_value) el = el.value;
	if (trim == true) el = el.trim();
	return el.length;

}

// the-end-of-characters



// flash-selector

function flashSelector(query, selectAll = false) {

	var el;

	if (typeof query == "string") {

		if (!selectAll) return el = document.querySelector(''+query+'');
		else return el = document.querySelectorAll(''+query+'');

	}
	
	return query;

}

// the-end-of-flash-selector



// flash-prevent-default

function flashPreventDefaultLinks(elements) {

	if (elements[0] == undefined) 
		element.addEventListener("click", function(event){
	  		event.preventDefault();
		});
	else {

		for (var i = 0; i < elements.length; i++) {

			elements[i].addEventListener("click", function(event){
	  			event.preventDefault();
			});

		}	

	}	

}

// the-end-of-flash-prevent-default



// flash-set-index

function flashSetIndexAsAttribute(elements) {

	for (var i = 0; i < elements.length; i++) {

		elements[i].setAttribute('index', ''+i+'');
	}

}

// the-end-of-flash-set-index



// flash-create-element

	function flashCreateElement(tagName, html = "", attributes = {}, parent = false, childIndex = "last-child") {

		var el = document.createElement(''+tagName+'');
		el.innerHTML = html;

		for (x in attributes) {	el.setAttribute(''+x+'',''+attributes[x]+''); }

	  	if (parent) {

	  		if (childIndex == "last-child") parent.appendChild(el);
	  		else if (childIndex == "first-child") parent.insertBefore(el, parent.childNodes[0]);
	 		else parent.insertBefore(el, parent.children[childIndex]);
	  	}

	  	return el;

	}

// the-end-of-flash-create-element



// flash-remove-class

function flashRemoveClass(element, className, exceptionalElement) {

	// using_functions
	if (element[0] == undefined) removeClassOfElement();
	else removeClassOfElements();

	// functions
	function removeClassOfElement() { element.classList.remove(''+className+''); }

	function removeClassOfElements() {

		for (var i = 0; i < element.length; i++) {

			element[i].classList.remove(''+className+'');

		}

		if (exceptionalElement != undefined) exceptionalElement.classList.add(''+className+'');
		
	}

}

function flashAddClassAndRemoveOthers(el, className, otherClassNames = []) {

	el = flashSelector(el);

	for (var i = 0; i < otherClassNames.length; i++) {
		
		if (otherClassNames[i] == className) continue;
		el.classList.remove(''+otherClassNames[i]+'');
	}

	el.classList.add(''+className+'');

}

function flashRemoveClasses(el, classNames = []) {

	el = flashSelector(el);

	for (var i = 0; i < classNames.length; i++) {
		
		el.classList.remove(''+classNames[i]+'');
	}

}

// the-end-of-flash-remove-class



// flash-full-screen-background-images

function flashFullScreenBackgroundImages(time = "slow") {

	// elements-and-values
	const images = document.querySelectorAll('.fl-full-screen-bg-img');
	const text = document.querySelector('.fl-full-screen-bg-text span');
	const length = images.length - 1;
	var index = 1;
	var lastIndex = 0;

	// determining-the-time
	switch (time) {
	  case "very-fast":
	    time = 1000;
	    break;
	  case "fast":
	    time = 2000;
	    break;
	  case "normal":
	    time = 3000;
	    break;
	  case "slow":
	    time = 5000;
	    break;
	  case "very-slow":
	    time = 6000;
	    break;
	}

	// adding-classes
	images[0].classList.add('fl-show');
	
	// functions
	function start() {

		setInterval(function() {

			images[index].classList.add('fl-show');
			images[lastIndex].classList.remove('fl-show');
			if (text) text.innerHTML = images[index].getAttribute('data-text');

			if (index == length) {
				index = 0;
				lastIndex = length;
			}	
			else {
				lastIndex = index;
				index += 1;

			}	



		}, time)

	}

	// using-functions
	start();

}

// the-end-of-flash-full-screen-background-images



// flash-scroll-indicator

function flashScrollIndicator() {

	const indicator = document.querySelector('.fl-scroll-indicator');
	
	function indicate() {

		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrolled = (winScroll / height) * 100;
		indicator.style.height = scrolled + "%";

	}	

	window.addEventListener('load', indicate);
	window.addEventListener('scroll', indicate);

}

// the-end-of-flash-scroll-indicator



// flash-live-chat

function flashLiveChat() {

	// getting-elements-and-values
	const openBtn = document.querySelector('.fl-live-chat-open-btn');
	const con = document.querySelector('.fl-live-chat-con');
	const closeBtn = document.querySelector('.fl-live-chat-close-btn');
	const form = document.querySelector('.fl-live-chat-form');
	const formToggler = document.querySelector('.fl-chat-form-toggler');
	const formTogglerIcon = formToggler.querySelector('i');
	const input = document.querySelector('.fl-live-chat-form-input');
	const submit = document.querySelector('.fl-live-chat-form-submit');
	const reset = document.querySelector('.fl-live-chat-form-reset');


	// avodiding-errors
	if(openBtn == undefined || con == undefined) return;

	// adding-functions
	openBtn.addEventListener('click', hideOpenBtn);
	openBtn.addEventListener('click', showChat);
	closeBtn.addEventListener('click', hideChat);
	closeBtn.addEventListener('click', showOpenBtn);
	input.addEventListener('keyup', enableAndDisableSubmit);
	reset.addEventListener('click', disableSubmit);
	if (formToggler != undefined) formToggler.addEventListener('click', toggleForm);

	// functions
	function showOpenBtn() { openBtn.classList.remove('fl-hide'); }

	function hideOpenBtn() { openBtn.classList.add('fl-hide'); }

	function showChat() { con.classList.add('fl-show'); }

	function hideChat() { con.classList.remove('fl-show'); }

	function toggleForm() { 

		if (formTogglerIcon != undefined) formTogglerIcon.classList.toggle('fa-envelope');
		form.classList.toggle('fl-show'); 

	}

	function enableAndDisableSubmit() {

		if (this.value == "") submit.setAttribute('disabled','');
		else submit.removeAttribute('disabled');

	}

	function disableSubmit() { submit.setAttribute('disabled',''); }

	// calling-functions
	flashDragElement(con);

}

// the-end-of-flash-live-chat



// flash-drag-element

// !!!the element must be absolute or fixed positioned
// !!!class for header .fl-drag-element-header

function flashDragElement(elmnt) {

	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, newPos1 = 0, newPos2 = 0;

	const header = elmnt.querySelector('.fl-drag-element-header');

	if (header) {

		header.onmousedown = dragMouseDown;
		header.ontouchstart = dragMouseDown;

	} else {

		elmnt.onmousedown = dragMouseDown;
		elmnt.ontouchstart = dragMouseDown;

	}	
	

	function dragMouseDown(e) {

		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX || e.touches[0].clientX;
		pos4 = e.clientY || e.touches[0].clientY;
		document.onmouseup = closeDragElement;
		document.ontouchend = closeDragElement;
		document.onmousemove = elementDrag;
		document.ontouchmove = elementDrag;

	}

	function elementDrag(e) {

		e = e || window.event;
		newPos1 = e.clientX || e.touches[0].clientX;
		newPos2 = e.clientY || e.touches[0].clientY;
		pos1 = pos3 - newPos1;
		pos2 = pos4 - newPos2;
		pos3 = e.clientX || e.touches[0].clientX;
		pos4 = e.clientY || e.touches[0].clientY;
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		elmnt.style.bottom = "initial";

	}

	function closeDragElement() {

		document.onmouseup = null;
		document.ontouchend = null;
		document.onmousemove = null;
		document.ontouchmove = null;

	}

}

// the-end-of-flash-drag-element	



// flash-add-event

function flashAddEventListenerToAllElements(elements, event = "click", functionName) {

	for (var i = 0; i < elements.length; i++) {
		
		elements[i].addEventListener(''+event+'', functionName);
	}

}

// the-end-of-flash-add-event


// flash-custom-select

function flashCustomSelect() {

    var x, i, j, l, ll, selElmnt, a, b, c;
    
    x = document.getElementsByClassName("fl-custom-select");
    l = x.length;

    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
              }
            }
            h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function(e) {
        
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }

    function closeAllSelect(elmnt) {
      
      var x, y, i, xl, yl, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }

    document.addEventListener("click", closeAllSelect);

}

// the-end-of-flash-custom-select



// flash-input-character-limit 

function flashInputCharacterLimit(el, limit) {

  limit -= 1;

  function check(e) {

    if(el.value.length > limit)
      if ( !(e.which == '46' || e.which == '8' || e.which == '13') ) // backspace/enter/del
          e.preventDefault();

  }

  el.addEventListener('keydown', check);
     
}

// the-end-of-flash-input-character-limit 



// flash-toggler

function flashToggler() {

	// elements-and-values
	const togglers = document.querySelectorAll('.fl-toggler');

	if (togglers[0] == undefined) return;

	// functions
	function toggle() {

		const elToShow = document.querySelector(''+this.getAttribute('show-target')+'');
		const elToHide = document.querySelector(''+this.getAttribute('hide-target')+'');

		elToShow.classList.add('fl-show');
		elToHide.classList.remove('fl-show');

	}

	// adding-functions
	for (var i = 0; i < togglers.length; i++) { togglers[i].addEventListener('click', toggle); }

}

// the-end-of-flash-toggler



// flash-play-images

function flashPlayImages(el, speed = "normal") {

	// elements-and-values
	el = flashSelector(el);
	const images = el.querySelectorAll('.fl-play-img');
	const length = images.length;
	const lastIndex = length - 1;

	// setting-data-index
	for (let i = 0, x = 1; i < length; i++, x++) {
		
		if (i == lastIndex) images[i].setAttribute('data-index','0');
		else images[i].setAttribute('data-index',''+x+'');

	}

	// determining-the-time
	switch (speed) {
	  case "very-fast":
	    speed = 1000;
	    break;
	  case "fast":
	    speed = 2000;
	    break;
	  case "normal":
	    speed = 3000;
	    break;
	  case "slow":
	    speed = 5000;
	    break;
	  case "very-slow":
	    speed = 6000;
	    break;
	}

	// functions

	function play() {

		setInterval(function() {

			for (let i = 0; i < length; i++) {

				if (images[i].classList.contains('fl-show')) {

					images[i].classList.remove('fl-show');
					const index = images[i].getAttribute('data-index');
					images[index].classList.add('fl-show');
					break;

				} 
			
			}

		}, speed);	
			
	}

	images[0].classList.add('fl-show');

	// calling-functions
	play();

}


// the-end-of-flash-play-images



// flash-get-child-element-nodes

flashGetChildElementNodes = (par) => {

	var children = [];
	let x = 0;

	for (let i = 0; i < par.childNodes.length; i++) {
		
		if (par.childNodes[i].nodeType == 1) { children[x] = par.childNodes[i]; x++; }

	}

	return children;
	
}

// the-end-of-flash-get-child-element-nodes



// flash-list

// attributes:

// hide-other-dropdowns="true" - if you will to close other dropdowns, add this attribute to element
// that has class "fl-list"

// event="hover" - If you will show dropdowns when link is hovered, add this attribute to element
// that has class "fl-list"

function flashList() {

	const list = (el) => {

		// elements-and-values

		const buttons = el.querySelectorAll('.fl-list-dropdown-toggler');
		const dropdowns = el.querySelectorAll('.fl-list-dropdown');
		if (!buttons[0] || !dropdowns[0]) return;
		const hideOtherDropdowns = el.getAttribute('hide-other-dropdowns');
		const event = el.getAttribute('event');
		const length = buttons.length;


		// functions

		function toggle(e) {

			e.preventDefault();
			const i = this.getAttribute('data-index');
			this.classList.toggle('fl-active');
			dropdowns[i].classList.toggle('fl-show');

			if (hideOtherDropdowns == "true") hideRest(i);

		}

		function show(e) {

			e.preventDefault();
			const i = this.getAttribute('data-index');
			this.classList.add('fl-active');
			dropdowns[i].classList.add('fl-show');

		}

		function hide(e) {

			e.preventDefault();
			const i = this.getAttribute('data-index');
			this.classList.remove('fl-active');
			dropdowns[i].classList.remove('fl-show');

		}

		const hideRest = (x) => { 

			for (let i = 0; i < length; i++) {

				if (i == x) continue;
				buttons[i].classList.remove('fl-active');
				dropdowns[i].classList.remove('fl-show');

			}

		}

		const addFunctions = () => {

			for (let i = 0; i < length; i++) { 

				buttons[i].setAttribute('data-index',''+i+''); 

				if (event == "hover") { 
					buttons[i].addEventListener('mouseover', show);
					buttons[i].addEventListener('mouseout', hide);
				}	
				else buttons[i].addEventListener('click', toggle);

			} 

		}


		// calling-functions

		addFunctions();

	}

	const lists = document.querySelectorAll('.fl-list');

	for (let i = 0; i < lists.length; i++) { list(lists[i]); }

}

// the-end-of-flash-list



// flash-counter

const flashCounter = (el, to, from = 0, add = 1, speed = 1) => {

	var myFunction;
	var num = from;
	el.innerHTML = from;

	if (to == "get-from-target") to = el.getAttribute('to');

	myFunction = setInterval(function() {

		num += add;
		el.innerHTML = num;

		if (num + add >= to) { clearInterval(myFunction); el.innerHTML = to; }	

	}, speed);

}

// the-end-of-flash-counter



// flash-is-in-view

const flashIsInView = (el, percentageScroll = 100) => {

  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= 
    ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
  );

};

// the-end-of-flash-is-in-view



// flash-get-page-full-height

function flashGetPageFullHeight() {

	const body = document.body, html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight) + "px";

}

// the-end-of-flash-get-page-full-height



// flash-alert-box

function flashAlertSuccess() { document.querySelector('.fl-alert-box-success').focus(); }

function flashAlertWarning() { document.querySelector('.fl-alert-box-warning').focus(); }

// the-end-of-flash-alert-box


// fl-chat

function flashChat() {

	// elements-and-values
	const chat = document.querySelector('.fl-chat');
	const toggler = document.querySelector('.fl-chat-toggler');
	if(!chat || !toggler) return;

	const inputs = document.querySelectorAll('.fl-chat-input');
	const submit = document.querySelector('.fl-chat-submit'); 
	var formHasAError = false;


	// functions
	const toggle = () => { chat.classList.toggle('fl-show'); toggler.classList.toggle('fl-active'); }

	function labelOnTop() { this.previousElementSibling.classList.add('fl-on-top'); }

	function labelToCenter() { if (this.value == "") this.previousElementSibling.classList.remove('fl-on-top'); }

	function isRequired() { 
		const con = this.closest('.fl-chat-input-con');
		this.value == "" ? error(con) : notError(con);
		formHasError() ? disableSubmit() : enableSubmit();
	}

	function startChecking() { 
		this.addEventListener('keyup', isRequired); inputs[1].addEventListener('keyup', emailValidation); 
	}

	const enableSubmit = () => submit.removeAttribute('disabled');

	const disableSubmit = () => submit.setAttribute('disabled', '');

	const error = (el) => el.classList.add('fl-error');

	const notError = (el) => el.classList.remove('fl-error');

	const formHasError = () => {

		var countErrors = 0;

		for (let i = 0, containers = []; i < inputs.length; i++) { 

			containers[i] = inputs[i].closest('.fl-chat-input-con');
			if (containers[i].classList.contains('fl-error') || containers[i].classList.contains('fl-invalid-email-address')) countErrors++;	

		}

		countErrors === 0 ? formHasAError = false : formHasAError = true;

		return formHasAError;

	}

	function emailValidation() {

		const con = this.closest('.fl-chat-input-con');

		if (flashIsEmail(this.value) || this.value == "") con.classList.remove('fl-invalid-email-address');
		else if (this.value != "") con.classList.add('fl-invalid-email-address'); 

		formHasError() ? disableSubmit() : enableSubmit();

	} 

	const checkAll = () => {

		var countErrors = 0;

		for (let i = 0; i < inputs.length; i++) {
			
			const con = inputs[i].closest('.fl-chat-input-con');
			if (inputs[i].value == "") { error(con); countErrors++; }
			inputs[i].addEventListener('keyup', isRequired); 

		}

		if (countErrors > 0) disableSubmit();

		startChecking();
		inputs[1].addEventListener('keyup', emailValidation);

	}

	// adding-functions
	for (let i = 0; i < inputs.length; i++) {

		inputs[i].addEventListener('focusin', labelOnTop);
		inputs[i].addEventListener('focusout', labelToCenter);
		inputs[i].addEventListener('focusout', isRequired);
		inputs[i].addEventListener('focusout', startChecking);

	}

	inputs[1].addEventListener('focusout', emailValidation);

	toggler.addEventListener('click', toggle);
	submit.addEventListener('click', checkAll);
	
}

// the-end-of-fl-chat



// flash-is-email

function flashIsEmail(val) {

	const reg = new RegExp('^([a-zA-Z0-9-._]+)'+
		               '(@)([a-zA-Z0-9-.]+)'+
		               '(.)([a-zA-Z]{2,4})$');
	
	return reg.test(val);

}

// the-end-of-flash-is-email



// flash-blinking-circles

var blinkingCirlces;

function flashBlinkingCircles() {

	const par = document.querySelector('.fl-loading-ani-blinking-circles');
	const order = par.getAttribute('order');
	const elements = par.querySelectorAll('.fl-loading-ani-blinking-circle');
	var x = 0;
	if (order != "true") return;

	// functions
	const show = (el) => el.classList.add('fl-show');

	const hide = (el) => { 

		for (let i = 0; i < elements.length; i++) {	
			if (elements[i] === el) continue; 
			elements[i].classList.remove('fl-show');
		}

	}

	// calling-functions
	blinkingCirlces = setInterval( 
		function() { show(elements[x]); hide(elements[x]); x == 2 ? x = 0 : x++; },
	1000);

}

function flashStopBlinkingCircles() { clearInterval(blinkingCirlces); }

// the-end-of-flash-blinking-circles



// flash-growing-dropdown

function flashGrowingDropdown() {

	const growingDropdown = (el) => {

		const toggler = el.querySelector('.fl-growing-dropdown-toggler');
		const toggle = () =>  el.classList.toggle('fl-show');
		toggler.addEventListener('click', toggle);

	}

	const elements = document.querySelectorAll('.fl-growing-dropdown');

	for (let i = 0; i < elements.length; i++) { growingDropdown(elements[i]); }

}

// the-end-of-flash-growing-dropdown



// flash-change-containers

function flashChangeContainers() {

	const changeContainers = (el) => {

		const buttons = el.querySelectorAll('.fl-change-containers-btn');
		const items = el.querySelectorAll('.fl-change-containers-item');

		// functions
		function show() {
			const index = this.getAttribute('data-index');
			for (let i = 0; i < items.length; i++) { i == index ? active(i) : deactive(i); }
		}

		const active = (i) => { items[i].classList.add('fl-show'); buttons[i].classList.add('fl-active'); }

		const deactive = (i) => { items[i].classList.remove('fl-show'); buttons[i].classList.remove('fl-active'); }

		// adding-functions
		for (let i = 0; i < buttons.length; i++) { 
			buttons[i].addEventListener('click', show);
			buttons[i].setAttribute('data-index', i); 
		}

	}

	// adding-function
	const elements = document.querySelectorAll('.fl-change-containers');
	for (let i = 0; i < elements.length; i++) { changeContainers(elements[i]); }

}

// the-end-of-flash-change-containers



// flash-active-nav-links

function flashActiveNavLinks() {

	const navbarNav = document.querySelector('.fl-navbar-nav');
	const mdNavbarNav = document.querySelector('.fl-md-menu');
	const links = navbarNav.querySelectorAll('.fl-nav-link');
	const mdLinks = mdNavbarNav.querySelectorAll('.fl-md-menu-link');

	function toggle() {
		const x = this.getAttribute('data-index');
		for (let i = 0; i < links.length; i++) {
			i == x  ? active(links[i], mdLinks[i]) : deactive(links[i], mdLinks[i]);
		}
	}

	const active = (link, mdLink) => { link.classList.add('fl-active'); mdLink.classList.add('fl-active'); }

	const deactive = (link, mdLink) => { link.classList.remove('fl-active'); mdLink.classList.remove('fl-active'); }

	for (let i = 0; i < links.length; i++) {
		links[i].addEventListener('click', toggle);
		links[i].setAttribute('data-index', i);
		mdLinks[i].addEventListener('click', toggle);
		mdLinks[i].setAttribute('data-index', i);
	}

}

// the-end-of-flash-active-nav-links



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


// the-end-of-functions