import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./Config/FirebaseConfig";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";

function Register() {
  const [validated, setValidated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (userPassword !== confirmPassword) {
      alert("Confirm password does not match the password.");
      setValidated(false);
      return;
    }

    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      const uid = credentials.user.uid;
      localStorage.setItem("uid", uid);

      const currentDate = new Date();

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const loginDateWithDay = currentDate.toLocaleString("en-US", options);

      const newUser = {
        name: userName,
        email: userEmail,
        password: userPassword,
        loginDate: loginDateWithDay,
      };
      await setDoc(doc(db, "users", credentials.user.uid), newUser);
      setValidated(true);
      alert(
        "Welcome, Account created successfully, Please login your account after sign in"
      );
      navigate("/Login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <section
        style={{
          backgroundColor: "black",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {" "}
        <Card style={{ width: "23rem", height: "30rem", marginTop: "2em" }}>
          <Card.Body style={{ overflow: "auto" }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group controlId="validationCustomUsername">
                  <Form.Label>Username</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group controlId="validationCustomEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group controlId="validationCustomPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group controlId="validationCustomConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    isInvalid={validated && userPassword !== confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {userPassword !== confirmPassword
                      ? "Password doesn't match "
                      : "Please provide a password.!"}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button type="submit">Sign Up</Button>
              <Link
                to={"/"}
                className=" mt-1"
                style={{
                  display: "block",
                  color: "inherit",
                  textDecoration: "none",
                  borderRadius: "0.3em",
                  width: "5em",
                  backgroundColor: " rgb(139, 216, 188)",
                }}
              >
                <BsFillHouseFill
                  style={{
                    fontSize: "1.5em",
                    color: "black",
                    padding: "2px",
                  }}
                />
                <span
                  className="mt-3 ms-1"
                  style={{
                    color: "black",
                  }}
                >
                  Home
                </span>
              </Link>
              <span style={{ textAlign: "center" }}>
                Have an account? <Link to={"/Login"}>Log in</Link>
              </span>
            </Form>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}

export default Register;
