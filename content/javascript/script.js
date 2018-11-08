$( document ).ready(function() {
    $("#nav-placeholder").load("https://emersonp.github.io/nav.html");
    $('[data-toggle="popover"]').popover({
        container: 'body',
        trigger: 'focus'
    });
});

var rollOnTable = function(tableid) {
    $('#' + tableid + ' tr').removeClass('rolled');
    var rowCount = document.getElementById(tableid).rows.length;
    var row = Math.floor(Math.random() * (rowCount - 1) + 1);
    $('#' + tableid + ' tr').eq(row).addClass('rolled');
};

var toggleCollapseArrow = function(tableid) {
    if($('#div-' + tableid).hasClass('show')) {
        $('#btn-' + tableid).text('+');
    } else {
        $('#btn-' + tableid).html('&ndash;');
    }
};

var toggleTOCArrow = function(tableid) {
    if($('#div-' + tableid).hasClass('show')) {
        $('#btn-' + tableid).text('[+]');
    } else {
        $('#btn-' + tableid).html('[&ndash;]');
    }
};