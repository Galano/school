import Student from "./Student";
import data from "./repository/db";

export default class EnrollStudent {
  enrollments: any[];
  constructor() {
    this.enrollments = [];
  }
  isDuplicated(student: Student) {
    if (
      this.enrollments.find((enrollment) => {
        return enrollment.student.cpf.value === student.cpf.value;
      })
    )
      throw "Enrollment with duplicated student is not allowed";
  }
  getSequence(): string {
    const sequence = this.enrollments.length + 1;
    return sequence.toString().padStart(4, "0");
  }
  getCode(enrollmentRequest: any): string {
    return `${new Date().getFullYear()}${enrollmentRequest.level}${
      enrollmentRequest.module
    }${enrollmentRequest.class}${this.getSequence()}`;
  }
  minimumAge(student: Student, minimumAge: number) {
    if (student.birthDate.getAge() < minimumAge)
      throw "Student below minimum age";
  }
  getModule(level: string, code: string) {
    return data.modules.find((module) => {
      if (module.level === level && module.code === code) {
        return module;
      }
    });
  }
  getClassRoom(level: string, module: string, code: string) {
    return data.classes.find((classRoom) => {
      if (
        classRoom.level === level &&
        classRoom.module === module &&
        classRoom.code === code
      ) {
        return module;
      }
    });
  }
  getClassOverCpacity(
    level: string,
    module: string,
    code: string,
    capacity: number
  ) {
    const total = this.enrollments.filter((student) => {
      return (
        student.classRoom.level === level &&
        student.classRoom.module === module &&
        student.classRoom.code === code
      );
    });

    if (total.length >= capacity) throw "Class is over capacity";
  }
  execute(enrollmentRequest: any): string {
    const module = this.getModule(
      enrollmentRequest.level,
      enrollmentRequest.module
    );
    const classRoom = this.getClassRoom(
      enrollmentRequest.level,
      enrollmentRequest.module,
      enrollmentRequest.class
    );
    const student = new Student(
      enrollmentRequest.student.name,
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate
    );
    this.isDuplicated(student);
    this.minimumAge(student, module?.minimumAge || 0);
    this.getClassOverCpacity(
      enrollmentRequest.level,
      enrollmentRequest.module,
      enrollmentRequest.class,
      classRoom?.capacity || 0
    );

    const code = this.getCode(enrollmentRequest);
    const enrollment = {
      student,
      classRoom,
      code,
    };
    this.enrollments.push(enrollment);
    return code;
  }
}
