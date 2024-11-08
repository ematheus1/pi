import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./src/app/api/users.json');

// Função para carregar usuários do arquivo JSON com tratamento de erros
export const loadUsers = () => {
  try {
    // Verifica se o arquivo existe antes de tentar ler
    if (!fs.existsSync(filePath)) {
      // Cria o arquivo JSON com um objeto vazio se ele não existir
      fs.writeFileSync(filePath, JSON.stringify({}), 'utf-8');
    }
    
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data); // Retorna o conteúdo do JSON como um objeto
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
    return {}; // Retorna um objeto vazio em caso de erro
  }
};

// Função para salvar usuários no arquivo JSON com tratamento de erros
export const saveUsers = (users) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error("Erro ao salvar usuários:", error);
  }
};

// Carregar usuários no início
export const users = loadUsers();
