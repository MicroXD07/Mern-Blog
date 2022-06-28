const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const accessTokenSecret =
  "youraccesstokensecret-obviously-you-should-change-and-secure-this";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, async (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }

      try {
        const user = await User.findOne({ _id: payload.userId });
        req.user = user;
        next();
      } catch (error) {
        console.log(error.message);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const jwtPayload = {
      userId: user._id,
      username: user.username,
      role: user.role,
    };

    const accessToken = jwt.sign(jwtPayload, accessTokenSecret);

    res.status(200).json({ user, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json("Wrong credentials");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Wrong credentials");
    }

    const accessToken = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: "20m" }
    );

    const { password, ...others } = user._doc;
    return res.status(200).json({ accessToken, user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err);
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(req);
}

module.exports = { router, authenticateJWT };
