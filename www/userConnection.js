// Initialization of global variables

var userName = null;


// Get elements from html:
//   - Document = all elements contained in index.html

// Get button
var button = document.getElementById("validation");

button.onclick = function () {
	// Get text written by user
	var text = document.getElementById("userName");
	var textValue = text.value.trim();
	// If nothing in name, don't validate
	if (textValue.length == 0)
		return;
	console.log("*" + textValue + "*");
	var popup = document.getElementById("chooseName");
	// Change whole popup window style to none -> Hide it
	popup.style.display = "None";
	userName = textValue;
};


