// Arquivo: mercado_espectro/login.js
document.addEventListener("DOMContentLoaded", function() {
    const nodeIdInput = document.getElementById('node-id-input');
    const accessKeyInput = document.getElementById('access-key-input');
    const authButton = document.getElementById('auth-button');
    const loginStatus = document.getElementById('login-status');

    const dica1 = document.getElementById('dica1');
    const dica2 = document.getElementById('dica2');
    if(dica1) { /* ... lógica das dicas ... */ }
    if(dica2) { /* ... lógica das dicas ... */ }

    async function authenticate() {
        const nodeId = nodeIdInput.value;
        const accessKey = accessKeyInput.value;
        authButton.disabled = true;
        loginStatus.textContent = "AUTENTICANDO...";

        try {
            const response = await fetch('/.netlify/functions/verificar-mercado', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodeId: nodeId, accessKey: accessKey })
            });
            const data = await response.json();

            if (response.ok && data.success) {
                loginStatus.style.color = "#00FF41";
                loginStatus.textContent = ">>> ACESSO CONCEDIDO. BEM-VINDO AO NÚCLEO. REDIRECIONANDO...";
                setTimeout(() => {
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
});