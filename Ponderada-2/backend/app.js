const express = require('express');
require('express-async-errors');
require('dotenv').config();
var bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json()) //Irá suportar JSON
app.use(bodyParser.urlencoded({ // Irá suportar urlenconded
    extended: true
}));

const PORT = process.env.PORT || 3001;

const taskRouter = require('./routes/taksRoute');
const authRouter= require('./routes/authRoute');

app.use('/task', taskRouter);
app.use('/auth', authRouter);

app.use(express.static("../frontend"))

app.use((err, req, res, next) => {    
    if (err instanceof Error) {
        console.log()
        res.status(500).json({
            error: err.message
        })
    } else {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }    
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})