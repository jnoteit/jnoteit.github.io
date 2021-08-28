/**
 * @type {HTMLIFrameElement}
 * it literally took me two days to figure this out 
 */
const doc = f("doc");
onselectionchange = function () {
    console.log("aaaaa")
}

doc.contentDocument.onselectionchange = function () {
    sel = doc.contentWindow.getSelection();
    sr = sel.getRangeAt(0);
    console.clear();
    console.log(getNodesInRange(sr, sel))
}



doc.contentDocument.designMode = "on"