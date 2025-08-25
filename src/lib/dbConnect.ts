import mongoose from "mongoose";

type ConnectionObject = {
    isConnetected?: number;
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {

    // Check if we have a connection to the database or if it's currently connecting
    if (connection.isConnetected) {
        console.log('Already connected to the database');
        return;
    }

    try {

        // Attempt to connect to the database
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

        connection.isConnetected = db.connections[0].readyState;

        console.log('Database connected successfully');
    }
    catch (error) {

        console.error('Database connection failed:', error);
        // Graceful exit in case of a connection error
        process.exit(1);
    }
}

export default dbConnect;
