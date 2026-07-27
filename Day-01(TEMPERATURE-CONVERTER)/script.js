function convertTemperature(){

    const temperature =
        parseFloat(document.getElementById("temperature").value);

    const conversion =
        document.getElementById("conversion").value;

    const result =
        document.getElementById("result");

    if(isNaN(temperature)){
        result.innerHTML="Please enter a valid temperature.";
        return;
    }

    let converted;

    if(conversion==="ctof"){

        converted=(temperature*9/5)+32;

        result.innerHTML=
        `${temperature} °C = ${converted.toFixed(2)} °F`;

    }

    else{

        converted=(temperature-32)*5/9;

        result.innerHTML=
        `${temperature} °F = ${converted.toFixed(2)} °C`;

    }

}