//script.js

document.getElementById('btnAvaliar').addEventListener('click', function() {
    var escolhaUsuario = obterEscolhaUsuario();

    if (escolhaUsuario !== null) {
        var dados = {
            escolha: escolhaUsuario,
        };

        // Envia o voto para o servidor
        enviarVotoParaServidor(dados);
    } else {
        alert('Por favor, faça uma escolha antes de avaliar.');
    }
});

function obterEscolhaUsuario() {
    function obterEscolhaUsuario() {
    // Obtém todos os elementos de entrada com o nome 'escolha'
    var opcoes = document.getElementsByName('escolha');

    // Itera sobre as opções para encontrar a opção selecionada
    for (var i = 0; i < opcoes.length; i++) {
        if (opcoes[i].checked) {
            // Retorna o valor da opção selecionada
            return opcoes[i].value;
        }
    }

    // Retorna null se nenhuma opção estiver selecionada
    return null;
}

    var opcoes = document.getElementsByName('escolha');

    for (var i = 0; i < opcoes.length; i++) {
        if (opcoes[i].checked) {
            return opcoes[i].value;
        }
    }

    return null;
}

function enviarVotoParaServidor(dados) {
    // Envia o voto para o servidor usando AJAX
    fetch('https://my-json-server.typicode.com/ricardoeterno/servidor-opssa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Erro ao enviar voto');
        }
        return response.json();
    })
    .then(function(data) {
        console.log('Voto enviado com sucesso', data);

        // Após enviar o voto, solicite os resultados da votação
        obterResultadosVotacao();
    })
    .catch(function(error) {
        console.error('Erro:', error);
    });
}

function obterResultadosVotacao() {
    // Obtém os resultados da votação do servidor usando AJAX
    fetch('https://my-json-server.typicode.com/ricardoeterno/servidor-opssa', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Erro ao obter resultados da votação');
        }
        return response.json();
    })
    .then(function(resultados) {
        console.log('Resultados da votação:', resultados);
        // Aqui você pode processar os resultados como necessário
    })
    .catch(function(error) {
        console.error('Erro ao obter resultados:', error);
    });
}

