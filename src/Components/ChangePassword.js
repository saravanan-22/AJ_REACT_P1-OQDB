import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { auth, db } from "./Config/FirebaseConfig";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return;
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Form submitted with email:", email);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div style={{ backgroundColor: "black", height: "90vh" }}>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="w-75 mx-auto pt-5"
      >
        <Form.Group controlId="formEmail">
          <Form.Label style={{ color: "white" }}>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="mt-2">
          Submit
        </Button>

        <p className="text-white mt-5">
          To change your password, enter your email address above and click the
          <span
            style={{
              color: " rgb(139, 216, 188)",
              textDecoration: "underline",
              margin: "0 0.5em",
            }}
          >
            "Submit"
          </span>
          button. You will receive a password reset email at the provided email
          address. Follow the instructions in the email to proceed with password
          reset.
        </p>
      </Form>
    </div>
  );
};

export default ChangePassword;
