import IEnrollment from "./IEnrollment";
import EnrollStudent from "./EnrollStudent";

beforeAll(async () => {});

test("Should not enroll without valid student name", function () {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = { student: { name: "Ana" } };
  expect(() => enrollStudent.execute(enrollmentRequest as IEnrollment)).toThrow(
    new Error("Invalid student name")
  );
});

test("Should not enroll without valid student cpf", function () {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: { name: "Ana Paula", cpf: "123.456.789-99" },
  };
  expect(() => enrollStudent.execute(enrollmentRequest as IEnrollment)).toThrow(
    new Error("Invalid student cpf")
  );
});

test("Should not enroll duplicated student", function () {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: { name: "Ana Paula", cpf: "832.081.519-34" },
  };
  enrollStudent.execute(enrollmentRequest as IEnrollment);
  expect(() => enrollStudent.execute(enrollmentRequest as IEnrollment)).toThrow(
    new Error("Enrollment with duplicated student is not allowed")
  );
});
