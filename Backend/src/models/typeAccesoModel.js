import db from '../database/sqlite.js'

const findTypeAccesoById = async (id) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('SELECT idUser, date, hour FROM typeAccesos WHERE id=?', [id],
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


const allTypeAccesos = async () => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.all('SELECT * FROM typeAccesos',
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

const insertTypeAcceso = async (TypeAcceso) => {
    const { name, lastName, code, password, idRol } = TypeAcceso
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('INSERT INTO typeAccesos (name, lastName, code, password, idRol) VALUES(?,?,?,?,?)', [name, lastName, code, password, idRol],
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

const editTypeAcceso = async(TypeAcceso) => {
    const {id, name, lastName, code, password, idRol } = TypeAcceso
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.run('UPDATE typeAccesos SET name=?, lastName=?, code=?, password=?, idRol=? WHERE id=?', [name, lastName, code, password, idRol,id],
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

const removeTypeAcceso = async(id) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        
        conn.run('Delete FROM typeAccesos WHERE id=?',[id],
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
    findTypeAccesoById,
    allTypeAccesos,
    insertTypeAcceso,
    editTypeAcceso,
    removeTypeAcceso
}