const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

const app = express();

mongoose.connect('mongodb://localhost/registrationdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  country: String,
  state: String,
  city: String,
  gender: String,
  dateOfBirth: Date,
  age: Number,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());
app.use(cors());

app.post(
  '/api/register',
  [
    check('firstName').isAlpha().withMessage('First name must contain only alphabets'),
    check('lastName').isAlpha().withMessage('Last name must contain only alphabets'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('country').notEmpty().withMessage('Country is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('gender').notEmpty().withMessage('Gender is required'),
    check('dateOfBirth').custom((value) => {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 14) {
        throw new Error('Age must be at least 14 years.');
      }
      return true;
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        firstName,
        lastName,
        email,
        country,
        state,
        city,
        gender,
        dateOfBirth,
      } = req.body;

      const newUser = new User({
        firstName,
        lastName,
        email,
        country,
        state,
        city,
        gender,
        dateOfBirth,
        age: calculateAge(dateOfBirth),
      });

      await newUser.save();

      res.json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
}
