class School {
   #students = [];

   constructor(name, id, role) {
      if(this.constructor === School){
         throw new Error ('this cannot be called directly')
      }
      this.name = name;
      this.id = id;
      this.role = role;
   }

   grades(){
      throw new Error ('this cannot be implemented directly')
   }
  
   #createStudent(student){
      this.#students.push(student)
   }

   getStudentById(id){
      return this.#students.find(student => student.id === id);
   }

   viewDetails() {
      return {
         name: this.name,
         id: this.id,
         role: this.role,
      }
   }

   addStudents(student){
      this.#createStudent(student)
   }
}
 
class Student extends School {
   #grades = []; 
   #subjects = [] 

   constructor(name, id, grade) {
      super(name, id, 'Student');  // Added role parameter
      if (grade) {
         this.#grades.push(grade);  // Initialize grades if provided
      }
   }
 
   numberOfSubjects = 9;
 
   get grades() {
      return this.#grades;
   }

   addGrade(grade) {
      this.#grades.push(grade);
   }

   calcAvgGrade() {
      if (this.#grades.length === 0) return 0;
      const calcGrade = this.#grades.reduce((sum, grade) => sum + grade, 0); 
      return calcGrade / this.#grades.length; 
   }

   viewDetails() {
      return {
         name: this.name,
         id: this.id,
         grades: this.#grades,
         average: this.calcAvgGrade()
      };
   }
}
 
class Teacher extends School {
   #scores = [];
   
   constructor(name, id, subject) {
      super(name, id, 'Teacher');
      this.subject = subject;
   }
     
   editGrades(student, grade) {
      student.addGrade(grade);
      this.#scores.push({studentId: student.id, grade});
   }

   viewStudentDetails(studentId) {
      const student = this.getStudentById(studentId);
      return student ? student.viewDetails() : null;
   }

   grades(studentId, score) {
      this.#scores.push({studentId, score});
      return true;
   }
}
 
// Create instances
const student1 = new Student('Amaka kalu', 10, 85);  // Added initial grade
const teacher1 = new Teacher('Dr Agu Udoh', 1, 'Mathematics');  // Added id and subject

// Add student to teacher's collection
teacher1.addStudents(student1);
 
// Test outputs
console.log(student1.name); 
console.log(student1.viewDetails());  // Changed from viewing the function to calling it
console.log(teacher1.name); 
console.log("Student 1 Details:", teacher1.viewStudentDetails(10));


 
 