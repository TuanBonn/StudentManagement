var express = require('express');
const StudentModel = require("../models/StudenModel");
var router = express.Router();

router.get('/', async (req, res) => {
    var students = await StudentModel.find();
    // res.send(students);
    res.render('student/index', {students: students});
})

router.get('/detail/:id', async (req, res) => {
    var id = req.params.id;
    var student = await StudentModel.findById(id);
    res.render('student/detail', {student: student});
});

router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    var student = await  StudentModel.findByIdAndDelete(id);
    console.log('Delete student success');
    res.redirect('/student');
});

router.get('/add', (req,res) =>{
    res.render('student/add');
});

router.post('/add', async (req, res) => {
    var student = req.body;
    await StudentModel.create(student);
    console.log('Add student success');
    res.redirect('/student');
})

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var student = await StudentModel.findById(id);
    res.render('student/edit', {student: student});
})

router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var student = req.body;
    await StudentModel.findByIdAndUpdate(id, student);
    console.log('Update student success');
    res.redirect('/student');
})
module.exports = router;