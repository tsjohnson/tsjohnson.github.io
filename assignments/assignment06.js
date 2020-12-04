// --- global variables ---
//I set up the loans array with a default value
var loans = [
    { loan_year: 0, loan_amount: 0, loan_int_rate: 0 }
  ];
//I will compare the boxes to this pattern later
regex = /[0-9]/;

//If there is something in local storage, set loans equal to that.
if (localStorage.length > 0){
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
  $("input[type=text]").blur(function() {
    $(this).css("background-color", "white");
    if (!regex.test(parseInt($(this).val()))){
      $(this).css("background-color", "red");
    }
  });

  // set focus to first year: messes up codepen
  // $("#loan_year01").focus();
  $("#loan_year01").blur( function() {
    updateLoansArray();
  });

}); // end: function loadDoc()


function toComma(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateLoansArray() {

  //Sets the initial year and interest to the values in the first boxes
  loans[0].loan_year = parseInt($("#loan_year01").val());
  loans[0].loan_int_rate = parseFloat($("#loan_int01").val());
  //create variables
  var accrued = 0;
  var balance = 0;
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
    //writes the year end balance
    $("#loan_bal0"+ (i+1) ).text("$"+ balance);
    //stores the year end balance in accrued, two variables might be uneccessary
    accrued = parseFloat(balance);
    //prepares for localStorage and sends to localStorage
    pack = JSON.stringify(loans);
    localStorage.setItem("loans", pack);
  }

//check();
}
/*
function check(){
  for (var j = 1; j < 6; j++){
    //regex is any patern [1-9] as declared at the beginning
    //This checks for if value in the top box in the year collumn does not follow the pattern
    if (!regex.test(parseInt($("#loan_year0" + j).val()))){
      //If it doesn't follow the pattern then the box will be red.
      $('#loan_year0' + j).css("backgroundColor","red");
    }
    console.log((parseFloat($("#loan_int0" + j).val())));
    //this does the same as above but for the interest rate
    if (!regex.test(parseFloat($("#loan_int0" + j).val()))){
      console.log(!regex.test(parseFloat($("#loan_int0" + j).val())));
      $('#loan_int0' + j).css("backgroundColor", "red");
    }

    if (!regex.test(parseInt($("#loan_amt0"+ j).val()))){
      $("#loan_amt0"+ j).css("backgroundColor","red");
    }

  }
}
*/
