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
                    { texto: "preguiçoso", pontos: [3, 1, 2] },
                    { texto: "Dá conta de tudo", pontos: [1, 3, 2] },
                    { texto: "bebe muito", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Como você prefere viajar?",
                opcoes: [
                    { texto: "Economizando combustível", pontos: [3, 2, 1] },
                    { texto: "Com agilidade nas ruas", pontos: [1, 3, 2] },
                    { texto: "Com estilo e conforto", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Qual é a sua origem favorita?",
                opcoes: [
                    { texto: "Clássico nacional consagrado", pontos: [3, 1, 2] },
                    { texto: "Moderno e inovador", pontos: [1, 3, 2] },
                    { texto: "Luxo e status", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "O que você valoriza mais em um carro?",
                opcoes: [
                    { texto: "Resistência e durabilidade", pontos: [3, 2, 1] },
                    { texto: "Manobra e velocidade", pontos: [1, 3, 2] },
                    { texto: "Presença e impacto visual", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Como você se comporta no trânsito?",
                opcoes: [
                    { texto: "Seguro e econômico", pontos: [3, 1, 2] },
                    { texto: "Rápido e divertido", pontos: [1, 3, 2] },
                    { texto: "Majestoso e notável", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Qual é a sua maior vantagem?",
                opcoes: [
                    { texto: "Fácil manutencao", pontos: [3, 2, 1] },
                    { texto: "Acessível e prático", pontos: [1, 3, 2] },
                    { texto: "Poder e performance", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "O que você faria em uma aventura?",
                opcoes: [
                    { texto: "Rodar muito sem falhar", pontos: [3, 1, 2] },
                    { texto: "Desfilar pelas ruas", pontos: [1, 3, 2] },
                    { texto: "Impressionar os espectadores", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "O que você acha melhor?",
                opcoes: [
                    { texto: "Gastar nada", pontos: [3, 2, 1] },
                    { texto: "Jovens descontraídos", pontos: [1, 3, 2] },
                    { texto: "Admiradores de clássicos", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Como você se adapta ao tempo?",
                opcoes: [
                    { texto: "Sempre funcional", pontos: [3, 1, 2] },
                    { texto: "Moderno e eficiente", pontos: [1, 3, 2] },
                    { texto: "Melhor com o tempo", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Qual é seu sonho?",
                opcoes: [
                    { texto: "Sobreviver", pontos: [3, 2, 1] },
                    { texto: "Ficar rico", pontos: [1, 3, 2] },
                    { texto: "Viver a vida ao máximo", pontos: [2, 1, 3] }
                ]
            }
        ];

        this.perguntaAtual = 0;
        this.opcaoSelecionada = null;
        this.inicializar();
    }

    inicializar() {
        document.getElementById('start-btn').addEventListener('click', () => this.iniciarQuiz());
        document.getElementById('next-btn').addEventListener('click', () => this.proximaPergunta());
        document.getElementById('restart-btn').addEventListener('click', () => this.reiniciar());
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

    atualizarProgresso() {
        const total = this.perguntas.length;
        const atual = this.perguntaAtual + 1;
        const porcentagem = (atual / total) * 100;

        document.getElementById('progress-bar').style.width = porcentagem + "%";
    }

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
}

const quiz = new Quiz();