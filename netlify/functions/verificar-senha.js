// Arquivo: netlify/functions/verificar-senha.js

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }
    
    try {
        const data = JSON.parse(event.body);
        const senhaEnviada = data.senha;
        const senhaCorreta = "eco";

        if (senhaEnviada === senhaCorreta) {
            // Senha correta: Prepara o pacote de recompensa com o LINK da imagem
            const narrativeText = `> ACESSO CONCEDIDO. BOA MEMÓRIA, RECRUTA.\n> O MAESTRO PENSA QUE PODE NOS CEGAR COM SUA PROPAGANDA LUMINOSA.\n> ELE ESPALHA SEUS CARTAZES PELA REDE, MAS NÓS OS USAMOS COMO TELA PARA NOSSAS PRÓPRIAS MENSAGENS.\n> A CHAVE NEM SEMPRE ESTÁ NA SUPERFÍCIE. ÀS VEZES, VOCÊ PRECISA OLHAR ENTRE OS PIXELS.\n> ANALISE A TRANSMISSÃO VISUAL ABAIXO. ELA CONTÉM AS COORDENADAS PARA O PRÓXIMO PONTO DE ENCONTRO.`;
            
            // O endereço público da nossa imagem
            const imageUrl = "/assets/images/cartaz_transmissao.png";

            // Envia o pacote com o link
            return { 
                statusCode: 200, 
                body: JSON.stringify({ 
                    success: true,
                    narrative: narrativeText,
                    image: imageUrl // Agora enviamos uma URL, não a imagem inteira
                }) 
            };
        } else {
            return { statusCode: 401, body: JSON.stringify({ success: false, message: "ACESSO NEGADO" }) };
        }
    } catch (error) {
        return { statusCode: 500, body: "Erro no servidor de autenticação." };
    }
};