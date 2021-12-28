import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required().max("20"),
  url: yup.string().required().url(),
});

export const editSchema = yup.object().shape({
  newTitle: yup.string().required().max("20"),
  newUrl: yup.string().required().url(),
});
