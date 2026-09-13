const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

module.exports = async function (callback) {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected to mongo");

        const foodCollection = mongoose.connection.db.collection("food_items");
        const data = await foodCollection.find({}).toArray();

        const categoryCollection = mongoose.connection.db.collection("Categories");
        const catData = await categoryCollection.find({}).toArray();

        if (typeof callback === 'function') {
            callback(null, data, catData);
        }
    } catch (err) {
        console.error("---" + err);
        if (typeof callback === 'function') {
            callback(err, null, null);
        }
    }
};