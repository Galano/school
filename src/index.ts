import EnrollStudent from "./EnrollStudent";

const enrollStudent = new EnrollStudent();
const enrollmentRequest = {
  student: {
    name: "Maria Carolina Fonseca",
    cpf: "755.525.774-26",
    birthDate: "2000-03-12",
  },
  level: "EM",
  module: "1",
  class: "A",
};
enrollStudent.execute(enrollmentRequest);
enrollStudent.execute(enrollmentRequest);