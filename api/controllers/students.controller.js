const Lab = require("../models/labs.model");
const Student = require("../models/students.model");


// Create a new Student
const createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single Student by id
const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Student by id
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Student
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllStudentsAndDataInformation = async (req, res) => {
    try {
        const students = await Student.find().populate('courses');
        const labs = await Lab.find().populate({
            path: 'submittedBy.student',  // Path to the student in the submittedBy array
            model: 'student',  // Explicitly specifying the model name
            populate: {
                path: 'courses',  // Path to courses in the student model
                model: 'course'  // Explicitly specifying the course model name
            }
        });

        const obj = {
            students: students,
            labs: labs
        }
        res.status(200).json(obj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports =  {
    createStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    getAllStudentsAndDataInformation
}