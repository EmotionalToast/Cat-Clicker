window.onload = (event) => {
    if(localStorageTest() === true){
        console.log("LOCAL STORAGE IS ON!!!");
        document.getElementById("content").style = "display: flex;";

        if(localStorage.getItem("cats") !== null){
            gameLoop();
        }
        else{
            console.log("Created cats variable");

            localStorage.setItem("cats", "0");

            localStorage.setItem("mouses", "0");
            localStorage.setItem("mouseCost", "10");

            localStorage.setItem("yarn", "0");
            localStorage.setItem("yarnCost", "500"); 
            
            gameLoop();
        }

        cats = localStorage.getItem("cats");

        mouses = localStorage.getItem("mouses");
        mouseCost = localStorage.getItem("mouseCost");

        yarn = localStorage.getItem("yarn");
        yarnCost = localStorage.getItem("yarnCost");

        setCats();
        setMouses();
        setYarn();

        console.log("ALL LOADED!!!");
    }
    else{
        console.log("LOCAL STORAGE IS NOT ON!!!");

        document.getElementById("lsWarning").style = "display: block;";
    }
}

//Game Functions
function gameLoop(){
    window.setInterval(function(){
        if(localStorage.getItem("cats") !== null){
            console.log("GAME LOOP IS ON!!!");
            getCats(mouses);
            getCats(yarn * 2);
        }
    }, 100);
}

function getCats(newCats) {
    cats = parseFloat(cats) + parseFloat(newCats);
    setCats();
}

function buyMouse(mouseBuyAmount){
    if(cats >= mouseCost){
        cats -= mouseCost;
        setCats();

        mouses = parseFloat(mouses) + mouseBuyAmount;
        mouseCost = Math.floor(mouseCost * 1.15);

        setMouses();
    }
}

function buyYarn(yarnBuyAmount){
    if(cats >= yarnCost){
        cats -= yarnCost;
        setCats();

        yarn = parseFloat(yarn) + yarnBuyAmount;
        yarnCost = Math.floor(yarnCost * 1.5);

        setYarn();
    }
}

//Set amounts for each item
function setCats(){
    document.getElementById("catAmount").innerHTML = cats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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