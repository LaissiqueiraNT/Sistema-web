const express = require("express");
const { Pool } = require('pg');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = 5500;


// Conexão com o banco de dados

///////////////////////////////////////CONEXÃO-COM-O-BANCO-DE-DADOS////////////////////////////////////
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '2012',
    port: 5432,
});

app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, "public/login.html")));


///////////////////////////////////////GEROU-A-MINHA-CHAVE/////////////////////////////////////////////

const crypto = require('crypto');
const chaveSecreta = crypto.randomBytes(64).toString('hex');  // Gerar uma chave aleatória de 64 bytes
console.log(chaveSecreta);

///////////////////////////////////////REDIRECIONA-PARA-LOGIN//////////////////////////////////////////

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

const secretKey = process.env.JWT_SECRET || 'bda8780fe54f4648621e9bee8d7bb96a1016c25be9b9cbbed5a7678a62411cdbe1340c9ffa72a73bfa47663debc581efea63f6ac6906d9b9e014fc0e9a8ae4bc';

//////////////////////////////////////VERIFICAR-TOKEN////////////////////////////////////////////////

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Acesso negado' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Armazena informações do usuário no objeto req
        next(); // Permite que a rota continue
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
}


//////////////////////////////////////CRIAR USUARIO//////////////////////////////////////////////////

app.post('/register', async (req, res) => {
    const { username, lastname, email, password, sector, cargo } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(senha, salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        const criar = await pool.query('INSERT INTO usuarios (nome, sobrenome, senha, setor, cargo, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [username, lastname, email, hashedPassword, sector, cargo]);


        if (criar.rows.length === 0) {
            return res.status(400).json({ error: 'Não foi possível criar o seu usuário' });
        }

        return res.status(200).json({ message: 'Usuário criado com sucesso' });

    } catch (err) {
        console.error('Erro ao criar o usuário', err.stack);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

//////////////////////////////////////LOGIN//////////////////////////////////////////////////////////

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const procurar = await pool.query('SELECT * FROM usuarios WHERE nome_usuario = $1', [username]);

        if (procurar.rows.length === 0) {
            return res.status(400).json({ error: 'Usuário ou senha inválida' });
        }

        const user = procurar.rows[0];
        const match = await bcrypt.compare(password, user.senha);

        if (!match) {
            return res.status(400).json({ error: 'Senha inválida' });
        }

        const token = jwt.sign(
            { username: user.nome_usuario, id: user.id },
            secretKey,
            { expiresIn: '10s' } // Expiração de 1 hora
            
        );
        return res.json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        console.error('Erro no login:', err.stack);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});

//////////////////////////////////////TROCAR-SENHA///////////////////////////////////////////////////


app.put('/esqueci', async (req, res) => {
    const { username, password, password2 } = req.body; // Pegando o novo nome de variável 'newPassword'

    try {
        // Verificando se o usuário existe

        const prusuario = await pool.query('SELECT * FROM usuarios WHERE nome_usuario = $1', [username]);

        if (prusuario.rows.length === 0) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }
        const user = prusuario.rows[0];
        const match = await bcrypt.compare(password, user.senha);



        if (!match) {
            return res.status(400).json({ error: 'Senha inválida' });
        }
        
        if (password === password2) {
            return res.status(400).json({ error: 'A nova senha não pode ser igual à senha atual' });
        }
        // Gerando o hash da nova senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password2, salt);

        // Atualizando a senha no banco de dados
        await pool.query('UPDATE usuarios SET senha = $1 WHERE nome_usuario = $2', [hashedPassword, username]);

        return res.status(200).json({ message: 'Senha atualizada com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar a senha:', err.stack);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});

///////////////////////////////////////PORTA/////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});

