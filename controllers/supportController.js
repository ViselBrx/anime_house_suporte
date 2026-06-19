const { saveSupportMessage } = require('../data/supportData');

/**
 * Controlador responsável por processar o recebimento de mensagens de suporte
 */
async function handleSupportRequest(req, res) {
  try {
    const { categoria, mensagem } = req.body;

    // 1. Validação simples
    if (!categoria || !mensagem) {
      return res.status(400).json({ 
        success: false, 
        error: "Os campos 'categoria' e 'mensagem' são obrigatórios." 
      });
    }

    if (mensagem.length < 5) {
      return res.status(400).json({ 
        success: false, 
        error: "A mensagem é muito curta. Explique melhor o seu feedback." 
      });
    }

    // 2. Chamada à Camada de Dados (Model)
    await saveSupportMessage(categoria, mensagem);

    // 3. Resposta de Sucesso
    return res.status(200).json({ 
      success: true, 
      message: "Sua mensagem foi enviada com sucesso para a equipe da Anime House!" 
    });

  } catch (error) {
    console.error("Erro no supportController:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Ocorreu um erro interno no servidor ao tentar salvar sua mensagem." 
    });
  }
}

module.exports = { handleSupportRequest };
