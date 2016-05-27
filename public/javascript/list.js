;(function () {
    var table = document.getElementById("questionList");
    var tbody = table.getElementsByTagName("tbody")[0];
    var deleteItem = [];
    table.addEventListener("click", function (event) {
        var t = event.target,
            listTitle;
        switch (t.nodeName.toLowerCase()) {
            case "button":
                switch (t.innerText) {
                    case "Edit":
                        listTitle = t.parentNode.parentNode.getElementsByClassName("list-title")[0].innerText.trim();
                        window.location.href = '/edit?title=' + listTitle;
                        break;
                    case "New Questionnaire":
                        window.location.href = '/edit';
                        break;
                    case "Delete":
                        var de = function () {
                            listTitle = t.parentNode.parentNode.getElementsByClassName("list-title")[0].innerText.trim();
                            deleteItem = [];
                            deleteItem.push(listTitle);
                            deleteQuestion(deleteItem);
                            tbody.removeChild(t.parentNode.parentNode);
                        };
                        $$("warning", {
                            infoMessage: "Are You Sure To Delete This Questionnaire ?",
                            color: "yellow",
                            button1: ["Confirm", "green", de],
                            button2: ["Cancel", "red", function () {
                            }]
                        }).show();
                        break;
                    case "Delete Selected":
                        var inputs = tbody.getElementsByTagName('input');
                        var delNode = [];
                        for (var i = 0, l = inputs.length; i < l; i++) {
                            if (inputs[i].checked === true) {
                                delNode.push(inputs[i].parentNode.parentNode);
                                deleteItem.push(inputs[i].parentNode.nextSibling.innerText);
                            }
                        }
                        delNode.forEach(function (item) {
                            tbody.removeChild(item);
                        });
                        console.log(deleteItem);
                        deleteQuestion(deleteItem);
                        break;
                    case "View":
                        listTitle = t.parentNode.parentNode.getElementsByClassName("list-title")[0].innerText.trim();
                        window.location.href = '/view?title=' + listTitle;
                }
                break;
            case "input":
                switch (t.parentNode.parentNode.parentNode.nodeName.toLocaleLowerCase()) {
                    case "tfoot":
                        var checks = tbody.getElementsByTagName('input');
                        for (var j = 0, len = checks.length; j < len; j++) {
                            checks[j].checked = t.checked;
                        }
                }
        }
    }, false);
    function deleteQuestion(arr) {
        arr = JSON.stringify(arr);
        var xhr = new XMLHttpRequest();
        xhr.open("post", "", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(arr);
    }
})();