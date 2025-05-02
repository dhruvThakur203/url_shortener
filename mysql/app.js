// import mysql from "mysql2/promise";

// //1 : to connect to mysql server
// const db  = await mysql.createConnection({
//     host: "localhost",
//     user:"root",
//     password:"Th@kur3g",
//     database:"mysql_db",
// })

// console.log("MySQL Connected Successfully");

//2 : we need to create a db
// await db.execute(`create database mysql_db`);
// console.log(await db.execute("show databases"))


//3: then we to create a table
// await db.execute(`
//     create table users(
//     id INT auto_increment primary key,
//     username varchar(100) not null,
//     email varchar(100) not null unique);
//     `);
//4: is to perform CRUD operation
//insert

//using inLine values(not recommeded)
// await db.execute(`
//     insert into users(username,email) values('dhruv','dhruvt203@gmail.com') 
//     `);

//using prepared statements(best practice)
//  await db.execute(`
//          insert into users(username,email) values(?,?) `,["thakur","dhruvt3@gmail,com"]);

//FOR INSERTING MULTIPLE VALUES
// const values = [
//     ["Alice", "alice@example.com"],
//     ["Bob", "bob@example.com"],
//     ["Charlie", "charlie@example.com"],
//     ["David", "david@example.com"],
//     ["Emma", "emma@example.com"],
//   ];

//   await db.query(`
//     insert into users(username,email) values ? `,[values]);


  

//read
// const [row]  = await db.execute('select * from users  ');
// console.log(row);

//UPDATE
//syntax :
// update table_name set col1 = CSSMathValue, ...
// where condition;

// try{
//     const [rows] = await db.execute('update users set username = ? where email = ?',["dhruvvv","dhruvt203@gmail.com"]);

//     console.log("All users :",rows);

// }catch(error){
// console.log(error);
// }

//DELETE
// try{
// const [rows] = await db.execute('delete from users  where email = ?',["dhruvt203@gmail.com"]);

// console.log("All users :",rows);

// }catch(error){
// console.log(error);
// }

