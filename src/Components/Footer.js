import React from "react";
import Nav from "react-bootstrap/Nav";

const Footer = () => {
  return (
    <div>
      <footer
        style={{ height: "auto" }}
        className="d-flex justify-content-center align-items-center bg-dark mt-2"
      >
        <section>
          <h5 style={{ color: "white", textAlign: "center", marginTop: "1em" }}>
            OTHER LINKS
          </h5>
          <Nav.Link
            href="https://forums.pixeltailgames.com/"
            className="me-2 px-3"
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            <h6 style={{ color: "rgb(139, 216, 188)", textAlign: "center" }}>
              Forums
            </h6>
          </Nav.Link>
          <Nav.Link
            href="http://www.towerunite.com/"
            className="me-2 px-3"
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            <h6 style={{ color: "rgb(139, 216, 188)", textAlign: "center" }}>
              Tower Unit
            </h6>
          </Nav.Link>

          <p style={{ color: "white", textAlign: "center" }}>
            Open question DB is created and maintained by the good folks at {""}
            <Nav.Link
              href="https://www.pixeltailgames.com/"
              style={{ textDecoration: "none", display: "inline" }}
              target="_blank"
            >
              <span style={{ color: "rgb(139, 216, 188)" }}>
                PIXELTAIL GAMES LLC
              </span>
              .
            </Nav.Link>
          </p>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
