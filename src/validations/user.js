import * as yup from "yup";

export const schema = yup
  .object({
    username: yup.string().required().min(3).max(30),
    password: yup.string().required().min(5).max(30),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();
