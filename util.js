type = "module";
//SO https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
//Didn't want to do it

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 * 
 */
function isObject(item) {
	return (item && typeof item === 'object' && !Array.isArray(item));
}
/**
 * 
 * @param {HTMLElement} element
 */
function drag(element) {
	element.addEventListener("mousedown", function (e2) {
		let lx = e2.x;
		let ly = e2.y;
		let ex = lx;
		let ey = ly;
		this.style.transition = "0s"

		document.onmousemove = (e) => {
			ex += e.x - lx
			ey += e.y - ly

			element.style.left = ex + "px"
			element.style.top = ey + "px"

			lx = ex;
			ly = ey;

		}
		document.onmouseup = function () {
			document.onmouseup = null;
			document.onmousemove = null;
			this.style.transition = ""
		}
	})
}
/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, {
					[key]: {}
				});
				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, {
					[key]: source[key]
				});
			}
		}
	}
	return mergeDeep(target, ...sources);
}









class blockSelection {
	index = 00000000;
	type = 'block';
	ref = null;
	copy = function () {
		let cp = new blockSelection(this.ref);
		cp.index = this.index;
		cp.type = this.type;
		return cp
	}
	constructor(ref) {
		this.index = ranGenerate(16) + Date.now() + ranGenerate(2)

		this.ref = ref;
		console.log(this.ref)
	}

}
/**
 * 
 * @param {String} el 
 * @returns {HTMLElement}
 */
const f = (el) => document.getElementById(el);
window.f = f;
document.f = f;
/**
 * 
 * @param {String} el 
 * @returns {HTMLCollection}
 */
const cf = (el) => document.getElementsByClassName(el);
window.cf = cf;
document.cf = cf;

function rem() {
	this.id = "deleted"

	this.style.height = "0px";
	setTimeout(() => {
		this.remove()
	}, 1000)
}

function hid() {
	if (this.style.height != "0px") {
		setTimeout(() => {
			this.style.display = "none"
		}, 1000)

		this.lh = this.style.height
		this.style.height = "0px";
	}
}

function sho() {
	this.style.display = "block"
	this.style.height = this.lh;
}

function setRem() {
	ae = document.getElementsByTagName("*")
	for (i in ae) {
		ae[i].rem = rem;
		ae[i].sho = sho;
		ae[i].hid = hid;
	}

}
/**
 * 
 * Emulate key press
 * @param {String} key 
 * @param {HTMLElement} element
 */
function pressKey(key, element) {
	element.dispatchEvent(new KeyboardEvent("keydown", {
		key: key
	}))

	element.dispatchEvent(new KeyboardEvent("keyup", {
		key: key
	}))

	element.dispatchEvent(new KeyboardEvent("keypress", {
		key: key
	}))


}
/**
 * @type {SpeechRecognition}
 */
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
/**
 * @type {SpeechGrammarList}
 */
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
/**
 * @type {SpeechRecognitionEvent}
 */
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

function Speech() {


}


/**
 * 
 * @param {string} css 
 
 * @returns {Object}
 */
function parseStyle(css) {
	let pairs = css.split(";");
	let ret = {};
	for (i of pairs) {
		ret[i.split(":")[0]] = i.split(":")[1];
	}
	return ret
}

//Welcome to hell

//WYSIWIG editor functions, do not look for long, it can hurt














//You have been warned
/**
 * Makes an attempt to apply css to a range
 * @param {Range} r 
 * @param {String} s
 */
function applyCssToRange(r, s) {
	r = normalizeRange(r)
	//Sketch
	/*

	If there is only one element inside of the range then you can apply css to said element

	if there are multiple elements inside of the range, then you have to surround it using karate/ninja techinques

	after a ton of normalizing, and ONE VERY QUESTIONABLE HACK, we can fix the broken Document fragment from cloneContents,
	surround it, and, finally, put it back on to the DOM
	*/
	let oneElement = getEntireElement(r);
	if (oneElement) {
		oneElement.style.cssText += s
	} else {
		//This is where things get weird
		//Warning: weird
		console.log("weird")

		//Make node element
		if (r.startContainer.id === undefined) {
			//Is node
			//Split it
			r.setStart(r.startContainer.splitText(r.startOffset), 0);

			/**
			 * @type {HTMLElement}
			 */
			startContainer = makeElement(r.startContainer)

			r.startOffset = 0;
			r.setStartBefore(startContainer)
		} else {
			startContainer = r.startContainer
		}
		//Make node element
		if (r.endContainer.id === undefined) {
			//Is node

			r.endContainer.splitText(r.endOffset)


			/**
			 * @type {HTMLElement}
			 */
			endContainer = makeElement(r.endContainer)
			r.setEndAfter(endContainer)
		} else {
			endContainer = r.endContainer
		}

		//Remove any previous containers
		//maybe a little TOO HACKY
		if (f("startContainer")) {
			f("startContainer").id = ""
		}
		if (f("startContainer")) {
			f("endContainer").id = ""
		}

		startContainer.id = "startContainer"
		endContainer.id = "endContainer"

		//There aren't many ways to keep track of copied node inside of document fragment	
		//The procedure now is to replace the start element with the startContainer, 
		//And the end element with the endContainer
		//Cuz cloneContents is weird
		let cts = r.cloneContents();
		//The start and end of document fragment are most definetly messed up, so it is cleaned here

		if (cts.firstChild.id !== "startContainer") {

			cts.firstChild.remove()
			startContainer = cts.insertBefore(startContainer.cloneNode(true).childNodes[0], cts.firstChild)
		} else {
			let fc = cts.firstChild.childNodes[0].cloneNode();
			cts.firstChild.remove()
			cts.insertBefore(fc, cts.firstChild)
		}
		if (cts.lastChild.id !== "endContainer") {
			cts.lastChild.remove()
			endContainer = cts.appendChild(endContainer.cloneNode(true).childNodes[0], cts.lastChild)
		} else {
			let lc = cts.lastChild.childNodes[0].cloneNode();
			cts.lastChild.remove();
			cts.appendChild(lc);
		}
		if (getEntireElement(r)) {


			getEntireElement(r).style.cssText += s;
			return
		}
		/*
		Edge cases and bugs:
			Selecting part of a single node doesn't work (create edge case/ function to detect it)

			Bug/Multiline
			the last element of cts should be put into the last container,
			since this glitches multiline badly


		*/
		//AND NOW, FOR THE GRAND FINALE, FOR THE BON APPETIT, HERE IT IS!


		let surround = document.createElement("span")
		surround.style = s;
		surround.appendChild(cts)
		//We now have surround as a styled span with selection inside
		r.deleteContents()
		r.insertNode(surround)
		//And now, the selection is stylized
		//Although there's an edge corner case 









	}

}
/**
 * Gets number of items inside range
 * @param {Range} r 
 * @returns {Number}
 */
function getNumberOfItemsInsideRange(r) {
	return r.cloneContents().childNodes.length
}
/**
 * Turns a node into an element using absolutely insane dark magic
 * @param {Node} n
 * @returns {HTMLElement}
 */
function makeElement(n) {

	//Get Entire Element Attempt
	let gela = getEntireElement(n);
	if (gela) {
		return gela
	} else {
		let el = n.parentElement.insertBefore(document.createElement("span"), n);
		el.appendChild(n)
		return el


	}

}

/**
 * 	Tells if a range has selected an entire element, and returns it if it exists
 * or just a node or just part of one, or just part of one and another one, or just part of two nodes or part of two nodes and other entire nodes inbetween or maybe if the node has the node as part of a document or maybe even if the 
 * @param {Range} r
 * @returns {HTMLElement?}
 */
function getEntireElement(r) {
	let c;
	let isRange = r.constructor.name === "Range";
	if (isRange) {
		c = r.cloneContents();
	} else {
		c = r.parentElement;
		r = {
			startContainer: r,
			startOffset: 0,
			endOffset: r.textContent.length,
			endContainer: r
		}


	}

	if (c.childElementCount === 1 && c.childNodes.length === 0) {

		return r.startContainer
	} else {
		if (c.childElementCount === 0 && c.childNodes.length === 1) {
			if (r.startContainer.parentElement.childNodes.length === 1 && r.startContainer.parentElement.children.length === 0) {
				if (r.startContainer.parentElement.childNodes[0].isEqualNode(c.childNodes[0])) {

					return r.startContainer.parentElement

				}
			}
		}
		return null
	}

}


/**
 * makes the direction of range ALWAYS left to right
 * and returns an object representation of the range
 * a$gv@%h0xhl
 * 
 * @param {Range} r
 * @returns {Range}
 */
function normalizeRange(r) {
	if ((!(r.startContainer.compareDocumentPosition(r.endContainer)) &&
			r.startOffset > r.endOffset) ||
		(r.startContainer.compareDocumentPosition(r.endContainer) == Node.DOCUMENT_POSITION_PRECEDING)
	) {
		return Object.assign({}, r, {
			startContainer: r.endContainer,
			endContainer: r.startContainer,
			startOffset: r.endOffset,
			endOffset: r.startOffset
		})
	} else {
		return r
	}
}