class Personagem {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
        this.pontuacao = 0;
    }
}

class Quiz {
    constructor() {
        this.personagens = [
            new Personagem("Gol G1", "Classico resistente e economico, conhecido por ser confiavel e de facil manutencao. Simbolo da mobilidade brasileira, humilde mas sempre presente."),
            new Personagem("Ford Ka 99", "Agil e descontraido, o Ka e um carro popular que oferece agilidade nas ruas. Moderno para sua epoca, divertido e pratico para o dia a dia."),
            new Personagem("Opala 6 Canecos", "Luxuoso e imponente, o Opala representa potencia e estilo. Um classico verdadeiro, elegante e sempre admirado na rua.")
        ];
        this.perguntas = [
            {
                titulo: "Qual e a sua principal caracteristica?",
                opcoes: [
                    { texto: "Confiavel e pratico", pontos: [3, 1, 2] },
                    { texto: "Agil e descontraido", pontos: [1, 3, 2] },
                    { texto: "Elegante e imponente", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Como voce prefere viajar?",
                opcoes: [
                    { texto: "Economizando combustivel", pontos: [3, 2, 1] },
                    { texto: "Com agilidade nas ruas", pontos: [1, 3, 2] },
                    { texto: "Com estilo e conforto", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Qual e a sua origem favorita?",
                opcoes: [
                    { texto: "Classico nacional consagrado", pontos: [3, 1, 2] },
                    { texto: "Moderno e inovador", pontos: [1, 3, 2] },
                    { texto: "Luxo e status", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "O que voce valoriza mais em um carro?",
                opcoes: [
                    { texto: "Resistencia e durabilidade", pontos: [3, 2, 1] },
                    { texto: "Manobra e velocidade", pontos: [1, 3, 2] },
                    { texto: "Presenca e impacto visual", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Como voce se comporta no transito?",
                opcoes: [
                    { texto: "Seguro e economico", pontos: [3, 1, 2] },
                    { texto: "Rapido e divertido", pontos: [1, 3, 2] },
                    { texto: "Majestoso e notavel", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Qual e a sua maior vantagem?",
                opcoes: [
                    { texto: "Facil manutencao", pontos: [3, 2, 1] },
                    { texto: "Acessivel e pratico", pontos: [1, 3, 2] },
                    { texto: "Poder e performance", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "O que voce faria em uma aventura?",
                opcoes: [
                    { texto: "Rodar muito sem falhar", pontos: [3, 1, 2] },
                    { texto: "Desfilar pelas ruas", pontos: [1, 3, 2] },
                    { texto: "Impressionar os espectadores", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Qual e o seu publico?",
                opcoes: [
                    { texto: "Pessoas simples e praticas", pontos: [3, 2, 1] },
                    { texto: "Jovens descontraidos", pontos: [1, 3, 2] },
                    { texto: "Admiradores de classicos", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Como voce se adapta ao tempo?",
                opcoes: [
                    { texto: "Sempre funcional", pontos: [3, 1, 2] },
                    { texto: "Moderno e eficiente", pontos: [1, 3, 2] },
                    { texto: "Melhor com o tempo", pontos: [2, 1, 3] }
                ]
            },
            {
                titulo: "Qual e seu sonho?",
                opcoes: [
                    { texto: "Rodar por decadas", pontos: [3, 2, 1] },
                    { texto: "Ser o carro preferido", pontos: [1, 3, 2] },
                    { texto: "Virar um icone", pontos: [2, 1, 3] }
                ]
            }
        ];
        this.perguntaAtual = 0;
        this.inicializar();
    }

    inicializar() {
        document.getElementById('start-btn').addEventListener('click', () => this.iniciarQuiz());
        document.getElementById('next-btn').addEventListener('click', () => this.proximaPergunta());
        document.getElementById('restart-btn').addEventListener('click', () => this.reiniciar());
    }

    iniciarQuiz() {
        document.getElementById('welcome').style.display = 'none';
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
        document.getElementById('next-btn').style.display = 'none';
    }

    selecionarOpcao(index) {
        const options = document.querySelectorAll('.option');
        options.forEach(opt => opt.classList.remove('selected'));
        options[index].classList.add('selected');
        this.opcaoSelecionada = index;
        document.getElementById('next-btn').style.display = 'block';
    }

    proximaPergunta() {
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
        document.getElementById('character-name').textContent = personagemVencedor.nome;
        document.getElementById('character-description').textContent = personagemVencedor.descricao;
        document.getElementById('character-score').textContent = maxPontuacao;
    }

    reiniciar() {
        this.personagens.forEach(personagem => personagem.pontuacao = 0);
        this.perguntaAtual = 0;
        document.getElementById('result').style.display = 'none';
        document.getElementById('welcome').style.display = 'block';
    }
}

const quiz = new Quiz();
