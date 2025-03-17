export default function Home() {
    return (
      <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            <li><img id="icons" src="./img/recebidos.png" alt="Recebidos" /></li>
            <li><img id="icons" src="./img/todos.png" alt="Todos" /></li>
            <li><img id="icons" src="./img/fila.png" alt="Fila" /></li>
            <li><img id="icons" src="./img/enviar.png" alt="Enviar" /></li>
          </ul>
        </div>
  
        {/* Navbar */}
        <nav className="top-nav">
          <ul>
            <li>
              <button id="novo">+ Novo Chamado</button>
            </li>
            <li>
              <select id="sector1" name="select">
                <option style={{ color: "#666" }} disabled selected>
                  Selecione seu setor
                </option>
                <option value="TI">TI</option>
              </select>
            </li>
            <li>
              <select id="sector2" name="select">
                <option style={{ color: "#666" }} disabled selected>
                  Selecione seu setor
                </option>
                <option value="TI">TI</option>
              </select>
            </li>
            <li className="search-bar">
              <img id="lupa" src="./img/lupa.png" alt="Buscar" />
              <input type="search" placeholder="Buscar..." />
            </li>
          </ul>
        </nav>
  
        {/* Conteúdo */}
        <div className="content">
          <ul id="lista-dados"></ul>
        </div>
      </div>
    );
  }
  