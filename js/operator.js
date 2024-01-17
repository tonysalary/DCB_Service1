$(document).ready( function () {

  $("#btn_accept").click( function() {

    var key = "isSubscribed";
    var cookie = getCookie(key);

    if(cookie != "") {
      setCookie(key, "true",1);
      alert("You are subscribed successfully.");
    }
    else {
      alert("You are subscribed already.")
    }
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