const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Carrega as variáveis do .env

// Configuração do Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("ERRO: SUPABASE_URL e SUPABASE_KEY precisam estar definidos no arquivo .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Salva uma nova mensagem de suporte no Supabase.
 * @param {string} category Categoria da mensagem (bug, sugestao, etc)
 * @param {string} message Conteúdo da mensagem
 */
async function saveSupportMessage(category, message) {
  try {
    const { data, error } = await supabase
      .from('support_messages')
      .insert([
        { 
          category: category, 
          message: message,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error("Erro ao salvar mensagem no Supabase:", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Falha na camada de dados (supportData):", err);
    throw err;
  }
}

module.exports = { saveSupportMessage };
