import multer from 'multer'
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images/profiles')
    },
    filename: (req, file, cb) => {      
        const name = file.originalname
        cb(null, name)
    }
})

const upload = multer({ storage })

export default upload