// Arquivo: netlify/functions/verificar-senha.js
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // LOG 1: Mostra exatamente o que a função recebeu.
        console.log("Função iniciada. Corpo da requisição:", event.body);

        const data = JSON.parse(event.body);
        const senhaEnviada = data.senha;

        // LOG 2: Mostra a senha que extraímos do pacote de dados.
        console.log("Senha recebida e processada pelo guarda:", senhaEnviada);

        const senhaCorreta = "eco";

        if (senhaEnviada === senhaCorreta) {
            // Lógica de sucesso (inalterada)
            const narrativeText = `> ACESSO CONCEDIDO...`;
            const imagePath = path.join(__dirname, 'cartaz_transmissao.png');
            const imageBuffer = fs.readFileSync(imagePath);
            const imageBase64 = imageBuffer.toString('base64');
            const imageDataUri = `data:image/png;base64,${imageBase64}`;

            return { 
                statusCode: 200, 
                body: JSON.stringify({ 
                    success: true,
                    narrative: narrativeText,
                    image: imageDataUri
                }) 
            };
        } else {
            return { statusCode: 401, body: JSON.stringify({ success: false, message: "ACESSO NEGADO" }) };
        }
    } catch (error) {
        console.error("ERRO DENTRO DA FUNÇÃO:", error); // Log de erro
        return { statusCode: 500, body: "Erro no servidor de autenticação." };
    }
};