


$("h1").css("color","red");

$(document).on("keypress",function (e) {
    $("h1").text(e.key);
});