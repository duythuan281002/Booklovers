// import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "bookstore",
// });

// export default pool;

import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "mysql.railway.internal",
  user: "root",
  password: "rOLiyryUxnaWiGookJvPyYHqPobSUkLw",
  database: "railway",
});

export default pool;
