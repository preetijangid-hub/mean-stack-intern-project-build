// Student Manager (TypeScript)

// Type Alias
type Status = "Active" | "Inactive";

// Enum
enum Course {
    MeanStack = "Mean Stack",
    DataScience = "Data Science",
    AIML = "AI & ML"
}

// Interface
interface Student {
    id: number;
    name: string;
    age: number;
    course: Course;
    status: Status;
}

// Generic Function
function createItem<T>(item: T): T {
    return item;
}

const students: Student[] = [];

// Add Student
function addStudent(
    id: number,
    name: string,
    age: number,
    course: Course,
    status: Status
): void {

    const student: Student = {
        id,
        name,
        age,
        course,
        status
    };

    students.push(createItem(student));
}

// Get Student
function getStudent(id: number): Student | undefined {

    return students.find(student => student.id === id);

}

// Update Status
function updateStatus(
    id: number,
    status: Status
): void {

    const student = getStudent(id);

    if (student) {
        student.status = status;
    }

}

// Print Students
function printStudents(): void {

    students.forEach(student => {

        console.log(
            `${student.id} | ${student.name} | ${student.age} | ${student.course} | ${student.status}`
        );

    });

}

// Sample Data

addStudent(
    1,
    "Preeti",
    22,
    Course.MeanStack,
    "Active"
);

addStudent(
    2,
    "Rahul",
    21,
    Course.DataScience,
    "Inactive"
);

addStudent(
    3,
    "Anjali",
    23,
    Course.AIML,
    "Active"
);

updateStatus(2, "Active");

printStudents();