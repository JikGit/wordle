var parola;
var text;
var indexParola;

function binarySearch(arr, val, start = 0, end = arr.length - 1) {
  const mid = Math.floor((start + end) / 2);

  if (val === arr[mid]) {
    return mid;
  }

  if (start >= end) {
    return -1;
  }

  return val < arr[mid]
    ? binarySearch(arr, val, start, mid - 1)
    : binarySearch(arr, val, mid + 1, end);
}

function getDict(lettere){
    if (lettere == 4){
        return getDict4();
    }else if (lettere == 5){
        return getDict5();
    }else if (lettere == 6){
        return getDict6();
    }else if (lettere == 7){
        return getDict7();
    }else if (lettere == 8){
        return getDict8();
    }
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
