const express = require('express');
const router = express.Router();
const Student = require('../models/student'); 


router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.json(student);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});


router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        tech: req.body.tech, 
        sub: req.body.sub     
    });

    try {
        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(400).send('Error: ' + err);
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send('Student not found');
        }

        student.sub = req.body.sub || student.sub; 
        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).send('Error: ' + err);
    }
});

module.exports = router;
