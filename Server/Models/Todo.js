const mongoose = require ("mongoose")

const TodoSchema = new mongoose.Schema({
    task : String
})

const TodoModel = mongoose.model("todolist",TodoSchema)

module.exports = TodoModel