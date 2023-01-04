const mongoose = require('mongoose');

class MongoDbService {
    connect(dsn) {
        mongoose.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).catch(err => console.log(err));

        this.db = mongoose.connection;

        this.db.on('error', function (err) {
            console.log('mongodb connection error: %s', err);
            //process.exit();
        });
        this.db.once('open', function () {
            console.log('Successfully connected to mongodb');
            //app.emit('dbopen');
        });
    }
}

module.exports = new MongoDbService();
