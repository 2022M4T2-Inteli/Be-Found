$('span').click(function(event) {
    if(event.target.tagName === 'SPAN') {
        alert('span pressed!');
    }
 });

$('#btnselect').click(function(e) {
    $("#optionSelect").removeClass("optionSelect");
    $('#optionSelect').attr('size', $('option').length);
});