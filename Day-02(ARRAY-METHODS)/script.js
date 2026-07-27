const output = document.getElementById("output");

// ===============================
// Card Function
// ===============================

function createCard(title, problem, method, input, outputData, code) {

    output.innerHTML += `
    <div class="card">

        <h2>${title}</h2>

        <p class="problem"><b>Problem:</b> ${problem}</p>

        <p class="method"><b>Method:</b> ${method}</p>

        <p><b>Input:</b> ${input}</p>

        <div class="output">
            Output : ${outputData}
        </div>

        <button class="toggle-btn">
            Show Code
        </button>

        <pre class="code">${code}</pre>

    </div>
    `;

}

// ===============================
// Question 1
// Double Numbers
// ===============================

const numbers1 = [1,2,3,4];

const result1 = numbers1.map(num => num * 2);

createCard(

"Question 1",

"Double every number of the array.",

"map()",

JSON.stringify(numbers1),

JSON.stringify(result1),

`const numbers1 = [1,2,3,4];

const result1 = numbers1.map(num => num * 2);`

);


// ===============================
// Question 2
// Even Numbers
// ===============================

const numbers2 = [1,2,3,4,5,6];

const result2 = numbers2.filter(num => num % 2 === 0);

createCard(

"Question 2",

"Find all even numbers.",

"filter()",

JSON.stringify(numbers2),

JSON.stringify(result2),

`const numbers2 = [1,2,3,4,5,6];

const result2 = numbers2.filter(num => num % 2 === 0);`

);



// ===============================
// Question 3
// Sum of Array
// ===============================

const numbers3 = [10,20,30,40];

const result3 = numbers3.reduce((sum, num) => sum + num, 0);

createCard(

"Question 3",

"Find the sum of all numbers.",

"reduce()",

JSON.stringify(numbers3),

JSON.stringify(result3),

`const numbers3 = [10,20,30,40];

const result3 = numbers3.reduce((sum, num) => sum + num, 0);`

);


// ===============================
// Question 4
// Odd Numbers Squared
// ===============================

const numbers4 = [1,2,3,4,5,6];

const result4 = numbers4
    .filter(num => num % 2 !== 0)
    .map(num => num * num);

createCard(

"Question 4",

"Filter odd numbers and square them.",

"filter() + map()",

JSON.stringify(numbers4),

JSON.stringify(result4),

`const numbers4 = [1,2,3,4,5,6];

const result4 = numbers4
    .filter(num => num % 2 !== 0)
    .map(num => num * num);`

);



// ===============================
// Question 5
// Adults Only
// ===============================

const users = [
    { name: "Preeti", age: 23 },
    { name: "Ram", age: 20 },
    { name: "Siya", age: 16 },
    { name: "Arhaan", age: 25 }
];

const result5 = users
    .filter(user => user.age >= 18)
    .map(user => user.name);

createCard(

"Question 5",

"Get the names of users whose age is 18 or above.",

"filter() + map()",

JSON.stringify(users),

JSON.stringify(result5),

`const users = [
    { name: "Preeti", age: 23 },
    { name: "Ram", age: 20 },
    { name: "Siya", age: 16 },
    { name: "Arhaan", age: 25 }
];

const result5 = users
    .filter(user => user.age >= 18)
    .map(user => user.name);`

);


// ===============================
// Question 6
// Total Product Price
// ===============================

const products = [
    { name: "Laptop", price: 50000 },
    { name: "Mouse", price: 1000 },
    { name: "Keyboard", price: 2000 }
];

const result6 = products.reduce(

(total, product) => total + product.price,

0

);

createCard(

"Question 6",

"Calculate the total price of all products.",

"reduce()",

JSON.stringify(products),

`₹ ${result6}`,

`const products = [
    { name: "Laptop", price: 50000 },
    { name: "Mouse", price: 1000 },
    { name: "Keyboard", price: 2000 }
];

const result6 = products.reduce(

(total, product) => total + product.price,

0

);`

);


// ===============================
// Question 7
// Students Scoring 60+
// ===============================

const students = [
    { name: "Preeti", marks: 85 },
    { name: "Ram", marks: 72 },
    { name: "Siya", marks: 55 },
    { name: "Arhaan", marks: 91 }
];

const result7 = students
    .filter(student => student.marks >= 60)
    .map(student => student.name.toUpperCase());

createCard(

"Question 7",

"Get the names of students scoring 60 or above in uppercase.",

"filter() + map()",

JSON.stringify(students),

JSON.stringify(result7),

`const students = [
    { name: "Preeti", marks: 85 },
    { name: "Ram", marks: 72 },
    { name: "Siya", marks: 55 },
    { name: "Arhaan", marks: 91 }
];

const result7 = students
    .filter(student => student.marks >= 60)
    .map(student => student.name.toUpperCase());`

);


// ===============================
// Question 8
// Add GST (18%)
// ===============================

const products2 = [
    { name: "Laptop", price: 50000 },
    { name: "Mouse", price: 1000 },
    { name: "Keyboard", price: 2000 }
];

const result8 = products2.map(product => ({
    ...product,
    price: product.price * 1.18
}));

createCard(

"Question 8",

"Add 18% GST to every product price.",

"map()",

JSON.stringify(products2),

JSON.stringify(result8, null, 2),

`const products2 = [
    { name: "Laptop", price: 50000 },
    { name: "Mouse", price: 1000 },
    { name: "Keyboard", price: 2000 }
];

const result8 = products2.map(product => ({
    ...product,
    price: product.price * 1.18
}));`

);



// ===============================
// Question 9
// Highest Number
// ===============================

const numbers9 = [25, 90, 14, 67, 120, 45];

const result9 = numbers9.reduce((max, num) =>
    num > max ? num : max
);

createCard(

"Question 9",

"Find the highest number from the array.",

"reduce()",

JSON.stringify(numbers9),

JSON.stringify(result9),

`const numbers9 = [25, 90, 14, 67, 120, 45];

const result9 = numbers9.reduce((max, num) =>
    num > max ? num : max
);`

);


// ===============================
// Question 10
// Method Chaining
// ===============================

const numbers10 = [1,2,3,4,5,6,7,8,9,10];

const result10 = numbers10
    .filter(num => num % 2 === 0)
    .map(num => num * 2)
    .reduce((sum, num) => sum + num, 0);

createCard(

"Question 10",

"Filter even numbers, double them and calculate the total sum.",

"filter() → map() → reduce()",

JSON.stringify(numbers10),

JSON.stringify(result10),

`const numbers10 = [1,2,3,4,5,6,7,8,9,10];

const result10 = numbers10
    .filter(num => num % 2 === 0)
    .map(num => num * 2)
    .reduce((sum, num) => sum + num, 0);`

);


// ===============================
// Show / Hide Code
// ===============================

const buttons = document.querySelectorAll(".toggle-btn");

buttons.forEach(button => {

    button.addEventListener("click", function(){

        const code = this.nextElementSibling;

        if(code.style.display === "block"){

            code.style.display = "none";
            this.innerText = "Show Code";

        }else{

            code.style.display = "block";
            this.innerText = "Hide Code";

        }

    });

});