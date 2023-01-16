import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required().max("20"),
  url: yup.string().required().url("must be a valid URL").max("2048"),
});

export const editSchema = yup.object().shape({
  newTitle: yup
    .string()
    .required("title is a required field")
    .max("20", "title must be at most 20 characters"),
  newUrl: yup
    .string()
    .required("url is a required field")
    .url("must be a valid URL")
    .max("2048", "url must be at most 2048 characters"),
});
