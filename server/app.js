const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const dbService = require("./dbService");
const DbService = require("./dbService");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create
app.post("/insert", (req, res) => {
  const { name } = req.body;
  const db = new DbService();
  const result = db.insertNewName(name);
  // console.log(result)
  result.then((data) => res.json(data)).catch((err) => console.log(err));
});

// read

app.get("/getAll", (req, res) => {
  // const db = DbService.getDbServiceInstance();
  const db = new DbService();
  const result = db.getAllData();
  result
    .then((data) => {
      res.json({ data: data });
      // console.log(data + "al mamun");
    })
    .catch((err) => console.log(err));
});
// update

// delete
app.delete("/delete/:id", (req, res) => {
  const db = new DbService();

  const id = parseInt(req.params.id);

  const result = db.deleteRow(id);
  result
    .then((data) => {
      console.log("detele response " + data);
      res.json({ success: data });
    })
    .catch((err) => {
      console.log(err);
    });
}); 

app.listen(process.env.PORT, () => {
  console.log("server is listening");
});
