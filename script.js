class Personagem {
    constructor(nome, imagem, descricao) {
        this.nome = nome;
        this.imagem = imagem;
        this.descricao = descricao;
        this.pontuacao = 0;
    }
}

class Quiz {
    constructor() {
        this.personagens = [
            new Personagem("Gol G1", "img/golg1.png", "Simples e resistente."),
            new Personagem("Ford Ka 99", "img/fordka.png", "Ágil e prático."),
            new Personagem("Opala 6 Canecos", "img/opala_6.png", "Potente e marcante.")
        ];

        this.perguntas = [
            {
                titulo: "Como você quer ser visto?",
                opcoes: [
                    { texto: "Sou simples, mas resolvo tudo", pontos: [3, 1, 2] },
                    { texto: "Sou tranquilo e desenrolado", pontos: [1, 3, 2] },
                    { texto: "Quero respeito onde eu chego", pontos: [1, 2, 3] }
                ]
            },
            {
                titulo: "Sua vibe é mais:",
                opcoes: [
                    { texto: "Raiz e humilde", pontos: [3, 1, 2] },
                    { texto: "Leve e divertida", pontos: [1, 3, 2] },
                    { texto: "Intensa e marcante", pontos: [1, 2, 3] }
                ]
            },
            {
                titulo: "Dinheiro pra você é:",
                opcoes: [
                    { texto: "Economizar sempre", pontos: [3, 2, 1] },
                    { texto: "Gastar com equilíbrio", pontos: [2, 3, 1] },
                    { texto: "Gastar sem medo", pontos: [1, 2, 3] }
                ]
            },
            {
                titulo: "No rolê você é:",
                opcoes: [
                    { texto: "Fico de boa", pontos: [3, 2, 1] },
                    { texto: "Animo geral", pontos: [1, 3, 2] },
                    { texto: "Sou o centro das atenções", pontos: [1, 2, 3] }
                ]
            },
            {
                titulo: "Seu estilo de vida é:",
                opcoes: [
                    { texto: "Sobreviver e manter tudo funcionando", pontos: [3, 1, 2] },
                    { texto: "Viver com conforto e praticidade", pontos: [1, 3, 2] },
                    { texto: "Viver grande, sem limites", pontos: [1, 2, 3] }
                ]
            },
            {
                titulo: "Se algo dá errado:",
                opcoes: [
                    { texto: "Resolvo com o que tenho", pontos: [3, 1, 2] },
                    { texto: "Dou um jeito rápido", pontos: [1, 3, 2] },
                    { texto: "Resolvo na força", pontos: [1, 2, 3] }
                ]
            },
            {
                titulo: "Qual frase te define?",
                opcoes: [
                    { texto: "O simples funciona", pontos: [3, 1, 2] },
                    { texto: "O importante é se virar", pontos: [1, 3, 2] },
                    { texto: "Nasci pra ser destaque", pontos: [1, 2, 3] }
                ]
            },
            {
                titulo: "Seu final de semana é:",
                opcoes: [
                    { texto: "Economizar e descansar", pontos: [3, 2, 1] },
                    { texto: "Sair de boa com os amigos", pontos: [1, 3, 2] },
                    { texto: "Festa e bagunça", pontos: [1, 2, 3] }
                ]
            },
            {
                titulo: "Seu carro ideal é:",
                opcoes: [
                    { texto: "Resistente e barato", pontos: [3, 2, 1] },
                    { texto: "Econômico e ágil", pontos: [2, 3, 1] },
                    { texto: "Potente e imponente", pontos: [1, 2, 3] }
                ]
            },
            {
                titulo: "No trânsito você é:",
                opcoes: [
                    { texto: "Na calma", pontos: [3, 2, 1] },
                    { texto: "Ligeiro", pontos: [1, 3, 2] },
                    { texto: "Dominando tudo", pontos: [1, 2, 3] }
                ]
            }
        ];

        this.perguntaAtual = 0;
        this.opcaoSelecionada = null;

        this.inicializar();
    }

    iniciarQuiz() {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("result").style.display = "none";
        document.getElementById("quiz").style.display = "flex";

        this.mostrarPergunta();
    }

    mostrarPergunta() {
        const pergunta = this.perguntas[this.perguntaAtual];

        document.getElementById("question-title").textContent = pergunta.titulo;

        const optionsDiv = document.getElementById("options");
        optionsDiv.innerHTML = "";

        pergunta.opcoes.forEach((opcao, index) => {
            const div = document.createElement("div");

            div.className = "option";
            div.textContent = opcao.texto;

            div.addEventListener("click", () => {
                this.selecionarOpcao(index);
            });

            optionsDiv.appendChild(div);
        });

        this.opcaoSelecionada = null;
        document.getElementById("next-btn").style.display = "none";

        this.atualizarProgresso();
    }

    selecionarOpcao(index) {
        const options = document.querySelectorAll(".option");

        options.forEach((option) => {
            option.classList.remove("selected");
        });

        options[index].classList.add("selected");

        this.opcaoSelecionada = index;
        document.getElementById("next-btn").style.display = "block";
    }

    proximaPergunta() {
        if (this.opcaoSelecionada === null) return;

        const pontos = this.perguntas[this.perguntaAtual].opcoes[this.opcaoSelecionada].pontos;

        this.personagens.forEach((personagem, index) => {
            personagem.pontuacao += pontos[index];
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

        document.getElementById("progress-bar").style.width = porcentagem + "%";
    }

    mostrarResultado() {
        document.getElementById("quiz").style.display = "none";
        document.getElementById("result").style.display = "flex";

        let maxPontuacao = 0;
        let personagemVencedor = null;

        this.personagens.forEach((personagem) => {
            if (personagem.pontuacao > maxPontuacao) {
                maxPontuacao = personagem.pontuacao;
                personagemVencedor = personagem;
            }
        });

        document.getElementById("character-score").textContent = maxPontuacao;
        document.getElementById("character-image").src = personagemVencedor.imagem;

        // ✔ requisito (fica no código, pode ocultar no CSS)
        document.getElementById("character-name").textContent = personagemVencedor.nome;
        document.getElementById("character-description").textContent = personagemVencedor.descricao;
    }

    reiniciar() {
        location.reload();
    }

    inicializar() {
        document.getElementById("start-btn").addEventListener("click", () => this.iniciarQuiz());
        document.getElementById("next-btn").addEventListener("click", () => this.proximaPergunta());
        document.getElementById("restart-btn").addEventListener("click", () => this.reiniciar());
    }
}

const quiz = new Quiz();