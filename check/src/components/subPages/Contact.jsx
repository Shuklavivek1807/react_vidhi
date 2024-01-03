import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";


const Contact =()=>{
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return(
        <section>
            <div class="text-center mb-5 col-lg-12" style={{ paddingTop: "15px" }}><h2 class="fw-bold">Contact Us</h2></div>
            <Container>
                <Row>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113961.37709966754!2d80.83759842934504!3d26.798796568785676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be4b7eb7ae263%3A0x4f1bc4c36ab1e974!2sCelebrity%20Meadows!5e0!3m2!1sen!2sin!4v1704005029373!5m2!1sen!2sin"  className="map" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </Row>
             <Row style={{paddingTop:"30px"}}>
               <h2>For any query, feel free to reach us</h2>
                <div style={{paddingTop:"40px"}}>
                <h5>Email Us</h5>
                <p>vidhimantraa7@gmail.com</p>
                <h5>Contact No.</h5>
                <p>+91-7309642020, +91- 7080499848</p>
                <h5>Address</h5>
                <p>N-1104, Celebrity Meadows, API Ansal’s, Shaheed Path, Lucknow-30</p>
                </div> 
             </Row>
        
            
        </Container>
        </section>
    )
}

export default Contact;