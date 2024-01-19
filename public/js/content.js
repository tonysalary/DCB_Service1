
$(document).ready( function() {

      $.getJSON("JSON/content/categories.json", function(data) {
            var categories = data.categories;

            for(var i = 0; i<categories.length; i++) {
                  var category = "<a style='cursor: pointer' class='list-group-item" + ( i == 0 ? ' active' : "" ) + "'" + " data-key='" + categories[i].key + "'>"
                        + categories[i].name + "</a>";
                  $("#categories_list").append(category);
            }
            $.getJSON("JSON/content/content.json", function(data) {
                  var contents = data.category_key_1;
                  appendContent(contents);
            })


            //Click Event Processing
            $('.list-group-item').on('click', function() {
                  var $this = $(this);
                  var key = $this.data('key');

                  $('.active').removeClass('active');
                  $this.toggleClass('active');

                  $.getJSON("JSON/content/content.json", function(data) {
                        var contents = data[key];
                        appendContent(contents)
                  })
            })

      })
})

function appendContent(contents) {
      $("#content-card").empty();
      if(contents != null) {
            for(var i = 0; i < contents.length; i++) {

                  var media = contents[i].media + "'" + ",'" +contents[i].type;

                  if(contents[i].type == 'image') {
                        var content = "<div class='card-padding'><div class='card'><div class='row'><div class='col-sm-3 align-items-center' style='display: flex; align-items: center; padding-left: 20px;'><img style='width: 100%;' class='card-img-top' id='image-link' onclick=imageShow('" + media + "') src=' " + contents[i].media + "' alt='Card image cap' /></div><div class='col-sm-6'><div class='card-body'><h5 class='card-title'>"
                              + contents[i].title + "</h5><p class='card-text'>" + contents[i].description + "</p></div></div><div class='col-sm-2 download_btn'><button class='btn'><i class='fas fa-cloud'></i><a href='contents[i].media' download>&nbspDownload</a></button></div></div></div>";
                        $("#content-card").append(content);
                  } else {
                        var content = "<div class='card-padding'><div class='card'><div class='row'><div class='col-sm-3' style='display: flex; align-items: center; padding-left: 20px;'><video style='width: 100%;' id='image-link' onclick=imageShow('" + media + "')><source src='" + media + "' type='video/mp4'></video></div><div class='col-sm-6'><div class=  'card-body'><h5 class='card-title'>"
                              + contents[i].title + "</h5><p class='card-text'>" + contents[i].description + "</p></div></div><div class='col-sm-2 download_btn'><button class='btn'><i class='fas fa-cloud'></i><a href='contents[i].media' download>&nbspDownload</a></button></div></div></div>";
                        $("#content-card").append(content);
                  }
            }
      } else {
            alert("It doesn't have contents.");
      }
}           

function imageShow(media_url,type) {

      $('#modal-media-body').empty();

      if( type == 'video') {
            $('#modal-media-body').append("<video controls><source src=" + media_url + " type='video/mp4'></video>");
             $('#media-modal').modal('show');
      } else {
            $('#modal-media-body').append("<img class='card-img-top' src='" + media_url + "' alt='Card image cap' />");
            $('#media-modal').modal('show');
      }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                        