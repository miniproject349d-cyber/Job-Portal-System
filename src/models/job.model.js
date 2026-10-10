const mongoose = require('mongoose');


const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    recruiterRef: {
        type: String,
        required: true,
    }

})


const JobModel = mongoose.model("job", JobSchema)


module.exports = JobModel;