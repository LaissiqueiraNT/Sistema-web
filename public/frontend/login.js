const esqueci = document.getElementById('esqueci');
const olho = document.getElementById('olho');
const olhoaberto = document.getElementById('olhoaberto');
const senha = document.getElementById('password');
const register = document.getElementById('btn2')
const btn = document.getElementById('btn');


btn.addEventListener('click', async function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const token = localStorage.getItem('jwt'); // Obtenha o token do localStorage
if (!token) {
    alert('Você precisa estar logado para acessar esta página.');
return;
}
    if (!username || !password) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, preencha todos os campos",
        });
        return;
    }
    try {

        const response = await fetch('http://localhost:5500/login', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });


    const data = await response.json();

        if (response.status === 200 && data.token) {
            const token = data.token;
            
            localStorage.setItem('jwt', token);
            console.log('Login bem-sucedido, token:', token);

            // Redirecionar após o login bem-sucedido
            setTimeout(() => {
                window.location.href = "../site.html";
            }, 1000);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login realizado com sucesso!",
                showConfirmButton: false,
                timer: 1000
            });
            window.location.href = "../site.html";
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuário ou senha incorretos",
            });

        }
    } catch (error) {
        alert('Erro ao fazer login: ' + error.message);
    }
});
btn2.addEventListener('click', () => {
    window.location.href = '../register.html'
})
esqueci.addEventListener('click', () => {
    window.location.href = '../esqueci.html'
})

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