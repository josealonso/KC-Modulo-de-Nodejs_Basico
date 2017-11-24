// document.getElementsByClassName("tag-control").addEventListener('click', function() { });

let chosenTags = [];
let chosenTag;

function getRequest(url, params) { // req.query.tags;
  $.ajax({
      url: url,
      type: 'get',
      data: {
          tags: params // 'motor'
      },
      success: function(data) {
                 // location.reload();     // something is missing here ?? 
          // $(".articles-container").load(location.href + " .articles-container");
      },
      error: function(err) {
          console.log(err);
      }
  });
};

$(document).ready(function() {

$(".tag-control").on('click', function() {
    chosenTag = $(this).attr('value');
    if ( $(this).hasClass('chosen-tag') ) {
        chosenTags.splice($.inArray(chosenTag, chosenTags), 1);
    }
    else {
        chosenTags.push(chosenTag);
    }
    $(this).toggleClass('chosen-tag'); // const tagElements = tags.split(',');
	let filterParams = chosenTags.join();
    getRequest('/', filterParams);   
    // $(".articles-container").load(location.href + " .articles-container");
    // window.location.reload();
    console.log('AAAA: ', filterParams);
});

});

