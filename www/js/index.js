document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    $('#loginButton').click(function(){
        $.ajax({
            method: "GET",
            url: $('#URL').val()+"/api/login",
            data : {"username" : $('#user').val(),"password" :  $('#pass').val()},
            dataType: "json",
        }).done(function (info) {
            if (info["status"] == "OK"){
                localStorage.setItem("URL", $('#URL').val())
                localStorage.setItem("session_token", info["session_token"]);
                window.location.assign('test.html');
            } else if (info["status"] != "OK"){
                alert(info["message"])
            }
        }).fail(function () {
            alert("URL incorrecta, por favor introduzca una url valida.");
        });
    });
}
