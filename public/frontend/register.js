//Pegar o botão HTML
const btn = document.getElementById('btn');
const olho = document.getElementById('olho3');
const olhoaberto = document.getElementById('olhoaberto3');
const senha = document.getElementById('password');
const back = document.getElementById('back');

btn.addEventListener('click', async function () {
    const username = document.getElementById('username').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const sector = document.getElementById('sector').value;
    
    if (username == "" || lastname == "" || email == "" || password == "" || sector == "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, preencha todos os campos",
        });
        return; 
    }
    try {
        const resposta = await fetch('http://localhost:5500/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, lastname, email, password, sector }),
        });
        if (resposta.status === 200) {
            const resultado = await resposta.json();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuário criado com sucesso",
                showConfirmButton: false,
                timer: 1500
              });
            window.location.href = "./login.html";

        } else {
            const resultado = await resposta.json();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: resultado.error || 'Erro desconhecido',
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Erro ao criar o usuário:"  + error.message,
        });
    }
});


olho.addEventListener('click', () => {
    olho.style.display = 'none';
    olhoaberto.style.display = 'block';
    senha.type = 'text';
})
olhoaberto.addEventListener('click', () => {
    olho.style.display = 'block';
    olhoaberto.style.display = 'none';
    senha.type = 'password';
})
back.addEventListener('click', () =>{
    window.location.href= '../login.html'
})
