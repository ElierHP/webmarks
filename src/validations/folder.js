import * as yup from "yup";

export const folderSchema = yup.object().shape({
  title: yup.string().required().max("20"),
  parent_id: yup.string().required(),
});

export const editFolderSchema = yup.object().shape({
  title: yup.string().required().max("20"),
  _id: yup.string().required(),
});
