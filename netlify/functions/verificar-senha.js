// Arquivo: netlify/functions/verificar-senha.js
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }
    
    try {
        console.log("Função iniciada. Corpo da requisição:", event.body);

        const data = JSON.parse(event.body);
        const senhaEnviada = data.senha;

        console.log("Senha recebida e processada pelo guarda:", senhaEnviada);

        const senhaCorreta = "eco";

        if (senhaEnviada === senhaCorreta) {
            // NOVO LOG DE SUCESSO
            console.log("Resultado: SUCESSO. Senha correta. Entregando o payload.");

            const narrativeText = `> ACESSO CONCEDIDO. BOA MEMÓRIA, RECRUTA.\n> O MAESTRO PENSA QUE PODE NOS CEGAR COM SUA PROPAGANDA LUMINOSA.\n> ELE ESPALHA SEUS CARTAZES PELA REDE, MAS NÓS OS USAMOS COMO TELA PARA NOSSAS PRÓPRIAS MENSAGENS.\n> A CHAVE NEM SEMPRE ESTÁ NA SUPERFÍCIE. ÀS VEZES, VOCÊ PRECISA OLHAR ENTRE OS PIXELS.\n> ANALISE A TRANSMISSÃO VISUAL ABAIXO. ELA CONTÉM AS COORDENADAS PARA O PRÓXIMO PONTO DE ENCONTRO.`;
            const imageUrl = "/assets/images/cartaz_transmissao.png";

            return { 
                statusCode: 200, 
                body: JSON.stringify({ 
                    success: true,
                    narrative: narrativeText,
                    image: imageUrl
                }) 
            };
        } else {
            // NOVO LOG DE FALHA
            console.log("Resultado: FALHA. Senha incorreta.");

            return { statusCode: 401, body: JSON.stringify({ success: false, message: "ACESSO NEGADO" }) };
        }
    } catch (error) {
        console.error("ERRO DENTRO DA FUNÇÃO:", error);
        return { statusCode: 500, body: "Erro no servidor de autenticação." };
    }
};