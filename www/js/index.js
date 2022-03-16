document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    let idc = 0;
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
    $('#coursesButton').click(function(){
        let token = localStorage.getItem("session_token");
        let URL = localStorage.getItem("URL");
        $.ajax({
            method: "GET",
            url: URL+"/api/get_courses",
            data : {"session_token" : token},
            dataType: "json",
        }).done(function (datos) {
            for (let item in datos["course_list"]) {
                idc = datos["course_list"][item]["_id"]
                $.ajax({
                    method: "GET",
                    url: URL+"/api/get_course_details",
                    data : {"session_token" : token,"courseID" : idc},
                    dataType: "json",
                }).done(function (dades){
                    console.log(dades)
                    let newelem = $('<p>'+dades["course"][0]["description"]+'</p>');
                    $("#lista_cursos").append(newelem);
                }).fail(function(){
                    alert("ERROR")
                })
            }
        }).fail(function () {
            alert("ERROR");
        });
    });
}
