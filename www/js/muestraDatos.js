(function($){
    $(function(){
        let csel = 0;
        let test = 0;
        var text = '<div class="row"><div class="col s12"><div class="login-page"><div class="form-listac"><form class="login-form"><div id="lista_tasks"><a class="title">Elements</a>'
        var text2 = '</div></form></div></div></div></div>'
        $('.sidenav').sidenav();
        $('.fixed-action-btn').floatingActionButton();
        $('.tabs').tabs({"swipeable":true});
        $('select').formSelect();
        $('.scrollspy').scrollSpy();
        let token = localStorage.getItem("session_token");
        let URL = localStorage.getItem("URL");
        $('#user').text(localStorage.getItem("user"));
        $('#user2').text(localStorage.getItem("user"));
        console.log(token)
        $.ajax({
            method: "GET",
            url: URL+"/api/get_courses",
            data : {"session_token" : token},
            dataType: "json",
        }).done(function (datos) {
            console.log("hola")
            console.log(datos)
            for (item in datos["course_list"]){
                let newelem = $('<button class="cbuton" value='+datos["course_list"][item]["_id"] + '>'+datos["course_list"][item]["description"]+'</button>');
                $("#lista_cursos").append(newelem);
                newelem.click(function(){
                    if (csel == 0) {
                        $('.tabs').tabs("select", "test-swipe-2");
                          localStorage.setItem("curso_sel", $(this).val());
                          let curso_sel = localStorage.getItem("curso_sel");
                          test = 0;
                          if (test == 0){
                            $.ajax({
                              method: "GET",
                              url: URL+"/api/get_course_details",
                              data : {"session_token" : token,"courseID" : curso_sel},
                                dataType: "json",
                            }).done(function (dades){
                                let test2 = dades
                                  for (let task in (dades["course"][0]["elements"])) {
                                    text = text + ('<a class="tbuton" value=' + dades["course"][0]["elements"][task]["title"] + '>'+dades["course"][0]["elements"][task]["title"]+'</a>');
                                  }
                                  text = text + '<a class="title">Tasques VR</a>'
                                  for (let task in (dades["course"][0]["vr_tasks"])) {
                                      text = text + ('<a class="vrbuton" id=' + dades["course"][0]["vr_tasks"][task]["ID"] + '>'+dades["course"][0]["vr_tasks"][task]["title"]+'</a>');
                                  }
                                  text = text + '<a class="title">Tasques sense VR</a>'
                                  for (let task in (dades["course"][0]["tasks"])) {
                                      text = text + ('<a class="tbuton" value=' + dades["course"][0]["tasks"][task]["title"] + '>'+dades["course"][0]["tasks"][task]["title"]+'</a>');
                                  }
                                  text = text + text2
                                  $('#test-swipe-2').empty();
                                  $('#test-swipe-2').append(text);
                                  text = '<div class="row"><div class="col s12"><div class="login-page"><div class="form-listac"><form class="login-form"><div id="lista_tasks"><a class="title">Elements</a>'
                                  $(".vrbuton").on ("click", function(){
                                    idt=this.id
                                    $.ajax({
                                        method: "GET",
                                        url: URL+"/api/pin_request",
                                        data: {"session_token" : token, "VRtaskID" : idt},
                                        dataType: "json",
                                    }).done(function(idTask){
                                        console.log(test2)
                                        for (let test in (test2["course"][0]["vr_tasks"])) {
                                            if (test2["course"][0]["vr_tasks"][test]["ID"] == idt){
                                                $("#grade").text(test2["course"][0]["vr_tasks"][test]["completions"][0]["grade"])
                                                $("#done").text(test2["course"][0]["vr_tasks"][test]["completions"][0]["autograde"]["passed_items"])
                                                $("#undone").text(test2["course"][0]["vr_tasks"][test]["completions"][0]["autograde"]["failed_items"])
                                                $("#comment").text(test2["course"][0]["vr_tasks"][test]["completions"][0]["autograde"]["comments"])
                                                $("#pin").text("El teu pin es: " + idTask["PIN"])
                                            }
                                        }
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