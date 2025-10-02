// Arquivo: 0x03_refugio_pirata/script.js
document.addEventListener("DOMContentLoaded", function() {
    const message = `...SINAL VISUAL RECEBIDO. BEM-VINDO AO REFÚGIO.\n\n> VOCÊ VIU A MENSAGEM OCULTA NO RUÍDO. A SUA PERCEPÇÃO É RARA. O MAESTRO SÓ CONSEGUE OUVIR AS NOTAS, NÃO A IMAGEM QUE ELAS PINTAM. USAMOS ISSO PARA COMUNICAR SEGREDOS.\n\n> Mas nossa última transmissão foi parcialmente corrompida. Recebemos um pacote de dados criptografado, mas a chave de acesso foi fragmentada durante um ataque das sentinelas do Maestro. Nossos analistas, para preservar a chave, esconderam os fragmentos da chave em um dos nossos próprios manifestos.`;
    const terminal = document.getElementById('terminal-text');
    const downloadsDiv = document.querySelector('.downloads');
    let i = 0;

    function showDownloads() {
        if (downloadsDiv) {
            downloadsDiv.style.display = 'block';
            downloadsDiv.classList.add('fade-in-element');
        }
    }

    function typeWriter() {
        if (terminal && i < message.length) {
            terminal.innerHTML += message.charAt(i);
            i++;
            setTimeout(typeWriter, 40);
        } else {
            // Quando o texto terminar, chama a função para mostrar os downloads
            setTimeout(showDownloads, 500); // Um pequeno atraso para efeito dramático
        }
    }

    typeWriter();

    // --- NOVO BLOCO: Envia um ping para o servidor de log ---
    async function logAccess() {
        try {
            await fetch('/.netlify/functions/registrar-acesso', {
                method: 'POST',
                // Enviamos o nome da página que foi acessada
                body: JSON.stringify({ pagina: "0x03_refugio_pirata" })
            });
        } catch (error) {
            // A falha no log não deve impactar a experiência do jogador.
            // Apenas registramos o erro no console do navegador dele, para nosso debug.
            console.error("Falha ao enviar ping de acesso.");
        }
    }

    logAccess();
});