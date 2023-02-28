const express= require('express');
// const router= express.Router();
const path = require("path");
const auth = require("http-auth");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const connectEnsureLogin = require("connect-ensure-login");
const { check, ValidationResult } = require("express-validator");
const app = express();

const router = express.Router();
const Registration = mongoose.model("Registration");
// const User = require("../models/User");

// const User = mongoose.model("User")
// var jwtSecret = "mysecrettoken"

//Passport
app.use(express.static(__dirname));

const bodyParser = require("body-parser");

const bodyParser = require("body-parser");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 6000,
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

/* MONGOOSE SETUP */

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


//const Schema = mongoose.Schema; for Login User that already exist
const NewUser = new mongoose.Schema({
  username: String,
  password: String
});

NewUser.plugin(passportLocalMongoose);
const NewUsers = mongoose.model("userInfo", NewUser, "userInfo");

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(NewUsers.createStrategy());

passport.serializeUser(NewUsers.serializeUser());
passport.deserializeUser(NewUsers.deserializeUser());


// Routes

// const router = express.Router();
// const Registration = mongoose.model('Registration');
// const basic = auth.basic({
//   file: path.join(__dirname, '../users.htpasswd'),
// }); 

router.post("/login", (req, res, next) => {
  passport.authenticate("local", 
  (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login?info=" + info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.post("/",
  [
    check("username").isLength({ min: 1 }).withMessage("Please enter a name"),
    check("password").isLength({ min: 1 }).withMessage("Please enter a password"),
  ],
  async (req, res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // set user password to hashed password
      registration.password = await bcrypt.hash(registration.password, salt);
      registration
        .save()
        .then(() => {
          res.send(" Sign Up Successful!");
        })
        .catch((err) => {
          console.log(err);
          res.send("Sorry! Something went wrong.");
        });
    } else {
      res.render("signup", {
        title: "Sign Up Page",
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

//Registration
//const mongoose = require("mongoose");

// //initial route

router.get("/",
  
  (req, res) => {
    res.render("index", { title: "Sign In Page" });
  }
);


//Route for Users
router.get('/registrations', basic.check((req, res) => {
  Registration.find()
  .then((registrations) => {
  res.render('users', { registrations});
})
  .catch(() => { res.send('Sorry! Something went wrong.'); });
}));

//Route for Sign Up Page
router.get('/register', 
(req, res) => {
    res.render('signup', { title: "Sign Up Page" });
});

//Route for Log In Page



//added route for user
router.get("/user", connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.send({ user: req.user })
);


  /* REGISTER SOME USERS*/
  
 NewUsers.register({ username: "Tundra", active: false }, "tundra");
 NewUsers.register({ username: "Chia", active: false }, "chia");
 NewUsers.register({ username: "Somi", active: false }, "somi");










 // 2nd method 


//route POST /users
//we are going to register the users
//give access to Public

//  router.post("/", [ 
//     chech("name", "Name is required").not().isEmpty(),
//     check("email", "Please include a valid email").isEmail(),
//     check("password", "Please enter password with 2 or more character").isLenght({ min: 2 }),
//  ],
//  async(req, res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()})
//     }
//     const {name, email, password } =req.body;
//     try{
//         //see if user exists
//         let user = await User.findOne({ email });
//         if (user){
//             res.status(400).json({errors: [{ msg: "User already exists"}]});    
//         }
//         user = new User({
//             name,
//             email,
//             password,
//         });
//         // Encryption of Password
//         const salt = await bcrypt.genSalt(10);

//         user.password = await bcrypt.hash(password, salt);

//         await user.save();

//         //Return jwt
//         const payload = {
//             user: {
//                 id: user.id,
//             }
//         };
//         jwt.sign(payload, jwtSecret, {expiresIn: 360000 }, (err, token) => {
//             if(err) throw err;
//             res.json({ token });
//         }); 
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Internal Server Error")
//     }
//  }
//  );

//  //Create route  GET /users/auth
//  // get user by token/ Loading User
//  //access Private
//  router.get("/auth", async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         res.json(user);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Internal Server Error");
//     }
//  })

//  //for Sign Up
//  router.post(
//     "/auth", [
//         check("name", "Please include a valid email").isEmail(),
//         check("password", "Password is required").exists(),
//     ],
//     async(req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()){
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const { name, password} = req.body;
        
//         try {
//             //see if user exists
//             let user = await User.findOne({ name });

//             if(!user) {
//                  return res.status(400)
//                  .json({errors: [{ msg: "Invalid Credentials"}]});
//             }

//             const isMatch = await bcrypt.compare(password, user.password);

//             if(!isMatch) {
//                 return res.status(400)
//                  .json({errors: [{ msg: "Invalid Credentials"}]});
             
//             }

//             //Return jwt
//              const payload = {
//             user: {
//                 id: user.id,
//             }
//         };
//         jwt.sign(payload, jwtSecret, {expiresIn: "5 days" }, (err, token) => {
//             if(err) throw err;
//             res.json({ token });
//         }); 
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Internal Server Error")
//     }
//  }
        
    
//  )

 module.exports = router;