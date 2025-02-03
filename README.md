<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Controle Financeiro - Aplicação Offline</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
            color: #444;
        }
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }
        h2 {
            margin-top: 20px;
            border-bottom: 2px solid #eee;
            padding-bottom: 5px;
        }
        ul {
            list-style-type: disc;
            margin-left: 20px;
        }
        .highlight {
            color: #007BFF;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Controle Financeiro - Aplicação Offline</h1>
        
        <p>Este é um projeto de controle financeiro pessoal que funciona totalmente offline. Ele foi desenvolvido usando <span class="highlight">Node.js</span>, <span class="highlight">Electron</span> para a interface gráfica e <span class="highlight">SQLite</span> como banco de dados local. A aplicação permite que você registre gastos e ganhos, visualize o histórico de transações e gerencie suas finanças de forma simples e eficiente.</p>

        <h2>Funcionalidades</h2>
        <ul>
            <li><strong>Adicionar Transações</strong>: Registre gastos e ganhos com descrição, valor e data.</li>
            <li><strong>Histórico de Transações</strong>: Visualize todas as transações registradas em ordem cronológica.</li>
            <li><strong>Funcionamento Offline</strong>: Todos os dados são armazenados localmente, sem necessidade de conexão com a internet.</li>
        </ul>

        <h2>Tecnologias Utilizadas</h2>
        <ul>
            <li><strong>Node.js</strong>: Ambiente de execução JavaScript.</li>
            <li><strong>Electron</strong>: Framework para criar aplicações desktop com HTML, CSS e JavaScript.</li>
            <li><strong>SQLite</strong>: Banco de dados leve e embutido para armazenamento local.</li>
            <li><strong>HTML/CSS/JavaScript</strong>: Para a interface gráfica e interatividade.</li>
        </ul>

        <div class="footer">
            <p>&copy; 2023 Controle Financeiro. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
