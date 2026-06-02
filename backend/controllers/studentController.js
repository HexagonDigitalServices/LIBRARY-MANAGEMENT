
const mappedStudents = students.map((student) => ({
  name: student.name,
  email: student.email,
  department: student.department || "",
  stream: student.stream || "",
  academicYear: student.year || "",
  semester: student.semester || "",
  rollNumber: student.rollNo || "",
}));
