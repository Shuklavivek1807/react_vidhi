import { useEffect } from 'react';
import {Container, Table} from 'reactstrap'

const Course =()=>{

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    const para = "Vidhi Mantra is the premier choice for aspiring law professionals in Lucknow seeking the finest coaching for judicial services. Aspiring to join the esteemed judiciary profession draws numerous law graduates to seek guidance and support from specialized coaching institutes. Lucknow, as a city rich in heritage and opportunities, becomes a preferred destination for those looking to excel in judicial services examinations. Among the various options available, Vidhi Mantra stands tall as the epitome of excellence, offering the best judiciary coaching in Lucknow. With a commitment to quality education, experienced faculty, and a track record of success, Vidhi Mantra is the go-to destination for law graduates determined to embark on a successful career in the field of judiciary."
    const table =[
        {
            subject:"Constitutional Law",
            law:"The Specific Relief Act, 1963",
            miscellaneous:"Local Laws of Delhi, Haryana, Punjab, Rajasthan, U.P. M.P. H.P. Bihar, Chhattisgarh etc."
        },
        {
            subject:"The Code of Civil Procedure, 1908",
            law:"Law of Torts",
            miscellaneous:"Indian Polity"
        },
        {
            subject:"The Code of Criminal Procedure, 1973",
            law:"Jurisprudence",
            miscellaneous:"Tips & Tricks to clear Judiciary"
        },
        {
            subject:"The Indian Evidence Act, 1872",
            law:"The Sale of Goods Act, 1930",
            miscellaneous:"Current Affairs"
        },
        {
            subject:"The Indian Penal Code, 1860",
            law:"The Limitation Act, 1963",
            miscellaneous:"Latest Judgments and Legal Developments"
        },
        {
            subject:"Hindu Law",
            law:"The Registration Act, 1908",
            miscellaneous:"Essay Writing"
        },
        {
            subject:"Muslim Law",
            law:"The Negotiable Instruments Act, 1881",
            miscellaneous:"Language Classes – English & Hindi"
        },
        {
            subject:"The Transfer of Property Act,1882",
            law:"The Arbitration and Conciliation Act, 1996",
            miscellaneous:"Answer-Writing Sessions"
        },
        {
            subject:"The Indian Contract Act, 1872",
            law:"",
            miscellaneous:""
        }

    ]
    return(
        <section>
            <div class="text-center mb-5 col-lg-12" style={{ paddingTop: "15px" }}><h2 class="fw-bold">Course</h2></div>
            <Container>
               <h2 className="about_heading">JUDICIARY COACHING</h2>
            <p>{para}</p>
            <h2 className="about_heading">SYLLABUS</h2>
            <div className='table-responsive-sm'>
            <Table>
                <thead>
                    <tr style={{border:"2px solid #17bf9e"}}>
                        <th style={{ backgroundColor: "#17bf9e",color:"white"}}>S No.</th>
                        <th style={{ backgroundColor: "#17bf9e",color:"white" }}>MAJOR SUBJECTS</th>
                        <th style={{ backgroundColor: "#17bf9e",color:"white" }}>MINOR LAWS</th>
                        <th style={{ backgroundColor: "#17bf9e",color:"white" }}>MISCELLANEOUS</th>
                    </tr>
                </thead>
                <tbody>
                   {table.map((item,index)=>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.subject}</td>
                            <td>{item.law}</td>
                            <td>{item.miscellaneous}</td>
                        </tr>
                   ))}
                </tbody>
            </Table>
            </div>
            <h2 className="about_heading">MODE OF COACHING – OFFLINE / ONLINE / HYBRID</h2>
            <p>At Vidhi Mantra, we understand that every student has unique preferences and circumstances that shape their learning journey. To cater to diverse needs, we offer flexible modes of coaching – Offline, Online, and Hybrid.<br/>

<b>Offline Coaching:</b><br/>
Experience the traditional classroom setting with our Offline Coaching. Join us at our physical location, where our expert faculty engages with students in person. Enjoy the benefits of face-to-face interaction, a structured learning environment, and the opportunity to connect with peers.<br/>

<b>Online Coaching:</b><br/>
For those who prefer the convenience of learning from the comfort of their homes, our Online Coaching provides a seamless virtual classroom experience. Access high-quality lectures, study materials, and interact with our faculty in real-time. Our online platform is designed to offer an immersive learning experience, making education accessible from anywhere.<br/>

<b>Hybrid Coaching:</b><br/>
At Vidhi Mantra, we recognize the importance of blending the best of both worlds. Our Hybrid Coaching combines the advantages of offline and online modes. Attend classes in person or join remotely based on your preference. This flexible approach ensures that your education adapts to your schedule and preferences.<br/>

No matter which mode you choose, Vidhi Mantra remains committed to delivering exceptional legal education. Join us on a learning journey that aligns with your lifestyle and goals.</p>
            </Container>
        
        </section>
    )
}

export default Course;