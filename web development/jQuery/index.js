$("button").click(function lala(){
  if($("h1").css("color")==="purple"){
    $("h1").css("color","yellow");
  }else{
    $("h1").css("color", "purple");
  }
});

$(document).keydown(function (e){
  $("h1").text(e.key);
});
