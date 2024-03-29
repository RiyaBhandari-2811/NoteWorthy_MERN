import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
  // Checking Local Storage
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     history.push("/mynotes");
  //   }
  // }, [history]);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Note Worthy</h1>
              <p className="subtitle">One Safe place for all your notes.</p>

              <div className="buttonContainer">
                <a href="/login">
                  <Button size="md" className="landingbutton">
                    Login
                  </Button>
                </a>
                <a href="/register">
                  <Button size="md" className="landingbutton">
                    Sign Up
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
