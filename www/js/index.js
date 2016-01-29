
// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events arlogine:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicitly call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//         app.receivedEvent('deviceready');
//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
//     }
// };

// app.initialize();

$(function() {

    // запрос на авторизацию
    $('#login-button').click(function() {
        var login = $('input[name="login"]').val();
        var pass = $('input[name="pass"]').val();
        $.ajax({
            url: HOST_URL + 'reg.pl?cmd=login&login=' + login + '&pass=' + pass,
            type: 'GET',            
            dataType: 'json',
            xhrFields: {
                withCredentials: true,
            },
            success: function(resp) {
                location.href = 'game.html';
            },            
            error: function() {
                alert(JSON.stringify(arguments));
            }
        });
    });
});