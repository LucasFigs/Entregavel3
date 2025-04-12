import express from 'express';
import { join } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

// Configuração do ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const app = express();
const port = 3000;

// Middlewares atualizados
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'calculadora.html'));
});

app.post('/calcular', (req, res) => {
    const { num1, num2, operacao } = req.body;
    
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ erro: 'Valores inválidos' });
    }

    const calculos = {
        somar: (a, b) => a + b,
        subtrair: (a, b) => a - b,
        multiplicar: (a, b) => a * b,
        dividir: (a, b) => b !== 0 ? a / b : 'Erro: Divisão por zero'
    };

    const resultado = calculos[operacao]?.(+num1, +num2) ?? 'Operação inválida';
    res.json({ resultado });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`🟢 Servidor rodando em http://localhost:${port}`);
});