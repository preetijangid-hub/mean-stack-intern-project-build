function convertTemperature(){

    const temp = Number(document.getElementById("temperature").value);
    const from = document.getElementById("fromUnit").value;
    const to = document.getElementById("toUnit").value;
    const result = document.getElementById("result");

    if(document.getElementById("temperature").value===""){
        result.innerHTML="❌ Please enter a temperature.";
        result.style.color="red";
        return;
    }

    let celsius;

    // Convert input to Celsius
    if(from==="C"){
        celsius=temp;
    }
    else if(from==="F"){
        celsius=(temp-32)*5/9;
    }
    else{
        celsius=temp-273.15;
    }

    let finalTemp;

    // Convert Celsius to selected unit
    if(to==="C"){
        finalTemp=celsius;
    }
    else if(to==="F"){
        finalTemp=(celsius*9/5)+32;
    }
    else{
        finalTemp=celsius+273.15;
    }

    result.style.color="green";
    result.innerHTML=
    `${temp} °${from} = ${finalTemp.toFixed(2)} °${to}`;

}




function resetConverter(){

    document.getElementById("temperature").value="";
    document.getElementById("fromUnit").value="C";
    document.getElementById("toUnit").value="C";

    const result=document.getElementById("result");

    result.innerHTML="";
}