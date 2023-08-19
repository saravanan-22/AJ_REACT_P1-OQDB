import React, { useState } from "react";
import Header from "../Components/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, json, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Config/FirebaseConfig";
import { db } from "./Config/FirebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import AddQuestion from "./AddQuestion";
import { BsFillHouseFill } from "react-icons/bs";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loginDate, setLoginDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = userEmail;
    const password = userPassword;
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userId = user.uid;
      const userEmail = user.email;
      // console.log(userEmail);
      // console.log(userId);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("uid", userId);
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const userName = userData.name;
        const loginDate = userData.loginDate;
        setLoginDate(loginDate);
        localStorage.setItem("loginDate", loginDate);
        console.log("User Name:", userName);
        setUserName(userName);
        localStorage.setItem("username", userName);
        alert("Account login completed");
        window.location.reload(navigate(`/`));
      } else {
        alert("user not found");
      }
      // console.log(userName);
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
          placeItems: "center",
        }}
      >
        <Card style={{ width: "20rem", height: "20rem" }}>
          <Card.Body>
            <Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  submit
                </Button>
                <Link to={"/ChangePassword"} className="ms-4">
                  Forgot password
                </Link>
              </Form>{" "}
            </Card.Text>
            <hr />
            <span style={{ textAlign: "center" }}>
              Don't have an account? <Link to={"/Register"}>Sign up</Link>
            </span>
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
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}

export default Login;
