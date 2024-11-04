import db from '../database/sqlite.js'


const findPermissionById = async (id) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('SELECT name FROM permissions WHERE id=?', [id],
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

const allpermissions = async () => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.all('SELECT * FROM permissions',
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

const insertPermission = async (permission) => {
    const { name } = permission
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('INSERT INTO permissions (name) VALUES(?)', [name],
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

const editPermission = async(permission) => {
    const {id, name} = permission
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.run('UPDATE permissions SET name=? WHERE id=?', [name,id],
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

const removePermission = async(id) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {        
        conn.run('Delete FROM permissions WHERE id=?',[id],
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
    findPermissionById,
    allpermissions,
    insertPermission,
    editPermission,
    removePermission
}