require('dotenv').config();
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authPandit = require('../../middleware/authPandit');

const Pandit = require('../../models/Pandit');

// @route   GET api/authPandit
// @desc    Tests auth Pandit route
// @access  Public
router.get('/', authPandit, async(req, res) => {
    try {
        const pandit = await Pandit.findById(req.pandit.id).select('-password');
        res.json(pandit);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   post api/authPandit
// @desc    Authenticate Pandit and get Token
// @access  Public
router.post('/',
[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password required').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        // If Pandit exists
        let pandit = await Pandit.findOne({ email });

        if(!pandit) {
            return res.status(400).json({ errors: [{ msg: 'Invalid cridentials' }] });
        }

        const isMatch = await bcrypt.compare(password, pandit.password);

        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid cridentials' }] });
        }

        // Return jsonwebtoken

        const payload = {
            pandit: {
                id: pandit.id
            }
        }

        jwt.sign(payload, process.env.jwtSecret,
            {expiresIn: 36000},
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;