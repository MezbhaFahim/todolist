const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

// Fetch 

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Add new task



app.post('/add', async (req, res) => {
  const { task } = req.body;

  try {



// Check if the task already exists



    const existingTask = await TodoModel.findOne({ task });
    if (existingTask) {
      return res.status(400).json({ message: "Task already exists!" });
    }





// Create the new task and return it


    const newTask = await TodoModel.create({ task });
    res.status(201).json(newTask); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Delete


app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json({ success: true, id }))
    .catch(err => res.json(err));
});



// Edit 


app.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    const updatedTask = await TodoModel.findByIdAndUpdate(id, { task }, { new: true });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.listen(3001, () => {
  console.log("Server is Running!");
});
