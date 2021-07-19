import React from "react";
// import { useFormik } from "formik";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import ErrorText from "./ErrorText";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  //example for nested objects
  social: {
    facebook: "",
    twitter: "",
  },
  //example for list / arrays
  phoneNumber: ["", ""],
  hobbies: [""],
  extras: "",
};

const onSubmit = (values, onSubmitProps) => {
  try {
    console.log("🚀 ~ file: Formik.js ~ line 32 ~ onSubmit ~ values", values);
    console.log(
      "🚀 ~ file: Formik.js ~ line 32 ~ onSubmit ~ onSubmitProps",
      onSubmitProps
    );
  } catch (e) {
    console.log(e);
  } finally {
    onSubmitProps.setSubmitting(false);
  }
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

//Introducing yup
const validationSchema = Yup.object({
  name: Yup.string().required("name is Required"),
  email: Yup.string()
    .required("email is required")
    .email("email format is incorrect"),
  channel: Yup.string().required("channel name is required"),
  address: Yup.string().required("address is required"),
  // comments: Yup.string().required("comments is required"),
  // validating yup for objects
  social: Yup.object({
    facebook: Yup.string().required("facebook required"),
    twitter: Yup.string().required("twitter required"),
  }),
  //validating yup for array of strings
  phoneNumber: Yup.array().of(Yup.string().required()),
  //validating FieldArray
  hobbies: Yup.array().of(Yup.string().required()),
});

//field level validation
const validateComments = (values) => {
  let error;
  if (!values) error = "required";
  return error;
};
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
      //remove validation based on blur event
      // validateOnBlur={false}
      //remove validation based on onChange event
      // validateOnChange={false}
    >
      {/*
      //replacing with Form Component
      <form onSubmit={formik.handleSubmit}>
      */}

      {/* //Introducing to manual triggering of validation */}
      {(formik) => {
        console.log(
          "🚀 ~ file: Formik.js ~ line 110 ~ FormikForm ~ formik",
          formik
        );
        return (
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

                //removing after Field Component
                // {...getFieldProps("email")}
              />
            </div>
            {/*Introducing ErrorMessage
        <div>
          {formik.touched.email && formik.errors.email ? (
            <span>{formik.errors.email}</span>
          ) : null}
        </div> */}

            {/* //lets use render-props method to ErrorMessage */}
            {/* <ErrorMessage name="email" /> */}
            <ErrorMessage name="email">
              {(ErrorMessage) => {
                return <div>{ErrorMessage}</div>;
              }}
            </ErrorMessage>
            <div>
              <label>Channel</label>
              <Field
                // as="textarea"
                type="text"
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
            <ErrorMessage name="channel" component={ErrorText} />

            <div>
              <label>comments</label>
              {/* filed level validation   */}
              <Field
                as="textarea"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments">
                {(errorMessage) =>
                  errorMessage ? <div>{errorMessage}</div> : null
                }
              </ErrorMessage>
            </div>

            <div>
              <label>Address</label>
              <Field name="address">
                {/* //this helps in custom component rendering and attach iy to formik(render-props)*/}
                {(props) => {
                  const { form, field, meta } = props;
                  return (
                    <div>
                      <input {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </Field>
            </div>
            {/* //example for nested objects */}
            <div>
              <label>Facebook</label>
              <Field name="social.facebook" />
              <ErrorMessage name="social.facebook" />
            </div>

            <div>
              <label>Twitter</label>
              <Field name="social.twitter" />
              <ErrorMessage name="social.twitter" />
            </div>

            {/* //Arrays or List  */}
            <div>
              <label>Primary Phone Number</label>
              <Field name="phoneNumber[0]" />
              <ErrorMessage name="phoneNumber[0]">
                {(errorMessage) => {
                  return errorMessage ? <div>{errorMessage}</div> : null;
                }}
              </ErrorMessage>
            </div>
            <div>
              <label>Secondary Phone Number</label>
              <Field name="phoneNumber[1]" />
              <ErrorMessage name="phoneNumber[1]" />
            </div>

            {/* FieldArray usage to get hobby list */}
            <div>
              <label>Hobbies</label>
              <FieldArray name="hobbies">
                {(props) => {
                  const { push, remove, form } = props;
                  const { values } = form;
                  const { hobbies } = values;
                  return (
                    <div>
                      {hobbies.map((hobby, index) => {
                        return (
                          <div key={index}>
                            <Field name={`hobbies[${index}]`} />
                            <button onClick={() => push("")}>+</button>
                            {index > 0 && (
                              <button onClick={() => remove(index)}>-</button>
                            )}
                            <ErrorMessage name={`hobbies[${index}]`} />
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            {/* // No other field is dependent on this and this doesn't depend on any other form -elements so using Fastfield is more optimized*/}
            <div>
              <label>EXTRAS</label>
              <FastField name="extras" />
            </div>
            <div>
              <div>
                {/* //disable submit 2 ways
                // 1 . when fields are invalid based on formik validation rules
                // 2 . after submit click till api call ends*/}
                <button
                  type="submit"
                  disabled={
                    !(formik.dirty && formik.isValid) || formik.isSubmitting
                  } //even dirty has issue if initialvalues are pre-set and submitting without changing initial values
                  //because dirty because true when anything changes in form compared to its initial value
                >
                  Submit
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    //if form is not touched then we can use formik.setTouched({name:true,email:true....})
                    formik.validateForm();
                  }}
                >
                  Form Validation
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
export default FormikForm;
