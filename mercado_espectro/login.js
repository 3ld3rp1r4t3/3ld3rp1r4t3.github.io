// Arquivo: frequencia-perdida/mercado_espectro/login.js
document.addEventListener("DOMContentLoaded", function() {
    const nodeIdInput = document.getElementById('node-id-input');
    const accessKeyInput = document.getElementById('access-key-input');
    const authButton = document.getElementById('auth-button');
    const loginStatus = document.getElementById('login-status');

    const dica1 = document.getElementById('dica1');
    const dica2 = document.getElementById('dica2');

    // LÓGICA DAS DICAS (AGORA COMPLETA)
    if(dica1) {
        dica1.addEventListener('click', function() {
            alert("...você está quase lá, o Sinal_Noturno ainda guarda a entrada para a base de dados do Maestro. Ele não esconde muito qual é a sua Chave de Acesso propositalmente...");
        });
    }
    if(dica2) {
        dica2.addEventListener('click', function() {
            alert("...com 2 criptografias e 1 keyword você estará apto a seguir aidante. Dê um passo para trás, não rode adiante, e decodifique a chave...");
        });
    }

    async function authenticate() {
        const nodeId = nodeIdInput.value;
        const accessKey = accessKeyInput.value;
        
        authButton.disabled = true;
        loginStatus.textContent = "AUTENTICANDO...";
        loginStatus.style.color = "#fff";

        try {
            // Este fetch deve apontar para a função no site frequencia-perdida
            const response = await fetch('/.netlify/functions/verificar-acesso-restrito', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodeId: nodeId, accessKey: accessKey })
            });
            
            const data = await response.json();

            if (response.ok && data.success) {
                loginStatus.style.color = "#00FF41";
                loginStatus.textContent = ">>> ACESSO CONCEDIDO. BEM-VINDO AO NÚCLEO. REDIRECIONANDO...";
                setTimeout(function() {
                    window.location.href = "perfil_sinal_noturno.html";
                }, 2000);
            } else {
                loginStatus.style.color = "#d83b9a";
                loginStatus.textContent = `>>> ${data.message || "FALHA NA AUTENTICAÇÃO."}`;
                authButton.disabled = false;
            }
        } catch (error) {
            loginStatus.style.color = "#d83b9a";
            loginStatus.textContent = ">>> ERRO DE CONEXÃO COM O SERVIDOR DE AUTENTICAÇÃO.";
            authButton.disabled = false;
        }
    }
    
    authButton.addEventListener('click', authenticate);
    accessKeyInput.addEventListener('keyup', function(event) {
        if (event.key === "Enter") {
            authenticate();
        }
    });
});