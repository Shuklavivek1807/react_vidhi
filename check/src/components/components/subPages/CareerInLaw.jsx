
import { Container, Row, Col } from "reactstrap";
import {lawInCareer,careerOptionsParagraph} from './const'
import { useEffect } from "react";

const CareerInLaw=()=>{
  useEffect(()=>{
    window.scrollTo(0, 0);
},[]);

        return(
            <section>
            <div class="text-center mb-5 col-lg-12" style={{paddingTop:"15px"}}><h2 class="fw-bold">Career In Law</h2></div>
      <Container>
        <Row>
            <div className="about__content">
            {careerOptionsParagraph.map((item,index)=>(
              <p key={index}>{item}</p>
            ))}
            {lawInCareer.map((item, index) => (
              <div key={index}>
              {console.log(item)}
              <h5>{item.heading}</h5>
              <p>{item.para}</p>
              </div>
      
    ))}
    <p>In today’s world, there is no pigeon-holing of careers into neat, distinct compartments. Hence, law graduates can also combine their degree with other disciplines like business administration, company secretary, etc., or take up freelancing or even work with the think tanks. They can even end up carving out new careers for themselves in the days to come.</p>
            </div>
        </Row>
      </Container>
            </section>
        )
}

export default CareerInLaw;