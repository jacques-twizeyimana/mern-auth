var multer = require("multer");
const { makeId } = require("./random");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/uploads/profiles");
  },
  filename: function (req, file, cb) {
    let fileExtension = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, file.originalname + makeId(10) + fileExtension);
  },
});

var upload = multer({ storage: storage });

module.exports = upload;
