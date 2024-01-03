import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from '../../assests/images/logo.png'

import "./footer.css";

const footerQuickLinks = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "About Us",
    url: "/about",
  },
  // {
  //   display: "Gallery",
  //   url: "/gallery",
  // },
  {
    display: "Contact Us",
    url: "/contact",
  },
];

const footerInfoLinks = [
  {
    display: "Courses",
    url: "/course",
  },
  {
    display: "Syllabus",
    url: "/syllabus",
  },
];

const Footer = () => {
  return (
    <>
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="6" className="mb-4">
            <h2 className=" d-flex align-items-center gap-1">
          <img src={logo} alt="Logo" width="100px" height="100px"/>
            </h2>

            <div className="follows">
              <p style={{fontSize:"14px",marginTop:"-20px"}}>Vidhi Mantraa</p>
            </div>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <h6 className="fw-bold">Useful links</h6>
            <ListGroup className="link__list">
              {footerQuickLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <Link to={item.url}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <h6 className="fw-bold">Important Links</h6>
            <ListGroup className="link__list">
              {footerInfoLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <Link to={item.url}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6">
            <h6 className="fw-bold">Get in Touch</h6>

            <p style={{marginBottom:"3px"}}><b>Address: </b>N-1104, Celebrity Meadows, API Ansal’s, Shaheed Path, Lucknow-30</p>
            <p style={{marginBottom:"3px"}}><b>Phone: </b>+91-7309642020, +91- 7080499848</p>
            <p><b>Email:</b> vidhimantraa7@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
    <div className="footer_copyright">
    <span>© Copyright Vidhi Mantra 2024.</span>
    <span> Designed and Developed by: <a target="_blank" href="https://owlmarkmedia.in/">owlmarkmedia</a></span>
    </div>
    
  </>
  );
};

export default Footer;
