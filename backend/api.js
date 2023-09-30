const express = require('express');
//导入connection
const connection = require('./hosipital_db');

//连接到数据库
connection.connect(err => {
    if (err) {
        console.error('连接到数据库时出错：', err);
        return;
    }
    console.log('成功连接到数据库');
    // 切换到新创建的数据库
    connection.changeUser({ database: 'hosipital_db' }, (err) => {
        if (err) {
            console.error('Error changing to "hosipital_db": ' + err.message);
            return;
        }

        console.log('Switched to "hosipital_db"');
    })
});

const app = express();
const port = 3000;

// 创建一个 GET 接口，从数据库中获取数据并将其发送给前端
app.get('/api/doctor-data', (req, res) => {
    const query = `
    SELECT DOCTOR_ID, DOCTOR.NAME, DOCTOR.MEDICALDEGREE, DOCTOR.QUALIFICATION, SPECIALTY.NAME AS SPECIALTY_NAME
    FROM DOCTOR
    INNER JOIN SPECIALTY ON DOCTOR.SPECIALTY_ID = SPECIALTY.SPECIALTY_ID
    ORDER BY DOCTOR_ID ASC
  `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('查询数据库时出错：', err);
            res.status(500).json({ error: '无法获取数据' });
            return;
        }

        // 将查询结果发送给前端
        res.json({ data: results });
    });
});


// 解析 JSON 请求体
app.use(express.json());

// 创建一个 PUT 接口，用于更新 DOCTOR 表中的数据
app.put('/api/update-doctor', (req, res) => {
    const requestData = req.body; // 获取客户端发送的更新数据
    const specialtyName = requestData.SPECIALTY_NAME; // 获取专业领域名称

    // 根据 SPECIALTY_NAME 查找对应的 SPECIALTY_ID
    const findSpecialtyIdSQL = 'SELECT SPECIALTY_ID FROM SPECIALTY WHERE NAME = ?';

    connection.query(findSpecialtyIdSQL, [specialtyName], (err, specialtyResult) => {
        if (err) {
            console.error('查找 SPECIALTY_ID 时出错：', err);
            res.status(500).json({ error: '无法查找 SPECIALTY_ID' });
            return;
        }

        if (specialtyResult.length === 0) {
            // 如果找不到匹配的 SPECIALTY_NAME，则返回错误
            res.status(400).json({ error: '找不到匹配的 SPECIALTY_NAME' });
            return;
        }

        const specialtyId = specialtyResult[0].SPECIALTY_ID;

        // 更新 DOCTOR 表中的数据，使用查找到的 SPECIALTY_ID
        const doctorUpdateSQL = `
      UPDATE DOCTOR
      SET NAME = ?, MEDICALDEGREE = ?, QUALIFICATION = ?, SPECIALTY_ID = ?
      WHERE DOCTOR_ID = ?
    `;

        connection.query(
            doctorUpdateSQL,
            [requestData.NAME, requestData.MEDICALDEGREE, requestData.QUALIFICATION, specialtyId, requestData.DOCTOR_ID],
            (err, doctorResult) => {
                if (err) {
                    console.error('更新 DOCTOR 表数据时出错：', err);
                    res.status(500).json({ error: '无法更新 DOCTOR 表数据' });
                    return;
                }

                console.log('成功更新 DOCTOR 表中的数据');

                // 更新 SPECIALTY 表中的数据
                const specialtyUpdateSQL = `
          UPDATE SPECIALTY
          SET NAME = ?
          WHERE SPECIALTY_ID = ?
        `;

                connection.query(
                    specialtyUpdateSQL,
                    [requestData.SPECIALTY_NAME, specialtyId],
                    (err, specialtyResult) => {
                        if (err) {
                            console.error('更新 SPECIALTY 表数据时出错：', err);
                            res.status(500).json({ error: '无法更新 SPECIALTY 表数据' });
                            return;
                        }

                        console.log('成功更新 SPECIALTY 表中的数据');
                        // res.json({ message: '数据已成功更新' });
                        const query = `
    SELECT DOCTOR_ID, DOCTOR.NAME, DOCTOR.MEDICALDEGREE, DOCTOR.QUALIFICATION, SPECIALTY.NAME AS SPECIALTY_NAME
    FROM DOCTOR
    INNER JOIN SPECIALTY ON DOCTOR.SPECIALTY_ID = SPECIALTY.SPECIALTY_ID
    ORDER BY DOCTOR_ID ASC
  `;

                        connection.query(query, (err, results) => {
                            if (err) {
                                console.error('查询数据库时出错：', err);
                                res.status(500).json({ error: '无法获取数据' });
                                return;
                            }

                            // 将查询结果发送给前端
                            res.json({ data: results });
                        });
                    }
                );
            }
        );
    });
});

// 创建一个 DELETE 接口，用于删除 DOCTOR 表中的数据,  请求url：127.0.0.1:3000/api/delete-doctor?'D0004'
app.delete('/api/delete-doctor', (req, res) => {
    const doctorId = req.query.id; // 使用查询参数获取客户端发送的 DOCTOR_ID

    // 删除 DOCTOR 表中的数据
    const doctorDeleteSQL = 'DELETE FROM DOCTOR WHERE DOCTOR_ID = ?';

    connection.query(doctorDeleteSQL, [doctorId], (err, doctorResult) => {
        if (err) {
            console.error('删除 DOCTOR 表数据时出错：', err);
            res.status(500).json({ error: '无法删除 DOCTOR 表数据' });
            return;
        }

        console.log('成功删除 DOCTOR 表中的数据');

        // res.json({ message: '数据已成功删除' });
        const query = `
    SELECT DOCTOR_ID, DOCTOR.NAME, DOCTOR.MEDICALDEGREE, DOCTOR.QUALIFICATION, SPECIALTY.NAME AS SPECIALTY_NAME
    FROM DOCTOR
    INNER JOIN SPECIALTY ON DOCTOR.SPECIALTY_ID = SPECIALTY.SPECIALTY_ID
    ORDER BY DOCTOR_ID ASC
  `;

        connection.query(query, (err, results) => {
            if (err) {
                console.error('查询数据库时出错：', err);
                res.status(500).json({ error: '无法获取数据' });
                return;
            }

            // 将查询结果发送给前端
            res.json({ data: results });
        });
    });
});

// 创建一个 POST 接口，用于向 DOCTOR 表中插入数据
app.post('/api/insert-doctor', (req, res) => {
    const requestData = req.body; // 获取客户端发送的数据
    const specialtyName = requestData.SPECIALTY_NAME; // 获取专业领域名称
    console.log(requestData);
    // 根据 SPECIALTY_NAME 查找对应的 SPECIALTY_ID
    const findSpecialtyIdSQL = 'SELECT SPECIALTY_ID FROM SPECIALTY WHERE NAME = ?';

    connection.query(findSpecialtyIdSQL, [specialtyName], (err, specialtyResult) => {
        if (err) {
            console.error('查找 SPECIALTY_ID 时出错：', err);
            res.status(500).json({ error: '无法查找 SPECIALTY_ID' });
            return;
        }
        console.log(specialtyResult);
        if (specialtyResult.length === 0) {
            // 如果找不到匹配的 SPECIALTY_NAME，则返回错误
            res.status(400).json({ error: '找不到匹配的 SPECIALTY_NAME' });
            return;
        }

        const specialtyId = specialtyResult[0].SPECIALTY_ID;

        // 向 DOCTOR 表中插入数据，使用查找到的 SPECIALTY_ID
        const doctorInsertSQL = `
            INSERT INTO DOCTOR (DOCTOR_ID, NAME, MEDICALDEGREE, QUALIFICATION, SPECIALTY_ID)
            VALUES (?, ?, ?, ?, ?)
            `;

        connection.query(
            doctorInsertSQL,
            [requestData.DOCTOR_ID, requestData.NAME, requestData.MEDICALDEGREE, requestData.QUALIFICATION, specialtyId],
            (err, doctorResult) => {
                if (err) {
                    console.error('向 DOCTOR 表中插入数据时出错：', err);
                    res.status(500).json({ error: '无法向 DOCTOR 表中插入数据' });
                    return;
                }

                console.log('成功向 DOCTOR 表中插入数据');
                // res.json({ message: '数据已成功插入' });
                const query = `
                    SELECT DOCTOR_ID, DOCTOR.NAME, DOCTOR.MEDICALDEGREE, DOCTOR.QUALIFICATION, SPECIALTY.NAME AS SPECIALTY_NAME
                    FROM DOCTOR
                    INNER JOIN SPECIALTY ON DOCTOR.SPECIALTY_ID = SPECIALTY.SPECIALTY_ID
                    ORDER BY DOCTOR_ID ASC
                `;

                connection.query(query, (err, results) => {
                    if (err) {
                        console.error('查询数据库时出错：', err);
                        res.status(500).json({ error: '无法获取数据' });
                        return;
                    }

                    // 将查询结果发送给前端
                    res.json({ data: results });
                });
            }
        );

    }
    );
});



// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});





