(function($){
    $(function(){
        let csel = 0;
        let test = 0;
        var text = '<div class="row"><div class="col s12"><div class="login-page"><div class="form-listac"><form class="login-form"><div id="lista_tasks"><a class="title">Elements</a>'
        var text2 = '</div></form></div></div></div></div>'
        $('.sidenav').sidenav();
        $('.fixed-action-btn').floatingActionButton();
        $('.tabs').tabs({"swipeable":true});
        let token = localStorage.getItem("session_token");
        let URL = localStorage.getItem("URL");
        $('#user').text(localStorage.getItem("user"));
        $('#user2').text(localStorage.getItem("user"));
        $.ajax({
            method: "POST",
            url: URL+"/api/get_courses",
            headers : {"Authorization":"Token "+token},
            dataType: "json",
        }).done(function (datos) {
            console.log(datos);
            for (item in datos["course_list"]){
                let newelem = $('<button class="cbuton" value='+datos["course_list"][item]["courseID"] + '>'+datos["course_list"][item]["title"]+'</button>');
                $("#lista_cursos").append(newelem);
                newelem.click(function(){
                    if (csel == 0) {
                        $('.tabs').tabs("select", "test-swipe-2");
                          localStorage.setItem("curso_sel", $(this).val());
                          cid=parseInt($(this).val())
                          console.log(cid)
                          test = 0;
                          if (test == 0){
                            $.ajax({
                              method: "POST",
                              url: URL+"/api/get_courses_detail",
                              headers : {"Authorization":"Token "+token},
                              data: JSON.stringify({courseID:cid}),
                              dataType: "json",
                            }).done(function (dades){
                                console.log(JSON.stringify({courseID:cid}))
                                console.log(dades["course"]["elements"]);
                                  for (let task in (dades["course"]["elements"])) {
                                    text = text + ('<a class="tbuton">'+dades["course"]["elements"][task]+'</a>');
                                  }
                                  text = text + '<a class="title">Tasques VR</a>'
                                  for (let task in (dades["course"]["vr_tasks"])) {
                                      text = text + ('<a class="vrbuton">'+dades["course"]["vr_tasks"][task]+'</a>');
                                  }
                                  text = text + '<a class="title">Tasques sense VR</a>'
                                  for (let task in (dades["course"]["tasks"])) {
                                      text = text + ('<a class="tbuton">'+dades["course"]["tasks"][task]+'</a>');
                                  }
                                  text = text + text2
                                  $('#test-swipe-2').empty();
                                  $('#test-swipe-2').append(text);
                                  text = '<div class="row"><div class="col s12"><div class="login-page"><div class="form-listac"><form class="login-form"><div id="lista_tasks"><a class="title">Elements</a>'
                                  $(".vrbuton").on ("click", function(){
                                    $.ajax({
                                        method: "GET",
                                        url: URL+"/api/pin_request",
                                        data: {"session_token" : token, "VRtaskID" : this.id},
                                        dataType: "json",
                                    }).done(function(idTask){
                                        $("#pin").text("El teu pin es: " + idTask["PIN"])
                                        $(".modal").modal();
                                        $(".modal").modal('open');
                                    }).fail(function(){
                                        alert("ERROR");
                                    })
                                  });
                            }).fail(function(){
                                alert("ERROR")
                            })
                            test = 1;
                        }
                      }
                });
            }
        }).fail(function () {
            alert("ERROR");
        });
    });
  })(jQuery);
  
  document.addEventListener('deviceready', onDeviceReady, false);
  function onDeviceReady() {
  }