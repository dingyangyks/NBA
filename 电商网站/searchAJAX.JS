window.addEventListener('load', function () {
    var clientInput = document.getElementById('search_text');
    var search_result = document.getElementById('search_result');
    var timer = null;
    clientInput.addEventListener('input', function () {
        num = -1;
        clearTimeout(timer);
        if (clientInput.value) {
            search_result.style.display = 'block';
            timer = setTimeout(search, 300);
        } else {
            search_result.style.display = 'none';
        }
    })

    document.addEventListener('click', function () {
        search_result.style.display = 'none';
    })

    //键盘事件
    // clientInput.addEventListener('keydown', unANDdown);

})

var num;
var KEY = '4ba18ba04d664af78164331c275f7ba0';
var URL = 'https://api.cognitive.microsoft.com/bing/v5.0/suggestions?q=';

function search() {
    var clientInput = document.getElementById('search_text');
    var clientText = clientInput.value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        var suggestionResult = document.getElementById('search_result');
        var html = '';
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) {
                var ret = JSON.parse(xhr.responseText);
                var result = ret.suggestionGroups[0].searchSuggestions;
                for (var i = 0, len = result.length; i < len; i++) {
                    html += "<li><div>" + result[i].displayText + "</div></li>"
                }
                suggestionResult.innerHTML = html;
            }
        }
    }
    xhr.open('GET', URL + clientText, true);
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key', KEY)
    xhr.send();
}

// function unANDdown(event) {
//     var keyCode = event.keyCode;
//     var len = search_result.getElementsByTagName('li').length;
//     // console.log(len)
//     if (keyCode === 40) {
//         if (num === -1) {

//         }
//     }
// }