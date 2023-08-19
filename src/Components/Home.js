import React from "react";
import image from "./images/logo_2.png";
import image2 from "./images/88x31.png";
import { AiOutlineMenu } from "react-icons/ai";
import { BsPlusCircleDotted } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const Home = () => {
  return (
    <div
      style={{
        height: "auto",
        backgroundColor: "black",
      }}
    >
      <section
        className="d-flex justify-content-center align-items-center flex-column flex-md-row"
        style={{
          height: "50vh",
          display: "grid",
          placeItems: "center",
          backgroundColor: "black",
        }}
      >
        <img src={image} style={{}} className="home-logo m-2" />

        <p
          style={{
            color: "white",
            fontSize: "1.2em",
            marginLeft: "1rem",
            textAlign: "center",
          }}
          className="mt-3 mt-md-0"
        >
          Free to use, user-contributed open question database. <br />
          <span style={{}}>
            {" "}
            <span
              style={{
                color: "rgb(139, 216, 188)",
                textDecoration: "underline",
                textAlign: "center",
              }}
            >
              4,098
            </span>{" "}
            VERIFIED QUESTIONS!
          </span>
        </p>
      </section>
      <section className="d-flex justify-content-center align-items-center flex-column flex-md-row">
        <Button variant="outline-light" className="mx-2">
          {" "}
          <AiOutlineMenu
            style={{ fontSize: "1.2em", paddingBottom: "2px" }}
          />{" "}
          <Link
            to={"/Browse"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            BROWSE
          </Link>
        </Button>
        <Button variant="outline-light" className="mt-3 mt-md-0">
          {" "}
          <BsPlusCircleDotted
            style={{
              fontSize: "1.2em",
              paddingBottom: "2px",
              fontWeight: "bolder",
            }}
          />
          {""}
          <span className="ps-1">
            {" "}
            <Link
              to={"/AddQuestion"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              ADD NEW QUESTION
            </Link>
          </span>
        </Button>
      </section>
      <section className="d-flex justify-content-center align-items-center my-4">
        <Nav.Link
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          className="me-2 px-3"
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <img
            src={image2}
            alt=""
            style={{ backgroundColor: "rgb(139, 216, 188)", padding: "1px" }}
          />
        </Nav.Link>
      </section>
      <Footer />
    </div>
  );
};
export default Home;
