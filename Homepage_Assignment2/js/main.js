// Show all $Author with $Abschlussarbeits-Titel at $CreationDate

// simple Search and Show only the Titel of given Author

// Sort by: Creation Date

const main = document.getElementById("main");
let innerMain = document.getElementById("innerMain");

const parentContainer = document.querySelector('.long-text');
EnableExpandable(parentContainer);
loadOrganisation();

const btnString='read-more-btn';
const textString='read-more-text';
const textShowString='read-more-text--show';

function EnableExpandable(item) {
    if(item==null) return;
    item.addEventListener('click', event => {

        const current = event.target;
        const isReadMoreBtn = current.className.includes('read-more-btn');
        if(!isReadMoreBtn) return;
        const currentText = current.parentNode.querySelector('.read-more-text');
        main.append(current.className);
        currentText.classList.toggle('read-more-text--show');
        main.append("Hi");
        current.textContent = current.textContent.includes('Read More') 
        ? "Read Less..." : "Read More...";
    
    });
}



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
    document.getElementById('aktuelles').classList.add('active');
    document.getElementById('fakultaeten').classList.remove('active');
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

function loadOrganisation() {
    document.getElementById('fakultaeten').classList.add('active');
    document.getElementById('aktuelles').classList.remove('active');

    main.innerHTML="";
    //     <div id="innerMain" class="row g-3 row-cols-3 row-cols-xs-2">

    let div = document.createElement("div");
    main.append(div);
    div.id="innerMain";
    div.className="row ";
    div.classList += "g-3 ";
    div.classList += "row-cols-3 ";
    div.classList += "row-cols-xs-2";

    innerMain = div;

    let data = getMashupData();
    let items = data["items"];
    for (const item of items) {
        if (item.type == "data:organisation") {
            createOrganisation(item);
        }
    }
}

function createOrganisation(item) {
    if(item.stringValue=="") return;
    const div = document.createElement("div");
    div.innerHTML=item.stringValue;
    const length = div.innerHTML.length;

    // kleiner gibts nicht ;-)
    if(length>10) {
        const firstPart = div.innerHTML.slice(3,100);
        const secondPart = div.innerHTML.slice(100);
        var z = ExpandableText(firstPart,secondPart);
        z.classList.add("item");
        let imgID = item.images;
        let imgURL="";
        console.log(imgID);

        // get the corresponding images, better the first one
        let data = getMashupData();
        let items = data["items"];
        for (const item of items) {

            if (item.type == "data:image") {
                if(item.ident==imgID){
                    imgURL = item.fileUrl;
                    console.log("URL: "+imgURL);
                    break;
                }
            }
        }

        const img = document.createElement('img');
        img.src=imgURL;
        img.style.width='100%';
        img.style.height='100%';
        createCard(innerMain,img,z);
    }
    
}


function ExpandableText(first,second) {
    const div = document.createElement("div");
    div.append(first);

    let span = document.createElement('span');
    span.className = "read-more-text";
    span.innerHTML += second;
    div.append(span);

    let span2 = document.createElement('span');
    span2.classList = "read-more-btn";
    span2.innerHTML = '<br>Read More...';
    div.append(span2);

    EnableExpandable(div);

    return div;
}

function createCard(parent, img,descr) {
    const outer = createDiv("col");
    parent.append(outer);
    const card = createDiv("card");
    outer.append(card);

    const cardbody = createDiv("card-body shadow-sm");
    card.append(cardbody);

    if(img.src!="")
        cardbody.append(img);
    cardbody.append(descr);
}

function createDiv(cname) {
    let div = document.createElement("div");
    div.className=cname;
    return div;
}

// <div class="col" >
//     <div class="card">
//         <div class="card-body shadow-sm">
//             <img src="img/bild1.jpg" width="100%" height="100%">
//             <div class="description">
//                 Kurzbeschreibung
//             </div>
//         </div>
//     </div>
// </div>



// Find data: https://cmnet.communitymashup.net/json/