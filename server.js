require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supportRoutes = require('./routes/supportRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de Middlewares
app.use(cors()); // Permite conexões de qualquer domínio (incluindo o Frontend)
app.use(express.json()); // Permite que a API receba JSON no body

// Rota de Teste para ver se o servidor está online
app.get('/api/status', (req, res) => {
  res.json({ status: 'Servidor Backend da Anime House está rodando perfeitamente!' });
});

// Registra todas as rotas de suporte sob o prefixo /api
app.use('/api', supportRoutes);

// Inicialização do Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Rota de suporte pronta em: http://localhost:${PORT}/api/support`);
});
