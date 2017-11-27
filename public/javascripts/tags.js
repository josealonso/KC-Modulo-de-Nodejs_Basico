// document.getElementsByClassName("tag-control").addEventListener('click', function() { });

let chosenTags = [];
let chosenTag;
let filterParams;
let motorTagIsClicked = false;

function getRequest(url, params) {
	// req.query.tags;
	$.ajax({
		url: url,
		type: 'get',
		data: {
			tags: params
		},
		success: function(data) {
			// location.reload(true);     // something is missing here ??
			$('.articles-container').load(location.href + ' .articles-container');
		},
		error: function(err) {
			console.log(err);
		}
	});
}

function paintButtons() {
	let buttonState = localStorage.getItem('clicked');
	// if (motorTagIsClicked === true) {
	if (buttonState === 'yes') {
		$('#motor-tag').addClass('chosen-tag');
	} else {
		$('#motor-tag').removeClass('chosen-tag');
	}
}

$(document).ready(function() {
	$('.tag-control').on('click', function() {
		chosenTag = $(this).attr('value');
		if ($(this).hasClass('chosen-tag')) {
			chosenTags.splice($.inArray(chosenTag, chosenTags), 1);
			motorTagIsClicked = false;
			localStorage.setItem('clicked', 'no');
		} else {
			chosenTags.push(chosenTag);
			motorTagIsClicked = true;
			localStorage.setItem('clicked', 'yes');
		}
		$(this).toggleClass('chosen-tag'); // const tagElements = tags.split(',');

		filterParams = chosenTags.join();
		console.log('Filter Params: ', filterParams);
		// getRequest('/', filterParams);
		// $("#articles-container").load(window.location.href + " #articles-container");
		// window.location.reload();
		// window.location.href = '/?tags=' + chosenTag;
		console.log('AAAA: ', filterParams);
	});

	$('#submit-query').on('click', function() {
        // paintButtons();
		window.location.search = '&tags=' + filterParams;
	});
}); // End of "ready" function
