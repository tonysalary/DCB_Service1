$(document).ready( function () {

  // var emailRadio = document.getElementById('email');
  // var otherRadio = document.getElementById('other');
  // emailRadio.defaultChecked = true;

  // var radios = document.getElementsByTagName('input');

  // $("#btn_accept").click( function() {

  //   if (radios[0].checked) {
  //       // get value, set checked flag or do whatever you need to
  //       alert("Continue with Email.");
  //   } else if(radios[1].checked) {
  //     alert("Continue with other.");
      
  //   }

    // if(emailRadio.Checked) {
    //   alert("Continue with Email.");
    // } else {
    //   var key = "isSubscribed";
    //   var cookie = getCookie(key);
   
    //   if(cookie != "") {
    //     setCookie(key, "true",1);
    //     window.location.href="SMS.html";
    //     alert("You are subscribed successfully.");
    //   }
    //   else {
    //     alert("You are subscribed already.");
    //   }  
    // }

    $.getJSON("JSON/operator.json", function(data) {
      var element = data.element;
      $("#operator_box").append("<div class='card'><img class='card-image-top' src='" + element.image + "' alt='Card image'><div class='card-body'><p class='card-text' style='display: flex;flex-direction: row-reverse'>" + element.text + "</p><div><form><button type='submit' class='btn btn-secondary'>Submit</button><div class='form-group' style='margin-top: 8px'><textarea class='form-control' rows='3' id='comment'></textarea></div></form></div><div class='form-check-inline'><label class='form-check-label'><input type='checkbox' class='form-check-input'" + (element.checked == true ? 'checked' : '') +">" + element.label + "</label></div></div><button class='btn btn-light' style=''>Accept</button></div>");
    })


  /*Cookie Processing Functions*/

  function setCookie(key, value, expiry) {

      var expires = new Date();
      expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
      document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();

  }

  function getCookie(key) {

      var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
      return keyValue ? keyValue[2] : null;

  }

  function eraseCookie(key) {

      var keyValue = getCookie(key);
      setCookie(key, keyValue, '-1');

  }
})