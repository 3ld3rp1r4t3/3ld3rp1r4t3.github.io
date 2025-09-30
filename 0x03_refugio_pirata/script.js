// Arquivo: 0x03_refugio_pirata/script.js
document.addEventListener("DOMContentLoaded", function() {
    const message = `...SINAL VISUAL RECEBIDO. BEM-VINDO AO REFÚGIO.\n\n> VOCÊ VIU A MENSAGEM OCULTA NO RUÍDO. A SUA PERCEPÇÃO É RARA. O MAESTRO SÓ CONSEGUE OUVIR AS NOTAS, NÃO A IMAGEM QUE ELAS PINTAM. USAMOS ISSO PARA COMUNICAR SEGREDOS.\n\n> Mas nossa última transmissão foi parcialmente corrompida. Recebemos um pacote de dados criptografado, mas a chave de acesso foi perdida durante um ataque das sentinelas do Maestro. Nossos analistas acreditam que a chave foi fragmentada e escondida em um dos nossos próprios manifestos.`;
    const terminal = document.getElementById('terminal-text');
    let i = 0;

    function typeWriter() {
        if (terminal && i < message.length) {
            terminal.innerHTML += message.charAt(i);
            i++;
            setTimeout(typeWriter, 40);
        }
    }
    
    typeWriter();
});