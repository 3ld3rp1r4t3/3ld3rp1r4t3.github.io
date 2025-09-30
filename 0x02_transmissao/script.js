// Arquivo: 0x02_transmissao/script.js
async function verificarSenha() {
    const senhaInput = document.getElementById('senha');
    const authButton = document.getElementById('auth-button');
    const senhaDigitada = senhaInput.value.toLowerCase().trim();

    // Desativa o botão para evitar múltiplos cliques
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
            narrativeElement.textContent = data.narrative;

            const imageElement = document.createElement('img');
            imageElement.src = data.image; // A URL recebida do guarda
            imageElement.alt = "Cartaz de propaganda d'O Maestro";

            const downloadLink = document.createElement('a');
            downloadLink.href = data.image; // A URL recebida do guarda
            downloadLink.download = "cartaz_transmissao.png";
            downloadLink.textContent = "[ BAIXAR TRANSMISSÃO SEGURA (cartaz_transmissao.png) ]";

            conteudoSecreto.appendChild(narrativeElement);
            conteudoSecreto.appendChild(document.createElement('hr'));
            conteudoSecreto.appendChild(imageElement);
            conteudoSecreto.appendChild(downloadLink);

            document.getElementById('prompt-senha').style.display = 'none';
            conteudoSecreto.style.display = 'block';

        } else {
            alert(data.message || 'ACESSO NEGADO... ESTÁTICA... SINAL PERDIDO.');
            senhaInput.value = '';
            authButton.disabled = false; // Reativa o botão em caso de falha
            authButton.textContent = "VALIDAR SINAL";
        }
    } catch (error) {
        alert('Erro de comunicação com o servidor de autenticação.');
        authButton.disabled = false; // Reativa o botão em caso de falha
        authButton.textContent = "VALIDAR SINAL";
    }
}

document.getElementById('auth-button').addEventListener('click', verificarSenha);
document.getElementById('senha').addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        verificarSenha();
    }
});