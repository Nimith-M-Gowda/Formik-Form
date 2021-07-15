import React from "react";
// import { useFormik } from "formik";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
};

const onSubmit = (values) => {
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
    .email("email format is incorrect"),
  channel: Yup.string().required("channel name is required"),
});
function FormikForm() {
  //Removing Boiler plates by using Formik Context
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,
  //   validationSchema,
  //   // validate,
  // });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {/*
      //replacing with Form Component
      <form onSubmit={formik.handleSubmit}>
      */}
      <Form>
        <div>
          <label>Name</label>
          <Field
            type="text"
            name="name"
            //reducing boiler plates
            // onChange={formik.handleChange}
            // value={formik.values.name}
            // onBlur={formik.handleBlur}

            //removing afetr Field Component
            // {...getFieldProps("name")}
          />
        </div>
        {/* Introducing ErrorMessage
        <div>
          {formik.touched.name && formik.errors.name ? (
            <span>{formik.errors.name}</span>
          ) : null}
        </div> */}
        <ErrorMessage name="name" />
        <div>
          <label>Email</label>
          <Field
            type="email"
            name="email"
            // onChange={formik.handleChange}
            // value={formik.values.email}
            // onBlur={formik.handleBlur}

            //removing afetr Field Component
            // {...getFieldProps("email")}
          />
        </div>
        {/*Introducing ErrorMessage
        <div>
          {formik.touched.email && formik.errors.email ? (
            <span>{formik.errors.email}</span>
          ) : null}
        </div> */}
        <ErrorMessage name="email" />
        <div>
          <label>Channel</label>
          <Field
            // as="textarea"
            type="textarea"
            name="channel"
            // onChange={formik.handleChange}
            // value={formik.values.channel}
            // onBlur={formik.handleBlur}

            //removing afetr Field Component
            // {...getFieldProps("channel")}
          />
        </div>
        {/* Introducing ErrorMessage
        <div>
          {formik.touched.channel && formik.errors.channel ? (
            <span>{formik.errors.channel}</span>
          ) : null}
        </div> */}
        <ErrorMessage name="channel" />

        <div>
          <label>comments</label>
          <Field as="textarea" name="comments" />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Formik>
  );
}

export default FormikForm;
