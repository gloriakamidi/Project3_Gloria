const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const auth = require("http-auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const connectEnsureLogin = require("connect-ensure-login");
const app = express();

const router = express.Router();
const Registration = mongoose.model("Registation");

//Passport
app.use(express.static(__dirname));

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

/* PASSPORT SETUP */

const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

/* MONGOOSE SETUP */

const passportLocalMongoose = require("passport-local-mongoose");

const NewUser = new mongoose.Schema({
  username: String,
  password: String,
});

NewUser.plugin(passportLocalMongoose);
const NewUsers = mongoose.model("userInfo", NewUser, "userInfo");

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(NewUsers.createStrategy());

passport.serializeUser(NewUsers.serializeUser());
passport.deserializeUser(NewUsers.deserializeUser());

/* ROUTES */

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
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

router.post(
  "/",
  [
    check("name").isLength({ min: 1 }).withMessage("Please enter a name"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("Please enter a password"),
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
      res.render("loginform", {
        title: "Log In Page",
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

//Registration
//const mongoose = require("mongoose");

// //initial route

router.get(
  "/",

  (req, res) => {
    res.render("home", { title: "Log In Page" });
  }
);

//Route for Users
router.get(
  "/registrations",
  basic.check((req, res) => {
    Registration.find()
      .then((registrations) => {
        res.render("users", { title: "Displaying users", registrations });
      })
      .catch(() => {
        res.send("Sorry! Something went wrong.");
      });
  })
);

//Route for Sign Up Page
router.get("/loginform", (req, res) => {
  res.render("loginform", { title: "Log In Page" });
});

//Route for Log In Page
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/login", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.sendFile("./login");
});

//Route for Clients
router.get("/clients", (req, res) => {
  res.render("clients");
});

//added route for user
// router.get("/user", connectEnsureLogin.ensureLoggedIn(), (req, res) =>
//   res.send({ user: req.user })
// );

//  app.post('/login', (req,res, next) => {
//     passport.authenticate('local',
//     (err, user, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             return res.redirect('/login?info=' + info);
//         }
//         req.logIn(user, function(err) {
//             if (err) {
//                 return next(err);
//             }
//             return res.redirect('/');
//         });
//     }) (req, res, next);
//  });
//  pp.get('/login', (req, res) =>
//    res.sendFile('./login', { root: __dirname })
//  );

//  app.get('/', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
//    res.sendFile('./Home', { root: __dirname })
//  );

//  app.get("/private", connectEnsureLogin.ensureLoggedIn(), (req, res) =>
//    res.sendFile('./private', { root: __dirname })
//  );

//  app.get('/user', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
//    res.send({ user: req.user })
//  );

//  app.get('/logout', (req, res) => {
//    req.logout(), res.sendFile('./logout', { root: __dirname });
//  });

/* Users */
NewUsers.register({ username: "lea", active: false }, "lea");
NewUsers.register({ username: "zuri", active: false }, "zuri");
NewUsers.register({ username: "noah", active: false }, "noah");
