const express = require('express')
const multer  = require('multer')


const admin = require('firebase-admin')
const serviceAccount = require("./serviceAccountKey.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore()

function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/profile_pictures')
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.')[file.originalname.split('.').length - 1]
    cb(null, file.fieldname + '-' + Date.now() + '-' + getRandomString(6) + '.' + (fileExtension === 'blob' ? 'png' : fileExtension))
  }
})
const upload = multer({ storage: storage })
const app = express()
const port = 3001
 
const cpUpload = upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }])
app.post('/me', cpUpload, async (req, res) => {
  const userRef = db.collection('users').doc(req.body.userId)
  const newImageRef = userRef.collection('pictures').doc()
  userRef.set({
    profilePic: newImageRef.id
  }, { merge: true }).then(res => {
    newImageRef.set({
      picture: req.files.picture[0].filename,
      thumbnail: req.files.thumbnail[0].filename,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      ...req.body
    }).then(res => res.json())
  })
})
 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
