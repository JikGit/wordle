const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const vittoriaDiv = document.querySelector(".vittoria");
const sconfittaDiv = document.querySelector(".sconfitta");
const sconfittaText = document.querySelector(".sconfitta>p");
const errore = document.querySelector(".errore");
const menuButton = document.getElementById("menuButton");
const closeMenuButton = document.querySelector("#menuDisplay > div");
const menuDisplay = document.getElementById("menuDisplay");
const btnLettere = document.querySelector(".form-input div.submit");

var rowElement;
var chance;
var chanceUsate;
var listLetter = [];
var listRow = [];
var step;
var parola;
var nChance = 7;
var nLettere = 5;
resetAllValue(nLettere, nChance);
createElement(listLetter);
setDimensionContainer(container);

//MENU
btnLettere.addEventListener("click", () => {
    var radios = document.getElementsByName('lettere');
    for (var radio of radios) {
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
//menu
closeMenuButton.addEventListener("click", () => {
    menuDisplay.classList.remove("visibile")
})
//menu
menuButton.addEventListener("click", () => {
    menuDisplay.classList.add("visibile")
})
//menu
btn.addEventListener("click", () => {
    for (var x = 0; x < chanceUsate; x++) {
        for (var i = 0; i < rowElement; i++) {
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
    parola = getparola(rowElement);
})


function resetAllValue(lettere, nChance) {
    rowElement = lettere;
    chance = nChance;
    chanceUsate = 0;
    listLetter = [];
    listRow = [];
    step = 0;
    parola = getparola(rowElement);
}


function setDimensionContainer(container) {
    container.style.setProperty("--width", rowElement * 70 + rowElement * 5)
    container.style.setProperty("--height", chance * 70 + chance * 5)
}

function removeElement() {
    var allElement = document.querySelectorAll(".letter");
    for (elm of allElement) {
        container.removeChild(elm);
    }
}

function createElement(listLetter) {
    for (var i = 0; i < chance; i++) {
        listLetter.push([]);
    }

    for (var i = 0; i < rowElement * chance; i++) {
        const elm = document.createElement("div");
        elm.classList.add("letter");
        listLetter[Math.floor(i / rowElement)].push(elm);
        container.appendChild(elm);
    }
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function toggleSpin(listLetter, chanceUsate) {
    for (var i = 0; i < rowElement; i++) {
        listLetter[chanceUsate][i].classList.toggle("spin");
        listLetter[chanceUsate][i].style.setProperty("--delaySpin", i / 7);
    }
}

document.addEventListener("keyup", (e) => {
    let name = String(e.key);
    if (btn.classList.contains("visibile")) {
        return;
    }
    //premo enter
    if (name == "Enter"){
        var tempParola = parola;
        if (listRow.length != rowElement || checkparola(listRow.join(''), rowElement) == -1) {
            //ERRORE
            shakeTiles(document.querySelectorAll(".letter.active"));
            errore.classList.add("visibile");
            setTimeout(function () {
                errore.classList.remove("visibile");
            }, 1000);
        } else {
            //prima controllo per i verdi, cosi' se ci sono due lettere uguali una verde e l'altra gialla
            for (var i = 0; i < rowElement; i++) {
                listLetter[chanceUsate][i].classList.remove("active");
                //se la lettera c'e
                if (tempParola[i] == listRow[i]) {
                    tempParola = tempParola.substring(0, i) + " " + tempParola.substring(i + 1);
                    listLetter[chanceUsate][i].classList.add("green")
                }
            }

            for (var i = 0; i < rowElement; i++) {
                if (tempParola.includes(listRow[i])) {
                    listLetter[chanceUsate][i].classList.add("yellow")
                }else if (!tempParola.includes(listRow[i])) {
                    document.querySelector(".keyboard-button." + listRow[i]).style.opacity = "50%";
                }
            }
            //spin
            toggleSpin(listLetter, chanceUsate);
            chanceUsate++;

            //check per vittoria
            if (parola == listRow.join('')) {
                vittoriaDiv.classList.add("visibile")
                btn.classList.add("visibile")
            }
            //check per sconfitta
            else if (chanceUsate == chance) {
                sconfittaDiv.classList.add("visibile")
                sconfittaText.innerHTML += parola;
                btn.classList.add("visibile")
            }
            //aggiorno valori
            listRow = [];
            step = 0;
        }
        return;
    }
    //se preme indietro va una lettera indietro
    else if (name == "Del" || name == "Backspace") {
        if (step > 0) {
            step--;
            listLetter[chanceUsate][step].innerHTML = "";
            listRow.pop();
            listLetter[chanceUsate][step].classList.remove("active");
        }
        return;
    }
    //lettera accettata
    else if (isLetter(name) && step != rowElement) {
        listLetter[chanceUsate][step].innerHTML = name;
        listLetter[chanceUsate][step].classList.add("active");
        listRow.push(name);
        step++;
    }
})

//SE PREMO I TASTI METTE UN EVENT INPUT CON QUEL TASTO
document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    const key = target.textContent;
    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

function shakeTiles(tiles) {
    tiles.forEach(tile => {
        tile.classList.add("shake")
        tile.addEventListener(
        "animationend",
        () => {
            tile.classList.remove("shake")
            },
        { once: true }
        )
    })
}