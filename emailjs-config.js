// Configuração do EmailJS (alternativa ao PHP)
// Para usar este serviço, você precisa:
// 1. Criar uma conta em https://www.emailjs.com/
// 2. Configurar um serviço de email (Gmail, Outlook, etc.)
// 3. Substituir os valores abaixo pelos seus próprios

const EMAILJS_CONFIG = {
    serviceID: 'service_xxxxxxx', // Substitua pelo seu Service ID
    templateID: 'template_xxxxxxx', // Substitua pelo seu Template ID
    publicKey: 'xxxxxxxxxxxxxxxx' // Substitua pela sua Public Key
};

// Função para enviar email via EmailJS
async function sendEmailViaEmailJS(data) {
    // Verificar se EmailJS está carregado
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS não está carregado');
    }
    
    try {
        // Inicializar EmailJS
        emailjs.init(EMAILJS_CONFIG.publicKey);
        
        // Preparar dados do template
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_email: 'filipi95527646@gmail.com'
        };
        
        // Enviar email
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            templateParams
        );
        
        if (response.status === 200) {
            return {
                success: true,
                message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.'
            };
        } else {
            throw new Error('Erro ao enviar email');
        }
        
    } catch (error) {
        throw new Error('Erro ao enviar mensagem via EmailJS: ' + error.message);
    }
}

// Para usar EmailJS, adicione este script no HTML:
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// E substitua a função de envio no script.js principal por:
/*
try {
    const result = await sendEmailViaEmailJS(data);
    showNotification(result.message, 'success');
} catch (emailjsError) {
    console.log('EmailJS não disponível, usando simulação:', emailjsError);
    await simulateEmailSend(data);
    showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
}
*/

