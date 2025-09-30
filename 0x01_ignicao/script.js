// Arquivo: script.js
const message = `> SINAL RECEBIDO. BEM-VINDO À RESISTÊNCIA.\n> VOCÊ OUVIU O ECO ATRAVÉS DA ESTÁTICA DO MAESTRO. POUCOS CONSEGUEM.\n> ESTA REDE É NOSSO REFÚGIO. AQUI, TROCAMOS SINAIS QUE NOS LEVARÃO ATÉ A RAVE ESPECTRO, O ÚLTIMO BASTIÃO DA MÚSICA LIVRE.\n> MAS O MAESTRO ESTÁ SEMPRE ESCUTANDO. CADA PASSO NOSSO É VIGIADO. SEJA RÁPIDO. SEJA INTELIGENTE.\n> O PRÓXIMO SINAL ESTÁ ESCONDIDO NESTA MESMA PÁGINA. PROCURE ONDE AS MÁQUINAS FALAM COM AS MÁQUINAS...`;
const terminal = document.getElementById('terminal-text');
let i = 0;

function typeWriter() {
    if (terminal && i < message.length) {
        terminal.innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, 50); // Ajuste a velocidade aqui (em milissegundos)
    }
}
window.onload = typeWriter;