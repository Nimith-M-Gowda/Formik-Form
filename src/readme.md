---
title: Reusable Form Components using React + Formik + Yup # Title of the blog post
date: "2021-07-22T00:00:00.000Z" # Change the date according to your blog post.
description: ""
tags:
  - formik
  - react
    # Category of the post. You can add more categories for each line.
    # make sure this follows kebab case or one word
headerImg: "./salty_egg.jpg" # Featured Image for this post.
author: "Nimith M Gowda" # Name of the Author.
---

## Introduction

This Blog helps to build a simple form with basic elements like `input`, `textarea`, `radio`, `select`, and `checkbox` using formik that manage form data, submission, and validation .

## What is Formik and Why Formik Form?

Formik is a small group of React components and hooks for building forms in React and React Native.

Formik Forms not only helps in managing form data, form submission, form validation, and displaying error messages but also helps you to deal with forms in a scalable, performant, easy way and one more important thing is, it supports advanced validation with Yup.

## What is Yup?

Yup is a JavaScript schema builder for value parsing and validation. Define a schema, transform a value to match, validate the shape of an existing value, or both. Yup schema is extremely expressive and allows modelling complex, interdependent validations, or value transformations.

## Prerequisites

- HTML
- CSS
- Javascript + ES6
- React

## Installation

```sh
npm install --save formik yup
```

## Lets Build

We shall have 3 Components :

1.  FormikWrapper
1.  FormikController
1.  FormElement

#### _FormikWrapper.js_

We use this component as a simple reusable formik wrapper.

```javascript
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikController from "FormikController.js";

function FormikWrapper() {
  const choices = [
    { key: "choice a", value: "choicea" },
    { key: "choice b", value: "choiceb" },
  ];

  const initialValues = {
    email: "",
    description: "",
    selectChoice: "",
    radioChoice: "",
    checkBoxChoice: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    selectChoice: Yup.string().required("Required"),
    radioChoice: Yup.string().required("Required"),
    checkBoxChoice: Yup.array().required("Required"),
  });
  const onSubmit = (values) => console.log("Form data", values);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikController
            control="input"
            type="email"
            label="Email"
            name="email"
          />
          <FormikController
            control="textarea"
            label="Description"
            name="description"
          />
          <FormikController
            control="select"
            label="Select your choice"
            name="selectChoice"
            option={choices}
          />
          <FormikController
            control="radio"
            label="Click your choice"
            name="radioChoice"
            option={choices}
          />
          <FormikController
            control="checkbox"
            label="select your choices"
            name="checkBoxChoice"
            option={choices}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
export default FormikContainer;
```

#### _FormikController.js_

This component is capable of rendering different types of form elements based on particular prop.

```javascript
import React from "react";
import Input from "Input.js";
import TextArea from "TextArea.js";
import Select from "Select.js";
import RadioButtons from "RadioButton.js";
import CheckBoxes from "CheckBoxes.js";

function FormikController(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textArea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckBoxes {...rest} />;
    default:
      return null;
  }
}
export default FormikController;
```

#### _FormElement.js_

This component is the core form element which includes,

1. Input
1. TextArea
1. Select
1. RadioButtons
1. Checkboxes

#### _Component for Input Element_

In this Input Formik control component, there are 3 distinct elements
`<label/>` an HTML element, `<Field/>` a Formik Component, `<ErrorMessage/>` an error message component from formik.

```javascript
import React from "react";
import { Field, ErrorMessage } from "formik";

function Input(props) {
  const { name, label, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}> {label}</label>
      <Field name={name} {...rest} />
      <ErrorMessage name={name} />
    </div>
  );
}
export default Input;
```

#### _Component for TextArea Element_

Here also there are 3 main elements , `<label/>` an HTML element,`<ErrorMessage/>` an error message component from formik and `<Field/>` a Formik Component which inturn render textarea HTML element.

```javascript
import React from "react";
import { Field, ErrorMessage } from "formik";

function Textarea(props) {
  const { label, name, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" id={name} name={name} {...rest} />
      <ErrorMessage name={name} />
    </div>
  );
}
export default TextArea;
```

#### _Component for Select Element_

Here `<Field/>` a Formik Component which inturn renders select HTML element, Onclick of the field renders a dropdown with list of ~` option`~ to choose from, this has to be considered when creating our Select component and rest are same as above.

```javascript
import React from "react";
import { Field, ErrorMessage } from "formik";

function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default Select;
```

#### _Component for RadioButtons Element_

`<Field/>` is a list of input and label elements that allows you to make one selection, this has to be considered when creating a radio button component.

```javascript
import React from "react";
import { Field, ErrorMessage } from "formik";

function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label>{label}</label>
      <Field name={name}>
        {(formik) => {
          const { field } = formik;
          return options.map((option) => {
            return (
              <div key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default RadioButtons;
```

#### _Component for CheckBoxes Element_

Here also `<Field/>` is a list of input and label elements that allows you to make one or more selections.

```javascript
import React from "react";
import { Field, ErrorMessage } from "formik";

function Checkboxes(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label>{label}</label>
      <Field name={name}>
        {(formik) => {
          const { field } = formik;
          return options.map((option) => {
            return (
              <div key={option.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label>{option.key}</label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default Checkboxes;
```

## Conclusion

We can extend it to a custom React Hook that returns Formik states and helpers. It is used internally to create the <Formik> component and is also a high performant.

## References

- [Formik Guide](https://formik.org/docs/tutorial)
- [Validation Guide](https://formik.org/docs/guides/validation)
