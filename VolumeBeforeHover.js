JQuery = document.createElement("script")
JQuery.setAttribute("src","https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js")
document.body.appendChild(JQuery)

setInterval(() => {
    $(function() {
        $('.volume-bar').hover( function(){ 
            $('.main-genericButton-button').hide();
            $('.main-connectPicker-button').hide();
            $('#volume-percentage').show();
        },
        function(){
            $('.main-genericButton-button').show();
            $('.main-connectPicker-button').show();
            $('#volume-percentage').hide();
        });
    });
}, 2000)