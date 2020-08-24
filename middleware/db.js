const mongoose = require('mongoose');

const connectionAddress = 'mongodb://localhost:27017/auth';


mongoose.connect(connectionAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


mongoose.connection.on('error', (err) => {
  console.error("Database Connection Error: " + err);
  process.exit(2);
});

mongoose.connection.on('connected', () => {
  console.info("Succesfully connected to Database");
});
