document.addEventListener("DOMContentLoaded", function() {
    const marketItems = [{"title":"Zero-Day Exploit para Firewall OmniWare v3.5","seller":"Glitch","desc":"Acesso root garantido em qualquer sistema OmniWare não-patcheado. Testado em ambiente corporativo. Sem reembolsos.","comments":[{"user":"Static","text":"Funcionou como um encanto. Entrei e saí em 30 segundos."},{"user":"Nyx","text":"O vendedor é legítimo. Recomendo."}]},{"title":"Olho Cibernético 'Visão Noturna' (KOROSHI-3)","seller":"TechNoir","desc":"Modelo militar japonês contrabandeado. Resolução térmica e visão noturna impecáveis. A bateria dura pouco.","comments":[{"user":"Ronin","text":"A qualidade da imagem é incrível, mas a bateria é uma piada."}]},{"title":"DB de Clientes da SynthLife Records","seller":"InfoBroker","desc":"Contém dados de audiência, preferências musicais e gastos de milhões de usuários. Perfeito para análise de mercado ou... chantagem.","comments":[{"user":"Data_Djinn","text":"Os dados estão um pouco sujos, precisei de 2 horas de script pra limpar. Mas o filé mignon tá todo lá. Valeu a pena."}]},{"title":"Serviço de 'Ghosting'","seller":"Mr_Nobody","desc":"Apagamos seu passado digital. Registros, dívidas, mandados. Garantia de 24 horas. Preço sob consulta.","comments":[{"user":"Zero","text":"Contratei o serviço. Na manhã seguinte, até minha mãe esqueceu meu nome. Assustadoramente eficaz."}]},{"title":"IA de Composição Musical 'Musa v2.1'","seller":"Artifex","desc":"Gera melodias no estilo de qualquer artista, vivo ou morto. Alimente-a com duas músicas e ela cria um álbum.","comments":[{"user":"Sinal_Noturno","text":"Imitação barata. Uma melodia de verdade tem alma, um Espectro que nenhuma máquina pode replicar."}]},{"title":"Scrambler de Sinal 'Espectro'","seller":"Static","desc":"Embaralha todos os sinais de comunicação em um raio de 10 metros. Ótimo para reuniões discretas.","comments":[{"user":"Ronin","text":"Funciona bem, mas esquenta pra caramba. Não deixe no bolso da jaqueta de couro."}]},{"title":"Chaves de Criptografia da OmniSonix (Lote de 2045)","seller":"Archivist","desc":"Chaves de acesso a servidores antigos da OmniSonix. Provavelmente inúteis, mas um belo item de colecionador.","comments":[{"user":"Sinal_Noturno","text":"Dados inúteis. O que vale é a informação que se esconde no Espectro entre os bits."}]},{"title":"Vírus de Áudio 'Stux-Echo'","seller":"SoundShade","desc":"Projetado para desestabilizar sistemas de som industriais. Causa loops de feedback ensurdecedores.","comments":[{"user":"Glitch","text":"Perfeito para criar uma distração. Usei durante uma extração de dados da Arasaka. Caos puro."}]},{"id":"arg-item","title":"Fragmento de Mapa","seller":"Sinal_Noturno","desc":"Item recuperado intacto dos servidores de dados d'O Maestro. Preço: O conhecimento.","comments":[]},{"title":"Memória RAM 'Wet-Wired' (Contrabandeada)","seller":"Nyx","desc":"Módulos de RAM orgânica, extraídos de androides desativados. Velocidade inigualável.","comments":[{"user":"Glitch","text":"Funciona, mas veio com fragmentos de memória do dono anterior. Inquietante."},{"user":"Sinal_Noturno","text":"Hardware é temporário. A informação é um Espectro que sobrevive à ferrugem."}]},{"title":"Lavagem de Cripto-Créditos","seller":"Cleaner","desc":"Transforme seus créditos sujos em moeda limpa e não-rastreável. Taxa de 15%.","comments":[{"user":"Nyx","text":"Transação limpa. 5/5. O Cleaner faz jus ao nome."}]},{"title":"Manual de Reparo para Drones 'Corvo Mk. II'","seller":"TechNoir","desc":"Manual técnico completo, incluindo esquemas de bypass para os protocolos de vigilância.","comments":[{"user":"Static","text":"O diagrama do bypass do IFF tá perfeito. Consegui transformar meu Corvo num fantasma. Vendedor confiável."}]},{"title":"Filtro de R.A. 'Anjo Caído'","seller":"Artifex","desc":"Um filtro estético que altera sua percepção visual. Faz arquitetura opressora parecer estátuas góticas.","comments":[{"user":"Dreamer","text":"Não me protege de nada, mas pelo menos a cidade ficou bonita enquanto as sentinelas me perseguiam."}]},{"title":"Acesso Root a Satélite de Mídia (Aluguel)","seller":"HighOrbit","desc":"Aluguel de 30 minutos de acesso total a um satélite de transmissão. Transmita o que quiser para um continente inteiro.","comments":[{"user":"Broadcast","text":"Usei meus 30 minutos pra transmitir um show de luzes sobre a torre da OmniWare. A reação dos executivos foi impagável."}]},{"title":"Amostra de 'Dissonância Pura' (.flac)","seller":"C0DA","desc":"10 segundos de ruído branco perfeitamente aleatório, gerado por decaimento quântico. Anula os sinais subliminares do Maestro.","comments":[{"user":"Zen_Hacker","text":"Finalmente... silêncio. O ruído branco do universo calou a estática do Maestro na minha cabeça."}]}];
    
    const listingsContainer = document.getElementById('listings-container');
    marketItems.forEach(item => {
        const listingElement = document.createElement('article');
        listingElement.className = 'listing';
        let commentsHTML = '';
        if (item.comments.length > 0) {
            commentsHTML = '<div class="comments">';
            item.comments.forEach(comment => {
                commentsHTML += `<p class="comment"><strong>@${comment.user}:</strong> ${comment.text}</p>`;
            });
            commentsHTML += '</div>';
        }
        let buttonHTML = '<button disabled>INDISPONÍVEL</button>';
        if (item.id === 'arg-item') {
            buttonHTML = '<button id="open-enigma-button">Ver Oferta</button>';
        }
        listingElement.innerHTML = `<h3>${item.title}</h3><p class="seller">Vendedor: ${item.seller}</p><p>${item.desc}</p>${buttonHTML}${commentsHTML}`;
        listingsContainer.appendChild(listingElement);
    });

    const modal = document.getElementById('enigma-modal');
    const openButton = document.getElementById('open-enigma-button');
    const closeButton = document.querySelector('.close-button');
    openButton.onclick = function() { modal.style.display = 'block'; }
    closeButton.onclick = function() { modal.style.display = 'none'; }
    window.onclick = function(event) { if (event.target == modal) modal.style.display = 'none'; }

    const riddleDiv = document.getElementById('enigma-riddle');
    const riddleInput = document.getElementById('riddle-input');
    const riddleButton = document.getElementById('riddle-button');
    const cipherDiv = document.getElementById('enigma-cipher');
    const finalRewardDiv = document.getElementById('final-reward');
    const decryptedInput = document.getElementById('decrypted-input');
    const decryptedButton = document.getElementById('decrypted-button');

    const respostasCorretas = ["disco de alberti", "cifra de alberti"];

    riddleButton.addEventListener('click', verificarRiddle);
    riddleInput.addEventListener('keyup', function(event) { if (event.key === "Enter") verificarRiddle(); });

    decryptedButton.addEventListener('click', verificarDecifrado);
    decryptedInput.addEventListener('keyup', function(event) { if (event.key === "Enter") verificarDecifrado(); });

    function verificarRiddle() {
        const respostaUsuario = riddleInput.value.toLowerCase().trim();
        if (respostasCorretas.includes(respostaUsuario)) {
            riddleDiv.style.display = 'none';
            cipherDiv.style.display = 'block';
            if (!document.getElementById('outer-ring').hasChildNodes()) construirDisco();
        } else {
            alert('NEGADO. Conhecimento insuficiente para esta transação.');
        }
    }
    
    function verificarDecifrado() {
        const fraseCorreta = "no fim este fragmento sera seu guia";
        const fraseUsuario = decryptedInput.value.toLowerCase().trim();
        if (fraseUsuario === fraseCorreta) {
            cipherDiv.style.display = 'none';
            finalRewardDiv.style.display = 'block';
        } else {
            alert('TRANSMISSÃO INCOMPREENSÍVEL. TENTE NOVAMENTE.');
        }
    }

    const innerAlphabet = "abcdefghijklmnopqrstuvwxyz";
    let currentRotation = 0;

    function construirDisco() {
        const outerRing = document.getElementById('outer-ring');
        const innerRing = document.getElementById('inner-ring');
        const outerAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        outerRing.innerHTML = '';
        innerRing.innerHTML = '';
        for (let i = 0; i < outerAlphabet.length; i++) {
            const rotation = (360 / outerAlphabet.length) * i;
            const letterDiv = document.createElement('div');
            letterDiv.className = 'letter';
            letterDiv.style.transform = `rotate(${rotation}deg)`;
            letterDiv.innerHTML = `<span style="display:inline-block; transform: rotate(-${rotation}deg)">${outerAlphabet[i]}</span>`;
            outerRing.appendChild(letterDiv);
            const innerLetterDiv = document.createElement('div');
            innerLetterDiv.className = 'letter inner-letter';
            innerLetterDiv.style.transform = `rotate(${rotation}deg)`;
            innerLetterDiv.innerHTML = `<span style="display:inline-block; transform: rotate(-${rotation}deg)">${innerAlphabet[i]}</span>`;
            innerRing.appendChild(innerLetterDiv);
        }
        currentRotation = 0;
        innerRing.style.transform = `rotate(${currentRotation}deg)`;
    }

    function rotateDisk(direction) {
        const innerRing = document.getElementById('inner-ring');
        const anglePerStep = 360 / innerAlphabet.length;
        currentRotation += anglePerStep * direction;
        innerRing.style.transform = `rotate(${currentRotation}deg)`;
    }
    
    const rotateLeftButton = document.getElementById('rotate-left');
    const rotateRightButton = document.getElementById('rotate-right');
    if(rotateLeftButton && rotateRightButton) {
        rotateLeftButton.addEventListener('click', () => rotateDisk(-1));
        rotateRightButton.addEventListener('click', () => rotateDisk(1));
    }
});