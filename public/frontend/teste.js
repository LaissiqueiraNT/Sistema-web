async function fetchData() {
    try {
        const response = await fetch('http://localhost:5500/dados');
        const data = await response.json();

        const lista = document.getElementById('lista-dados');
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `ID: ${item.id}, Nome: ${item.nome}, Sobrenome: ${item.sobrenome}, Nome_Usuário: ${item.nome_usuario}`;
            lista.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Chama a função fetchData quando a página carrega
window.onload = fetchData;