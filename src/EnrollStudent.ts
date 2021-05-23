import IEnrollment from "./IEnrollment";
import IStudent from "./IStudent";
import ValidateCpf from "./validateCpf";

export default class EnrollStudent {
  students: IEnrollment[] = [];
  constructor() {}

  isInvalidName(name: string) {
    const regex = new RegExp("^([A-Za-z]+ )+([A-Za-z])+$");
    if (!regex.test(name)) throw "Invalid student name";
  }

  isValidCpf(cpf: string) {
    if (!ValidateCpf(cpf)) throw "Invalid student cpf";
  }

  isDuplicated(student: IStudent) {
    if (
      this.students.some((e) => {
        return student;
      })
    )
      throw "Enrollment with duplicated student is not allowed";
  }

  execute(enrollmentRequest: IEnrollment): boolean {
    this.isInvalidName(enrollmentRequest.student.name);
    this.isValidCpf(enrollmentRequest.student.cpf);
    this.isDuplicated(enrollmentRequest.student);
    this.students.push(enrollmentRequest);
    return true;
  }
}
