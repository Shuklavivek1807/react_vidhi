import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./features.css";

const FeatureData = [
  {
    title: "Quick Learning",
    desc: "Choose our platform for accelerated learning. Expert-led courses, flexible schedules, and interactive content ensure rapid comprehension. Empower your educational journey with a focus on quick, efficient learning",
    icon: "ri-draft-line",
  },

  {
    title: "All Time Support",
    desc: "Experience unwavering support on your learning journey. Our dedicated team ensures round-the-clock assistance, providing guidance, resolving queries, and fostering a supportive environment for your continuous growth and success.",
    icon: "ri-discuss-line",
  },

  {
    title: "Real-Time Mastery: In-Lecture Tests",
    desc: "Immediate reinforcement for each lecture: our in-lecture tests allow you to apply concepts in real-time, enhancing understanding and retention. Seamlessly integrated, these assessments ensure you stay exam-ready throughout your learning journey.",
    icon: "ri-contacts-book-line",
  },
];

const Features = () => {
  return (
    <section>
      <Container>
        <Row>
          {FeatureData.map((item, index) => (
            <Col lg="4" md="6" key={index}>
              <div className="single__feature text-center px-4">
                <h2 className="mb-3">
                  <i class={item.icon}></i>
                </h2>
                <h6>{item.title}</h6>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
