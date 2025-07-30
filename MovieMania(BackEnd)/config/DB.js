async function DB_Connection(){
        const DB = require('mongoose');
        const DB_Connection = 'mongodb+srv://SUDAIS:L1F22BSSE0235@cluster0.o2qwz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

        DB.connect(DB_Connection)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.log("Error connecting to MongoDB:", error);
        });
}

module.exports={DB_Connection}