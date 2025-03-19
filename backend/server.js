const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const port = 5000;

// Conexão com o banco de dados

///////////////////////////////////////CONEXÃO-COM-O-BANCO-DE-DADOS////////////////////////////////////
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '2012',
    port: 5432,
});

app.use(cors({ origin: "*" }));
app.use(express.json());
///////////////////////////////////////GEROU-A-MINHA-CHAVE/////////////////////////////////////////////

const crypto = require('crypto');
const chaveSecreta = crypto.randomBytes(64).toString('hex');  // Gerar uma chave aleatória de 64 bytes
console.log(chaveSecreta);


//////////////////////////////////////CRIAR USUARIO//////////////////////////////////////////////////

app.post("/register", async (req, res) => {
    const { username, lastname, email, password, sector, cargo } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const criar = await pool.query(
            "INSERT INTO usuarios (nome_usuario, sobrenome, email, senha, setor, cargo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
            [username, lastname, email, hashedPassword, sector, cargo]
        );

        if (criar.rows.length === 0) {
            return res.status(400).json({ error: "Não foi possível criar o seu usuário" });
        }

        return res.status(200).json({ message: "Usuário criado com sucesso" });

    } catch (err) {
        console.error("Erro ao criar o usuário", err.stack);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

//////////////////////////////////////LOGIN//////////////////////////////////////////////////////////

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const procurar = await pool.query("SELECT * FROM usuarios WHERE nome_usuario = $1", [username]);

        if (procurar.rows.length === 0) {
            return res.status(400).json({ error: "Usuário ou senha inválida" });
        }

        const user = procurar.rows[0];
        const match = await bcrypt.compare(password, user.senha);

        if (!match) {
            return res.status(400).json({ error: "Senha inválida" });
        }

        return res.json({ message: "Login bem-sucedido" });

    } catch (err) {
        console.error("Erro no login:", err.stack);
        return res.status(500).json({ error: "Erro no servidor" });
    }
});

//////////////////////////////////////TROCAR-SENHA///////////////////////////////////////////////////


app.put("/forget", async (req, res) => {
    const { username, password, passwordTwo } = req.body;

    try {
        const prusuario = await pool.query("SELECT * FROM usuarios WHERE nome_usuario = $1", [username]);

        if (prusuario.rows.length === 0) {
            return res.status(400).json({ error: "Usuário não encontrado" });
        }

        const user = prusuario.rows[0];
        const match = await bcrypt.compare(password, user.senha);

        if (!match) {
            return res.status(400).json({ error: "Senha antiga inválida" });
        }

        if (password === passwordTwo) {
            return res.status(400).json({ error: "A nova senha não pode ser igual à senha atual" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordTwo, salt);

        await pool.query("UPDATE usuarios SET senha = $1 WHERE nome_usuario = $2", [hashedPassword, username]);

        return res.status(200).json({ message: "Senha atualizada com sucesso" });

    } catch (err) {
        console.error("Erro ao atualizar a senha:", err.stack);
        return res.status(500).json({ error: "Erro no servidor" });
    }
});

///////////////////////////////////////PORTA/////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log(`API rodando na porta ${port} e url: http://localhost:${port}`);
});
