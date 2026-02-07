const noticias = [
    {
        titulo: "Novos Clubes de Xadrez",
        resumo: "As inscrições para o campeonato intercolegial começam na próxima segunda-feira.",
        imagem: "https://via.placeholder.com/400x200",
        categoria: "Esportes"
    },
    {
        titulo: "Reforma na Biblioteca",
        resumo: "O espaço agora conta com novos computadores e áreas de estudo em grupo.",
        imagem: "https://via.placeholder.com/400x200",
        categoria: "Avisos"
    },
    {
        titulo: "Entrevista com a Diretora",
        resumo: "Confira os planos para o novo laboratório de tecnologia da escola.",
        imagem: "https://via.placeholder.com/400x200",
        categoria: "Entrevistas"
    }
];

// ... (mantenha sua lista de noticias aqui)

function carregarNoticias(categoriaFiltro = 'todos') {
    const container = document.getElementById('noticias-container');
    container.innerHTML = ''; // Limpa antes de carregar

    noticias.forEach(item => {
        // Lógica de filtro: se for 'todos' ou a categoria bater
        if (categoriaFiltro === 'todos' || item.categoria === categoriaFiltro) {
            const card = `
                <div class="col-md-4 mb-4 news-item">
                    <div class="card h-100 shadow-sm">
                        <img src="${item.imagem}" class="card-img-top">
                        <div class="card-body">
                            <span class="badge bg-info text-dark mb-2">${item.categoria}</span>
                            <h5 class="card-title">${item.titulo}</h5>
                            <p class="card-text">${item.resumo}</p>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        }
    });
}

// Configuração dos botões de filtro
document.querySelectorAll('.filter-btn').forEach(botao => {
    botao.addEventListener('click', function() {
        // Remove 'active' de todos e adiciona no clicado
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active', 'btn-primary'));
        this.classList.add('active', 'btn-primary');
        
        const filtro = this.getAttribute('data-filter');
        carregarNoticias(filtro);
    });
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => carregarNoticias());

const toggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        document.getElementById('themeLabel').innerText = "Modo Claro";
        // Opcional: Salva a preferência do aluno no navegador
        localStorage.setItem('tema', 'dark');
    } else {
        htmlElement.setAttribute('data-bs-theme', 'light');
        document.getElementById('themeLabel').innerText = "Modo Escuro";
        localStorage.setItem('tema', 'light');
    }
});

// Verifica se o aluno já usou o site antes e preferiu o modo escuro
window.onload = () => {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
        toggle.checked = true;
        htmlElement.setAttribute('data-bs-theme', 'dark');
    }
};