import db from '../database/sqlite.js'

const finRolById = async (id) =>{
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('SELECT id, name FROM roles WHERE id=?', [id],
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
const lastIdRolInsert = async () => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('SELECT last_insert_rowid() as id FROM roles',
            (err, row) => {
                if (err) {
                    db.close()
                    return console.error(err.message);
                }            
                console.log("Entry displayed successfully");
                resolve(row)
            }
        )
        db.close()
    })
}

const allRoles = async () => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.all('SELECT * FROM roles',
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
const insertRol = async (rol) => {
    const { name, description } = rol
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('INSERT INTO roles (name, description) VALUES(?,?)', [name, description],
            (err, rows) => {
                if (err) {
                    db.close()
                    return console.error(err.message);
                }            
                console.log("Entry displayed successfully");
                return resolve(rows)
            }
        )
    })
}
const editRol = async (id) => {
    const { name } = rol
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.run('UPDATE roles SET name=? WHERE id=?', [name,id],
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
const removeRol = async (id) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        
        conn.run('Delete FROM roles WHERE id=?',[id],
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
    finRolById,
    allRoles,
    insertRol,
    editRol,
    removeRol,
    lastIdRolInsert
}