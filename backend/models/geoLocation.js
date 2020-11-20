const { Schema } = require("mongoose");

const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Array],
        index: "2dsphere"
    }
})

export default GeoSchema;