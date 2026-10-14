const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const departments = [
  "Computer Science",
  "Business",
  "Engineering",
  "Arts and Humanities",
  "Other",
];

// Configure EJS templates and serve files from the public folder.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Show the registration form.
app.get("/", (req, res) => {
  res.render("index", {
    departments,
    errors: [],
    values: { name: "", email: "", department: "" },
  });
});

// Receive, validate, and display a submitted registration.
app.post("/register", (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const department = String(req.body.department || "").trim();
  const errors = [];

  if (!name) {
    errors.push("Please enter your name.");
  }

  if (!email) {
    errors.push("Please enter your email address.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (!department) {
    errors.push("Please choose a department.");
  } else if (!departments.includes(department)) {
    errors.push("Please choose a department from the list.");
  }

  if (errors.length > 0) {
    return res.status(400).render("index", {
      departments,
      errors,
      values: { name, email, department },
    });
  }

  return res.render("result", { student: { name, email, department } });
});

app.listen(PORT, () => {
  console.log(`Student Registration System is running at http://localhost:${PORT}`);
});
