
//아래 있는 것은 익명함수
var a = function () {
  console.log('A');
}

function slowfunc(king) {
  king();
}

slowfunc(a);
