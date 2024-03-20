import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('frontend/dist'));
app.use('/src/img', express.static('frontend/src/img'));

app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

  
app.listen(port, () => console.log('Server has been started on port 80...'));
