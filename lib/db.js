import mysql from 'mysql2/promise';

export const executeQuery = async (query, values) => {
  const db = await mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  });
  try {
    let [results] = await db.execute(query, values)
    db.end()
    return results
  } catch (error) {
    console.log(error)
  }


  return db;  
}