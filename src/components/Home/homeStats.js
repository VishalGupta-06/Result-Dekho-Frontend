function getTotalCredits(marks) {
  return marks.reduce((total, semester) => {
    return (
      total +
      semester.subjects.reduce((sum, subject) => sum + subject.credit, 0)
    );
  }, 0);
}

function getTotalSubjects(marks) {
  return marks.reduce((total, semester) => total + semester.subjects.length, 0);
}

export function getHomeStats(student) {
  const latestSemester = student.marks[student.marks.length - 1];
  const previousSemester =
    student.marks[student.marks.length - 2] ?? latestSemester;
  const highestSgpa = Math.max(
    ...student.marks.map((semester) => semester.sgpa),
  );
  const cgpaChange = latestSemester.cgpa - previousSemester.cgpa;

  return {
    latestSemester,
    totalCredits: getTotalCredits(student.marks),
    highestSgpa,
    totalSubjects: getTotalSubjects(student.marks),
    cgpaChange,
  };
}
