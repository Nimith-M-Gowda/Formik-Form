# Formik-Form

## Overview

Formik-Form is a React sample application that demonstrates how to build reusable, scalable form components using Formik for form state management and Yup for schema-based validation. It covers a wide range of form controls (input, textarea, select, radio, checkbox), nested objects, dynamic arrays, field‐level and schema validation, and optimized renders with FastField.

## Features

- **FormikWrapper**: A top-level component that sets up Formik `initialValues`, `validationSchema`, and `onSubmit` handling.
- **FormikController**: Renders different form controls (`input`, `textarea`, `select`, `radio`, `checkbox`) based on a `control` prop.
- **Core Form Elements**: Individual components (`Input`, `TextArea`, `Select`, `RadioButtons`, `Checkboxes`) that integrate Formik’s `Field` and `ErrorMessage` for consistent labeling and validation display.
- **Nested Objects & Arrays**: Support for nested values (`social.facebook`, `social.twitter`), arrays of primitives (`phoneNumber`), and dynamic lists (`FieldArray` for `hobbies`).
- **Advanced Validation**: Schema validation with Yup, plus example of field-level validation for comments.
- **Performance**: Demonstrates use of `FastField` for isolated fields to prevent unnecessary re-renders.
- **Performance Monitoring**: Optional web-vitals integration via `reportWebVitals.js`.

## Getting Started

### Prerequisites

- Node.js (v12 or newer)
- npm or yarn

### Installation

```bash
git clone https://github.com/Nimith-M-Gowda/Formik-Form.git
cd Formik-Form
npm install
npm start
```

Open your browser at `http://localhost:3000` to view the running app.

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Project Structure

```
Formik-Form/
├─ docs/Check.md            # This documentation file
├─ src/
│  ├─ Formik.js             # Main form demo using Formik and Yup
│  ├─ ErrorText.js          # Custom component for rendering Formik errors
│  ├─ index.js              # React entry point
│  ├─ reportWebVitals.js    # Performance measurement setup
│  ├─ App.js, App.css       # App shell and styles
│  └─ ...                   # Other standard CRA files
├─ public/                  # Static assets
└─ package.json             # Project metadata and scripts
```

## Further Reading

- Detailed blog/tutorial: [src/readme.md](../src/readme.md)
- Formik official docs: https://formik.org/docs/tutorial
- Yup validation guide: https://formik.org/docs/guides/validation