$(document).ready( function() {

  var code = 0;
  var phoneNum = [];
  var timer = null;

  $( function() {

    var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    var input = document.querySelector("#phone");
    var button = document.querySelector("#btn_sms");
    
    const iti = window.intlTelInput( input, {
      customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
        return selectedCountryPlaceholder;
      },

      geoIpLookup: function(callback) {
        fetch("https://ipapi.co/json")
          .then(function(res) { return res.json(); })
          .then(function(data) { callback(data.country_code);})
          .catch(function() { callback("us"); });
      },

      initialCountry: "us",
      nationalMode: true,
      utilsScript: "js/lib/utils.js"
    });

    const reset = () => {
      input.classList.remove("error");
    };

    //Enter the Phone Number and Verify the user.
    button.addEventListener('click', () => {
      if (input.value.trim()) {
        if ( iti.isValidNumberPrecise() ) {
          alert("Phone Number is entered correctly.");
          reset();

          $("#form").hide();
          $("#pinMode").show();

          var seconde = 60;
          timer = setInterval( function () {
            if(seconde == 0) {
              clearInterval(timer);
              location.reload();
            } else {
              $("#stopTimer").html('Enter the PIN Code:&nbsp' + seconde + 's');
              seconde--;
            }
          }, 1000);
          //Send the request in Backend     
        } else {
          input.classList.add("error");
          const errorCode = iti.getValidationError();
          alert(errorMap[errorCode] || "Invalid number");
        }
      }
     });

    //on keyup / change flag: reset
    input.addEventListener('change', reset);
    input.addEventListener('keyup', reset);
  })

  //Confirm to enter the PIN

  $("#btn_pin").click( function() {
    var pinCode = $( "#pinInput" ).val();
    setCookie("isSubscribed","true", 1);
    alert("Confirm code is sent to the server.");

    clearInterval(timer);
    
    $.post("/users/controller/pinCode", formData, function(data, status) {
      
      if(status) {

        //Process about the response.
      } else {
        //Error
      }
    });
  })

  //Cancel to enter the PIN

  $("#btn_cancel").click( function() {
    location.reload();
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



  