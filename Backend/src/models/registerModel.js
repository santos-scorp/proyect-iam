import db from '../database/sqlite.js'

const findRegisterById = async (id) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('SELECT idUser, date, hour FROM registers WHERE id=?', [id],
            (err, rows) => {
                if (err) {
                    db.close()
                    return console.error(err.message);
                }            
                console.log("Entry displayed successfully");
                resolve(rows)
            }
        )
        db.close()
    })
}


const allRegisters = async () => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.all(`SELECT registers.date, registers.hour, users.name, users.lastName, typeAcceso.name as accesso 
                FROM registers
                INNER JOIN users ON registers.idUser = users.id
                INNER JOIN typeAcceso ON registers.idAcceso = typeAcceso.id;
            `,
            (err, rows) => {
                if (err) {
                    db.close()
                    return console.error(err.message);
                }            
                console.log("Entry displayed successfully");
                resolve(rows)
            }
        )
        db.close()
    })
}

const insertRegister = async (idUser, idAcceso) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('INSERT INTO registers (idUser, idAcceso) VALUES(?,?)', [idUser, idAcceso],
            (err, rows) => {
                if (err) {
                    db.close()
                    return console.error(err.message);
                }            
                console.log("Entry displayed successfully");
                resolve(rows)
            }
        )
        db.close()
    })
}

const editRegister = async(Register) => {
    const {id, name, lastName, code, password, idRol } = Register
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.run('UPDATE registers SET name=?, lastName=?, code=?, password=?, idRol=? WHERE id=?', [name, lastName, code, password, idRol,id],
            (err, rows) => {
                if (err) {
                    db.close()
                    return console.error(err.message);
                }            
                console.log("Entry displayed successfully");
                resolve(rows)
            }
        )
        db.close()
    })
}

const removeRegister = async(id) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        
        conn.run('Delete FROM registers WHERE id=?',[id],
            (err, rows) => {
                if (err) {
                    db.close()
                    return console.error(err.message);
                }            
                console.log("Entry displayed successfully");
                resolve(rows)
            }
        )
        
        db.close()
    })
}

export default {
    findRegisterById,
    allRegisters,
    insertRegister,
    editRegister,
    removeRegister
}