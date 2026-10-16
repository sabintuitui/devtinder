const validator = require("validator");

const validatorSignUp = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Fill the valid firstname and Lastname Please please");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a Strong Password");
  }
};

const validatorProfileEdit = (req) => {
  const allowEditField = ["firstName", "lastName", "age", "gender", "about"];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowEditField.includes(field),
  );
  return isEditAllowed;
};

module.exports = {
  validatorSignUp,
  validatorProfileEdit,
};
