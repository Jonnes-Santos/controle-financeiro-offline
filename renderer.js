const ipcRenderer = window.api;

const form = document.getElementById('transaction-form');
const historyDiv = document.getElementById('history');
const messageDiv = document.createElement('div');
messageDiv.id = 'message';
document.body.prepend(messageDiv);

// Exibir mensagens de sucesso ou erro
function showMessage(message, isError = false) {
    messageDiv.textContent = message;
    messageDiv.className = isError ? 'error' : 'success';
    setTimeout(() => (messageDiv.textContent = ''), 3000);
}

// Adicionar transação
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const transaction = {
        type: document.getElementById('type').value.trim(),
        description: document.getElementById('description').value.trim(),
        amount: parseFloat(document.getElementById('amount').value),
        date: document.getElementById('date').value,
    };

    if (!transaction.type || !transaction.description || isNaN(transaction.amount) || !transaction.date) {
        showMessage('Preencha todos os campos corretamente.', true);
        return;
    }

    try {
        const response = await ipcRenderer.invoke('add-transaction', transaction);
        if (response.success) {
            showMessage('Transação adicionada com sucesso!');
            form.reset();
            setTimeout(loadHistory, 500); // Pequeno delay para garantir atualização
        } else {
            throw new Error(response.error || 'Erro desconhecido');
        }
    } catch (err) {
        showMessage('Erro ao adicionar transação: ' + err.message, true);
    }
});

// Carregar histórico de transações
async function loadHistory() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    try {
        const response = await ipcRenderer.invoke('get-transactions', { month, year });
        console.log('Histórico de transações:', response.transactions); // Debugging
        if (response.success && response.transactions.length > 0) {
            historyDiv.innerHTML = '';
            response.transactions.forEach((t) => {
                const transactionEl = document.createElement('div');
                transactionEl.classList.add('transaction');
                transactionEl.innerHTML = `
                    <span>${t.date} - ${t.description} (${t.type}): R$ ${t.amount.toFixed(2)}</span>
                    <button onclick="deleteTransaction(${t.id})">Deletar</button>
                `;
                historyDiv.appendChild(transactionEl);
            });
        } else {
            historyDiv.innerHTML = '<p>Nenhuma transação encontrada.</p>';
        }
    } catch (err) {
        showMessage('Erro ao carregar histórico: ' + err.message, true);
    }
}

// Deletar transação
async function deleteTransaction(id) {
    if (!confirm('Tem certeza que deseja deletar esta transação?')) return;

    try {
        const response = await ipcRenderer.invoke('delete-transaction', id);
        if (response.success) {
            showMessage('Transação deletada com sucesso!');
            setTimeout(loadHistory, 500); // Pequeno delay para atualização
        } else {
            throw new Error(response.error || 'Erro desconhecido');
        }
    } catch (err) {
        showMessage('Erro ao deletar transação: ' + err.message, true);
    }
}

// Carregar histórico ao iniciar
document.addEventListener('DOMContentLoaded', loadHistory);
