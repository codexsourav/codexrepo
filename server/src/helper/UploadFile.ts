import multer from "multer";
import fs from 'fs'
const storage: multer.StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = './static/uploads';

        // Create the destination directory if it doesn't exist
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        return cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const allowExt: string[] = ['jpg', 'png', 'jpeg', 'webp'];
        const timestamp: number = Date.now();
        const randomString: string = Math.random().toString(36).substring(2, 8); // Generate a random string
        const fileExtension: string | undefined = file.originalname.split('.').pop();
        if (!fileExtension) {
            return cb(new Error('Invalid File format Not allowed! File'), file.filename);
        }
        if (!allowExt.includes(fileExtension?.toString().toLowerCase())) {
            return cb(new Error('Invalid File format Not allowed! .' + fileExtension.toLowerCase() + " File"), file.filename);
        }
        const uniqueFileName: string = `${timestamp}_${randomString}.${fileExtension}`;
        return cb(null, uniqueFileName);
    }
})
export default multer({ storage: storage });
