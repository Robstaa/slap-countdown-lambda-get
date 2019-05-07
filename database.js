const mysql = require('mysql');

class Database {
  constructor(dbParams) {
    this.host = dbParams.host;
    this.user = dbParams.user;
    this.dbName = dbParams.dbName;
    this.password = dbParams.password;
    this.connection = this.mysqlConnection();
    this.queryString = dbParams.queryString;
    this.queryParams = dbParams.queryParams;
  }

  runQuery() {
    return new Promise((resolve, reject) => {
      this.connection.query(this.queryString, this.queryParams, (err, results) => {
        if (err) reject(err);
        console.log(`Succesfully ran '${this.queryString}'`);
        console.log(`Returning the result: ${results}`);
        resolve(results);
      });
    })
  }

  mysqlConnection() {
    const config = {
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.dbName,
    }

    return mysql.createConnection(config);
  }

  establishConnection() {
    console.log(`Trying to establish connection to the Database '${this.dbName}'`);
    this.connection.connect((err) => {
      if (err) {
        console.error(`Error: ${err.message}`);
      }
      console.log(`Connected to the MySQL Server. Database: ${this.dbName}`);
    });
  }

  closeConnection() {
    this.connection.end((err) => {
      if (err) {
        console.log(`Error: ${err.message}`);
      }
      console.log('Disonnected the MySQL Server');
    });
  }

  async getQueryResult() {
    try {
      this.establishConnection();
      const resultValue = await this.runQuery();
      this.closeConnection();
      return resultValue;
    }
    catch (err) {
      console.log(err);
    }
  }
}

module.exports.Database = Database;
