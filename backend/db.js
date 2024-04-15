const mongoose = require("mongoose");
require ('dotenv').config();
const mongo=process.env.mongoURI




const mongoDB = async () => {
    try {
        await mongoose.connect(mongo);

        console.log('Connected to MongoDB server');
        const fetched_data = await mongoose.connection.db.collection("food-items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        
                global.food_items=fetched_data;
                global.foodCategory=foodCategory;

            
        
        
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};




module.exports=mongoDB;

