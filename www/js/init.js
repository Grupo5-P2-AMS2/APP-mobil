(function($){
  $(function(){
      let cursos = 0;
      let csel = 0;
      let test = 0;
      var text = '<div class="login-page"><div class="form"><form class="login-form"><div id="lista_tasks"><button>Elements</button>'
      var text2 = '</div></form></div></div>'
      $('.sidenav').sidenav();
      $('.fixed-action-btn').floatingActionButton();
      $('.tabs').tabs({"swipeable":true});

      $('#coursesButton').click(function(){
        let token = localStorage.getItem("session_token");
        let URL = localStorage.getItem("URL");
        $.ajax({
            method: "GET",
            url: URL+"/api/get_courses",
            data : {"session_token" : token},
            dataType: "json",
        }).done(function (datos) {
            if (cursos == 0) {
                for (let item in datos["course_list"]) {
                  let newelem = $('<button class="cbuton" value=' + datos["course_list"][item]["_id"] + '>'+datos["course_list"][item]["description"]+'</button>');
                  $("#lista_cursos").append(newelem);
                  $('.cbuton').click(function(){
                      if (csel == 0) {
                        $('.tabs').tabs("select", "test-swipe-2");
                          localStorage.setItem("curso_sel", $(this).val());
                          test = 0;
                          if (test == 0){
                            $.ajax({
                              method: "GET",
                              url: URL+"/api/get_course_details",
                              data : {"session_token" : token,"courseID" : $(this).val()},
                                dataType: "json",
                            }).done(function (dades){
                                console.log(dades);
                                  for (let task in (dades["course"][0]["elements"])) {
                                    text = text + ('<button class="tbuton">'+dades["course"][0]["elements"][task]["title"]+'</button>');
                                  }
                                  text = text + '<button>Tasques VR</button>'
                                  for (let task in (dades["course"][0]["vr_tasks"])) {
                                      text = text + ('<button class="tbuton">'+dades["course"][0]["vr_tasks"][task]["title"]+'</button>');
                                  }
                                  text = text + '<button>Tasques sense VR</button>'
                                  for (let task in (dades["course"][0]["tasks"])) {
                                      text = text + ('<button class="tbuton">'+dades["course"][0]["tasks"][task]["title"]+'</button>');
                                  }
                                  text = text + text2
                                  $('#test-swipe-2').append(text);
                            }).fail(function(){
                                alert("ERROR")
                            })
                            test = 1;
                        }
                      }
                  })
                }
                cursos = 1;    
            }
        }).fail(function () {
            alert("ERROR");
        });
    });
    $('#detailsButton').click(function() {
        let token = localStorage.getItem("session_token");
        let URL = localStorage.getItem("URL");
        let curso_sel = localStorage.getItem("curso_sel");
    })
  });
})(jQuery);

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}