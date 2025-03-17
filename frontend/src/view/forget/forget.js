import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import eyesClosed from "../images/eyesClosed.png";
import eyesOpen from "../images/eyesOpen.png";
import back from "../images/back.png";

export default function Forget() {
    const navigate = useNavigate();

    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState(false);

    const change = async () => {
        if (username === "" || password === "" || passwordTwo === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, preencha todos os campos",
            });
            return; 
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, passwordTwo }),
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Senha trocada com sucesso",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/"); 
            } else {
                const resultado = await response.json();
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: resultado.error || "Usuário não encontrado",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erro ao trocar senha: " + error.message,
            });
        }
    };

    return (
        <div className="container">
            <div className="box">
                <div className="ladolado">
                    <img id="back" src={back} alt="Voltar" onClick={() => navigate(-1)} />
                    <h1>Trocar senha</h1>
                </div>

                <div className="input-group">
                    <label>Usuário</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Senha atual</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <img 
                        onClick={() => setShowPassword(!showPassword)} 
                        src={showPassword ? eyesOpen : eyesClosed} 
                        id="closed2"
                        alt="Mostrar senha"
                    />
                </div>

                <div className="input-group">
                    <label>Senha nova</label>
                    <input 
                        type={showPasswordTwo ? "text" : "password"} 
                        value={passwordTwo}
                        onChange={(e) => setPasswordTwo(e.target.value)}
                    />
                    <img 
                        onClick={() => setShowPasswordTwo(!showPasswordTwo)} 
                        src={showPasswordTwo ? eyesOpen : eyesClosed} 
                        id="closed1"
                        alt="Mostrar senha"
                        
                    />
                </div>

                <button onClick={change} id="comeIn">Trocar senha</button>
            </div>
        </div>
    );
}
