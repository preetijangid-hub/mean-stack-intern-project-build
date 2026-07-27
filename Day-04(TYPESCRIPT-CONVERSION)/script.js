// Student Manager (JavaScript)

const students = [];

function addStudent(id, name, age, course, status) {

    const student = {
        id,
        name,
        age,
        course,
        status
    };

    students.push(student);

}

function getStudent(id) {

    return students.find(student => student.id === id);

}

function printStudents() {

    students.forEach(student => {

        console.log(
            `${student.id} | ${student.name} | ${student.age} | ${student.course} | ${student.status}`
        );

    });

}

function updateStatus(id, status) {

    const student = getStudent(id);

    if (student) {

        student.status = status;

    }

}

addStudent(1, "Preeti", 22, "Mean Stack", "Active");

addStudent(2, "Rahul", 21, "Data Science", "Inactive");

updateStatus(2, "Active");

printStudents();