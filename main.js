const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./database');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile('index.html');

    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('add-transaction', async (event, transaction) => {
    const { type, description, amount, date } = transaction;

    if (!type || !description || isNaN(amount) || !date) {
        return { success: false, error: 'Dados inválidos' };
    }

    try {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO transactions (type, description, amount, date) VALUES (?, ?, ?, ?)',
                [type, description, amount, date],
                function (err) {
                    if (err) {
                        reject({ success: false, error: err.message });
                    } else {
                        console.log('Transação adicionada com sucesso! ID:', this.lastID);
                        resolve({ success: true, id: this.lastID });
                    }
                }
            );
        });
    } catch (err) {
        return { success: false, error: err.message };
    }
});

ipcMain.handle('get-transactions', async () => {
    try {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM transactions ORDER BY date ASC', [], (err, rows) => {
                if (err) {
                    reject({ success: false, error: err.message });
                } else {
                    console.log('Todas as transações do banco:', rows); // Debug
                    resolve({ success: true, transactions: rows });
                }
            });
        });
    } catch (err) {
        return { success: false, error: err.message };
    }
});


ipcMain.handle('delete-transaction', async (event, id) => {
    try {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
                if (err) {
                    reject({ success: false, error: err.message });
                } else {
                    resolve({ success: true });
                }
            });
        });
    } catch (err) {
        return { success: false, error: err.message };
    }
});
