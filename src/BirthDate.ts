export default class BirthDate {
  value: Date;

  constructor(value: Date) {
    this.value = value;
  }
  getAge() {
    const today = new Date();
    return Math.floor(
      Math.ceil(
        Math.abs(this.value.getTime() - today.getTime()) / (1000 * 3600 * 24)
      ) / 365.25
    );
  }
}
