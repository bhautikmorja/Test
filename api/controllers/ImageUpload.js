const path = require('path');
const fs = require('fs');
const Image = require('../modal/images');
const dbConnect = require('../utils/dbConnect');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../Uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const uploadImage = async (req, res) => {
    await dbConnect()
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Save image metadata to MongoDB
    const image = new Image({
      userId: req.user.id, // Assuming authMiddleware adds user to req
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    await image.save();

    // File information to return
    const fileInfo = {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      id: image._id
    };

    res.status(200).json({ 
      message: 'Image uploaded successfully',
      file: fileInfo
    });
  } catch (error) {
    console.error('Upload error:', error);
    // If upload fails, remove the file from disk
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Failed to upload image' });
  }
};

module.exports = { uploadImage };