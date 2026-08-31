require('dotenv').config();

const app = require('./app');
const connectDatabase = require('./config/database');

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`API disponível em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Não foi possível iniciar a API:', error.message);
    process.exit(1);
  }
}

startServer();
