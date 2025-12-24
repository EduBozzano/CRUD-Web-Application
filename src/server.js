require('./models/topic.model');
const app = require('./app');
const { sequelize } = require('./config/database');

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a MySQL');

    await sequelize.sync();
    console.log('📦 Modelos sincronizados');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}

startServer();
