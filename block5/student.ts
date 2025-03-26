// Student object example
// Demonstrates a real-world object with properties and methods

// Define type for grades
type CourseGrade = {
    courseId: string;
    courseName: string;
    grade: number;
    credits: number;
};

// Define a student object with properties and methods
const student = {
    // Properties
    id: "S12345",
    firstName: "Emma",
    lastName: "Johnson",
    birthYear: 2001,
    enrollmentDate: new Date("2020-09-01"),
    isActive: true,
    grades: [
        { courseId: "CS101", courseName: "Introduction to Programming", grade: 92, credits: 3 },
        { courseId: "MATH201", courseName: "Calculus I", grade: 85, credits: 4 },
        { courseId: "ENG103", courseName: "Academic Writing", grade: 88, credits: 3 },
        { courseId: "PHYS101", courseName: "Physics I", grade: 79, credits: 4 }
    ] as CourseGrade[],
    contact: {
        email: "emma.j@university.edu",
        phone: "555-123-4567",
        address: {
            street: "123 Campus Drive",
            city: "University City",
            state: "CA",
            zipCode: "90210"
        }
    },

    // Methods
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    },

    getAge(): number {
        const currentYear = new Date().getFullYear();
        return currentYear - this.birthYear;
    },

    calculateGPA(): number {
        if (this.grades.length === 0) {
            return 0;
        }
        
        let totalPoints = 0;
        let totalCredits = 0;
        
        this.grades.forEach(course => {
            totalPoints += course.grade * course.credits;
            totalCredits += course.credits;
        });
        
        return totalCredits > 0 ? totalPoints / totalCredits : 0;
    },

    addGrade(newGrade: CourseGrade): void {
        this.grades.push(newGrade);
        console.log(`Grade added for ${newGrade.courseName}`);
    },

    getStudentSummary(): string {
        return `
Student: ${this.getFullName()}
ID: ${this.id}
Age: ${this.getAge()}
GPA: ${this.calculateGPA().toFixed(2)}
Email: ${this.contact.email}
Status: ${this.isActive ? 'Active' : 'Inactive'}
Enrolled: ${this.enrollmentDate.toLocaleDateString()}
`;
    }
};

// Using the student object
console.log("Student Object Example\n");

// Display student info
console.log(`Student: ${student.getFullName()}`);
console.log(`Age: ${student.getAge()}`);
console.log(`Current GPA: ${student.calculateGPA().toFixed(2)}`);

// Add a new grade
const newCourse: CourseGrade = { 
    courseId: "CS202", 
    courseName: "Data Structures", 
    grade: 91, 
    credits: 3 
};
student.addGrade(newCourse);

// Show updated GPA
console.log(`Updated GPA: ${student.calculateGPA().toFixed(2)}`);

// Display full student summary
console.log("\nStudent Summary:");
console.log(student.getStudentSummary());

// Show individual courses
console.log("Course Grades:");
student.grades.forEach(course => {
    console.log(`${course.courseId} - ${course.courseName}: ${course.grade}`);
}); 