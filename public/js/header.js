$(function() {
    var path = window.location.pathname;
    $.getJSON("JSON/header.json", function(data) {

        var list = data.items;
        for(var i = 0; i < list.length-1; i ++)
        {
            var href = (i == 0 ? "index" : list[i].header) + ".html";
            
            var item = "<li class='nav-item'><a class='nav-link' href=" + href + ">" + list[i].header +"</span></a></li>";

            $("#header").append(item);
        }
        $("#header").append("<li class='nav-item'><a class='nav-link' href='index.html'>Logout</span></a></li>")
    })
});