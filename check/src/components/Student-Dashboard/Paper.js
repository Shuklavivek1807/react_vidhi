import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import OpenPaper from './OpenPaper';
import { Container } from "reactstrap";
import { FaEye } from "react-icons/fa";
import { PiEyeClosed } from "react-icons/pi";
import { useNavigate } from 'react-router-dom'

const Paper = () => {
  const [paper, setPaper] = useState([]);
  const [record, setRecord] = useState([]);
  const [response, setResponse] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [currentView, setCurrentView] = useState('paper');

  useEffect(() => {
    getPaper();
    getStudent();
    getResponse();
  }, []);

  const email = localStorage.getItem("student");
  const navigate = useNavigate();

  const getPaper = async () => {
    try {
      let result = await fetch('https://www.api.vidhimantraa.com/available-papers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!result.ok) {
        throw new Error(`Error ${result.status}`);
      }

      const availablePapers = await result.json();
      setPaper(Array.isArray(availablePapers) ? availablePapers : []);
    } catch (error) {
      console.error('Error fetching available papers:', error.message);
    }
  };

  const getStudent = async () => {
    try {
      const result = await fetch('https://www.api.vidhimantraa.com/student-record', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        }),
      })
      if (!result.ok) {
        throw new Error(`Error ${result.status}`);
      }
      const studentRecord = await result.json();
      setRecord(studentRecord)
    } catch (error) {
      console.error('Error fetching available papers:', error.message)
    }
  }
  const getResponse = async () => {
    try {
      const result = await fetch('https://www.api.vidhimantraa.com/student-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!result.ok) {
        throw new Error(`Error ${result.status}`);
      }

      const responseData = await result.json();
      setResponse(responseData)
    } catch (error) {
      console.error('Error fetching response', error.message);
    }
  };


  const handleOpenPaper = (selectedPaper) => {
    setSelectedPaper(selectedPaper);
    setCurrentView('openPaper');
  };

  const handleBackToPaper = () => {
    setCurrentView('paper');
  };

  return (
    <>
      <section>
        <Container>
          <h1>Hi {record.name}</h1>
          {currentView === 'paper' && (
            <>
              {paper.map((item) => {
                const currentDate = new Date();

                const startDates = item.live.map((item) => new Date(item.startTime));
                const endDates = item.live.map((item) => new Date(item.endTime));

                const isLive = startDates.some((start, index) => {
                  const isStartDateBeforeOrEqual = start <= currentDate;
                  const isEndDateAfterOrEqual = currentDate <= endDates[index];
                  // Adjust the end date check to be inclusive

                  if (isStartDateBeforeOrEqual && isEndDateAfterOrEqual) {

                    // Check if the item exists in the response array
                    const isItemInResponse = response.some((resp) => resp.title === item.title);

                    // Conditionally render based on whether the item is in the response array
                    return !isItemInResponse;

                  } else {
                    return false;
                  }
                });

                return (
                  <div className={`side_bar ${isLive ? 'live' : 'outdated'}`} key={item.id}>
                    <span>{item.title}</span>
                    <span style={{ float: 'right' }}>
                      <Button>Result</Button>
                      {isLive ? <Button onClick={() => handleOpenPaper(item)} style={{ paddingTop: "0px" }}>
                        <FaEye className="icon" />
                      </Button> :
                        <PiEyeClosed className="icon" />}
                    </span>
                  </div>
                );
              })}
            </>
          )}

          {currentView === 'openPaper' && selectedPaper && (
            <OpenPaper paper={selectedPaper} onBack={handleBackToPaper} email={record.email} />
          )}
        </Container>
      </section>
    </>
  );
};

export default Paper;
