// Arquivo: netlify/functions/verificar-mercado.js

const handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }
    try {
        const { nodeId, accessKey } = JSON.parse(event.body);

        // Log das credenciais recebidas
        console.log(`Tentativa de acesso -> Login: [${nodeId}], Chave: [${accessKey}]`);

        const correctNodeId = "Sinal_Noturno";
        const correctAccessKey = "dissonancia";

        if (nodeId === correctNodeId && accessKey === correctAccessKey) {
            // Log de Sucesso
            console.log("Resultado: SUCESSO. Credenciais válidas.");
            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        } else {
            // Log de Falha
            console.log("Resultado: FALHA. Credenciais inválidas.");
            return { statusCode: 401, body: JSON.stringify({ success: false, message: "FALHA NA AUTENTICAÇÃO. CREDENCIAIS INVÁLIDAS." }) };
        }
    } catch (error) {
        console.error("ERRO DENTRO DA FUNÇÃO verificar-mercado:", error);
        return { statusCode: 500, body: "Erro no servidor de autenticação." };
    }
};

export { handler };