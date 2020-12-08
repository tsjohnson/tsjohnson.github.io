
// --- global variables ---
//I make this global so I can use it later with the calculations
var totalBalance = 7219.62;

//I set up the loans array with a default value
var loans = [
    { loan_year: 0, loan_amount: 0, loan_int_rate: 0 }
  ];
//I will compare the boxes to this pattern later
regex = /[0-9]/;

//If there is something in local storage, set loans equal to that.
if (localStorage.getItem("loans") !== null){
  loans = localStorage.getItem("loans")
  loans = JSON.parse(loans);
}
//If nothing in local storage, use default values
else{
  loans = [
    { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
  ];
}

//The page wouldn't properly reload if any of the values in the array were null
//So I set anything null equal to 0
for (var x = 0; x < 5; x++){
  if (loans[x].loan_year === null) loans[x].loan_year = 0;
  if (loans[x].loan_amount === null) loans[x].loan_amount = 0;
  if (loans[x].loan_int_rate === null) loans[x].loan_int_rate = 0;
}
// --- function: loadDoc() ---
//replacement for loadDoc()
$(document).ready(function(){


  // pre-fill defaults for first loan year
  var defaultYear = loans[0].loan_year;
  $('#loan_year0' + 1).attr("value",defaultYear++);
  var defaultLoanAmount = loans[0].loan_amount;
  $('#loan_amt0' + 1).attr("value",defaultLoanAmount.toFixed(2));
  var defaultInterestRate = loans[0].loan_int_rate;
  $('#loan_int0' + 1).attr("value",defaultInterestRate);
  var loanWithInterest = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
  $('#loan_bal0' + 1).attr("value",toComma(loanWithInterest.toFixed(2)));

  // pre-fill defaults for other loan years

  for(var i=2; i<6; i++) {
    //put the id in the beginning parenthesis, followed by the method, followed by the attribute and value.
    //It's mostly just shifting things around.
    $('#loan_year0' + i).attr("value",defaultYear++);
    $('#loan_year0' + i).attr("disabled",true);
    $('#loan_year0' + i).css("backgroundColor","gray");
    $('#loan_year0' + i).css("color","white");
    $('#loan_amt0' + i).attr("value", loans[i-1].loan_amount.toFixed(2));
    $('#loan_int0' + i).attr("value", defaultInterestRate);
    $('#loan_int0' + i).attr("disabled", true);
    $('#loan_int0' + i).css("backgroundColor", "gray");
    $('#loan_int0' + i).css("color", "white");
    //calculate the default interest
    loanWithInterest = (loanWithInterest + defaultLoanAmount) * (1 + defaultInterestRate);
    //plug the default interest into the YE Bal Collumn
    $('#loan_bal0' + i).attr("value", toComma(loanWithInterest.toFixed(2)));


    } // end: "for" loop

  // all input fields: select contents on fucus
  $("input[type=text]").focus(function() {
    $(this).select();
    $(this).css("background-color", "yellow");
  });
  //Every time you unfocus something, make sure what was unfocused is proper.
  $("input[type=text]").blur(function() {
    $(this).css("background-color", "white");
    if (!regex.test(parseInt($(this).val()))){
      //If it's not proper then highlight it in red
      $(this).css("background-color", "red");
    }
  });

  // set focus to first year: messes up codepen
  // $("#loan_year01").focus();
  $("#loan_year01").blur( function() {
    updateLoansArray();
  });

  for (var i = 0; i < 5; i++){
    var balance = 0;
    balance = ((loans[i].loan_int_rate+1)*(loans[i].loan_amount+balance)).toFixed(2);
    $("#loan_bal0"+ (i+1) ).text("$"+ balance);
  }
  updateLoansArray();
}); // end: function loadDoc()


function toComma(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateLoansArray() {

  //Sets the initial year and interest to the values in the first boxes
  loans[0].loan_year = parseInt($("#loan_year01").val());
  loans[0].loan_int_rate = parseFloat($("#loan_int01").val());
  //create variables
  var accrued = 0.0;
  var balance = 0.0;
  var interest = 0.0;
  //loop through every object in loans
  for(var i=0; i<5; i++) {
    //Set the text in the year box to the initial year + i which will be an extra year each time
    loans[i].loan_year = loans[0].loan_year + i;
    //turns the text in the amount box into a number and stores it in the loans array
    loans[i].loan_amount = parseFloat($("#loan_amt0" + (i+1)).val());
    //sets every interest rate equal to the first
    loans[i].loan_int_rate = loans[0].loan_int_rate;
    //puts whats in the array onto the table
    $("#loan_year0"+ (i+1) ).val(loans[i].loan_year);
    $("#loan_int0"+ (i+1) ).val(loans[0].loan_int_rate);
    //calculates the year end balance
    balance = ((loans[i].loan_int_rate+1)*(loans[i].loan_amount+accrued)).toFixed(2);
    totalBalance = ((loans[i].loan_int_rate+1)*(loans[i].loan_amount+accrued));
    //writes the year end balance
    $("#loan_bal0"+ (i+1) ).text("$"+ balance);
    //stores the year end balance in accrued, two variables might be uneccessary
    accrued = parseFloat(balance);
    //prepares for localStorage and sends to localStorage
    pack = JSON.stringify(loans);
    localStorage.setItem("loans", pack);
  }
  interest = balance - loans[0].loan_amount - loans[1].loan_amount - loans[2].loan_amount - loans[3].loan_amount - loans[4].loan_amount;
  $("#loan_int_accrued").text(interest.toFixed(2));
}

//angular setup
let app = angular.module("myPayments", []);
app.controller("myController", function($scope) {


  //This is called when the button is clicked
  $scope.processForm = function () {
    //I make the data object readable by the html part by adding $scope to it.
    $scope.data = [];
    let year = [];
    let totalDebt = totalBalance;
    let bal = totalDebt;
    let endyear = loans[4].loan_year;
    //This gets it payed back in 10 years.
    let pay = totalBalance/8;
    let int_rt = loans[0].loan_int_rate;
    let int_amt = 0;
    for (let x = 0; x < 9; x++){
      bal = bal - pay;
      int_amt = (bal*int_rt);
      bal = bal + int_amt
      $scope.data[x] = {year: endyear + 1 + x, payment: pay.toFixed(2), inter: int_amt.toFixed(2), balan: bal.toFixed(2)};
    }
    $scope.data[9] = {year: endyear + 10, payment: bal.toFixed(2), inter: (0).toFixed(2), balan: (0).toFixed(2)};
    $("table:nth-child(3)").css("background-color", "yellow")
  }

});
