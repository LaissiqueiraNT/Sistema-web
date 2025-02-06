// Captura o botão
const btn = document.getElementById('btn');
const olho1 = document.getElementById('olho1');
const olhoaberto1 = document.getElementById('olhoaberto1');
const olho2 = document.getElementById('olho2');
const olhoaberto2 = document.getElementById('olhoaberto2');
const back = document.getElementById('back');
const senha = document.getElementById('password');
const senha2 = document.getElementById('password2');

// Adiciona o evento de click no botão

btn.addEventListener('click', async function () {

    // Captura os valores dos inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    if (username == "" || password == "" || password2 == "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, preencha todos os campos",
        });
    }

    try {
        // Faz a requisição PUT para alterar a senha
        const response = await fetch('http://localhost:5500/esqueci', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, password2 }),
        });

        // Verifica o status da resposta
        if (response.status === 200) {
            const resultado = await response.json(); // Captura a resposta da API
            alert('Senha trocada com sucesso');
            window.location.href = '../login.html'; // Redireciona para a tela de login
        } else {
            const resultado = await response.json(); // Captura o erro retornado pela API
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuário não encontrado",
            });
        }
    } catch (error) {
        // Captura erros na requisição
        alert('Erro ao trocar senha: ' + error.message);
    }
});

olho1.addEventListener('click', () => {
    olho1.style.display = 'none'
    olhoaberto1.style.display = 'block'
    senha.type = 'text'
})
olhoaberto1.addEventListener('click', () => {
    olho1.style.display = 'block'
    olhoaberto1.style.display = 'none'
    senha.type = 'password'

})
olho2.addEventListener('click', () => {
    olho2.style.display = 'none'
    olhoaberto2.style.display = 'block'
    senha2.type = 'text'
})
olhoaberto2.addEventListener('click', () => {
    olho2.style.display = 'block'
    olhoaberto2.style.display = 'none'
    senha2.type = 'password'

})

back.addEventListener('click', () =>{
    window.location.href= '../login.html'
})


