const mongoose = require('mongoose');

class MongoDbService {
  connect(dsn) {
    mongoose.connect(dsn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });

    this.db = mongoose.connection;

    this.db.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.log('mongodb connection error: %s', err);
      // process.exit();
    });
    this.db.once('open', () => {
      // eslint-disable-next-line no-console
      console.log('Successfully connected to mongodb');
      // app.emit('dbopen');
    });
  }
}

module.exports = new MongoDbService();
