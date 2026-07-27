function checkFizzBuzz(){

    const number=parseInt(document.getElementById("number").value);

    const result=document.getElementById("result");

    if(isNaN(number)){
        result.innerText="Please enter a valid number.";
    }
    else if(number%3===0 && number%5===0){
        result.innerText="FizzBuzz";
    }
    else if(number%3===0){
        result.innerText="Fizz";
    }
    else if(number%5===0){
        result.innerText="Buzz";
    }
    else{
        result.innerText=number;
    }

}