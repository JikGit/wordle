const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const vittoriaDiv = document.querySelector(".vittoria");
const sconfittaDiv = document.querySelector(".sconfitta");
const sconfittaText = document.querySelector(".sconfitta>p");
const menuButton = document.getElementById("menuButton");
const closeMenuButton = document.querySelector("#menuDisplay > div");
const menuDisplay = document.getElementById("menuDisplay");
const btnLettere = document.querySelector(".form-input div.submit");

var rowElement = 5;
var chance = 5;
var chanceUsate = 0;
var listLetter = [];
var listRow = [];
var step = 0;
var parola = getWord(rowElement);

createElement(listLetter);
setDimensionContainer(container);

btnLettere.addEventListener("click", () => {
    var radios = document.getElementsByName('lettere');
    for (var radio of radios){
        if (radio.checked) {
            listLetter = [];
            chanceUsate = 0;
            listRow = [];
            step = 0;
            rowElement = radio.value;
            removeElement();
            createElement(listLetter);
            setDimensionContainer(container);
            parola = getWord(rowElement);
        }
    }
    menuDisplay.classList.remove("visibile")

})

closeMenuButton.addEventListener("click", () => {
    menuDisplay.classList.remove("visibile")
})

menuButton.addEventListener("click", () => {
    addVisible(menuDisplay);
})


btn.addEventListener("click", () => {
    for (var x = 0; x < chanceUsate; x++){
        for (var i = 0; i < rowElement; i++){
            listLetter[x][i].innerHTML = "";
            listLetter[x][i].classList.remove("green")
            listLetter[x][i].classList.remove("yellow")
        }
    }
    listRow = []; 
    step = 0;
    chanceUsate = 0;
    vittoriaDiv.classList.remove("visibile")
    sconfittaDiv.classList.remove("visibile")
    btn.classList.remove("visibile")
})

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var vittoria;

    if (btn.classList.contains("visibile")){
        return;
    }
    //premo enter
    if (name == "Enter"){
        if (listRow.length != rowElement || checkWord(listRow.join(''), rowElement) == -1){    
            return;
        }else{
            for (var i = 0; i < rowElement; i++){
            listLetter[chanceUsate][i].classList.remove("active");
                //se la lettera c'e
                if (parola[i] == listRow[i]){
                    listLetter[chanceUsate][i].classList.add("green")
                }else if (parola.includes(listRow[i])){
                    listLetter[chanceUsate][i].classList.add("yellow")
                }
            }
            //spin
            spin(listLetter, chanceUsate);
            chanceUsate++;

            if (parola == listRow.join('')){
                addVisible(vittoriaDiv);
                addVisible(btn);
            }
            else if (chanceUsate == chance){
                addVisible(sconfittaDiv);
                sconfittaText.innerHTML += parola;
                addVisible(btn);
            }

            listRow = []; 
            step = 0;

        }
        return;
    }
    //se preme indietro va una lettera indietro
    else if (name == "Backspace"){
        if (step > 0){
            step--;
            listLetter[chanceUsate][step].innerHTML = "";
            listRow.pop();
        }
        return;
    }

    else if (isLetter(name) && step != rowElement){
        listLetter[chanceUsate][step].innerHTML = name;
        listRow.push(name);
        step++;
    }
    else{
        return
    }
    listLetter[chanceUsate][step-1].classList.add("active");
});


function setDimensionContainer(container){
    container.style.setProperty("--width", rowElement*70+rowElement*5) 
    container.style.setProperty("--height", chance*70+chance*5) 
}

function removeElement(){
    var allElement = document.querySelectorAll(".letter");
    for (elm of allElement){
        container.removeChild(elm);
    }
}

function createElement(listLetter){
	for(var i=0; i<chance; i++) {
	    listLetter.push([]);
	}

    for (var i = 0; i < rowElement*chance; i++){
        const elm = document.createElement("div");
        elm.classList.add("letter");
        listLetter[Math.floor(i/rowElement)].push(elm);
        container.appendChild(elm);
    }
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function addVisible(element){
    element.classList.add("visibile")
}

function spin(listLetter, chanceUsate){
    for (var i = 0; i < rowElement; i++){
        listLetter[chanceUsate][i].classList.add("spin")
        listLetter[chanceUsate][i].style.setProperty("--delaySpin", i/7)
    }
}
function clearSpin(){
    for (var i = 0; i < rowElement; i++){
        listLetter[chanceUsate][i].classList.remove("spin")
    }
}
