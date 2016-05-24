document.onready=function () {
    $('#newQu').click(function () {
        $('#subPanel').slideDown();
    });
    $('#newSingle').click(function () {
        $('#subPanel').slideUp();
        setTimeout(function () {
            sli();
        },10);
    });
    $('#newMultiple').click(function () {
        $('#subPanel').slideUp();
        setTimeout(function () {
            sli();
        },10);
    });
    $('#newText').click(function () {
        $('#subPanel').slideUp();
        setTimeout(function () {
            sli();
        },10);
    });
    function sli() {
        var $el=$(document.getElementById("questions").lastElementChild);
        $el.slideDown();
    }
};