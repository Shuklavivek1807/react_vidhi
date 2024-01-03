const express = require("express");
const cors = require('cors');
require('./db/config')
const Paper = require('./db/Question');
const Course = require('./db/Course')
const Student = require("./db/Student");
const Enquiry = require("./db/Enquire");
const Register = require("./db/Registration")
const app = express();
const bcrypt = require('bcrypt');
app.use(express.json());
app.use(cors())


app.post("/question", async (req, resp) => {
    try {
        let ques = new Paper(req.body);
        let result = await ques.save()
         resp.send(result)
    } catch (error) {
        resp.status(400).json({ error: error.message });
    }
});

app.get("/question", async(req,resp)=>{
  try {
    let paper = await Paper.find( )
    if(paper.length>0){
        resp.send(paper)
    }else{
        resp.send({result:"No Paper"})
    }
} catch (error) {
    resp.status(400).json({ error: error.message });
}
})

app.get("/question/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    let paper;

    if (id) {
      // If an ID is provided, find the paper by ID
      paper = await Paper.findById(id);
    } else {
      // If no ID is provided, get all papers
      paper = await Paper.find();
    }

    if (paper) {
      resp.send(paper);
    } else {
      resp.send({ result: "No Paper" });
    }
  } catch (error) {
    resp.status(400).json({ error: error.message });
  }
});

app.delete("/paper/:id", async (req, resp) => {
  try {
    const { id } = req.params;

    if (!id) {
      resp.status(400).json({ error: "Please provide the ID of the paper to delete." });
      return;
    }

    const result = await Paper.findByIdAndDelete(id);

    if (result) {
      resp.send(result);
    } else {
      resp.status(404).json({ error: "Paper not found" });
    }
  } catch (error) {
    console.error('Error deleting paper:', error.message);
    resp.status(500).send('Internal Server Error');
  }
});

app.put("/question/:id", async (req, resp) => {
  try {
    const { id } = req.params;

    // Find the existing paper by ID and update its fields
    const updatedPaper = await Paper.findByIdAndUpdate(id, req.body, { new: true });

    if (updatedPaper) {
      resp.json(updatedPaper);
    } else {
      resp.status(404).json({ error: "Paper not found" });
    }
  } catch (error) {
    resp.status(400).json({ error: error.message });
  }
});

app.post("/question/:id", async (req, resp) => {
  try {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
      resp.status(400).json({ error: "Please provide the ID of the paper to add a question to." });
      return;
    }

    // Find the existing paper by ID
    const existingPaper = await Paper.findById(id);

    if (!existingPaper) {
      resp.status(404).json({ error: "Paper not found" });
      return;
    }
    // Add the new question to the paper's questionset
    existingPaper.questionset.push(req.body);

    // Save the updated paper
    const updatedPaper = await existingPaper.save();

    resp.status(201).json(updatedPaper);
  } catch (error) {
    resp.status(400).json({ error: error.message });
  }
});

app.post("/paper/:id", async (req, resp) => {
  try {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
      resp.status(400).json({ error: "Please provide the ID of the paper to add a question to." });
      return;
    }

    // Extract additional fields from the request body
    const { live, duration, startTime, endTime } = req.body;

    // Use findByIdAndUpdate with upsert option to create a new paper if it doesn't exist
    const updatedPaper = await Paper.findByIdAndUpdate(
      id,
      {
        $set: {
          live: live,
          duration: duration,
          startTime: startTime,
          endTime: endTime,
        },
      },
      { new: true, upsert: true }
    );

    resp.status(201).json(updatedPaper);
  } catch (error) {
    resp.status(400).json({ error: error.message });
  }
});

app.post("/addcourse",async (req,resp)=>{
      try{
        let course = new Course(req.body);
        let result = await course.save()
        resp.send(result);
      }catch(error){
        resp.status(400).json({ error: error.message })
      }
})

app.put("/question/:id/:nestedId", async (req, resp) => {
  try {
    const result = await Paper.updateOne(
      {
        _id: req.params.id,
        "questionset._id": req.params.nestedId,
      },
      { $set: { "questionset.$.question": req.body.question, "questionset.$.options": req.body.options, "questionset.$.correctAnswer": req.body.correctAnswer } }
    );

    if (result.nModified === 0) {
      // No document was modified, which means the provided nested ID was not found.
      resp.status(404).send('Not Found');
    } else {
      // Document updated successfully
      resp.send(result);
    }
  } catch (error) {
    console.error('Error updating document:', error.message);
    resp.status(500).send('Internal Server Error');
  }
});

app.delete("/question/:id/:nestedId", async (req, resp) => {
  try {
    const result = await Paper.updateOne(
      {
        _id: req.params.id,
      },
      {
        $pull: { "questionset": { _id: req.params.nestedId } }
      }
    );

    if (result.nModified === 0) {
      // No document was modified, which means the provided nested ID was not found.
      resp.status(404).send('Not Found');
    } else {
      // Document updated successfully (deleted the nested question)
      resp.send(result);
    }
  } catch (error) {
    console.error('Error updating document:', error.message);
    resp.status(500).send('Internal Server Error');
  }
});

// Student 

app.get("/available-papers", async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Find papers with start time greater than the current date
    const availablePapers = await Paper.find({
      "live.startTime": { $lt: currentDate }
    });

    // Send the list of available papers as a response
    res.status(200).json(availablePapers);
  } catch (error) {
    // Handle errors, log them, and send an error response
    console.error('Error fetching available papers:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// student response

app.post("/response",async (req,resp)=>{
  try{
    let response = new Student(req.body);
    let result = await response.save()
    resp.send(result);
  }catch(error){
    resp.status(400).json({ error: error.message })
  }
})

app.post("/enquiry", async (req, resp) => {
  try {
      let enquire = new Enquiry(req.body);
      let result = await enquire.save()
       resp.send(result)
  } catch (error) {
      resp.status(400).json({ error: error.message });
  }
});

app.post("/registration", async (req, resp) => {
  try {
    const { contact, email } = req.body;

    // Check if a user with the same contact or email already exists
    const existingUser = await Register.findOne({ $or: [{ contact }, { email }] });

    if (existingUser) {
      return resp.status(400).json({ error: "User with the same contact or email already exists." });
    }

    // If no existing user, proceed with the registration
    const newUser = new Register(req.body);
    const result = await newUser.save();

    resp.send(result);
  } catch (error) {
    resp.status(400).json({ error: error.message });
  }
});

app.post("/signin", async (req, resp) => {
  const { email, password } = req.body;

  try {
    const user = await Register.findOne({email});
    if (user) {

      if(user.password === password){
        resp.json({ email: user.email});
      }
    } else {
      resp.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    resp.status(500).json({ error: error.message });
    console.error('Server error:', error);
  }
});

app.get("/admin/student",async(req,resp)=>{
      try{
        let student = await Register.find()
        if(student.length>0){
          resp.send(student)
        }else{
          resp.send({result:"No Student"})
        }
      }catch(error){
        resp.status(400).json({ error: error.message });
      }
})

app.post("/student-record",async(req,resp)=>{
  const {email} =req.body;
      try{
          let student = await Register.findOne({email})
          if (student) {
              resp.json(student);
          } else {
            resp.status(401).json({ error: 'Invalid email or password' });
          }
      }catch(error){
        resp.status(400).json({error: error.message})
      }
})
app.post("/student-response",async(req,resp)=>{
  const {email} =req.body;
      try{
          let student = await Student.find({email})
          if (student) {
              resp.json(student);
          } else {
            resp.status(401).json({ error: 'Invalid email or password' });
          }
      }catch(error){
        resp.status(400).json({error: error.message})
      }
})




const PORT = 5000;
app.listen(PORT);
