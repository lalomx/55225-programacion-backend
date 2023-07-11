const { Router } = require('express')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: (req, file, cb) => {
    console.log(file)
    const ext = "png" // tarea
    cb(null, `${file.fieldname}-${Date.now()}.${ext}` )
  },
})

const upload = multer({ storage })

// single
// array

const router = Router()

// rutas de home html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

router.post('/upload', upload.single('img'), (req, res) => {
  if (req.file) {
    console.log('tenemos un file')
  }

  console.log(JSON.stringify(req.body, null, 2))

  res.send("OK")
})



module.exports = router