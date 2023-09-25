import mongoose from "mongoose";

try {
    const db = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Connected to ' + db.connection.name);
} catch (error) {
    console.log(error);
}

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected');
})