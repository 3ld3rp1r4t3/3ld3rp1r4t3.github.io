// Arquivo: frequencia-perdida/netlify/functions/verificar-alberti.js
const handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }
    try {
        const { stage, answer } = JSON.parse(event.body);
        console.log(`[verificar-alberti] Recebida verificação para Estágio ${stage}.`);

        // Estágio 1: Verificação do Riddle
        if (stage === 1) {
            const correctRiddleAnswers = ["disco de alberti", "cifra de alberti"];
            if (correctRiddleAnswers.includes(answer.toLowerCase().trim())) {
                console.log("[verificar-alberti] Estágio 1: SUCESSO.");
                return { statusCode: 200, body: JSON.stringify({ success: true, nextStage: 2 }) };
            }
        } 
        // Estágio 2: Verificação da Frase Decifrada
        else if (stage === 2) {
            const correctPhrase = "no fim este fragmento sera seu guia";
            if (answer.toLowerCase().trim().replace(/[.]/g, '') === correctPhrase) {
                console.log("[verificar-alberti] Estágio 2: SUCESSO. Entregando recompensa.");
                const reward = {
                    image: "/mercado_espectro/fragmento_de_mapa_02.png", // Caminho público para a imagem
                    ideologia: "lelaukvfket"
                };
                return { statusCode: 200, body: JSON.stringify({ success: true, reward: reward }) };
            }
        }

        // Se qualquer verificação falhar
        console.log(`[verificar-alberti] Estágio ${stage}: FALHA.`);
        return { statusCode: 401, body: JSON.stringify({ success: false }) };

    } catch (error) {
        console.error("[verificar-alberti] ERRO na função:", error);
        return { statusCode: 500, body: "Erro no servidor de autenticação." };
    }
};

export { handler };