

module.exports = {
  validateEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return String(email).toLowerCase().match(emailRegex);
  },
  validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return String(password).match(passwordRegex);
  },
  validateFirstName(firstName) {
    const firstNameRegex = /^[a-zA-Z]+$/;
    return String(firstName).match(firstNameRegex);
  },
  validateLastName(lastName) {
    const lastNameRegex = /^[a-zA-Z]+$/;
    return String(lastName).match(lastNameRegex);
  },
  validateBirthDate(birthDate) {
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return String(birthDate).match(birthDateRegex);
  },
  validateSignIn(req, res, next) {
    const { email, password } = req.body;
    if (!this.validateEmail(email)) {
      res.status(400).send('Invalid email');
    };
    if (!this.validatePassword(password)) {
      res.status(400).send('Invalid password, password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number');
    }
    if (this.validateEmail(email) && this.validatePassword(password)) {
      next();
    }
  },
  validateSignUp(req, res, next) {
    const { email, password, first_name, last_name, birth_date } = req.body;
    if (!this.validateEmail(email)) {
      res.status(400).send('Invalid email');
    };
    if (!this.validatePassword(password)) {
      res.status(400).send('Invalid password, password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number');
    };
    if (!this.validateFirstName(first_name)) {
      res.status(400).send('Invalid first name, first name should contain only letters');
    };
    if (!this.validateLastName(last_name)) {
      res.status(400).send('Invalid last name, last name should contain only letters');
    };
    if (!this.validateBirthDate(birth_date)) {
      res.status(400).send('Invalid birth date, birth date should be in the format YYYY-MM-DD');
    };
    if (this.validateEmail(email) && this.validatePassword(password) && this.validateFirstName(first_name) && this.validateLastName(last_name) && this.validateBirthDate(birth_date)) {
      next();
    };
  }
}