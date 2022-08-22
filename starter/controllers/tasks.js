const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')


const createTask = asyncWrapper(async (req, res) => {
 
        
        const tasks = await Task.create(req.body)
        return res.status(201).json({tasks})
        
    
    
})

const getAllTasks = asyncWrapper(async (req, res) => {
        const tasks = await Task.find()
        return res.status(201).json({tasks})

})

const getTask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params
    const tasks = await Task.findOne({ _id: taskID })
    if (!tasks) {
        return res.status(404).json({ msg: `No task with ID: ${taskID}`})
    }
    res.status(200).json({tasks})



})  
const updateTask = asyncWrapper(async (req, res) => {

    const {id:taskID} = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID}, req.body, {
        new:true, runValidators:true
    })

    if (!task){
        res.status(404).json({msg: `No task with ${taskID} `})
    }
    res.status(200).json({task})

}) 

const deleteTask = asyncWrapper(async (req, res) => {
    
        const { id: taskID } = req.params
        const tasks = await Task.findOneAndDelete({ _id: taskID})

        if (!tasks){
            return res.status(404).json({msg: `No task with ID: ${taskID}`})
        }
        
        res.status(200).json({deleteTask})

  
})
   
    module.exports = {
        getAllTasks,
        createTask,
        getTask,
        updateTask,
        deleteTask
    }
