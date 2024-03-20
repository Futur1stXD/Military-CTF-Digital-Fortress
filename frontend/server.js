import express from 'express';

const app = express();
const port = 80;

app.use(express.static('frontend/dist'));
app.use('/src/img', express.static('frontend/src/img'));

app.listen(port, () => console.log('Server has been started on port 80...'));
