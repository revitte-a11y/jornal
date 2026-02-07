// 1. BANCO DE DADOS DE NOTÍCIAS
const noticias = [
    {
        titulo: "Bem-vindos ao Voz do Estudante!",
        resumo: "O nosso novo jornal digital escolar acaba de entrar no ar. Um espaço feito por alunos e para alunos.",
        imagem: "img/foto.webp",
        categoria: "Avisos"
    },
    {
        titulo: "Interclasse de Vôlei",
        resumo: "As finais acontecem nesta sexta-feira no ginásio principal. Venha torcer pela sua sala!",
        imagem: "img/volei_webp.webp",
        categoria: "Esportes"
    },
    {
        titulo: "Entrevista com a Merendeira",
        resumo: "Dona Maria conta o segredo do sucesso do seu famoso bolo de cenoura.",
        imagem: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400",
        categoria: "Entrevistas"
    }
];

// 2. FUNÇÃO PARA CARREGAR NOTÍCIAS
function carregarNoticias(filtro = 'todos') {
    const container = document.getElementById('noticias-container');
    container.innerHTML = '';

    noticias.forEach(item => {
        if (filtro === 'todos' || item.categoria === filtro) {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 news-card shadow-sm border-0">
                        <img src="${item.imagem}" class="card-img-top" alt="${item.titulo}">
                        <div class="card-body">
                            <span class="badge bg-primary mb-2">${item.categoria}</span>
                            <h5 class="card-title">${item.titulo}</h5>
                            <p class="card-text text-muted">${item.resumo}</p>
                            <a href="#" class="btn btn-outline-dark btn-sm">Ler mais</a>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        }
    });
}

// 3. LÓGICA DE FILTROS
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
        this.classList.add('active', 'btn-primary');
        carregarNoticias(this.getAttribute('data-filter'));
    });
});

// 4. MODO ESCURO
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('change', () => {
    const theme = toggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.getElementById('themeLabel').innerText = toggle.checked ? "Modo Claro" : "Modo Escuro";
    localStorage.setItem('tema', theme);
});

// 5. ENVIO DO FORMULÁRIO (AJAX)
const form = document.getElementById('formSugestao');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const feedback = document.getElementById('mensagemSucesso');
    const data = new FormData(e.target);

    const response = await fetch(e.target.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        form.reset();
        form.classList.add('d-none');
        feedback.classList.remove('d-none');
    } else {
        alert("Erro ao enviar. Tente novamente.");
    }
});

// INICIALIZAÇÃO
window.onload = () => {
    carregarNoticias();
    if(localStorage.getItem('tema') === 'dark') {
        toggle.checked = true;
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
};