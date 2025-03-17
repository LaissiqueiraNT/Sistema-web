import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import eyesClosed from "../images/eyesClosed.png";
import eyesOpen from "../images/eyesOpen.png";
import back from "../images/back.png";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUser] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sector, setSector] = useState("");
  const [ showPassword, setShowPassword] = useState(false);

  const register = async () => {
    if (!username || !lastname || !email || !password || !sector) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, preencha todos os campos",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, lastname, email, password, sector }),
      });

      const resultado = await response.json();
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuário criado com sucesso",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: resultado.error || "Erro desconhecido",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erro ao criar o usuário: " + error.message,
      });
    }
  };



  return (
    <div className="container">
      <div className="box">
        <div className="ladolado">
          <img id="back" src={back} onClick={() => navigate(-1)} alt="Voltar" />
          <h1>Cadastro</h1>
        </div>
        <p>Por favor, coloque apenas um sobrenome</p>
        <div className="input-group">
          <label>Nome</label>
          <input type="text" value={username} onChange={(e) => setUser(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Sobrenome</label>
          <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Senha</label>
          <input 
          type={showPassword ? "text" : "password"}
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          id="password" />


          <img onClick={() => setShowPassword(!showPassword)} 
          src={showPassword ? eyesOpen : eyesClosed} 
          id="closed2" 
          alt="Mostrar senha" />
         

        </div>
        <label id="position">Setor</label>
        <select id="sector" value={sector} onChange={(e) => setSector(e.target.value)}>
          <option value="" disabled>
            Selecione seu setor
          </option>
          <option value="TI">TI</option>
          <option value="Producao">Produção</option>
          <option value="Suprimentos">Suprimentos</option>
          <option value="PCP">PCP</option>
          <option value="Adm Vendas">Adm Vendas</option>
          <option value="admfinanceiro">Adm Financeiro</option>
          <option value="RH">RH</option>
          <option value="Almoxarifado">Almoxarifado</option>
          <option value="Sgi">SGI</option>
          <option value="Marketing">Marketing</option>
          <option value="Recepcao">Recepção</option>
          <option value="Compras">Compras</option>
          <option value="Projetos">Projetos</option>
          <option value="ST">Segurança do Trabalho</option>
          <option value="Oficina">Oficina</option>
          <option value="Contabilidade">Contabilidade</option>
          <option value="Gerencia">Gerência</option>
          <option value="CQ">CQ</option>
          <option value="Trafos">Trafos</option>
        </select>
        <label id="position">Cargo</label>
        <select id="cargo">
          <option disabled selected>
            Selecione seu cargo
          </option>
          <option value="usuario">Usuário</option>
        </select>
        <button onClick={register} id="comeIn">
          Cadastrar
        </button>
      </div>
    </div>
  );
}
