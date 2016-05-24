var data = {};
var a=0;
(function () {
    var $ = function (s) {
        return document.querySelector(s);
    };
    var questions = $('#questions');
    var newSingle = $('#newSingle');
    var newMultiple = $('#newMultiple');
    var newText = $('#newText');
    var title = $('#title').value;
    var save = $('#save');
    var order = 1;
    var questionAll = document.getElementsByClassName('question');
    console.log(++a);
    questions.addEventListener("click", function (event) {
        var p = event.target.parentNode.parentNode.parentNode;
        var o = +p.firstElementChild.innerText.slice(1);
        switch (event.target.className) {
            case "col-lg-2 col-md-2 col-sm-2 col-xs-2 del":
                questions.removeChild(p);
                break;
            case "icon-plus-sign icon-large":
                if (event.target.parentNode.parentNode.innerHTML.indexOf("checkbox") !== -1) {
                    event.target.nextElementSibling.nextElementSibling.outerHTML +=
                        '<input class="form-control" type="checkbox">' +
                        '<input type="text" value="new choice" class="option form-control">' +
                        '<i class="icon-plus-sign icon-large"></i>' +
                        '<i class="icon-minus-sign icon-large"></i>' +
                        '<br />';
                } else if (event.target.parentNode.parentNode.innerHTML.indexOf("radio") !== -1) {
                    event.target.nextElementSibling.nextElementSibling.outerHTML +=
                        '<input class="form-control" name="radio" type="radio">' +
                        '<input type="text" value="new choice" class="option form-control">' +
                        '<i class="icon-plus-sign icon-large"></i>' +
                        '<i class="icon-minus-sign icon-large"></i>' +
                        '<br />';
                }
                break;
            case "icon-minus-sign icon-large":
                var ev = event.target;
                var node = event.target.parentNode;
                console.log(node);
                node.removeChild(ev.previousElementSibling);
                node.removeChild(ev.previousElementSibling);
                node.removeChild(ev.previousElementSibling);
                node.removeChild(ev.nextSibling);
                node.removeChild(ev);
                break;
            case "col-lg-2 col-md-2 col-sm-2 col-xs-2 moveUp":
                (o - 2) > -1 && questions.insertBefore(questions.removeChild(p), questions.childNodes[o - 2]);
                break;
            case "col-lg-2 col-md-2 col-sm-2 col-xs-2 moveDown":
                o < order && questions.insertBefore(questions.removeChild(p), questions.childNodes[o]);
                break;
            case "col-lg-2 col-md-2 col-sm-2 col-xs-2 copy":
                questions.appendChild(p.cloneNode(true));
        }
        order = questionAll.length;
        for (var i = 0; i < order; i++) {
            questionAll[i].firstElementChild.innerText = 'Q' + (i + 1);
        }
    }, false);
    newSingle.onclick = function () {
        addNew();
        var lastEl = questions.lastElementChild;
        addNewChoice(lastEl, "radio");
        addNewChoice(lastEl, "radio");
    };
    newMultiple.onclick = function () {
        addNew();
        var lastEl = questions.lastElementChild;
        addNewChoice(lastEl, "checkbox");
        addNewChoice(lastEl, "checkbox");
        addNewChoice(lastEl, "checkbox");
        addNewChoice(lastEl, "checkbox");
    };
    newText.onclick = function () {
        addNew();
        var lastEl = questions.lastElementChild;
        lastEl.childNodes[1].innerHTML += '<textarea class="text form-control"></textarea>';
    };
    function addNewChoice(p, type) {
        if (type === "checkbox") {
            p.childNodes[1].innerHTML += '<input class="form-control" type="checkbox">' +
                '<input type="text" value="new choice" class="option form-control">' +
                '<i class="icon-plus-sign icon-large"></i>' +
                '<i class="icon-minus-sign icon-large"></i>' +
                '<br />';
        } else if (type === "radio") {
            p.childNodes[1].innerHTML += '<input class="form-control" type="radio">' +
                '<input type="text" value="new choice" class="option form-control">' +
                '<i class="icon-plus-sign icon-large"></i>' +
                '<i class="icon-minus-sign icon-large"></i>' +
                '<br />';
        }
    }

    function addNew() {
        questions.innerHTML += '<div class="question clearFix row" style="display: none">' +
            '<div class="order col-lg-1 col-md-1 col-sm-1 col-xm-1">Q' + order + '</div>' +
            '<div class="quContent col-lg-5 col-md-5 col-sm-12 col-xm-12">' +
            '<input type="text" class="describe form-control" value="describe"><br /></div>' +
            '<div class="menu col-lg-6 col-md-6 col-sm-12 col-xs-12">' +
            '<ul class="row">' +
            '<li class="col-lg-2 col-md-2 col-sm-2 col-xs-2 moveUp">上移</li>' +
            '<li class="col-lg-2 col-md-2 col-sm-2 col-xs-2 moveDown">下移</li>' +
            '<li class="col-lg-2 col-md-2 col-sm-2 col-xs-2 copy">复用</li>' +
            '<li class="col-lg-2 col-md-2 col-sm-2 col-xs-2 del">删除</li>' +
            '</ul>' +
            '</div>' +
            '</div>';
        order++;
    }

    save.onclick = stringFyData;
    function stringFyData() {
        order = questionAll.length;
        data.title = title;
        data.len = order;
        var item = "",
            type = "",
            describe = "",
            choices = [],
            options = null,
            el = null;
        for (var i = 0; i < order; i++) {
            choices = [];
            el = questionAll[i];
            item = el.firstElementChild.innerText;
            describe = el.childNodes[1].getElementsByClassName("describe")[0].value;
            if (el.childNodes[1].innerHTML.indexOf("checkbox") !== -1) {
                type = "checkbox";
            } else if (el.childNodes[1].innerHTML.indexOf("radio") !== -1) {
                type = "radio";
            } else {
                type = "text";
            }
            if (type === "text") {
                data[item] = {
                    type: type,
                    describe: describe
                }
            } else {
                options = el.childNodes[1].getElementsByClassName("option");
                for (var j = 0, l = options.length; j < l; j++) {
                    choices.push(options[j].value);
                }
                data[item] = {
                    type: type,
                    describe: describe,
                    choices: choices
                }
            }
        }
        var jsonData=JSON.stringify(data);
        console.log(data,jsonData);
        var xhr=new XMLHttpRequest();
        xhr.open("post","",false);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(jsonData);
    }
})();
(function () {
    var clr = document.getElementById("clear");
    var show = document.getElementById("show");
    var container = document.getElementById("container");

    function parseData() {
        var html = '<label for="title"></label>' +
            '<input type="text" name="title" id="title" value="' + data.title + '">';
        for (var i = 0; i < data.len; i++) {
            var choices = data['Q' + (i + 1)].choices;
            html += '<div class="question clearFix">' +
                '<div class="order">' + 'Q' + (i + 1) + '</div>' +
                '<div class="quContent"><input type="text" class="describe" value="' + data['Q' + (i + 1)].describe + '"><br />';
            if (data['Q' + (i + 1)].type === "single") {
                for (var j = 0; j < choices.length; j++) {
                    html += '<input type="checkbox">' +
                        '<input type="text" value="' + choices[j] + '" class="option"><br />';
                }

            } else if (data['Q' + (i + 1)].type === "multiple") {
                for (j = 0; j < choices.length; j++) {
                    html += '<input type="radio">' +
                        '<input type="text" value="' + choices[j] + '" class="option"><br />';
                }
            } else {
                html += '<textarea></textarea>';
            }
            html += '</div>' +
                '<div class="menu">' +
                '<ul>' +
                '<li class="moveUp">move up</li>' +
                '<li class="moveDown">move down</li>' +
                '<li class="copy">copy</li>' +
                '<li class="del">delete</li>' +
                '<li class="addNew">add new choice</li>' +
                '</ul>' +
                '</div>' +
                '</div>';
            container.innerHTML = html;
        }
    }

    clr.onclick = function () {
        container.innerHTML = "";
    };
    show.onclick = parseData;
})();