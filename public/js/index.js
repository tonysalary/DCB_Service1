$(document).ready( function () {

    // body...
    var cookie_consent = getCookie("isSubscribed");
    if(cookie_consent == "true"){

    } else {
        $("#cookieNotice").modal({
            backdrop: 'static',
            keyboard: false,

        })
    }

    $("#cookieAccept").click( function() {
        cookie = getCookie("isSubscribed");
        setCookie("isSubscribed","true",1);
        $("#cookieNotice").modal('hide');
    })
})

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