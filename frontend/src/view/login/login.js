import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import eyesClosed from "../images/eyesClosed.png";
import eyesOpen from "../images/eyesOpen.png";


export default function Login() {
    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [showpassword, setShowPassword] = useState("");
    const navigate = useNavigate();
  
  const authenticate = async () => {
    
    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, preencha todos os campos",
      });
      return;
    }
    //CONEXÃO
    try {
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);

      //Se a resposta dar 200 , quero q apareça um alert e vá pra rota home

      if (response.status === 200) {
        setTimeout(() => {}, 1000);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login realizado com sucesso!",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/home"); //Criar Home
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuário ou senha incorretos",
        });
      }
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
};
    function register() {
      navigate("/register");
    }

    return (
      <div className="container">
        <div className="box">
          <h1>Login</h1>
          <div className="input-group">
            <label>Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type={ showpassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />

            <img onClick={() => setShowPassword(!showpassword)} src={showpassword ? eyesOpen : eyesClosed} id="closed" alt="" />

            <p
              onClick={() =>
                navigate("/forget") //fazer forget
              }
              id="forgetPassoword"
            >
              Esqueci minha senha
            </p>
          </div>

          <button onClick={authenticate} id="comeIn">
            Entrar
          </button>
          <button onClick={register} id="createUser">
            Criar um Usuário
          </button>
        </div>
      </div>
  );
}
