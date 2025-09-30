// Arquivo: 0x02_transmissao/script.js

// Função Typewriter que aceita uma função de "callback" para ser executada no final
function typeWriter(text, element, callback) {
    let i = 0;
    element.innerHTML = ''; // Limpa o elemento antes de começar
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 40); // Velocidade da digitação
        } else if (callback) {
            callback(); // Chama a função de callback quando terminar
        }
    }
    typing();
}

async function verificarSenha() {
    const senhaInput = document.getElementById('senha');
    const authButton = document.getElementById('auth-button');
    const senhaDigitada = senhaInput.value.toLowerCase().trim();

    authButton.disabled = true;
    authButton.textContent = "VERIFICANDO...";

    try {
        const response = await fetch('/.netlify/functions/verificar-senha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senha: senhaDigitada })
        });

        const data = await response.json();

        if (response.ok && data.success === true) {
            const conteudoSecreto = document.getElementById('conteudo-secreto');
            const narrativeElement = document.createElement('pre');

            document.getElementById('prompt-senha').style.display = 'none';
            conteudoSecreto.style.display = 'block';
            conteudoSecreto.appendChild(narrativeElement);

            // Inicia a sequência de revelação
            typeWriter(data.narrative, narrativeElement, () => {
                // 1. Quando o texto termina, espera 500ms e adiciona a linha
                setTimeout(() => {
                    const hr = document.createElement('hr');
                    hr.className = 'fade-in-element';
                    conteudoSecreto.appendChild(hr);

                    // 2. Espera mais 750ms e adiciona a imagem
                    setTimeout(() => {
                        const imageElement = document.createElement('img');
                        imageElement.src = data.image;
                        imageElement.alt = "Cartaz de propaganda d'O Maestro";
                        imageElement.className = 'fade-in-element';
                        conteudoSecreto.appendChild(imageElement);

                        // 3. Espera mais 750ms e adiciona o link de download
                        setTimeout(() => {
                            const downloadLink = document.createElement('a');
                            downloadLink.href = data.image;
                            downloadLink.download = "cartaz_transmissao.png";
                            downloadLink.textContent = "[ BAIXAR TRANSMISSÃO SEGURA (cartaz_transmissao.png) ]";
                            downloadLink.className = 'fade-in-element';
                            conteudoSecreto.appendChild(downloadLink);
                        }, 750);
                    }, 750);
                }, 500);
            });

        } else {
            alert(data.message || 'ACESSO NEGADO... ESTÁTICA... SINAL PERDIDO.');
            senhaInput.value = '';
            authButton.disabled = false;
            authButton.textContent = "VALIDAR SINAL";
        }
    } catch (error) {
        alert('Erro de comunicação com o servidor de autenticação.');
        authButton.disabled = false;
        authButton.textContent = "VALIDAR SINAL";
    }
}

document.getElementById('auth-button').addEventListener('click', verificarSenha);
document.getElementById('senha').addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        verificarSenha();
    }
});