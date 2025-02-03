const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Caminho para o banco de dados
const dbDir = path.join(__dirname, 'db');
const dbPath = path.join(dbDir, 'database.db');

// Função para garantir que o diretório de banco de dados exista
const ensureDbDirectoryExists = () => {
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
        console.log('✅ Diretório "db" criado com sucesso.');
    }
};

// Conectar ao banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('✅ Conectado ao banco de dados SQLite:', dbPath);
    }
});

// Garantir que o diretório exista antes de conectar ao banco
ensureDbDirectoryExists();

// Criar a tabela de transações se não existir
const createTransactionsTable = () => {
    db.run(
        `CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,        -- 'gasto' ou 'ganho'
            description TEXT NOT NULL, -- Descrição da transação
            amount REAL NOT NULL,      -- Valor da transação
            date TEXT NOT NULL         -- Data no formato YYYY-MM-DD
        )`,
        (tableErr) => {
            if (tableErr) {
                console.error('❌ Erro ao criar a tabela:', tableErr.message);
            } else {
                console.log('✅ Tabela "transactions" verificada/criada com sucesso.');
            }
        }
    );
};

// Chamar a função para criar a tabela após garantir a conexão
db.on('open', createTransactionsTable);

// Exportar o banco de dados
module.exports = db;
