import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Table } from "reactstrap";
import { courses, criteria } from './const';
import { BsAlarm, BsCalendar2Check } from "react-icons/bs";
import { GrLanguage } from "react-icons/gr";
import RomanNumerals from "roman-numerals";

const Syllabus = () => {
    const [showMap, setShowMap] = useState({});
    const [elegibility, setElegibility] = useState([]);
    const [note, setNote] = useState([])
    const [noteMain, setNoteMain] = useState([])
    const [preExam, setPreExam] = useState([])
    const [mainExam,setMainExam] =useState([])
    const [mainPre,setMainPre] = useState([])
    const [main,setMain] = useState([])
    const [viva,setViva]= useState([])
    
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    const showSyllabus = (item) => {
        console.log(item)
        setShowMap((prevShowMap) => {
            const updatedShowMap = {};

            // Close all other courses
            Object.keys(prevShowMap).forEach((course) => {
                updatedShowMap[course] = false;
            });

            // Toggle the state for the selected course
            updatedShowMap[item] = !prevShowMap[item];

            return updatedShowMap;
        });
        const clickedCriteria = criteria.find((criteriaItem) => criteriaItem.title === item);

        // Display the heading and para if criteria is found
        if (clickedCriteria) {
            setElegibility(clickedCriteria.description)
            setPreExam(clickedCriteria.prelimanary)
            setNote(clickedCriteria.note)
            setMainExam(clickedCriteria.main)
            setNoteMain(clickedCriteria.noteMain)
            setViva(clickedCriteria.viva)
            setMainPre(clickedCriteria.mainPre)
            setMain(clickedCriteria.mainPost)
        }
    };

    return (
        <section>
            <div className="text-center mb-5 col-lg-12" style={{ paddingTop: "15px" }}>
                <h2 className="fw-bold">Syllabus</h2>
            </div>

            <Container>
                <Row>
                    {courses.map((item, index) => (
                        <React.Fragment key={index}>
                            <Button
                                className="syllabus_button"
                                onClick={() => showSyllabus(item)}
                            >
                                {item}
                            </Button>
                            {showMap[item] &&
                                <>
                                    <Row>
                                        <Col md="3">
                                            {elegibility.map((item, index) => (
                                                <Card key={index} style={{ margin: "5px 0px", border: "2px solid #17BF9E", backgroundColor: "transparent" }}>
                                                    <div className="card-content">
                                                        <Row >
                                                            <Col md='3' style={{ paddingTop: "5px" }}>
                                                                {index === 0 && <BsAlarm className="syllabus_card_icon" />}
                                                                {index === 1 && <GrLanguage className="syllabus_card_icon" />}
                                                                {index === 2 && <BsCalendar2Check className="syllabus_card_icon" />}
                                                            </Col>
                                                            <Col md='9'>
                                                                <h3>{item.heading}</h3>
                                                                <p>{item.para}</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Card>
                                            ))}

                                        </Col>
                                        <Col md="9">
                                            <h2>EXAM PATTERN</h2>
                                            <p style={{ backgroundColor: "#17bf9e", marginBottom: "10px",color:"white" }}>Prelimanary Exam</p>
                                            <div className='table-responsive-sm'>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        {preExam.map((item, index) => (
                                                            <td key={index}>{item.heading}</td>
                                                        ))}
                                                        {mainPre && mainPre.map((item,index)=>(
                                                             <td key={index}>{item.heading}</td>
                                                        ))}
                                                    </tr>
                                                    <tr>
                                                        {preExam.map((item, index) => (
                                                            <>
                                                                {index === 0 && <td>{item.description}</td>}
                                                                {index === 1 && <td>{item.description}</td>}
                                                                {index === 2 && <td>{item.description}</td>}
                                                                {index === 3 && <td>
                                                                    {item.description.split('\n').map((line, lineIndex) => (
                                                                        <tr key={lineIndex}>{line}</tr>
                                                                    ))}
                                                                </td>
                                                                }
                                                            </>
                                                        ))}
                                                        {mainPre && mainPre.map((item,index)=>(
                                                             <td key={index}>{item.description}</td>
                                                        ))}
                                                    </tr>
                                                </tbody>

                                            </Table>
                                            <p>{note}</p>
                                            </div>

                                            <p style={{ backgroundColor: "#17bf9e", marginBottom: "10px",color:"white" }}>Main Exam</p>
                                            <div className='table-responsive-sm'>
                                            <Table style={{ backgroundColor: "transparent" }}>
                                                <tbody>
                                                    <tr>
                                                        {mainExam.map((item, index) => (
                                                            <td key={index}>PAPER {RomanNumerals.toRoman(index + 1)}<br/> ({item.heading})</td>
                                                        ))}
                                                    </tr>
                                                    <tr>
                                                    {mainExam.map((item, index) => (
                                                            <td key={index}>{item.marks} Marks</td>
                                                        ))}
                                                    </tr>
                                                    <tr>
                                                        {mainExam.map((item, index) => (
                                                            <><td>
                                                                    {item.description.split('\n').map((line, lineIndex) => (
                                                                        <tr key={lineIndex}>{line}</tr>
                                                                    ))}
                                                                </td>
                                                            </>
                                                        ))}
                                                    </tr>
                                                </tbody>

                                            </Table>
                                            </div>
                                            <div className='table-responsive-sm'>
                                            {main && <>
                                                <p style={{ backgroundColor: "#17bf9e", marginBottom: "10px",color:"white" }}>Main Exam</p>
                                            <Table style={{ backgroundColor: "transparent" }}>
                                                <tbody>
                                                    <tr>
                                                        {main.map((item, index) => (
                                                            <td key={index}>PAPER {RomanNumerals.toRoman(index + 1)}<br/> ({item.heading})</td>
                                                        ))}
                                                    </tr>
                                                    <tr>
                                                    {main.map((item, index) => (
                                                            <td key={index}>{item.marks} Marks</td>
                                                        ))}
                                                    </tr>
                                                    <tr>
                                                        {main.map((item, index) => (
                                                            <><td>
                                                                    {item.description.split('\n').map((line, lineIndex) => (
                                                                        <tr key={lineIndex}>{line}</tr>
                                                                    ))}
                                                                </td>
                                                            </>
                                                        ))}
                                                    </tr>
                                                </tbody>

                                            </Table>
                                            </>
                                            }
                                            <p>{noteMain}</p>
                                            </div>
                                            <p style={{ backgroundColor: "#17bf9e", marginBottom: "10px",color:"white"  }}>Viva - Voice</p>
                                                    {viva.map((item,index)=>(
                                                        <div className='table-responsive-sm'>
                                                        <Table>
                                                        <tbody style={{backgroundColor:"white"}}>
                                                        <tr style={{borderBottom:"1px solid #17bf9e", textAlign:"center"}}>{item.marks}</tr>
                                                        </tbody>
                                                        </Table>
                                                        <p>{item.note}</p>
                                                        </div>
                                                ))}
                                        </Col>
                                    </Row>
                                </>
                            }
                        </React.Fragment>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Syllabus;
