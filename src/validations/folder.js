import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required().max("20"),
});

export const editSchema = yup.object().shape({
  title: yup.string().required().max("20"),
  _id: yup.string().required(),
});
