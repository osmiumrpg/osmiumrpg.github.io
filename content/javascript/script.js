$( document ).ready(function() {
    $("#nav-placeholder").load("https://emersonp.github.io/nav.html");
    $("[data-toggle=popover]").popover();
});

var rollOnTable = function(tableid) {
    $('#' + tableid + ' tr').removeClass('rolled');
    var rowCount = document.getElementById(tableid).rows.length;
    var row = Math.floor(Math.random() * (rowCount - 1) + 1);
    $('#' + tableid + ' tr').eq(row).addClass('rolled');
};