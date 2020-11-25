const uploadFilesMiddleware = require("../middlewares/upload");
const upload = require("../middlewares/upload");

const uploadFile = async (req, res) => {
  try {
    await upload(req, res);
    if (req.file === undefined) {
      return res.send("You must select a file");
    }
    return res.send("File has been uploaded");
  } catch (e) {
    console.log(e);
    return res.send(`There was an error when uploading: ${e}`);
  }
};

module.exports = {
  uploadFile: uploadFile,
};
