import db from '../database/sqlite.js'

const findRolPermissionsById = async (idRol) =>{
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.all(`
                SELECT idPermission
                FROM rol_permission
                WHERE idRol = ?`, [idRol],
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
const insertRolPermission = async (idRol, idPermission) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('INSERT INTO rol_permission (idRol, idPermission) VALUES(?,?)', [idRol, idPermission],
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
const editRolPermission = async () => {
    const {id, idRol, idPermission} = permission
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.run('UPDATE rol_permission SET idRol=?, idPermission=? WHERE id=?', [idRol, idPermission, id],
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
const removeRolPermission = async (id) => {
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
    findRolPermissionsById,
    insertRolPermission,
    editRolPermission,
    removeRolPermission
}