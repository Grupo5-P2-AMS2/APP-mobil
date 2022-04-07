document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
});
function onDeviceReady() {
    $("#loginButton").on("click", function(){
        user=$('#user').val();
        pass=$('#pass').val();
        console.log({"email":user,"password":pass})
        $.ajax({    
            method: "GET",
            url: $('#URL').val()+"/api/login",
            data : {"username":user,"password":pass},
            dataType: "json",
        }).done(function (info) {
            if (info["status"] == "OK"){
                localStorage.setItem("URL", $('#URL').val())
                localStorage.setItem("session_token", info["session_token"]);
                localStorage.setItem("user", $('#user').val())
                window.location.assign('muestraDatos.html');
            } else if (info["status"] != "OK"){
                console.log(info)
                alert(info["message"] + "turmuertos")
            }
        }).fail(function () {
            alert("URL incorrecta, por favor introduzca una url valida.");
        });
        return false;
    });
    $(".button-collapse").sideNav();
    $('.sidenav').sidenav();
}
