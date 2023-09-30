const mysql = require('mysql2');

// 创建数据库连接
const connection = mysql.createConnection({
    host: '127.0.0.1',     // 数据库主机名
    user: 'root', // 数据库用户名
    password: 'Zm626498.' // 数据库密码
});

// 连接到MySQL服务器
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server: ' + err.message);
        return;
    }

    console.log('Connected to MySQL server');
    createDataBase();
})



const createDataBase = () => {
    // 创建数据库
    connection.query('CREATE DATABASE IF NOT EXISTS hosipital_db', (err) => {
        if (err) {
            console.error('Error creating database: ' + err.message);
            return;
        }

        console.log('Database "hosipital_db" created successfully');


    })
}
//暴露connection
module.exports = connection;
