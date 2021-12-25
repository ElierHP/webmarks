import * as yup from "yup";

export const linkSchema = yup.object().shape({
  title: yup.string().required().max("20"),
  url: yup.string().required().url(),
  parent_id: yup.string().required(),
});

export const editLinkSchema = yup.object().shape({
  title: yup.string().required().max("20"),
  url: yup.string().required().url(),
  _id: yup.string().required(),
});
