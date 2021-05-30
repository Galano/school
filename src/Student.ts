import Cpf from "./Cpf";
import Name from "./Name";
import BirthDate from "./BirthDate";

export default class Student {
  name: Name;
  cpf: Cpf;
  birthDate: BirthDate;

  constructor(name: string, cpf: string, birthDate: string) {
    this.name = new Name(name);
    this.cpf = new Cpf(cpf);
    this.birthDate = new BirthDate(new Date(birthDate));
  }
}
