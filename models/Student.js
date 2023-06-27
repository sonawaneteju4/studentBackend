const mongoose  = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
    },
    subject : {
        type: String,
        required: true
    },
    trainingMode : {
        type : String,
        required : true,
    },
    phone : {
        type: String,
        required: true
    },
     date : {
        type: String,
        default: Date.now()
    }
})

const Student = mongoose.model('student', StudentSchema)
module.exports = Student;