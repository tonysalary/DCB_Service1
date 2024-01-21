
$(document).ready(function() {

    //Cookie click Check
    var cookie_consent = getCookie("isSubscribed");
    if(cookie_consent == "true"){
        
    } else {

        $("#unSubModal").modal({
            backdrop: 'static',
            keyboard: false
        })
    }

    //OTP PIN Enter
    $('#otp_target').otpdesigner({
        typingDone: function (code) {
            //Mobile Call API
        },
    });
    
    //
    $('#pinSend').on('click', function () {
        var result = $('#otp_target').otpdesigner('code');
        if (result.done) {
            alert('Entered OTP code: ' + result.code);
            $("#unSubModal").modal('hide');
        } else {
            alert('Typing incomplete!');
        }
    });

    $('#btn_unSub').click(function() {
        alert("Unsubscribe API is called.");
    })
});

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
    setCookie(key, "false", '-1');
}

function acceptCookieConsent(){
    eraseCookie('isSubscribed');
    setCookie('isSubscribed', "true", 1);
    document.getElementById("cookieNotice").style.display = "none";
}