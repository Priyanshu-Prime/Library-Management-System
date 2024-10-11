const jwt = require('jsonwebtoken');

const ALLOWED_DOMAIN = 'iiitt.ac.in';
const JWT_SECRET=process.env.JWT_SECRET;

const googleLogin = (req, res) =>
{
    const {email} = req.body;

    const emailDomain = email.split('@')[1];

    if (emailDomain != ALLOWED_DOMAIN)
    {
        console.log("Email not accepted login failed");
        return res.status(403).json({message: "IIITT email not found!"});
    }
    const token = jwt.sign({email}, JWT_SECRET, {expiresIn: '1h'});

    res.status(200).json({token, message: "Login successful!"});
    console.log("Email accepted login done");
}

module.exports = {googleLogin};