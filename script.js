// 1. BANCO DE DADOS DE NOTÍCIAS
const noticias = [
    {
        id: 0, // <--- ADICIONE O ID AQUI
        titulo: "Bem-vindos ao Voz do Estudante!",
        resumo: "O nosso novo jornal digital escolar acaba de entrar no ar. Um espaço feito por alunos e para alunos.",
        imagem: "img/foto.webp",
        categoria: "Avisos",
        conteudo: "Este é o texto completo da nossa primeira matéria! Estamos muito felizes em lançar este portal para a escola." // <--- ADICIONE O CONTEÚDO
    },

    {
        id: 2, // <--- ADICIONE O ID AQUI
        titulo: "Entrevista com a Merendeira",
        resumo: "Dona Maria conta o segredo do sucesso do seu famoso bolo de cenoura.",
        imagem: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400",
        categoria: "Entrevistas",
        conteudo: "Dona Maria nos revelou que o segredo não está na massa, mas no amor que ela coloca em cada fornada. Ela trabalha na nossa escola há 15 anos e diz que ver o sorriso dos alunos é sua maior recompensa."
    },
    {
        id: 3, // <--- ADICIONE O ID AQUI
        titulo: "Sujismundo!!!!",
        resumo: "Aluno sobe na carteira e coloca o pé sujo na parede da classe!",
        imagem: "img/fofoca_webp.webp",
        categoria: "Fofocas",
        conteudo: "Flagrante na sala do 2º ano! Um aluno (que não quis se identificar) foi visto subindo na mesa para alcançar o ventilador e acabou deixando uma marca de pegada na parede branca. Vamos cuidar do nosso patrimônio, galera!"
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
                            <a href="noticia.html?id=${item.id}" class="btn btn-outline-dark btn-sm">Ler mais</a>   
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