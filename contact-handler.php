<?php
// Configurações de email
$to = "filipi95527646@gmail.com";
$subject_prefix = "Contato do Portfólio - ";

// Verificar se é uma requisição POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Sanitizar e validar dados
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = filter_var(trim($_POST["subject"]), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);
    
    // Validações
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Nome é obrigatório";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email válido é obrigatório";
    }
    
    if (empty($subject)) {
        $errors[] = "Assunto é obrigatório";
    }
    
    if (empty($message)) {
        $errors[] = "Mensagem é obrigatória";
    }
    
    // Se não há erros, enviar email
    if (empty($errors)) {
        
        // Preparar email
        $email_subject = $subject_prefix . $subject;
        $email_body = "
        <html>
        <head>
            <title>Contato do Portfólio</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #00d4ff, #7c3aed); color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 20px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #00d4ff; }
                .value { margin-top: 5px; }
                .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>Nova Mensagem do Portfólio</h2>
                </div>
                <div class='content'>
                    <div class='field'>
                        <div class='label'>Nome:</div>
                        <div class='value'>" . htmlspecialchars($name) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Email:</div>
                        <div class='value'>" . htmlspecialchars($email) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Assunto:</div>
                        <div class='value'>" . htmlspecialchars($subject) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Mensagem:</div>
                        <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                    </div>
                </div>
                <div class='footer'>
                    <p>Esta mensagem foi enviada através do formulário de contato do seu portfólio.</p>
                    <p>Data: " . date('d/m/Y H:i:s') . "</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // Headers do email
        $headers = [
            "MIME-Version: 1.0",
            "Content-type: text/html; charset=UTF-8",
            "From: " . $name . " <" . $email . ">",
            "Reply-To: " . $email,
            "X-Mailer: PHP/" . phpversion()
        ];
        
        // Tentar enviar email
        if (mail($to, $email_subject, $email_body, implode("\r\n", $headers))) {
            
            // Resposta de sucesso
            http_response_code(200);
            echo json_encode([
                "success" => true,
                "message" => "Mensagem enviada com sucesso! Entrarei em contato em breve."
            ]);
            
        } else {
            
            // Erro ao enviar email
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente."
            ]);
        }
        
    } else {
        
        // Erros de validação
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Por favor, corrija os seguintes erros:",
            "errors" => $errors
        ]);
    }
    
} else {
    
    // Método não permitido
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Método não permitido"
    ]);
}
?>

