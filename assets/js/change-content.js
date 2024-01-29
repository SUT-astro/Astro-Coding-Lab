function changeContent(event, pageId) {
	event.preventDefault(); // Prevent the default behavior of the link

	// Hide all content divs
	let allContent = document.querySelectorAll('.content-p');
	allContent.forEach(function(element) {
		element.classList.add('hidden');
	});

	// Show the selected content div
	let selectedContent = document.getElementById(pageId);
	selectedContent.classList.remove('hidden');
}