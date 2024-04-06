export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Username Must be atleast 5 characters",
    },
    notEmpty: {
      errorMessage: "username Can't be Empty",
    },
    isString: {
      errorMessage: "Username must be  a string",
    },
  },
  displayName: {
    notEmpty: true,
  },
};
