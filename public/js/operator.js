$(document).ready( function () {

  var emailRadio = document.getElementById('email');
  var otherRadio = document.getElementById('other');
  emailRadio.defaultChecked = true;

  var radios = document.getElementsByTagName('input');

  $("#btn_accept").click( function() {

    if (radios[0].checked) {
        // get value, set checked flag or do whatever you need to
        alert("Continue with Email.");
    } else if(radios[1].checked) {
      alert("Continue with other.");
      
    }

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