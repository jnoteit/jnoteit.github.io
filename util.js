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

function getNextNode(node) {
	if (node.firstChild)
		return node.firstChild;
	while (node) {
		if (node.nextSibling)
			return node.nextSibling;
		node = node.parentNode;
	}
}
/**
 * 
 * @param {Range} range 
 * @returns {Array.<Node>}
 */
//My brain is too small to understand this
//SO https://stackoverflow.com/questions/667951/how-to-get-nodes-lying-inside-a-range-with-javascript
//Note that this is trash and doesn't work. i "polished" it with another function
function _getNodesInRange(range) {
	var start = range.startContainer;
	var end = range.endContainer;
	var commonAncestor = range.commonAncestorContainer;
	var nodes = [];
	var node;

	// walk parent nodes from start to common ancestor
	for (node = start.parentNode; node; node = node.parentNode) {
		nodes.push(node);
		if (node == commonAncestor)
			break;
	}
	nodes.reverse();

	// walk children and siblings from start until end is found
	for (node = start; node; node = getNextNode(node)) {
		nodes.push(node);
		if (node == end)
			break;
	}

	return nodes;
}


function getNodesInRange(range, sel) {

	let _r = _getNodesInRange(range);
	let out = [];
	//filter trash function for the elements that ARE inside of the selection
	for (nn of _r) {
		if (sel.containsNode(nn, false)) {
			out.push(nn)
		}
	}


	return out
}
/**
 * 
 * @param {String} el 
 * @returns {HTMLElement}
 */
const f = (el) => document.getElementById(el);
/**
 * 
 * @param {String} el 
 * @returns {HTMLCollection}
 */
const cf = (el) => document.getElementsByClassName(el);

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