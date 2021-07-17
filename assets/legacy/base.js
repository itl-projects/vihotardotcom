var BASE_URL = "https://api.vihotar.com/api/"
var IMG_URL = "https://skyril-static.s3.us-east-2.amazonaws.com/"
var mapBoxToken = "pk.eyJ1IjoicHJhdGlrc2luZ2g3NzMiLCJhIjoiY2tjd2FiaHdtMDBpNzJzbG12NnRib3IweSJ9.bKrwgVDwH1QDBnJrkr3DTA"
var FE_BASE_URL = "http://skyril.com"

async function postUrl(relative, data, token, requiredToken) {
    if (requiredToken == false) {
        var res = await axios({ method: 'POST', url: BASE_URL + relative, data: data })
    } else {
        headers = { "Authorization": "Bearer " + token }
        var res = await axios({ method: 'POST', url: BASE_URL + relative, data: data, headers: headers })
    }
    console.log(res)
    return res
}

async function patchUrl(relative, data, token, requiredToken) {
    if (requiredToken == false) {
        var res = await axios({ method: 'PATCH', url: BASE_URL + relative, data: data })
    } else {
        headers = { "Authorization": "Bearer " + token }
        var res = await axios({ method: 'PATCH', url: BASE_URL + relative, data: data, headers: headers })
    }
    console.log(res)
    return res
}

async function postUrlForm(relative, data, token, requiredToken) {
    if (requiredToken == false) {
        var res = await axios({ method: 'POST', url: BASE_URL + relative, data: data })
    } else {
        headers = { "Authorization": "Bearer " + token, "Content-Type": "multipart/form-data" }
        var res = await axios({ method: 'POST', url: BASE_URL + relative, data: data, headers: headers })
    }
    console.log(res)
    return res
}

async function delUrl(relative, data, token, requiredToken) {
    if (requiredToken == false) {
        var res = await axios({ method: 'DELETE', url: BASE_URL + relative, data: data })
    } else {
        headers = { "Authorization": "Bearer " + token }
        var res = await axios({ method: 'DELETE', url: BASE_URL + relative, data: data, headers: headers })
    }
    console.log(res)
    return res
}

function addOptions(selectObj, value, name) {
    option = document.createElement('option')
    option.value = value
    option.innerHTML = name
    selectObj.appendChild(option)
}

function showLoginError(key, value) {
    var div = document.getElementById("errorDiv")
    div.style.display = "block";
    var ul = document.getElementById("errorList");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(`${key}: ${value}`));
    ul.appendChild(li);
}

function showLoginErrors(obj) {
    var div = document.getElementById("errorDiv")
    div.style.display = "block";
    var ul = document.getElementById("errorList");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    Object.keys(obj).forEach(el => {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(capitalizeLetter(el) + ": " + res.data.errors[el]));
        ul.appendChild(li);
    })
}

async function putUrl(relative, data, token, requiredToken) {
    if (requiredToken == false) {
        var res = await axios({ method: 'PUT', url: BASE_URL + relative, data: data })
    } else {
        headers = { "Authorization": "Bearer " + token }
        var res = await axios({ method: 'PUT', url: BASE_URL + relative, data: data, headers: headers })
    }
    console.log(res)
    return res
}

async function getUrl(relative, params, token, requiredToken) {
    if (requiredToken == false) {
        var res = await axios({ method: 'get', url: BASE_URL + relative, params: params })

    } else {
        headers = { "Authorization": "Bearer " + token }
        var res = await axios({ method: 'get', url: BASE_URL + relative, params: params, headers: headers })
    }
    console.log(res)
    return res
}

function capitalizeLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showToast(cls, title, subtitle, body) {
    $(document).Toasts('create', {
        class: cls,
        title: title,
        subtitle: subtitle,
        body: body,
        autohide: true,
        delay: 2000,
    })
}


function getMonthFromString(mon) {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
}

function parseDate(date, zero = false) {
    if (zero) {
        month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
        fdate = (date.getDate()) < 10 ? "0" + (date.getDate()).toString() : date.getMonth().toString()
        return `${date.getFullYear()}-${month}-${fdate}`
    }
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}


function changeAttribute(id, key, value) {
    if (value == undefined || value == null) {
        return false
    }
    document.getElementById(id).setAttribute(key, value)
}

function changeInnerHTML(id, value) {
    document.getElementById(id).innerHTML = value
}

function getURLParams() {
    params = {}
    if (window.location.search == "") {
        return params
    }
    window.location.search.split('?')[1].split('&').forEach(el => {
        var kvp = el.split('=')
        params[kvp[0]] = kvp[1]
    })
    return params
}

function insertParam(key, value) {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);

    // kvp looks like ['key1=value1', 'key2=value2', ...]
    var kvp = document.location.search.substr(1).split('&');
    let i = 0;

    for (; i < kvp.length; i++) {
        if (kvp[i].startsWith(key + '=')) {
            let pair = kvp[i].split('=');
            pair[1] = value;
            kvp[i] = pair.join('=');
            break;
        }
    }

    if (i >= kvp.length) {
        kvp[kvp.length] = [key, value].join('=');
    }

    // can return this or...
    let params = kvp.join('&');

    // reload page with new params
    document.location.search = params;
}


function getElementsById(ids) {
    var idList = ids.split(" ");
    var results = [],
        item;
    for (var i = 0; i < idList.length; i++) {
        item = document.getElementById(idList[i]);
        if (item) {
            results.push(item);
        }
    }
    return (results);
}

function validateString(string, field_name, check) {
    splchars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (check.number) {
        if (/\d/.test(string)) {
            return [false, `${field_name} cannot contain numbers`]
        }
    }
    if (check.empty) {
        if (string === null || string == '') {
            return [false, `${field_name} cannot be empty`]
        }
    }
    if (check.special) {
        if (splchars.test(string)) {
            return [false, `${field_name} cannot contain special characters`]
        }
    }
    if (check.str) {
        if (/^[a-zA-Z]*$/.test(string)) {
            return [false, `${field_name} cannot contain alphabets`]
        }
    }
    if (check.youtube) {
        if (!(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/.test(string))) {
            return [false, `${field_name} not a valid youtube URL`]
        }
    }
    return [true, null]
}