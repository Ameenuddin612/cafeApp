const mongoose = require('mongoose');
const dbConnections = async () => {
    try{
        const connect = await mongoose.connect(process.env.connection_string);
        console.log("Database connected", connect.connection.host, connect.connection.name);
    }
    catch{
        console.log("Failed to connect with DataBase");
        process.exit(1);
    }
}

module.exports = dbConnections;