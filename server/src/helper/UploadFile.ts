import multer from "multer";

const storage: multer.StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, '../static/uploads');
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
