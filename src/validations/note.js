import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required().max("20"),
  body: yup.string().required().max("1000"),
});
