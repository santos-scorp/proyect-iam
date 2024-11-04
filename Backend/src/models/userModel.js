import db from '../database/sqlite.js'


const findUserById = async (id) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('SELECT name, lastName, code,photo, idRol FROM users WHERE id=?', [id],
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

const findUserByCode = async (code) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('SELECT id, name, lastName, code, photo, idRol FROM users WHERE code=?', [code],
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

const login = async (user) => {
    const { code, password } = user
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get(`SELECT users.id, users.name, users.lastName, users.code, users.photo, users.idRol, roles.name as rol FROM users
                INNER JOIN roles on roles.id= users.idRol WHERE users.code=? AND users.password=?`,[code, password],
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

const allUsers = async () => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.all(`SELECT users.id, users.name, users.lastName, users.code, users.photo, users.idRol, roles.name as rol FROM users
                INNER JOIN roles on roles.id= users.idRol`,
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

const insertUser = async (user) => {
    const { name, lastName, code, password, idRol, permissions } = user
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.get('INSERT INTO users (name, lastName, code, password, idRol) VALUES(?,?,?,?,?)', [name, lastName, code, password, idRol],
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

const editUser = async(user) => {
    const {id, name, lastName, idRol } = user
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.run('UPDATE users SET name=?, lastName=?, idRol=? WHERE id=?', [name, lastName, idRol,id],
            (err, rows) => {
                if (err) {
                    db.close()
                    return err.message;
                }            
                console.log("Entry displayed successfully");
                resolve(rows)
            }
        )
        db.close()
    })
}

const updatePhoto = async (id, photo) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.run('UPDATE users SET photo=? WHERE id=?', [photo, id],
            (err, rows) => {
                if(err) {
                    db.close()
                    return 
                }
                console.log("Entry displayed successfully");
                resolve(rows)
            }
        )
        db.close()
    })
}

const removeUser = async(id) => {
    const conn = db.open()
    return new Promise((resolve, reject) => {
        
        conn.run('Delete FROM users WHERE id=?',[id],
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

const resetPassword = async(pass) => {
    const {id, password} = pass
    const conn = db.open()
    return new Promise((resolve, reject) => {
        conn.run('UPDATE users SET password=? WHERE id=?', [ password, id],
            (err, rows) => {
                if (err) {
                    db.close()
                    return err.message;
                }            
                console.log("Entry displayed successfully");
                resolve(rows)
            }
        )
        db.close()
    })
}
export default {
    login,
    findUserById,
    findUserByCode,
    allUsers,
    insertUser,
    editUser,
    updatePhoto,
    removeUser,
    resetPassword
}