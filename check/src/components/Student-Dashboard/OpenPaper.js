import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import examInstructions from './InstructionConst';
import Swal from 'sweetalert2';

const OpenPaper = ({ paper, onBack, email }) => {
  const [startPaper, setStartPaper] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(paper.questionset.length).fill({ option: '', correctAnswer: '' }));
  const [countTime, setCountTime] = useState(paper.live[0]?.duration * 60*60); 

  useEffect(() => {
    let timer;
    if (startPaper && countTime > 0) {
      timer = setInterval(() => {
        setCountTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [startPaper, countTime]);

  const showPaper = () => {
    setStartPaper(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleOptionSelect = (option, correctAnswer) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = { question: paper.questionset[currentQuestionIndex].question, option, correctAnswer };
    setSelectedOptions(updatedOptions);
  };
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours} hours ${minutes} minutes`;
  };

  const handleSubmit = async () => {
    if (currentQuestionIndex === paper.questionset.length - 1) {
      let count = selectedOptions.filter((item) => item.correctAnswer).length;
      setAttemptedCount(count);
      Swal.fire({
        title: `Attempted Question : ${count}`,
        text: `Total Question : ${paper.questionset.length}`,
      }).then(async (swalResult) => {
        if (swalResult.isConfirmed) {
          try {
            let responseResult = await fetch("https://www.api.vidhimantraa.com/response", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                response: selectedOptions,
                title: paper.title,
              }),
            });

            if (!responseResult.ok) {
              throw new Error(`HTTP error! Status: ${responseResult.status}`);
            }

            onBack();
          } catch (error) {
            console.error(error);
            // Handle the error as needed
          }
        }
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: "Your responses have been submitted successfully.",
        icon: "success",
      });
      handleNextQuestion();
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '10px', height: "70vh", position: "relative" }}>
      {startPaper ? (
        <>
          <div>
            <p>Time left : {formatTime(countTime)}</p>
            <h1>{paper.questionset[currentQuestionIndex].question}</h1>
            {paper.questionset[currentQuestionIndex].options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                className={`custom-button ${selectedOptions[currentQuestionIndex]?.option === option ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option, paper.questionset[currentQuestionIndex].correctAnswer)}
              >
                {option}
              </button>
            ))}
            <button className="paper-submit" onClick={handleSubmit}>Submit</button>
            {currentQuestionIndex < paper.questionset.length - 1 && (
              <button className="paper-next" onClick={handleNextQuestion}>Next</button>
            )}
          </div>
        </>
      ) : (
        <>
          <h1 style={{ margin: '10px 0px' }}>Instructions:</h1>
          {examInstructions.map((instruction, index) => (
            <p key={index} style={{ lineHeight: '1em' }}>
              {instruction}
            </p>
          ))}
          {paper.live.map((liveSession, index) => (
            <p key={index}>You will have {liveSession.duration} hour to complete your exam</p>
          ))}
          <Button variant="contained" color="primary" className="paper_button" onClick={showPaper}>
            Start
          </Button>
        </>
      )}
    </div>
  );
};

export default OpenPaper;
