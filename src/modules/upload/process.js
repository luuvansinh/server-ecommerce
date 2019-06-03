import multer from 'multer'
import path from 'path'
import readXlsxFile from 'read-excel-file/node'
import uuidv4 from 'uuid/v4'
import fs from 'fs'
import { response, helper } from '../../utils';

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
const DATA = ['.xlsx']

/**
 * File filter
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

/**
 * Read data from excel
 *
 * @param {String} filePath file path
 */
const readExcel = async (filePath) => {
  let data = await readXlsxFile(filePath)
  let keys = data[0]
  keys = keys.filter(item => item)
  // Get key from index 0 -> 4
  keys = keys.slice(0, 5)
  // remove array title
  data.shift()
  data = data.map(row => helper.arraysToObject(keys, row))
  return data
}

const uploadImage = upload(IMAGE)

const uploadFileData = upload(DATA)

/**
 * Delete file
 *
 * @param {String} filePath file path
 */
const deleteFile = (filePath) => {
  fs.unlinkSync(filePath)
}

export default {
  uploadImage,
  uploadFileData,
  readExcel,
  deleteFile,
}
