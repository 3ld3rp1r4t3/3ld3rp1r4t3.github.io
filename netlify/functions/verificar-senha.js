// Arquivo: netlify/functions/verificar-senha.js
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const data = JSON.parse(event.body);
        const senhaEnviada = data.senha;
        const senhaCorreta = "eco";

        if (senhaEnviada === senhaCorreta) {
            // Senha correta: Prepara o pacote de recompensa
            const narrativeText = `> ACESSO CONCEDIDO. BOA MEMÓRIA, RECRUTA.\n> O MAESTRO PENSA QUE PODE NOS CEGAR COM SUA PROPAGANDA LUMINOSA.\n> ELE ESPALHA SEUS CARTAZES PELA REDE, MAS NÓS OS USAMOS COMO TELA PARA NOSSAS PRÓPRIAS MENSAGENS.\n> A CHAVE NEM SEMPRE ESTÁ NA SUPERFÍCIE. ÀS VEZES, VOCÊ PRECISA OLHAR ENTRE OS PIXELS.\n> ANALISE A TRANSMISSÃO VISUAL ABAIXO. ELA CONTÉM AS COORDENADAS PARA O PRÓXIMO PONTO DE ENCONTRO.`;

            // Lê o arquivo de imagem e o converte para Base64
            const imagePath = path.join(__dirname, 'cartaz_transmissao.png');
            const imageBuffer = fs.readFileSync(imagePath);
            const imageBase64 = imageBuffer.toString('base64');
            const imageDataUri = `data:image/png;base64,${imageBase64}`;

            // Envia o pacote completo
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
        return { statusCode: 500, body: "Erro no servidor de autenticação." };
    }
};