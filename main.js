const { app, BrowserWindow, Notification } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: 'StudyDesk',
    backgroundColor: '#f5f0e8',
  })
  win.loadFile(path.join(__dirname, 'index.html'))
}

function showNotification() {
  if (Notification.isSupported()) {
    new Notification({
      title: '📚 StudyDesk',
      body: 'Check your pending college tasks!',
    }).show()
  }
}

app.whenReady().then(() => {
  showNotification()
  createWindow()
  app.setLoginItemSettings({ openAtLogin: true })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})