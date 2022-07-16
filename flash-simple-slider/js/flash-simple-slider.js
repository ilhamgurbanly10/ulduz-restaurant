
function flashSimpleSlider(elements, settings = {}) {

	// default-settings

	const setDefaultSettings = () => {

		const defaultSettings = {
			autoplay: false,
			autoplaySpeed: "normal",
			speed: "fast",
			arrows: true,
			draggable: true,
			indexes: false,
			dots: false,
			buttons: false,
			buttonsHTML: [],
			pauseOnHover: false,
			disableArrows: false,
		}

		for (key in defaultSettings) { if (settings[key] == undefined) settings[key] = defaultSettings[key]; }

	}		

	setDefaultSettings();

	// the-end-of-default-settings


	// slider-function

	const simpleSlider = (el) => {

		// variables
		var list, track, slides = [], slideContainers = [], length, prevArrow, nextArrow, nextIndex = 1, lastIndex, prevIndex, 
		indexes, currentIndex, totalIndexes, dots = [], dotList, dotItems = [], buttons = [], buttonList, 
		buttonItems = [], playFunction;


		// functions

		const createSlide = () => {

			el.classList.add('flash-simple-slider');

			slidesLength = el.childElementCount;
			slides = getChildElementNodes(el);

			list = createElement('div','', { class: "flash-simple-slider-list" }, el);

			track = createElement('div','', { 
				class: "flash-simple-slider-track",
				style: "transform: translate3d(0px, 0px, 0px);" 
			}, list);

			for (let i = 0, divs = []; i < slidesLength; i++) {
				
				slideContainers[i] = createElement('div','', { class: "flash-simple-slider-slide" }, track);

				slideContainers[i].appendChild(slides[i]);

			}

			lastIndex = slidesLength - 1;
			prevIndex = lastIndex;

		}


		// indexes

		const setNextIndex = () => {
			nextIndex == 0 ? prevIndex = lastIndex : prevIndex = nextIndex - 1;
			nextIndex == lastIndex ? nextIndex = 0 : nextIndex += 1;
		}

		const setPrevIndex = () => {
			prevIndex == lastIndex ? nextIndex = 0 : nextIndex = prevIndex + 1; 
			prevIndex == 0 ? prevIndex = lastIndex : prevIndex -= 1;	
		}

		// the-end


		// arrows

		const createArrows = () => {

			nextArrow = createElement('button','<i class="flash-simple-slider-arrow-icon"></i>', { 
				class: "flash-simple-slider-next flash-simple-slider-arrow",
				type: "button" }, 
				el, "first-child");

			prevArrow = createElement('button','<i class="flash-simple-slider-arrow-icon"></i>', { 
				class: "flash-simple-slider-prev flash-simple-slider-arrow",
				type: "button" }, 
				el, "first-child");

			nextArrow.addEventListener('click', next);
			prevArrow.addEventListener('click', prev);
			nextArrow.addEventListener('click', replay);
			prevArrow.addEventListener('click', replay);

			if (settings.disableArrows) disablePrevArrow();

		}

		const enablePrevArrow = () => prevArrow.removeAttribute('disabled'); 

		const disablePrevArrow = () => prevArrow.setAttribute('disabled',''); 

		const enableNextArrow = () =>  nextArrow.removeAttribute('disabled'); 

		const disableNextArrow = () => nextArrow.setAttribute('disabled',''); 

		const disableArrows = (i) => {

			if (!settings.disableArrows) return;
			i == 0 ? disablePrevArrow() : enablePrevArrow();
			i == lastIndex ? disableNextArrow() : enableNextArrow(); 

		}

		// the-end


		// sliding
	
		const prev = () => {

			if (settings.draggable) {
				const size = prevIndex * 100;
				track.style.transform = "translate3d(-"+size+"%, 0px, 0px)";
			} else slideWithoutDragging(prevIndex);	

			disableArrows(prevIndex);

			selectActiveDot(prevIndex);
			selectActiveButton(prevIndex);
			setIndex(prevIndex);

			setPrevIndex();	
			
		}

		const next = () => {

			if (settings.draggable) {
				const size = nextIndex * 100;
				track.style.transform = "translate3d(-"+size+"%, 0px, 0px)";	
			} else slideWithoutDragging(nextIndex);

			disableArrows(nextIndex);

			selectActiveDot(nextIndex);
			selectActiveButton(nextIndex);
			setIndex(nextIndex);

			setNextIndex();
				
		}

		function selectSlide() {

			dataIndex = Number(this.getAttribute('data-index'));

			if (settings.draggable) {
				const size = dataIndex * 100; 
				track.style.transform = "translate3d(-"+size+"%, 0px, 0px)";
			} else slideWithoutDragging(dataIndex);

			disableArrows(dataIndex);

			selectActiveDot(dataIndex);
			selectActiveButton(dataIndex);
			setIndex(dataIndex);

			dataIndex == 0 ? prevIndex = lastIndex : prevIndex = dataIndex - 1;
			dataIndex == lastIndex ? nextIndex = 0 : nextIndex = dataIndex + 1;

		}

		const slideWithoutDragging = (x) => {

			for (var i = 0; i < slidesLength; i++) {	
				if (i == x) slideContainers[i].classList.add('flash-show');
				else slideContainers[i].classList.remove('flash-show');
			}

		}

		// the-end


		function createElement(tagName, html = "", attributes = {}, parent = false, childIndex = "last-child") {

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

		function getChildElementNodes(par) {

			var children = [];
			let x = 0;

			for (let i = 0; i < par.childNodes.length; i++) {
				
				if (par.childNodes[i].nodeType == 1) { children[x] = par.childNodes[i]; x++; }

			}

			return children;

		}


		// speed

		const setSpeed = () => { 

			switch (settings.speed) {
			  case "very-fast":
			    settings.speed = ".3s";
			    break;
			  case "fast":
			    settings.speed = ".5s";
			    break;
			  case "normal":
			    settings.speed = "1s";
			    break;
			  case "slow":
			    settings.speed = "2s";
			    break;
			  case "very-slow":
			    settings.speed = "2.5s";
			    break;
			}

			if (settings.draggable) track.style.transitionDuration = settings.speed;
			else {

				for (let i = 0; i < slidesLength; i++) {
					slideContainers[i].style.transitionDuration = settings.speed; 
				}
			} 

			switch (settings.autoplaySpeed) {
			  case "very-fast":
			    settings.autoplaySpeed = 3000;
			    break;
			  case "fast":
			    settings.autoplaySpeed = 4000;
			    break;
			  case "normal":
			    settings.autoplaySpeed = 8000;
			    break;
			  case "slow":
			    settings.autoplaySpeed = 12000;
			    break;
			  case "very-slow":
			    settings.autoplaySpeed = 13000;
			    break;
			}

		}

		// the-end


		// dragging

		function dragElement(elmnt) {

			const dragMouseDown = (e) => {

				if (settings.autoplay) stop();

				defaultTranslateX = elmnt.style.transform;
				defaultTranslateX = defaultTranslateX.slice(12, defaultTranslateX.length - 11);
				
				e = e || window.event;

				defaultPos = e.clientX || e.touches[0].clientX;
				
				document.addEventListener('mouseup', closeDragElement);
				document.addEventListener('touchend', closeDragElement); 
				document.addEventListener('touchcancel', closeDragElement); 

				document.addEventListener('mousemove', elementDrag);
				document.addEventListener('touchmove', elementDrag);

				elmnt.removeEventListener('mousedown', dragMouseDown);
				elmnt.removeEventListener('touchstart', dragMouseDown);

			}

			var defaultPos = 0, defaultTranslateX, lastClientX;

			elmnt.addEventListener('mousedown', dragMouseDown);
			elmnt.addEventListener('touchstart', dragMouseDown);

			const elementDrag = (e) => {

				e = e || window.event;
				track.classList.add('flash-dragging');
				pos = e.clientX || e.touches[0].clientX;
				pos -= defaultPos;
				elmnt.style.transform = "translate3d(calc("+defaultTranslateX+" + "+pos+"px), 0px , 0px)";
				lastClientX = e.clientX || e.touches[0].clientX;
				 
			}

			const closeDragElement = (e) => {

				e = e || window.event;
				track.classList.remove('flash-dragging');

				if (lastClientX != null) {

					if (lastClientX < defaultPos - 80) 
						nextIndex == 0 ? elmnt.style.transform = "translate3d("+defaultTranslateX+", 0px , 0px)" : next();

					else if (lastClientX > defaultPos + 80)  
						prevIndex == lastIndex ? elmnt.style.transform = "translate3d(0px, 0px , 0px)" : prev();

					else elmnt.style.transform = "translate3d("+defaultTranslateX+", 0px , 0px)";

					if(settings.autoplay) play();

				}	

				document.removeEventListener('mouseup', closeDragElement);
				document.removeEventListener('touchend', closeDragElement);
				document.removeEventListener('touchcancel', closeDragElement);
				document.removeEventListener('mousemove', elementDrag);
				document.removeEventListener('touchmove', elementDrag);
				lastClientX = null;

				const duration = Number(settings.speed.slice(0, settings.speed.length - 1)) * 1000;

				setTimeout( function() {

					elmnt.addEventListener('mousedown', dragMouseDown);
					elmnt.addEventListener('touchstart', dragMouseDown);

				}, duration);	

			}

		}

		// the-end


		// dots

		const createDots = () => {

			dotList = createElement('ul','', { class: "flash-simple-slider-dot-list" }, el);

			for (let i = 0; i < slidesLength; i++) {
				
				dotItems[i] = createElement('li','', { class: "flash-simple-slider-dot-item" }, dotList);
				dots[i] = createElement('button','', { class: "flash-simple-slider-dot", type: "button" }, dotItems[i]);
				dots[i].addEventListener('click', selectSlide);
				dots[i].addEventListener('click', replay);
				dots[i].setAttribute('data-index', ''+i+'');
			}

			dots[0].classList.add('flash-active');

		}

		const selectActiveDot = (x) => {

			if (!settings.dots) return;

			for (let i = 0; i < dots.length; i++) {
				i == x ? dots[i].classList.add('flash-active') : dots[i].classList.remove('flash-active'); 
			}

		}

		// the-end


		// buttons

		const createButtons = () => {

			buttonList = createElement('ul','', { class: "flash-simple-slider-button-list" }, el, "first-child");

			for (let i = 0; i < slidesLength; i++) {
				
				if (!settings.buttonsHTML[i]) settings.buttonsHTML[i] = "Slide " + (i + 1);

				buttonItems[i] = createElement('li','', { class: "flash-simple-slider-button-item" }, buttonList);
				buttons[i] = createElement('button',''+settings.buttonsHTML[i]+'', { class: "flash-simple-slider-button", type: "button" }, buttonItems[i]);
				buttons[i].addEventListener('click', selectSlide);
				buttons[i].addEventListener('click', replay);

				buttons[i].setAttribute('data-index', ''+i+'');
				
			}

			buttons[0].classList.add('flash-active');

		}

		const selectActiveButton = (x) => {

			if (!settings.buttons) return;

			for (let i = 0; i < buttons.length; i++) {
				i == x ? buttons[i].classList.add('flash-active') : buttons[i].classList.remove('flash-active'); 
			}

		}

		// the-end


		// indexes

		const createIndexes = () => {

			indexes = createElement('div','', { class: "flash-simple-slider-indexes" }, el);
			currentIndex = createElement('span','1', { class: "flash-simple-slider-index" }, indexes);
			totalIndexes = createElement('span',' / '+slidesLength+'', { class: "flash-simple-slider-total-indexes" }, indexes);

		}

		const setIndex = (x) => { if (settings.indexes) currentIndex.innerHTML = x + 1; }

		// the-end


		// play

		const play = () => { playFunction = setInterval( function() { next(); }, settings.autoplaySpeed); }

		const stop = () => { clearInterval(playFunction); }

		const replay = () => { if (settings.autoplay) { stop(); play(); } }

		const pauseOnHover = () => { track.addEventListener('mouseenter', stop); track.addEventListener('mouseleave', play); }

		// the-end


		// calling-functions

		createSlide();
		setSpeed();

		if (settings.arrows) createArrows();
		if (settings.dots && slidesLength > 1) createDots();
		if (settings.buttons && slidesLength > 1) createButtons();
		if (settings.indexes && slidesLength > 1) createIndexes();
		if (settings.autoplay) play();
		if (settings.pauseOnHover) pauseOnHover();
		if (settings.draggable) dragElement(track);
		if (!settings.draggable) { track.classList.add('flash-not-draggable'); slideContainers[0].classList.add('flash-show');}

	}
	
	// selecting-elements-and-calling-slider-function-for-them

	const selectElements = (query) => {
		var elements;
		if (typeof query == "string") return elements = document.querySelectorAll(''+query+'');
		return query;
	}

	elements = selectElements(elements);

	if (!elements[0]) simpleSlider(elements);
	else for (let i = 0; i < elements.length; i++) { simpleSlider(elements[i]); }

	// the-end-of-selecting-elements-and-calling-slider-function-for-them

}		