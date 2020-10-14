let elem = [];
// assign the entire table row for hole 1 to a variable, elem
for (let i = 1; i<=18; i++){
elem[i]  = document.getElementById(i);
}

elem[19] = document.getElementById("totals");
// display the number of children (all td elements)
// console.log(elem.children.length);
// display the content of the + button, which is the first child of the fifth element
// console.log(elem.children[4].children[0]);
// assign a function to the + button

for (let i = 1; i<=18; i++){
  elem[i].children[4].children[0].onclick
    = function(){add1(elem[i]);};
  }

for (let i = 1; i<=18; i++){
  elem[i].children[4].children[1].onclick
    = function(){sub1(elem[i]);};
  }
for (let i = 1; i<=18; i++){
  elem[i].children[4].children[2].onclick
    = function(){clear(elem[i]);};
  }

updateTot(elem);
elem[19].children[2].innerHTML = "-";
elem[19].children[3].innerHTML = 0;
// create an "add1" function
function add1 (elem) {
  if(elem.children[2].innerHTML == "-")
    elem.children[2].innerHTML = "1";
  else {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    currentScore = currentScore + 1;
    elem.children[2].innerHTML = currentScore;

  }

  let currentScore = elem.children[2].innerHTML;
  currentScore = Number.parseInt(currentScore);
  let currentPar = elem.children[1].innerHTML;
  currentPar = Number.parseInt(currentPar);

  if (elem.children[2].innerHTML == "-")
    elem.children[3].innerHTML = "-";
  else elem.children[3].innerHTML = currentScore - currentPar;
  updateScore();

}

// create an "sub1" function
function sub1 (elem) {
  if(elem.children[2].innerHTML == "-" || elem.children[2].innerHTML == "1" )
    elem.children[2].innerHTML = "-";
  else {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    currentScore = currentScore - 1;
    elem.children[2].innerHTML = currentScore;

  }

  let currentScore = elem.children[2].innerHTML;
  currentScore = Number.parseInt(currentScore);
  let currentPar = elem.children[1].innerHTML;
  currentPar = Number.parseInt(currentPar);

  if (elem.children[2].innerHTML == "-")
    elem.children[3].innerHTML = "-";
  else elem.children[3].innerHTML = currentScore - currentPar;
  updateScore();
}

// create an "clear" function
function clear (elem) {
  elem.children[2].innerHTML = "-";
  elem.children[3].innerHTML = "-";
  updateScore();
}

function updateTot(elem){
  let total = 0;
  for (let i = 1; i<19; i++){
    total = total + Number.parseInt(elem[i].children[1].innerHTML);
  }
  elem[19].children[1].innerHTML = total;
}

function updateScore(){
  let total = 0;
  for (let i = 1; i<19; i++){
    if(elem[i].children[2].innerHTML > 0)
    total = total + Number.parseInt(elem[i].children[2].innerHTML);
  }
  elem[19].children[2].innerHTML = total;
  if (total == 0) elem[19].children[2].innerHTML = "-";
  updateOver();
}

function updateOver(){
  let total = 0;
  for (let i = 1; i<19; i++){
    if(elem[i].children[3].innerHTML != "-")
    total = total + Number.parseInt(elem[i].children[3].innerHTML);
  }
  elem[19].children[3].innerHTML = total;
}
