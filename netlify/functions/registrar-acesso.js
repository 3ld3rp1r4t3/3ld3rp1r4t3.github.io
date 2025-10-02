// Arquivo: netlify/functions/registrar-acesso.js

// A lógica da função é a mesma, mas a definimos como uma constante.
const handler = async (event, context) => {
    // Apenas requisições POST são permitidas
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { pagina } = JSON.parse(event.body);

        // A única tarefa desta função é registrar a informação no log.
        console.log(`>>> ACESSO REGISTRADO: Um jogador chegou na página [${pagina}] <<<`);

        // Retorna uma resposta simples de sucesso.
        return { statusCode: 200, body: "Log registrado." };

    } catch (error) {
        // Se houver um erro, registre-o também para podermos diagnosticar.
        console.error("Erro ao registrar acesso:", error);
        return { statusCode: 500, body: "Erro." };
    }
};

// A mudança está aqui: a forma como exportamos a função para o Netlify.
export { handler };