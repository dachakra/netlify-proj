
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function Func() {   
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "https://reqbin.com/echo/get/json");
  oReq.send(null);
  return oReq.responseText;
}
const transaction = Sentry.startTransaction({ name: "testTransaction" });
const first_span = transaction.startChild({ op: "firstSpan" }); 
const second_span = transaction.startChild({ op: "secondSpan" }); 

function test() { 
  Func(); 
  sleep(4000); 
}
test();
first_span.setTag("customerType", "teamPlan");
first_span.finish(); // Remember that only finished spans will be sent with the transaction

function test2() { 
  Func(); 
  sleep(4000); 
}
test2();
second_span.setTag("customerType", "businessPlan")
second_span.finish(); // Remember that only finished spans will be sent with the transaction
transaction.finish(); // Finishing the transaction will send it to Sentry

