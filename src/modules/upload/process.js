import multer from 'multer'
import path from 'path'
import uuidv4 from 'uuid/v4'
import { response } from '../../utils';

const UPLOAD_DIR = 'uploads'
const limits = 10 * 1000 * 1000

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
  },
})

const IMAGE = ['.png', '.jpg', '.jpeg']

/**
 * File filter upload
 */
const fileFilter = type => (req, file, cb) => {
  if (!type.includes(path.extname(file.originalname))) {
    return cb(new Error('Định dạng ảnh không hợp lệ'))
  }
  cb(null, true)
}


/**
 * Handle upload file
 *
 * @param {Array} type file format by extension
 * @returns Function
 */
const upload = type => field => async (req, res, next) => {
  const fileUpload = multer({ storage, fileFilter: fileFilter(type), limits })
  fileUpload.single(field)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return response.r400(res, 'File quá lớn')
      }
      console.log('upload error', err)
    }
    next()
  })
}

const uploadImage = upload(IMAGE)

export default {
  uploadImage,
}
