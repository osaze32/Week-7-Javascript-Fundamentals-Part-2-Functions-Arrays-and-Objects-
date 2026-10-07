// arrays-objects-assignment.js

// QUESTION 1: Create the students array
// Each student is an object with an id, name, age and grades.
const students = [
  { id: 1, name: 'Alice Johnson', age: 20, grades: [85, 92, 78] },
  { id: 2, name: 'Bob Smith', age: 22, grades: [70, 65, 80] },
  { id: 3, name: 'Carla Mendes', age: 21, grades: [95, 98, 92] },
  { id: 4, name: 'David Okoro', age: 23, grades: [55, 48, 62] },
  { id: 5, name: 'Ella Brown', age: 19, grades: [88, 81, 79] }
];

console.log('Question 1: students');
console.log(students);

// QUESTION 2: Calculate averages
// This function takes a list of grades and returns the average.
function calculateAverage(grades) {
  // reduce() adds all the grades together. We start the sum at 0.
  const total = grades.reduce(function (sum, grade) {
    return sum + grade;
  }, 0);

  // Divide the total by how many grades there are.
  const average = total / grades.length;

  // toFixed(2) rounds to 2 decimal places but gives back text,
  // so Number() turns it back into a number.
  const rounded = Number(average.toFixed(2));

  return rounded;
}

// map() goes through every student and makes a new array.
// The three dots (...student) copy the student's old properties,
// then we add the new average property.
// This way the original students array is not changed.
const studentsWithAverage = students.map(function (student) {
  return {
    ...student,
    average: calculateAverage(student.grades)
  };
});

console.log('Question 2: students with average');
console.log(studentsWithAverage);

// QUESTION 3: Filter passing students
// filter() keeps only the students that pass the test.
// Here the test is: average is 60 or more.
function getPassingStudents(students) {
  return students.filter(function (student) {
    return student.average >= 60;
  });
}

const passing = getPassingStudents(studentsWithAverage);

console.log('Question 3: passing students');
console.log(passing);

// QUESTION 4: Functions and callbacks
// A callback is a function that we pass into another function.
// processStudents runs the callback on every student
// and returns the new list.
function processStudents(students, callback) {
  return students.map(function (student) {
    // We give the student to the callback and return what it gives back.
    return callback(student);
  });
}

// Callback 1: adds a letterGrade property
function addLetterGrade(student) {
  let letterGrade = '';

  if (student.average >= 90) {
    letterGrade = 'A';
  } else if (student.average >= 80) {
    letterGrade = 'B';
  } else if (student.average >= 70) {
    letterGrade = 'C';
  } else if (student.average >= 60) {
    letterGrade = 'D';
  } else {
    letterGrade = 'F';
  }

  // Copy the student and add letterGrade (no changing the original).
  return { ...student, letterGrade: letterGrade };
}

// Callback 2: adds a status property
function addStatus(student) {
  let status = '';

  if (student.average >= 60) {
    status = 'Pass';
  } else {
    status = 'Fail';
  }

  return { ...student, status: status };
}

// Use processStudents with each callback
const studentsWithGrades = processStudents(studentsWithAverage, addLetterGrade);
console.log('Question 4: students with letter grades');
console.log(studentsWithGrades);

const studentsWithStatus = processStudents(studentsWithAverage, addStatus);
console.log('Question 4: students with status');
console.log(studentsWithStatus);

// Check that the original was not changed.
// This should show NO letterGrade or status.
console.log('Original student is unchanged:');
console.log(studentsWithAverage[0]);