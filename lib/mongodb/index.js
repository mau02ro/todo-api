const { MongoClient } = require('mongodb');
const chalk = require('chalk');

let Store = null;

module.exports = function MongoDB({ user, password, host, db }) {
  const URI = `mongodb+srv://${user}:${password}@${host}/${db}?retryWrites=true&w=majority`;

  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  function Connect() {
    if (!Store) {
      Store = new Promise((resolve, reject) => {
        client.connect((err) => {
          if (err) {
            console.error(`${chalk.red(['MongoDB:connect'])} -> ${err}`);
            reject(new Error(`["MongoDB:connect"] -> ${err}`));
          }

          // eslint-disable-next-line no-console
          console.log(
            `${chalk.green(['MongoDB'])} -> Connected succesfully to mongo`
          );
          resolve(client.db(db));
        });
      });
    }

    return Store;
  }

  function GET(collection, query) {
    return Connect().then((ObjectDB) =>
      ObjectDB.collection(collection).find(query).toArray()
    );
  }

  return { GET };
};
