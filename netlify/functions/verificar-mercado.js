// Arquivo: netlify/functions/verificar-mercado.js
exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }
    try {
        const { nodeId, accessKey } = JSON.parse(event.body);
        const correctNodeId = "Sinal_Noturno";
        const correctAccessKey = "dissonancia";

        if (nodeId === correctNodeId && accessKey === correctAccessKey) {
            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        } else {
            return { statusCode: 401, body: JSON.stringify({ success: false, message: "FALHA NA AUTENTICAÇÃO. CREDENCIAIS INVÁLIDAS." }) };
        }
    } catch (error) {
        return { statusCode: 500, body: "Erro no servidor de autenticação." };
    }
};