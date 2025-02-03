const { contextBridge, ipcRenderer } = require('electron');

// Canais válidos
const validChannels = ["add-transaction", "get-transactions", "delete-transaction"];

contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    invoke: (channel, data) => {
        if (validChannels.includes(channel)) {
            return ipcRenderer.invoke(channel, data).then(response => {
                return response; // Retorna a resposta para o renderer
            }).catch(err => {
                console.error("Erro na invocação:", err);
                return { success: false, error: err.message };
            });
        }
    },
    on: (channel, func) => {
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});
