const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const vittoriaDiv = document.querySelector(".vittoria");
const sconfittaDiv = document.querySelector(".sconfitta");
var rowElement = 5;
var chance = 5;
var chanceUsate = 0;
var listLetter = [];
var listRow = [];
var step = 0;
var lettera = "capra";

createElement(listLetter);
setDimensionContainer(container);

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
    if (name == "Enter"){
        vittoria = true;
        if (listRow.length != rowElement){
            //not enough letter
            vittoria = false;
        }else{
            for (var i = 0; i < rowElement; i++){
                //se la lettera c'e
                if (lettera[i] == listRow[i]){
                    listLetter[chanceUsate][i].classList.add("green")
                }else if (lettera.includes(listRow[i])){
                    listLetter[chanceUsate][i].classList.add("yellow")
                    vittoria = false;
                }else{
                    vittoria = false;
                }
            }
            chanceUsate++;
            listRow = []; 
            step = 0;
        }

        if (vittoria){
            vittoriaEvent();
        }
        else if (chanceUsate == chance){
            sconfittaEvent();
        }
        return;
    }
    //se preme indietro va una lettera indietro
    if (name == "Backspace"){
        if (step > 0){
            step--;
            listLetter[chanceUsate][step].innerHTML = "";
        }
        return;
    }

    if (isLetter(name) && step != rowElement){
        listLetter[chanceUsate][step].innerHTML = name;
        listRow.push(name);
        step++;
    }
    listLetter[chanceUsate][step-1].classList.toggle("active");
});


function setDimensionContainer(container){
    container.style.setProperty("--width", rowElement*70+rowElement*5) 
    container.style.setProperty("--height", chance*70+chance*5) 
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

function vittoriaEvent(){
    vittoriaDiv.classList.add("visibile")
    btn.classList.add("visibile")
}

function sconfittaEvent(){
    sconfittaDiv.classList.add("visibile")
    btn.classList.add("visibile")
}

var openFile = function(event) {
        var input = event.target;

        var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
          console.log(text)
        }
    }