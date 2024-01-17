$(function() {

      $.getJSON("JSON/content.json", function(data) {

            var list = data.Items;
            for(var i = 0; i < list.length; i ++)
            {
                  var item = "<div class='card' ><img class='card-img-top' src=' " + list[i].Image + "'" + " alt='Card image cap' /><div class='card-body'><h5 class='card-title'>"
                        + list[i].title + "</h5><p class='card-text'>" + list[i].Description + "<a href='" + list[i].Download + "'>&nbsp&nbsp&nbspIf you contact me...</a></p></div></div>";

                  $("#ContentCard").append(item);
            }
      })
});