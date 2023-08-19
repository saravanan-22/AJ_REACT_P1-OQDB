import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineMenu } from "react-icons/ai";
import { BsPlusCircleDotted } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import image from "./images/logo_2.png";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AiFillEdit } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { GrLicense } from "react-icons/gr";
import { useSpring, animated } from "react-spring";
import { FaBars } from "react-icons/fa6";

const Header = () => {
  const [storedUsername, setStoredUsername] = useState("");
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const fadeAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  useEffect(() => {
    const username = localStorage.getItem("username");
    setStoredUsername(username);

    const handleStorageChange = (e) => {
      if (e.key === "username") {
        setStoredUsername(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleNavToggle = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setStoredUsername("");
  };

  return (
    <div>
      <Navbar className="bg-dark px-2" expand="lg">
        <Navbar.Brand href="#" className=" mx-1">
          <Link to={"/"}>
            <animated.div style={fadeAnimation}>
              <img
                src={image}
                alt="logo"
                style={{ width: "5em", height: "2em", borderRadius: "0.3em" }}
              />
            </animated.div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={handleNavToggle}
          style={{ color: "rgb(139, 216, 188)" }}
          aria-controls="responsive-navbar-nav"
        >
          <FaBars style={{ color: "white" }} />
        </Navbar.Toggle>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
          in={isNavExpanded}
        >
          <Nav>
            <Link
              to={"/Browse"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Nav.Link id="Nav-color" href="#BROWSE" className="me-2 px-3">
                <AiOutlineMenu
                  style={{ fontSize: "1.2em", paddingBottom: "2px" }}
                />{" "}
                BROWSE
              </Nav.Link>
            </Link>
            <Link
              to={"/AddQuestion"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Nav.Link
                id="Nav-color"
                href="#ADD NEW QUESTION"
                className="me-2 px-3"
              >
                <BsPlusCircleDotted
                  style={{
                    fontSize: "1.2em",
                    paddingBottom: "2px",
                    fontWeight: "bolder",
                  }}
                />{" "}
                ADD NEW QUESTION
              </Nav.Link>
            </Link>
            <Nav.Link
              id="Nav-color"
              href="https://opentdb.com/api_config.php"
              className="me-2 px-3"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <FiSettings
                style={{
                  fontSize: "1.2em",
                  paddingBottom: "2px",
                  fontWeight: "bolder",
                }}
              />{" "}
              API
            </Nav.Link>
            <Nav.Link
              id="Nav-color"
              href="https://forums.pixeltailgames.com/"
              className="me-2 px-3"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <FiMessageCircle
                style={{
                  fontSize: "1.2em",
                  paddingBottom: "2px",
                  fontWeight: "bolder",
                }}
              />{" "}
              DISCUSS
            </Nav.Link>
            {storedUsername ? (
              <span
                style={{
                  backgroundColor: "rgb(0, 0, 0)",
                  borderRadius: "0.3em",
                }}
              >
                <DropdownButton
                  id={`dropdown-button-drop-start`}
                  drop="start"
                  variant=""
                  title={
                    <>
                      {" "}
                      <FiLogOut
                        style={{
                          fontSize: "1.2em",
                          paddingBottom: "2px",
                          fontWeight: "bolder",
                          color: "rgb(139, 216, 188)",
                        }}
                      />{" "}
                      <span id="black" style={{ color: "white" }}>
                        {storedUsername.charAt(0).toUpperCase() +
                          storedUsername.slice(1)}
                      </span>
                    </>
                  }
                >
                  <Dropdown.Item as={Link} to="/EditUnverifiedQ">
                    <AiFillEdit
                      style={{
                        fontSize: "1.2em",
                        paddingBottom: "2px",
                        fontWeight: "bolder",
                        color: "#000",
                      }}
                    />{" "}
                    Edit unverified questions
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/UserProfile">
                    <BsPersonCircle
                      style={{
                        fontSize: "1.2em",
                        paddingBottom: "2px",
                        fontWeight: "bolder",
                        color: "#000",
                      }}
                    />{" "}
                    View User Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/ChangePassword">
                    <GrLicense
                      style={{
                        fontSize: "1.2em",
                        paddingBottom: "2px",
                        fontWeight: "bolder",
                        color: "#000",
                      }}
                    />{" "}
                    {""}
                    Change Password
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleLogout}>
                    <Link
                      to={"/"}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <BiLogOut
                        style={{
                          fontSize: "1.2em",
                          paddingBottom: "2px",
                          fontWeight: "bolder",
                          color: "#000",
                        }}
                      />{" "}
                      {""}
                      Logout
                    </Link>
                  </Dropdown.Item>
                </DropdownButton>
              </span>
            ) : (
              <Link
                to={"/Login"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Nav.Link id="Nav-color" className="me-2 px-3" href="#LOGIN">
                  <FiLogOut
                    style={{
                      fontSize: "1.2em",
                      paddingBottom: "2px",
                      fontWeight: "bolder",
                      color: "rgb(139, 216, 188)",
                    }}
                  />{" "}
                  LOGIN
                </Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
