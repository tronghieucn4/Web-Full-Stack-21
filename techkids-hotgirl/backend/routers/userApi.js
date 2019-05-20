const express = require('express');
const UserApiRouter = express.Router();

const UserModel = require('../models/user');

//Get list user
UserApiRouter.get('/', (req, res) => {
    UserModel.find({}, (err, users) => {
        if (err) res.json({ success: false, err })
        else res.json({ success: true, data: users });
    });
});

//Create User
UserApiRouter.post('/', (req, res) => {
    UserModel.create(req.body, (err, userCreated) => {
        if (err) res.json({ success: false, err })
        else res.json({ success: true, data: userCreated });
    });
});

//Update User
UserApiRouter.put('/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findById(id, (err, userFound) => {
        if (err) res.json({ success: false, err });
        else if (!userFound) res.json({ success: false, err: 'Not Found' });
        else {
            // ex: req.body = { name: "aaaa", username: "bbbb"}
            for (let key in req.body) {
                let value = req.body[key];
                if (value !== null) {
                    userFound[key] = value;
                }
            }

            userFound.save((err, userUpdated) => {
                if (err) res.json({ success: false, err });
                else res.json ({ success: true, data: userUpdated });
            });
        }
    })
})

//Delete User
UserApiRouter.delete('/:id', (req,res) => {
    const id = req.params.id;

    UserModel.findByIdAndDelete(id, (err) => {
        if (err) res.json({ success: false, err });
        else res.json({ success: true });
    })
})



module.exports = UserApiRouter;