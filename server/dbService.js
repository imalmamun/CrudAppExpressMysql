const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  socketPath: process.env.SOCKETPATH,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names";
        connection.query(query, (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  // inserting data method....
  async insertNewName(name) {
    try {
      const dateAdded = new Date();
      const response = await new Promise((resolve, reject) => {
        const query = "INSERT INTO names (name, date_added) VALUES (?,?);";
        connection.query(query, [name, dateAdded], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        });
      });
      // console.log();
      return {
        id: response.insertId,
        name: name,
        dateAdded: dateAdded
      };
    } catch (err) {
      console.log(err);
    }
  }
  // delete func here....
  async deleteRow(id){
    try {
      // const id = parseInt(id1,10);
      const response = await new Promise((resolve, reject) => {
        const query = `DELETE FROM names WHERE id = ?`;
        connection.query(query,[id], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result.affectedRows);
          // console.log(err);
        });
      });
      // console.log();
      return response === 1 ? true : false;
    } catch (err) {
      return false + " hi";
    }
  }
}

module.exports = DbService;
