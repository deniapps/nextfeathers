const sharp = require("sharp");
// const path = require("path");
const fs = require("fs").promises;

// const uploadFolderPath = path.resolve(__dirname, "../../../../images");

const uploadToLocal = async (
  uploadFolderPath,
  fileName,
  fileBuffer,
  fileType,
  maxWidth,
  minWidth
) => {
  if (fileType && fileType.substr(0, 5).toLowerCase() === "image") {
    try {
      await sharp(fileBuffer, { withoutEnlargement: true })
        .resize(maxWidth)
        .toFile(uploadFolderPath + "/" + fileName);
      await sharp(fileBuffer, { withoutEnlargement: true })
        .resize(minWidth)
        .toFile(uploadFolderPath + "/" + "sm-" + fileName);
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    try {
      await fs.writeFile(uploadFolderPath + "/" + fileName, fileBuffer);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return true;
};

module.exports = uploadToLocal;
