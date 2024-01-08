import mongo from 'mongoose';
import { IFiles } from 'src/interfaces/model/filesType.js';

const files = new mongo.Schema<IFiles>({
    name: String,
    path: String,
    size: String || Number,
    date: {
        type: Date,
        default: Date.now(),
    },
});

const FilesModel = mongo.model("files", files);

export default FilesModel;