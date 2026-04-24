class Personagem {
    constructor(nome, imagem) {
        this.nome = nome;
        this.imagem = imagem;
        this.pontuacao = 0;
    }
}

class Quiz {
    constructor() {
        this.personagens = [
            new Personagem("Gol G1", "img/golg1.png"),
            new Personagem("Ford Ka 99", "img/fordka.png"),
            new Personagem("Opala 6 Canecos", "img/opala_6.png")
        ];

        this.perguntas = [
            {
                titulo: "Qual característica te representa melhor?",
                opcoes: [
                    { texto: "não se importa com aparencia", pontos: [3, 1, 2] },
                    { texto: "pau pra toda obra", pontos: [1, 3, 2] },
                    { texto: "bebe só final semana, mas se pudesse era todo dia", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Como você prefere viajar?",
                opcoes: [
                    { texto: "com 20 reais de gasolina", pontos: [3, 2, 1] },
                    { texto: "preucupação nenhuma", pontos: [1, 3, 2] },
                    { texto: "chegar antes do ricardão", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Qual é a seu cantor favorito?",
                opcoes: [
                    { texto: "jorge e matheus", pontos: [3, 1, 2] },
                    { texto: "mc ig", pontos: [1, 3, 2] },
                    { texto: "tim maia", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "O que você valoriza?",
                opcoes: [
                    { texto: "dinheiro mais que a propiria vida", pontos: [3, 2, 1] },
                    { texto: "viver uma vida mansa", pontos: [1, 3, 2] },
                    { texto: "ser olhado por varios homens", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Como você se comporta no trânsito?",
                opcoes: [
                    { texto: "certinho", pontos: [3, 1, 2] },
                    { texto: "foda-se a sociedade, to passando", pontos: [1, 3, 2] },
                    { texto: "com medo", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Em um churrasco, você leva o que?",
                opcoes: [
                    { texto: "linguiça", pontos: [3, 2, 1] },
                    { texto: "pão de alho", pontos: [1, 3, 2] },
                    { texto: "picanha claro (coxão duro)", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "O que você faria em uma aventura?",
                opcoes: [
                    { texto: "voltava pra casa na mesma hora", pontos: [3, 1, 2] },
                    { texto: "chama ajuda", pontos: [1, 3, 2] },
                    { texto: "aproveita e se diverte", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "seu final de semana é como? (100% real)",
                opcoes: [
                    { texto: "Gastar nada", pontos: [3, 2, 1] },
                    { texto: "não tem nem dinheiro pra gastar", pontos: [1, 3, 2] },
                    { texto: "tá devendo dinheiro", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "chegou multa, como você reage?",
                opcoes: [
                    { texto: "com certeza não é minha", pontos: [3, 1, 2] },
                    { texto: "é minha", pontos: [1, 3, 2] },
                    { texto: "adeus rim esquerdo", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Qual é seu sonho?",
                opcoes: [
                    { texto: "Sobreviver", pontos: [3, 2, 1] },
                    { texto: "Ficar rico", pontos: [1, 3, 2] },
                    { texto: "ser admirado", pontos: [2, 1, 3] }
                ]
            }
        ];

        this.perguntaAtual = 0;
        this.opcaoSelecionada = null;
        this.inicializar();
    }

    iniciarQuiz() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('result').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
        this.mostrarPergunta();
    }

    mostrarPergunta() {
        const pergunta = this.perguntas[this.perguntaAtual];

        document.getElementById('question-title').textContent = pergunta.titulo;

        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = '';

        pergunta.opcoes.forEach((opcao, index) => {
            const div = document.createElement('div');
            div.className = 'option';
            div.textContent = opcao.texto;
            div.addEventListener('click', () => this.selecionarOpcao(index));
            optionsDiv.appendChild(div);
        });

        this.opcaoSelecionada = null;
        document.getElementById('next-btn').style.display = 'none';

        this.atualizarProgresso();
    }

    selecionarOpcao(index) {
        const options = document.querySelectorAll('.option');

        options.forEach(opt => opt.classList.remove('selected'));
        options[index].classList.add('selected');

        this.opcaoSelecionada = index;
        document.getElementById('next-btn').style.display = 'block';
    }

    proximaPergunta() {
        if (this.opcaoSelecionada === null) {
            return;
        }

        const pontos = this.perguntas[this.perguntaAtual].opcoes[this.opcaoSelecionada].pontos;

        this.personagens.forEach((personagem, i) => {
            personagem.pontuacao += pontos[i];
        });

        this.perguntaAtual++;

        if (this.perguntaAtual < this.perguntas.length) {
            this.mostrarPergunta();
        } else {
            this.mostrarResultado();
        }
    }
// barrinha de progresso, animação feita com css, aqui só atualiza a porcentagem
    atualizarProgresso() {
        const total = this.perguntas.length;
        const atual = this.perguntaAtual + 1;
        const porcentagem = (atual / total) * 100;
        document.getElementById('progress-bar').style.width = porcentagem + "%";
    }
// aqui é onde mostra o resultado, ele esconde o quiz e mostra a div de resultado, depois percorre os personagens para encontrar o que tem a maior pontuação e exibe a imagem e a pontuação do personagem vencedor
    mostrarResultado() {
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('result').style.display = 'block';

        let maxPontuacao = 0;
        let personagemVencedor = null;

        this.personagens.forEach(personagem => {
            if (personagem.pontuacao > maxPontuacao) {
                maxPontuacao = personagem.pontuacao;
                personagemVencedor = personagem;
            }
        });

        document.getElementById('character-score').textContent = maxPontuacao;
        document.getElementById('character-image').src = personagemVencedor.imagem;
    }

    reiniciar() {
    location.reload();
    }

    inicializar() {
        document.getElementById('start-btn').addEventListener('click', () => this.iniciarQuiz());
        document.getElementById('next-btn').addEventListener('click', () => this.proximaPergunta());
        document.getElementById('restart-btn').addEventListener('click', () => this.reiniciar());
    }
}

const quiz = new Quiz();