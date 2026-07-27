const output = document.getElementById("output");

function createCard(title, method, input, outputValue, code){

output.innerHTML+=`

<div class="card">

<h2>${title}</h2>

<p><b>Method:</b> ${method}</p>

<p><b>Input:</b> ${input}</p>

<p><b>Output:</b> ${outputValue}</p>

<button onclick="toggleCode(this)">
Show / Hide Code
</button>

<pre class="code">${code}</pre>

</div>

`;

}

function toggleCode(button){

const code=button.nextElementSibling;

code.style.display=
code.style.display==="block"
?
"none"
:
"block";

}



// Question 1

const numbers1=[1,2,3,4];

const result1=numbers1.map(num=>num*2);

createCard(

"Question 1",

"map()",

numbers1,

result1,

`const result=numbers.map(num=>num*2);`

);



// Question 2

const numbers2=[1,2,3,4,5,6];

const result2=numbers2.filter(num=>num%2===0);

createCard(

"Question 2",

"filter()",

numbers2,

result2,

`const result=numbers.filter(num=>num%2===0);`

);



// Question 3

const numbers3=[10,20,30];

const result3=numbers3.reduce((sum,num)=>sum+num,0);

createCard(

"Question 3",

"reduce()",

numbers3,

result3,

`const result=numbers.reduce((sum,num)=>sum+num,0);`

);



// Question 4

const numbers4=[1,2,3,4,5,6];

const result4=numbers4

.filter(num=>num%2!==0)

.map(num=>num*num);

createCard(

"Question 4",

"filter()+map()",

numbers4,

result4,

`const result=numbers.filter(...).map(...);`

);



// Question 5

const users=[

{name:"Preeti",age:23},

{name:"Ram",age:20},

{name:"Siya",age:16},

{name:"Arhaan",age:25}

];

const result5=users

.filter(user=>user.age>=18)

.map(user=>user.name);

createCard(

"Question 5",

"filter()+map()",

"Users",

result5,

`const result=users.filter(...).map(...);`

);



// Question 6

const products=[

{name:"Laptop",price:50000},

{name:"Mouse",price:1000},

{name:"Keyboard",price:2000}

];

const result6=products.reduce(

(total,item)=>total+item.price,

0

);

createCard(

"Question 6",

"reduce()",

"Products",

"₹"+result6,

`const total=products.reduce(...);`

);



// Question 7

const students=[

{name:"Preeti",marks:85},

{name:"Ram",marks:72},

{name:"Siya",marks:55},

{name:"Arhaan",marks:91}

];

const result7=students

.filter(student=>student.marks>=60)

.map(student=>student.name.toUpperCase());

createCard(

"Question 7",

"filter()+map()",

"Students",

result7,

`students.filter(...).map(...);`

);



// Question 8

const result8=products.map(product=>({

...product,

price:(product.price*1.18).toFixed(2)

}));

createCard(

"Question 8",

"map()",

"Products",

JSON.stringify(result8),

`products.map(...);`

);



// Question 9

const numbers9=[25,90,14,67,120,45];

const result9=numbers9.reduce(

(max,num)=>num>max?num:max

);

createCard(

"Question 9",

"reduce()",

numbers9,

result9,

`numbers.reduce(...);`

);



// Question 10

const numbers10=[1,2,3,4,5,6,7,8,9,10];

const result10=numbers10

.filter(num=>num%2===0)

.map(num=>num*2)

.reduce((sum,num)=>sum+num,0);

createCard(

"Question 10",

"filter → map → reduce",

numbers10,

result10,

`numbers.filter(...).map(...).reduce(...);`

);