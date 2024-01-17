import mongo from 'mongoose';
import { ICabs } from 'src/interfaces/model/cabsType.js';


const cabs = new mongo.Schema<ICabs>({
    name: String,
    baserate: Number,
    carnumber: String,
    image: String,
    parkm: Number,
    maxpac: Number,
    delete: {
        type: Boolean,
        default: false,
    },
    isAllow: {
        type: Boolean,
        default: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

const CabsModel = mongo.model("cabs", cabs);

export default CabsModel;