import mongo from 'mongoose';

const destination = new mongo.Schema({
    from: String,
    to: String,
    data: Object,
});

const DestinationModel = mongo.model("destination", destination);

export default DestinationModel;