$(function() {

      $.getJSON("JSON/legal.json", function(data) {

            var list = data.Items;
            for(var i = 0; i < list.length; i ++)
            {
                  var item = 
                  "<div style='padding: 10px;'><div class='card' ><div class='card-body'><h5 class='card-title'>"
                        + list[i].title + "</h5><p class='card-text'>" + list[i].description + "</p></div></div></div>";

                  $("#LegalCard").append(item);
            }
      })
});