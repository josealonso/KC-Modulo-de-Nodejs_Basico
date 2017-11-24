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
         // if (data.success == true) { 
              setTimeout(function() {
                  location.reload(); 
              }, 1000); 
       // }  
          // $(".articles-container").load(location.href + " .articles-container");
      },
      error: function() {

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

