const express = require('express');
const router = express.Router();
  
router.route('/').get((req, res)=>{
    res.send('User List');
}).post((req, res)=>{
    const { firstName, lastName, gender, age } = req.body;

    const isValid = firstName !== "" && lastName !== "" && gender !== "" && age !== "";

    if(isValid){
        users.push({ firstName, lastName, gender, age });
        res.render('users/list', { users });
    } else {
        res.render("users/new", { firstName, lastName, gender, age });
    }
});

router.get('/list', (req, res)=>{
    res.render('users/list', {users});
});

router.get('/new', (req, res)=>{ // /users/new
    res.render('users/new', {firstName:"Test"});
});

router.route('/:id').get((req, res)=>{
    console.log(req.user);
    console.log('Getting user data!');
res.render('users/show', { user: req.user });}).delete((req, res)=>{
res.send(`Deleting User data for id: ${req.params.id}`);
}).put((req, res)=>{
res.send(`Updating User data for id: ${req.params.id}`);
});

const users = [
  { firstName: "Alex", lastName: "Rivas", gender: "Male", age: 21 },
  { firstName: "George", lastName: "Salayka", gender: "Male", age: 40 }
];

router.param("id", (req, res, next, id)=>{
    req.user = users[id];
    next();
});

module.exports = router;