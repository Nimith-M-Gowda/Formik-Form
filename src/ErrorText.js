import React from "react";

function ErrorText(props) {
  console.log(props);
  return <div>{props.children}</div>;
}

export default ErrorText;
