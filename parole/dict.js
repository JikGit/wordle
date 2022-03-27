var parola;
var text;
var lettere = 5;
var indexParola;

function binarySearch(items, value){
    var startIndex  = 0,
        stopIndex   = items.length - 1,
        middle      = Math.floor((stopIndex + startIndex)/2);

    while(items[middle] != value && startIndex < stopIndex){
        //adjust search area
        if (value < items[middle]){
            stopIndex = middle - 1;
        } else if (value > items[middle]){
            startIndex = middle + 1;
        }
        //recalculate middle
        middle = Math.floor((stopIndex + startIndex)/2);
    }
    //make sure it's the right value
    return (items[middle] != value) ? -1 : middle;
}

function getDict(lettere){
    if (lettere == 4){
        var dict = getDict4();
    }else if (lettere == 5){
        var dict = getDict5();
    }else if (lettere == 6){
        var dict = getDict6();
    }else if (lettere == 7){
        var dict = getDict7();
    }else if (lettere == 8){
        var dict = getDict8();
    }
    return dict;
}

function getparola(lettere){
    var dict = getDict(lettere);
    indexParola = parseInt(Math.random() * dict.length / lettere);
    parola = dict[indexParola];
    return parola;
}

function checkparola(parola, lettere){
    var dict = getDict(lettere);
    return binarySearch(dict, parola)
}
