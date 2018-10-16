$( document ).ready(function() {
    $("#nav-placeholder").load("https://emersonp.github.io/nav.html");
    $('[data-toggle="popover"]').popover({
        container: 'body',
        trigger: 'focus'
    });
});

var rollOnTable = function(tableid) {
    console.log("tableid: " + tableid);
    $('#' + tableid + ' tr').removeClass('rolled');
    var rowCount = document.getElementById(tableid).rows.length;
    var row = Math.floor(Math.random() * (rowCount - 1) + 1);
    console.log("rowCount: " + rowCount);
    console.log("row: " + row);
    $('#' + tableid + ' tr').eq(row).addClass('rolled');
};

var toggleCollapseArrow = function(tableid) {
    if($('#div-' + tableid).hasClass('show')) {
        $('#btn-' + tableid).text('+');
    } else {
        $('#btn-' + tableid).html('&ndash;');
    }
}