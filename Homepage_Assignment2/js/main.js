// Show all $Author with $Abschlussarbeits-Titel at $CreationDate

// simple Search and Show only the Titel of given Author

// Sort by: Creation Date
const main = document.getElementById("main");

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getMashupData() {
    const mashupServerUrl = "https://cmnet.communitymashup.net/json/";
    const text = httpGet(mashupServerUrl);
    let data = JSON.parse(text);
    return data['dataset'];
 }

function loadTermin() {
    main.innerHTML="";
    let data = getMashupData();
    let items = data["items"];

    for (const item of items) {
        if (item.type == "data:content") {
            createTermin(item);
        }
    }
}

function createTermin(item) {
    if(item.stringValue=="") return;
    const div = document.createElement("div");
    div.innerHTML=item.stringValue;
    div.classList.add('item');
    main.append(div);
}

// Find data: https://cmnet.communitymashup.net/json/