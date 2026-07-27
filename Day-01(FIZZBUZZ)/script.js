function fizzBuzz(number){

    if(typeof number !== "number" || Number.isNaN(number)){

        return "Invalid Input";
    }

    if(!Number.isInteger(number)){

        return "Please enter an integer.";
    }

    if(number % 3 === 0 && number % 5 === 0){

        return "FizzBuzz";
    }

    if(number % 3 === 0){

        return "Fizz";
    }

    if(number % 5 === 0){

        return "Buzz";
    }

    return number;
}

// Handles UI Interaction


function checkFizzBuzz(){

    const input = document.getElementById("numberInput").value;

    if(input.trim()===""){

        document.getElementById("result").innerHTML="Please enter a number.";

        return;
    }

    const number = Number(input);

    const result = fizzBuzz(number);

    document.getElementById("result").innerHTML=result;
}