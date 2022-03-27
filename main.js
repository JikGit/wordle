const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const vittoriaDiv = document.querySelector(".vittoria");
const sconfittaDiv = document.querySelector(".sconfitta");
const sconfittaText = document.querySelector(".sconfitta>p");
const menuButton = document.getElementById("menuButton");
const closeMenuButton = document.querySelector("#menuDisplay > div");
const menuDisplay = document.getElementById("menuDisplay");
const btnLettere = document.querySelector(".form-input div.submit");
const inputContainer = document.querySelector(".container > input");

var rowElement;
var chance;
var chanceUsate;
var listLetter = [];
var listRow = [];
var step;
var parola;
resetAllValue(5, 5);
createElement(listLetter);
setDimensionContainer(container);

btnLettere.addEventListener("click", () => {
    var radios = document.getElementsByName('lettere');
    for (var radio of radios){
        if (radio.checked) {
            removeElement();
            resetAllValue(radio.value, 5);
            createElement(listLetter);
            setDimensionContainer(container);
            parola = getparola(rowElement);
        }
    }
    menuDisplay.classList.remove("visibile")
})

closeMenuButton.addEventListener("click", () => {
    menuDisplay.classList.remove("visibile")
})

menuButton.addEventListener("click", () => {
    menuDisplay.classList.add("visibile")
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

// document.addEventListener('keyup', function keyPressed(event, phone = false) {
inputContainer.addEventListener("keyup", (event) => {
    var name = event.key;        

    if (btn.classList.contains("visibile")){
        return;
    }
    //premo enter
    if (name == "Enter"){
        if (listRow.length != rowElement || checkparola(listRow.join(''), rowElement) == -1){    
            return;
        }else{
            //prima controllo per i vardi, cosi' se ci sono due lettere uguali una verde e l'altra gialla
            for (var i = 0; i < rowElement; i++){
                listLetter[chanceUsate][i].classList.remove("active");
                //se la lettera c'e
                if (parola[i] == listRow[i]){
                    parola = parola.substring(0, i) + " " + parola.substring(i + 1);
                    listLetter[chanceUsate][i].classList.add("green")
                }
            }

            for (var i = 0; i < rowElement; i++){
                if (parola.includes(listRow[i])){
                    listLetter[chanceUsate][i].classList.add("yellow")
                }
            }
            //spin
            toggleSpin(listLetter, chanceUsate);
            chanceUsate++;

            if (parola == listRow.join('')){
                vittoriaDiv.classList.add("visibile")
                btn.classList.add("visibile")
            }
            else if (chanceUsate == chance){
                sconfittaDiv.classList.add("visibile")
                sconfittaText.innerHTML += parola;
                btn.classList.add("visibile")
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
    // listLetter[chanceUsate][step-1].classList.add("active");
});

function resetAllValue(lettere, nChance){
    rowElement = lettere;
    chance = nChance;
    chanceUsate = 0;
    listLetter = [];
    listRow = [];
    step = 0;
    parola = getparola(rowElement);
}


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

function toggleSpin(listLetter, chanceUsate){
    for (var i = 0; i < rowElement; i++){
        listLetter[chanceUsate][i].classList.toggle("spin");
        listLetter[chanceUsate][i].style.setProperty("--delaySpin", i/7);
    }
}




















































































