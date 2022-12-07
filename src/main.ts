import { serverConfig } from './configs/server/index.js';
import app from './app/index.js'
import connection from './app/connection.js';
import './routes/routes.js';

connection.connect((error) => {
  if (error) {
    throw 'Cannot connect to Database: ' + error.message;
  }

  app.listen(serverConfig.port, () => {
    console.log('Server works');
  });
});
