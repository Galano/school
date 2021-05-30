import EnrollStudent from "../EnrollStudent";

beforeAll(async () => {});

test("Should not enroll without valid student name", function () {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = { student: { name: "Ana" } };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Invalid name")
  );
});

test("Should not enroll without valid student cpf", function () {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: { name: "Ana Paula", cpf: "123.456.789-99" },
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Invalid cpf")
  );
});

test("Should not enroll duplicated student", function () {
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
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Enrollment with duplicated student is not allowed")
  );
});

test("Should generate enrollment code", function () {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Fonseca",
      cpf: "755.525.774-26",
      birthDate: "2002-03-12",
    },
    level: "EM",
    module: "1",
    class: "A",
  };

  const code = enrollStudent.execute(enrollmentRequest);
  expect(code).toBe(`${new Date().getFullYear()}EM1A0001`);
});

test("Should not enroll student below minimum age", function () {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Fonseca",
      cpf: "755.525.774-26",
      birthDate: "2017-03-12",
    },
    level: "EM",
    module: "1",
    class: "A",
  };

  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Student below minimum age")
  );
});

test("Should not enroll student over class capacity", function () {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Fonseca",
      cpf: "755.525.774-26",
      birthDate: "2002-03-12",
    },
    level: "EM",
    module: "1",
    class: "A",
  };
  enrollStudent.execute(enrollmentRequest);
  enrollmentRequest.student.cpf = "739.330.360-46";
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Class is over capacity")
  );
  expect(true).toBe(true);
});
