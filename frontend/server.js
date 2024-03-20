import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Убедитесь, что пути указаны относительно текущей директории (__dirname)
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/src/img', express.static(path.join(__dirname, 'src', 'img')));

// Отправлять index.html только для корневого URL

app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => console.log('Server has been started on port 3000...'));
