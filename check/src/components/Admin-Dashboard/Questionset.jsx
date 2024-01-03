import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import liveImg from "../../assests/images/live.png";
import redLiveImg from "../../assests/images/red-live.png";
import { Container } from 'reactstrap';
import { GrUpdate } from "react-icons/gr";


const QuestionSet = () => {
  const [paper, setPaper] = useState([]);
  const [title, setTitle] = useState();
  const [id, setid] = useState();
  const [currentView, setCurrentView] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getPaper();
    renderComponent();
  }, [currentView]);

  const showView = (id) => {
    setid(id);
  }

  const deletePaper = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Remove the question from the state
        try {
          let result = await fetch(`http://www.api.vidhimantraa.com/paper/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
          }
          setPaper((prevPaper) => prevPaper.filter((item) => item._id !== id));
          Swal.fire('Deleted!', 'Your paper has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting paper:', error.message);
          Swal.fire('Error!', 'Failed to delete paper', 'error');
        }
      }
    });
  };
  const livePaper = (id) => {
    Swal.fire({
      title: 'Select Date and time for Live Paper',
      html: `
        <label for="swal-start-datetime">Start Date and Time:</label>
        <input type="datetime-local" id="swal-start-datetime" class="swal2-input" placeholder="Start Date and Time">
        <label for="swal-end-datetime">End Date and Time:</label>
        <input type="datetime-local" id="swal-end-datetime" class="swal2-input" placeholder="End Date and Time">
        <label for="swal-duration">Time Duration:</label>
        <input type="text" id="swal-duration" class="swal2-input" placeholder="Time Duration">
        <label for="swal-option">Select Option:</label>
        <select id="swal-option" class="swal2-input">
          <option value="all">All</option>
          <option value="enrolled">Enrolled</option>
        </select>
      `,
      confirmButtonText: 'Submit',
      showCancelButton: true,
      preConfirm: () => {
        const startDatetime = document.getElementById('swal-start-datetime').value;
        const endDatetime = document.getElementById('swal-end-datetime').value;
        const duration = document.getElementById('swal-duration').value;
        const option = document.getElementById('swal-option').value;
  
        if (!startDatetime || !endDatetime || !duration || !option) {
          Swal.showValidationMessage('All fields are required');
        }
  
        return { startDatetime, endDatetime, duration, option };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { startDatetime, endDatetime, duration, option } = result.value;
        try {
          let result = await fetch(`http://www.api.vidhimantraa.com/paper/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              live: {
                duration: duration,
                startTime: startDatetime,
                endTime: endDatetime,
                option: option,
              },
            }),
          });
          if (!result.ok) {
            throw new Error(`Error ${result.status}`);
          }
  
          // Fetch updated data after successfully updating live data
          getPaper();
        } catch (error) {
          Swal.fire('Error!', '', 'error');
        }
      }
    });
  };
  

  const renderComponent = () => {
    const currentDate = new Date();
    const addDate = new Date().setDate(currentDate.getDate() - 1);
    console.log(currentDate)
    switch (currentView) {
      case 1:
        return <PaperSet />;
      case 2:
        return <ViewPaper />;
      default:
        return (
          <section>
            <Container>
              {paper.map((item) => {

                const startDates = item.live.map((item) => new Date(item.startTime));
                const endDates = item.live.map((item) => new Date(item.endTime));


                const isLive = startDates.some((start, index) => {
                  const isStartDateBeforeOrEqual = start <= currentDate;
                  const isEndDateAfterOrEqual = addDate <= endDates[index];


                  console.log('Is Start Date Before or Equal:', isStartDateBeforeOrEqual);
                  console.log('Is End Date After or Equal:', isEndDateAfterOrEqual);

                  // Adjust the end date check to be inclusive
                  if (isStartDateBeforeOrEqual && isEndDateAfterOrEqual) {
                    console.log('Dates are within range!');
                    return true;
                  } else {
                    console.log('Dates are NOT within range.');
                    return false;
                  }
                });

                console.log('Is Live:', isLive);



                return (
                  <div className={`side_bar ${isLive ? 'outdated' : ''}`} key={item.id}>
                    <span>{item.title}</span>
                    <span style={{ float: 'right', marginTop: '-15px' }}>
                      <Button onClick={() => { setCurrentView(2); showView(item._id); }}>
                        <FaEye className='icon' />
                      </Button>
                      <Button onClick={() => deletePaper(item._id)}>
                        <RiDeleteBin6Line className='icon' />
                      </Button>
                      <Button onClick={() => livePaper(item._id)}>
                        {isLive ? (
                          <img src={redLiveImg} style={{ height: "40px" }} />
                        ) : (
                          <img src={liveImg} style={{ height: "40px" }} />
                        )}
                      </Button>
                    </span>
                  </div>
                );
              })}
              <Button className="button" onClick={handleExamPaperClick} >
                Add Paper
              </Button>
            </Container>
          </section>
        );
    };
  }


  const getPaper = async () => {
    try {
      let result = await fetch('http://www.api.vidhimantraa.com/question', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      const paperData = await result.json();
      setPaper(Array.isArray(paperData) ? paperData : []);
    } catch (error) {
      console.error('Error fetching paper:', error.message);
    }
  };

  const handleExamPaperClick = async () => {
    const ipAPI = '//api.ipify.org?format=json';
    const response = await fetch(ipAPI);
    const data = await response.json();
    const inputValue = '';
    const { value: title } = await Swal.fire({
      title: 'Enter title for project',
      input: 'text',
      inputLabel: 'Title for project',
      inputValue,
      showCancelButton: true,
      customClass: {
        popup: 'custom-popup',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
      },
    });
    if (title) {
      setTitle(title);
      setCurrentView(1)
    }
  };

  // Set paper component start

  const PaperSet = () => {
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleOptionChange = (index, value) => {
      const newOptions = [...options];
      newOptions[index] = value;
      setOptions(newOptions);
    };

    const handleSubmit = () => {
      Swal.fire({
        title: question,
        html: `<p>Options:</p>
            ${options.map((item) => `<p>${item}</p>`).join('')}
            <p><br/>Correct Answer: ${correctAnswer}</p>`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Question added",
        customClass: {
          popup: 'custom-popup-class',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Added!",
            text: "Confirm",
            icon: "success"
          });
          const newQuestionSet = { question, options, correctAnswer };
          setQuestions([...questions, newQuestionSet]);
          const storedQuestions = JSON.parse(localStorage.getItem('questionSets')) || [];
          localStorage.setItem('questionSets', JSON.stringify([...storedQuestions, newQuestionSet]));
          setQuestion('');
          setOptions(['', '', '', '']);
          setCorrectAnswer('');
        }
      });
    };


    const finalSubmit = async () => {
      try {
        const result = await fetch('http://www.api.vidhimantraa.com/question', {
          method: 'POST',
          body: JSON.stringify({
            title: title,
            questionset: questions,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!result.ok) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }
        localStorage.clear('questionSets');
        setPaper([]);
        setCurrentView(0)
      } catch (error) {
        console.error('Error during submission:', error.message);
      }
    };

    return (
      <section>
        <Container>
        <FormControl fullWidth>
          <TextField
            label="Question"
            type="text"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className='input_field'
          />
        </FormControl>

        {[1, 2, 3, 4].map((index) => (
          <FormControl key={index} fullWidth>
            <TextField
              label={`Option ${index}`}
              type="text"
              placeholder={`Enter option ${index}`}
              value={options[index - 1]}
              onChange={(e) => handleOptionChange(index - 1, e.target.value)}
            />
          </FormControl>
        ))}

        <FormControl fullWidth>
          <InputLabel id="correctAnswerLabel">Select Correct Answer</InputLabel>
          <Select
            labelId="correctAnswerLabel"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          >
            <MenuItem value="">Select correct answer</MenuItem>
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {`Option ${index + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" className='side_button' onClick={handleSubmit}>
          Add Question
        </Button>
        <Button variant="contained" className='side_button' style={{marginLeft:"10px"}} onClick={finalSubmit}>
          Submit
        </Button>
      </Container>
      </section>
    );
  };
  // Set paper component end
  // View Component
  const ViewPaper = () => {
    const [view, setView] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [paperTitle, setPaperTitle] = useState()
    useEffect(() => {
      viewQuestionPaper();
    }, [id]);

    const viewQuestionPaper = async () => {
      try {
        let result = await fetch(`http://www.api.vidhimantraa.com/question/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!result.ok) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }

        const paperData = await result.json();
        setPaperTitle(paperData.title || []);
        setView(paperData.questionset || []);
      } catch (error) {
        console.error('Error fetching paper:', error.message);
      }
    };

    const handleUpdateClick = (question) => {
      // Set the selected question for editing
      setSelectedQuestion(question);

      // Open a modal or show a dialog for editing the question, options, and correct answer
      Swal.fire({
        title: 'Update Question',
        html: `
          <p>Question:</p>
          <input id="updateQuestion" class="swal2-input" style="width: 600px" value="${question.question}">
          <p>Options:</p>
          ${question.options
            .map((option, optionIndex) => `<input class="swal2-input" style="width: 600px" value="${option}">`)
            .join('')}
          <p>Correct Answer:</p>
          <input id="updateCorrectAnswer" class="swal2-input" style="width: 600px" value="${question.correctAnswer}">
        `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Update',
        customClass: {
          popup: 'custom-popup-class',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Get updated values from the modal
          const updatedQuestion = document.getElementById('updateQuestion').value;
          const updatedOptions = Array.from(document.querySelectorAll('.swal2-input:not(#updateQuestion):not(#updateCorrectAnswer)'))
            .map((input) => input.value)
            .filter((option) => option.trim() !== ''); // Filter out empty options
          const updatedCorrectAnswer = document.getElementById('updateCorrectAnswer').value;

          // Update the question in the state
          const updatedView = view.map((item) => {
            if (item === question) {
              return {
                ...item,
                question: updatedQuestion,
                options: updatedOptions,
                correctAnswer: updatedCorrectAnswer,
              };
            }
            return item;
          });

          try {
            const response = await fetch(`http://www.api.vidhimantraa.com/question/${id}/${question._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                question: updatedQuestion,
                options: updatedOptions,
                correctAnswer: updatedCorrectAnswer,
              }),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setView(updatedView);
            Swal.fire('Question Updated!', '', 'success');
          } catch (error) {
            console.error('Error updating question on server:', error.message);
            Swal.fire('Error updating question!', '', 'error');
          }
        }
      });
    };

    const handleDeleteClick = (question) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Get the nestedId from the question
          const nestedId = question.id;

          // Remove the question from the state
          const updatedView = view.filter((item) => item !== question);
          try {
            let result = await fetch(`http://www.api.vidhimantraa.com/question/${id}/${question._id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!result.ok) {
              throw new Error(`HTTP error! Status: ${result.status}`);
            }
            setView(updatedView);
            Swal.fire('Deleted!', 'Your question has been deleted.', 'success');
          } catch (error) {
            console.error('Error deleting question:', error.message);
            Swal.fire('Error!', 'Failed to delete question', 'error');
          }

        }
      });
    };

    const handleUpdateTitle = async () => {
      const updatedTitle = prompt('Enter the new title:', paperTitle);

      if (updatedTitle !== null && updatedTitle !== '') {
        try {
          const response = await fetch(`http://www.api.vidhimantraa.com/question/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: updatedTitle,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          console.log(updatedTitle)
          setPaperTitle(updatedTitle);
          Swal.fire('Title Updated!', '', 'success');
        } catch (error) {
          console.error('Error updating title on server:', error.message);
          Swal.fire('Error updating title!', '', 'error');
        }
      }
    };

    const handleAddQuestion = async () => {
      const result = await Swal.fire({
        title: 'Add New Question',
        html: `
          <p>Question:</p>
          <input id="newQuestion" class="swal2-input" style="width: 600px" placeholder="Enter your question">
          <p>Options:</p>
          <input id="optionA" class="swal2-input" style="width: 600px" placeholder="Option A">
          <input id="optionB" class="swal2-input" style="width: 600px" placeholder="Option B">
          <input id="optionC" class="swal2-input" style="width: 600px" placeholder="Option C">
          <input id="optionD" class="swal2-input" style="width: 600px" placeholder="Option D">
          <p>Correct Answer:</p>
          <input id="correctAnswer" class="swal2-input" style="width: 600px" placeholder="Enter correct answer">
        `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Add Question',
        customClass: {
          popup: 'custom-popup-class',
        },
      });
      if (result.isConfirmed) {
        const newQuestion = {
          question: document.getElementById('newQuestion').value,
          options: [
            document.getElementById('optionA').value,
            document.getElementById('optionB').value,
            document.getElementById('optionC').value,
            document.getElementById('optionD').value,
          ],
          correctAnswer: document.getElementById('correctAnswer').value
        };

        try {
          const response = await fetch(`http://www.api.vidhimantraa.com/question/${id}`, {
            method: 'POST',
            body: JSON.stringify(newQuestion),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          setView((prevView) => [...prevView, newQuestion]);
          viewQuestionPaper()
          Swal.fire('Question Added!', '', 'success');
        } catch (error) {
          console.error('Error during submission:', error.message);
          Swal.fire('Error!', 'Failed to add question', 'error');
        }
      }
    };
    return (
      <section>
        <Container>
      <div style={{ overflowY: 'scroll', maxHeight: '400px' }}>
        <div className='paper_container'>
          <span style={{ paddingLeft: "6px", fontSize: "20px" }}>{paperTitle}
            <Button style={{color:"white"}} onClick={handleUpdateTitle}><GrUpdate/></Button>
          </span>
          <Button onClick={() => setCurrentView(0)} className='add_question_button'>Close</Button>
          <Button onClick={handleAddQuestion} className='add_question_button'>Add Question</Button>
        </div>
        {view.map((item, index) => (
          <Card key={index} variant="outlined" style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.question}
              </Typography>
              <Typography variant="body1">
                <strong></strong>
              </Typography>
              <ul>
                {item.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ul>
              <Typography variant="body1">
                <strong>Correct Answer:</strong> {item.correctAnswer}
                <div>
                  <Button className='paper_button' onClick={() => handleUpdateClick(item)}>Update</Button>
                  <Button className='paper_button' onClick={() => handleDeleteClick(item)}>Delete</Button>
                </div>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      </Container>
      </section>
    );
  };


  return <>{renderComponent()}</>;
};

export default QuestionSet;
