// ==UserScript==
// @name         OTP fucker
// @namespace    http://fucktheotpbpc
// @version      0.1
// @description  Fucks the two factor authentication
// @author       You
// @match        https://rbs-develop.paymentgate.ru/*/plugins/servlet/twofactor/public/*
// @grant        none
// @require      https://raw.githubusercontent.com/jiangts/JS-OTP/master/dist/jsOTP.min.js
// @require      https://code.jquery.com/jquery-3.4.1.js
// ==/UserScript==

(function() {
    'use strict';
    var baseurl='https://rbs-develop.paymentgate.ru/';
    var secrets = [{location: 'bugs/', secret: ''}, {location: 'wiki/', secret: ''}];
    var secretToUse = '';
    secrets.forEach(function(secretInfo) {
        console.log('checking for ' + secretInfo.location);
        if(location.href.startsWith(baseurl+secretInfo.location)) {
            secretToUse = secretInfo.secret;
        }
    });


    var totp = new jsOTP.totp();
    var otpCode = totp.getOtp(secretToUse);
    $('#2fpin').val(otpCode);
    if ($('#d').length == 1) {
        $('#d').submit();
    } else {
        $('#totp-form').submit();
    }
;})();