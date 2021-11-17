//Check if first time
if(localStorage.getItem("cats") == null){
    console.log("Created cats variable");

    localStorage.setItem("cats", "0");
    localStorage.setItem("clickMultipler", "1");

    localStorage.setItem("mouses", "0");
    localStorage.setItem("mouseCost", "10");
    localStorage.setItem("mouseMultiplier", "1");

    localStorage.setItem("yarn", "0");
    localStorage.setItem("yarnCost", "500");
    localStorage.setItem("yarnMultiplier", "1");
}

//Grab the items from storage
let cats = parseFloat(localStorage.getItem("cats"));

let mouses = parseFloat(localStorage.getItem("mouses"));
let mouseCost = parseFloat(localStorage.getItem("mouseCost"));
let mouseMultiplier = parseFloat(localStorage.getItem("mouseMultiplier"));

let yarn = parseFloat(localStorage.getItem("yarn"));
let yarnCost = parseFloat(localStorage.getItem("yarnCost"));
let yarnMultiplier = parseFloat(localStorage.getItem("yarnMultiplier"));

//Set functions
setCats();
setMouses();
setYarn();

//On load function
window.onload = (event) => {
    if(localStorageTest() === true){
        console.log("LOCAL STORAGE IS ON!!!");
        document.getElementById("content").style = "display: flex;";

        startLoop();

        console.log("ALL LOADED!!!");
    }
    else{
        console.log("LOCAL STORAGE IS NOT ON!!!");

        document.getElementById("lsWarning").style = "display: block;";
    }
}



let lastTime = null;
let totalTime = 0;

//Game Functions
function startLoop(){
    setInterval(function gameLoop(){
        //Just so when I delete the local storage for testing it doesnt keep going up
        if(localStorage.getItem("cats") !== null){
            const currentTime = Date.now();
            if(lastTime == null){
                lastTime = currentTime;
            }

            const deltaTime = currentTime - lastTime;
            totalTime += deltaTime;
            lastTime = currentTime;
            updateGame(deltaTime, totalTime);
        }
    }, 1000 / 60);
}


const mouseCurrencyPerMillisecond = 0.0005;
const yarnCurrencyPerMillisecond = 0.002;

let gameSaveTime = 0;

function updateGame(deltaTime, totalTime){
    const timeSinceLastSave = totalTime - gameSaveTime;
    if(timeSinceLastSave >= 5000){
        gameSaveTime = totalTime;
    }
    
    cats += ((mouseCurrencyPerMillisecond * mouses) * mouseMultiplier) * deltaTime;
    cats += ((yarnCurrencyPerMillisecond * yarn) * yarnMultiplier) * deltaTime;

    setCats();
}


function getCats(newCats) {
    cats += newCats;
    setCats();
}

function buyMouse(mouseBuyAmount){
    if(cats >= mouseCost){
        cats -= mouseCost;
        setCats();

        mouses = mouses + mouseBuyAmount;
        mouseCost = Math.floor(10 * Math.pow(1.07, mouses));

        setMouses();
    }
}

function buyYarn(yarnBuyAmount){
    if(cats >= yarnCost){
        cats -= yarnCost;
        setCats();

        yarn = yarn + yarnBuyAmount;
        yarnCost = Math.floor(500 * Math.pow(1.5, yarn));

        setYarn();
    }
}


//Set amounts for each item
function setCats(){
    document.getElementById("catAmount").innerHTML = cats.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    localStorage.setItem("cats", cats);
}

function setMouses(){
    document.getElementById("mouseAmount").innerHTML = mouses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("mouseCost").innerHTML = mouseCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    localStorage.setItem("mouses", mouses);
    localStorage.setItem("mouseCost", mouseCost);
}

function setYarn(){
    document.getElementById("yarnAmount").innerHTML = yarn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("yarnCost").innerHTML = yarnCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    localStorage.setItem("yarn", yarn);
    localStorage.setItem("yarnCost", yarnCost);
}


//Set the buy spans
let oneSpan = document.getElementById("oneSpan");
let tenSpan = document.getElementById("tenSpan");
let maxSpan = document.getElementById("maxSpan");

//Set the initial buy span amount to one
buyAmount('1');

function buyAmount(amountToBuy) {
    if(amountToBuy == '1'){
        oneSpan.style = "color: #9d1bd1";
        tenSpan.style = "color: rgb(246, 254, 255)";
        maxSpan.style = "color: rgb(246, 254, 255)";
    }
    else if(amountToBuy == '10'){
        oneSpan.style = "color: rgb(246, 254, 255)";
        tenSpan.style = "color: #9d1bd1";
        maxSpan.style = "color: rgb(246, 254, 255)";
    }
    else if(amountToBuy == 'Max'){
        oneSpan.style = "color: rgb(246, 254, 255)";
        tenSpan.style = "color: rgb(246, 254, 255)";
        maxSpan.style = "color: #9d1bd1";
    }
}


//Check if local storage is turned on
function localStorageTest(){
    try {
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");
        return true;
    } catch(e) {
        return false;
    }
}