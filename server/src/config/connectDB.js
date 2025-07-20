import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookstore",
});

export default pool;

// import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   host: "sql.freedb.tech",
//   user: "freedb_booklover",
//   password: "4!NrjA6@EjkyYvH",
//   database: "freedb_bookstore1",
// });

// export default pool;
