$(document).ready( function() {

  var code = 0;
  var phoneNum = [];
  // var timer = null;

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

          // var seconde = 60;
          // timer = setInterval( function () {
          //   if(seconde == 0) {
          //     clearInterval(timer);
          //     location.reload();
          //   } else {
          //     $("#stopTimer").html('Enter the PIN Code:&nbsp' + seconde + 's');
          //     seconde--;
          //   }
          // }, 1000);
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
    // var pinCode = $( "#pinInput" ).val();
    connectToServer();
    setCookie("isSubscribed","true", 1);
    alert("Confirm code is sent to the server.");

    // clearInterval(timer);
    
    // $.post("/users/controller/pinCode", formData, function(data, status) {
      
    //   if(status) {

    //     //Process about the response.
    //   } else {
    //     //Error
    //   }
    // });
  })

  //Cancel to enter the PIN

  $("#btn_cancel").click( function() {
    location.reload();
  })

  $("#timerCancel").click( function() {
    performClose();
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

  function performClose() {
    stop();
    resetVars();
    $('#timerModal').modal('hide');
  }  

  let socket;

  function connectToServer() {
    $("#timerModal").modal({
      keyboard: false,
      backdrop: 'static'
    });
    start();
    const identifier = document.getElementById('pinInput').value;
    
    // Create a WebSocket connection
    socket = new WebSocket('ws://193.219.96.105:9555');

    // Listen to socket events
    socket.addEventListener('open', (event) => {
      console.log('Connected to server');
      
      // Send identifier to server
      socket.send(JSON.stringify({ identifier }));
    });

    socket.addEventListener('close', (event) => {
      console.log('Disconnected from server');
      performClose();
    });

    socket.addEventListener('message', (event) => {
      console.log(`Server message: ${event.data}`);
      alert("Thanks for your purchase");
      socket.close();
    });
  }


  const FULL_DASH_ARRAY = 283;
  const RESET_DASH_ARRAY = `-57 ${FULL_DASH_ARRAY}`;

  //DOM elements
  let timer = document.querySelector("#base-timer-path-remaining");
  let timeLabel = document.getElementById("base-timer-label");

  //Time related vars
  const TIME_LIMIT = 300; //in seconds
  let timePassed = -1;
  let timeLeft = TIME_LIMIT;
  let timerInterval = null;

  function reset() {
    clearInterval(timerInterval);
    resetVars();
    timer.setAttribute("stroke-dasharray", RESET_DASH_ARRAY);
  }

  function start(withReset = false) {
    if (withReset) {
      resetVars();
    }
    startTimer();
  }

  function stop() {
    clearInterval(timerInterval);
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      timeLabel.innerHTML = formatTime(timeLeft);
      setCircleDasharray();

      if (timeLeft === 0) {
        timeIsUp();
      }
    }, 1000);
  }

  window.addEventListener("load", () => {
    timeLabel.innerHTML = formatTime(TIME_LIMIT);
  });

  //---------------------------------------------
  //HELPER METHODS
  //---------------------------------------------
  function timeIsUp() {
    clearInterval(timerInterval);
    let confirmReset = alert("Sorry time is UP! Wanna restart?");
    if (confirmReset) {
      reset();
      startTimer();
    } else {
      reset();
    }
  }

  function resetVars() {
    timePassed = -1;
    timeLeft = TIME_LIMIT;
    console.log(timePassed, timeLeft);
    timeLabel.innerHTML = formatTime(TIME_LIMIT);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    timer.setAttribute("stroke-dasharray", circleDasharray);
  }

})



  