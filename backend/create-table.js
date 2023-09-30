//导入connection
const connection = require('./hosipital_db');

// 连接到数据库
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
    // 创建表
    createSpecialtyTable();
    // 创建DOCTOR表
    createDoctorTable();
    insertSpecialtyData();
    insertDoctorData();
});

// 创建SPECIALTY表的函数
function createSpecialtyTable() {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS SPECIALTY (
        SPECIALTY_ID VARCHAR(255) PRIMARY KEY,
        NAME VARCHAR(255) NOT NULL
      )
    `;

    connection.query(createTableSQL, (err, results) => {
        if (err) {
            console.error('创建SPECIALTY表时出错：', err);
            return;
        }

        console.log('成功创建SPECIALTY表');


    });
}

// 创建DOCTOR表的函数
function createDoctorTable() {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS DOCTOR (
        DOCTOR_ID INT AUTO_INCREMENT PRIMARY KEY,
        NAME VARCHAR(255) NOT NULL,
        MEDICALDEGREE VARCHAR(255) NOT NULL,
        QUALIFICATION VARCHAR(255),
        SPECIALTY_ID VARCHAR(255),
        FOREIGN KEY (SPECIALTY_ID) REFERENCES SPECIALTY(SPECIALTY_ID)
      )
    `;

    connection.query(createTableSQL, (err, results) => {
        if (err) {
            console.error('创建DOCTOR表时出错：', err);
            return;
        }

        console.log('成功创建DOCTOR表');

        // 关闭数据库连接
        // connection.end(err => {
        //     if (err) {
        //         console.error('关闭数据库连接时出错：', err);
        //         return;
        //     }
        //     console.log('成功关闭数据库连接');
        // });
    });
}

// 插入数据到SPECIALTY表的函数
function insertSpecialtyData() {
    // 要插入的数据
    const dataToInsert = [
        { SPECIALTY_ID: '0001', NAME: 'Cardiology' },
        { SPECIALTY_ID: '0002', NAME: 'Dermatology' },
        { SPECIALTY_ID: '0003', NAME: 'Orthopedics' },
        { SPECIALTY_ID: '0004', NAME: 'Pediatrics' },
        { SPECIALTY_ID: '0005', NAME: 'Gynecology' },
        { SPECIALTY_ID: '0006', NAME: 'Neurology' },
        { SPECIALTY_ID: '0007', NAME: 'Ophthalmology' },
        { SPECIALTY_ID: '0008', NAME: 'Urology' },
        // 添加更多数据...
    ];

    const insertSQL = 'INSERT INTO SPECIALTY (SPECIALTY_ID, NAME) VALUES ?';

    connection.query(insertSQL, [dataToInsert.map(item => [item.SPECIALTY_ID, item.NAME])], (err, results) => {
        if (err) {
            console.error('插入数据时出错：', err);
            return;
        }

        console.log('成功插入数据到SPECIALTY表');

        // 关闭数据库连接
        // connection.end(err => {
        //     if (err) {
        //         console.error('关闭数据库连接时出错：', err);
        //         return;
        //     }
        //     console.log('成功关闭数据库连接');
        // });
    });
}

// 插入数据到DOCTOR表的函数
function insertDoctorData() {
    // 要插入的数据
    const dataToInsert = [
        { NAME: 'Dr. Smith', MEDICALDEGREE: 'MD', QUALIFICATION: 'Cardiologist', SPECIALTY_ID: '0001' },
        { NAME: 'Dr. Johnson', MEDICALDEGREE: 'MD', QUALIFICATION: 'Dermatologist', SPECIALTY_ID: '0002' },
        { NAME: 'Dr. Brown', MEDICALDEGREE: 'MBBS', QUALIFICATION: 'Orthopedic Surgeon', SPECIALTY_ID: '0003' },
        { NAME: 'Dr. Grace', MEDICALDEGREE: 'DO', QUALIFICATION: 'Pediatrician', SPECIALTY_ID: '0003' },
        { NAME: 'Dr. Oliver', MEDICALDEGREE: 'DMD', QUALIFICATION: 'Urologist', SPECIALTY_ID: '0004' },
        { NAME: 'Dr. William', MEDICALDEGREE: 'PharmD', QUALIFICATION: 'Urologist', SPECIALTY_ID: '0005' },
        { NAME: 'Dr. Benjamin', MEDICALDEGREE: 'MBChB', QUALIFICATION: 'Anesthesiologist', SPECIALTY_ID: '0006' },
        { NAME: 'Dr. Ethan', MEDICALDEGREE: 'DO', QUALIFICATION: 'Pediatrician', SPECIALTY_ID: '0008' },
        { NAME: 'Dr. Mia', MEDICALDEGREE: 'MBChB', QUALIFICATION: 'Dermatologist', SPECIALTY_ID: '0005' },
        { NAME: 'Dr. Miles', MEDICALDEGREE: 'DMD', QUALIFICATION: 'Urologist', SPECIALTY_ID: '0007' },
        // 添加更多数据...
    ];

    const insertSQL = 'INSERT INTO DOCTOR (DOCTOR_ID, NAME, MEDICALDEGREE, QUALIFICATION, SPECIALTY_ID) VALUES ?';

    connection.query(insertSQL, [dataToInsert.map(item => [item.DOCTOR_ID, item.NAME, item.MEDICALDEGREE, item.QUALIFICATION, item.SPECIALTY_ID])], (err, results) => {
        if (err) {
            console.error('插入数据时出错：', err);
            return;
        }

        console.log('成功插入数据到DOCTOR表');

        // 关闭数据库连接
        connection.end(err => {
            if (err) {
                console.error('关闭数据库连接时出错：', err);
                return;
            }
            console.log('成功关闭数据库连接');
        });
    });
}