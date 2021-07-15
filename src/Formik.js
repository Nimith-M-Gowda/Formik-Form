import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  channel: "",
};

const onSubmit = (event, values) => {
  event.preventDefault();
  console.log("🚀 ~ file: formik.js ~ line 12 ~ formik ~ formik", values);
};

/**
 * This is  Validate function which got replaced later by Yup's validationSchema
 */
// const validate = (values) => {
//   let errors = {};
//   if (!values.name) {
//     errors.name = "Required";
//   }
//   if (!values.email) {
//     errors.email = "Required";
//   } else if (   !/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i.test(
//       values.email
//     )
//   ) {
//     errors.email = "Invalid Email Format";
//   }
//   if (!values.channel) {
//     errors.channel = "Required";
//   }
//   return errors;
// };

const validationSchema = Yup.object({
  name: Yup.string().required("name is Required"),
  email: Yup.string()
    .required("email is required")
    .email("enail format is incorrect"),
  channel: Yup.string().required("channel name is required"),
});
function Formik() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    // validate,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          {formik.touched.name && formik.errors.name ? (
            <span>{formik.errors.name}</span>
          ) : null}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          {formik.touched.email && formik.errors.email ? (
            <span>{formik.errors.email}</span>
          ) : null}
        </div>
        <div>
          <label>Channel</label>
          <input
            type="text"
            name="channel"
            onChange={formik.handleChange}
            value={formik.values.channel}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          {formik.touched.channel && formik.errors.channel ? (
            <span>{formik.errors.channel}</span>
          ) : null}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Formik;
