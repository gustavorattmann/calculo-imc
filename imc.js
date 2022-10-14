window.onload = () => {
    var campoPeso = document.getElementById('peso');
    var campoAltura = document.getElementById('altura');
    var botaoCalcular = document.getElementById('calcular');
    var botaoLimpar = document.getElementById('limpar');

    var divTextoPadrao = document.getElementById('texto-padrao');
    var divResultado = document.getElementById('resultado');
    var textoPesoImc = document.getElementById('peso-imc');
    var textoPesoValor = document.getElementById('peso-valor');
    var textoAlturaValor = document.getElementById('altura-valor');
    var classificacaoPeso = document.getElementById('descricao-imc');

    var textoAlertaPeso = document.getElementById('alerta-peso');
    var textoAlertaAltura = document.getElementById('alerta-altura');

    var peso = 0;
    var altura = 0;

    botaoCalcular.addEventListener('click', function(e) {
        e.preventDefault();

        calcularImc();
    });

    botaoLimpar.addEventListener('click', function(e) {
        e.preventDefault();

        campoPeso.value = '';
        campoAltura.value = '';
        
        textoAlertaPeso.style.display = 'none';
        textoAlertaAltura.style.display = 'none';
        divTextoPadrao.style.display = 'block';
        divResultado.style.display = 'none';

        campoPeso.style.borderColor = '#2e2e2e';
        campoAltura.style.borderColor = '#2e2e2e';
    });

    function calcularImc() {
        peso = apenasNumerosDecimais(campoPeso.value.trim());
        altura = apenasNumerosDecimais(campoAltura.value.trim());

        if (validarCampos() == true) {
            var imc = peso / (altura * altura);

            imc = ajusteDecimal(imc);
            
            var classificacao = '';

            classificacao = obterClassificaoImc(imc);

            imc = String(imc).replace('.', ',');

            exibirTexto(imc, classificacao);

            textoPesoValor.innerText = ` do seu peso de ${campoPeso.value.trim()}kg`;
            textoAlturaValor.innerText = ` e altura de ${campoAltura.value.trim()}m`;

            campoPeso.value = '';
            campoAltura.value = '';
        }
    }

    function exibirTexto(imc, classificao) {
        textoPesoImc.innerText = imc;
        classificacaoPeso.innerText = classificao;

        divResultado.style.display = 'block';
        divTextoPadrao.style.display = 'none';
    }

    function validarCampos() {
        campoPeso.style.borderColor = '#2e2e2e';
        campoAltura.style.borderColor = '#2e2e2e';

        textoAlertaPeso.style.display = 'none';
        textoAlertaAltura.style.display = 'none';

        divTextoPadrao.style.display = 'block';
        divResultado.style.display = 'none';

        if (peso == '') {
            textoAlertaPeso.style.display = 'block';

            campoPeso.style.borderColor = '#ff0303';
            
            return false;
        } else if (altura == '') {
            textoAlertaAltura.style.display = 'block';

            campoAltura.style.borderColor = '#ff0303';

            return false;
        }

        return true;
    }

    function apenasNumerosDecimais(numero) {
        if (numero != '') {
            if (numero.match(/^[\d|\.|\,]+/)) {
                if (numero.includes(',')) numero = numero.replace(',', '.');

                numero = Number.parseFloat(numero).toFixed(2);
            } else {
                return '';
            }
        }

        return numero;
    }

    // Função para não arrendodar ao fixar em dois números após a virgula
    function ajusteDecimal(numero) {
        const potencia = Math.pow(10, 2);

        return Math.floor(numero * potencia) / potencia;
    }

    function obterClassificaoImc(imc) {
        if (imc < 16) {
            return 'Magreza Grau III';
        } else if (imc >= 16 && imc < 17) {
            return 'Magreza Grau II';
        } else if (imc >= 17 && imc < 18.5) {
            return 'Magreza Grau I';
        } else if (imc >= 18.5 && imc < 25) {
            return 'Adequado';
        } else if (imc >= 25 && imc < 30) {
            return 'Sobrepeso';
        } else if (imc >= 30 && imc < 35) {
            return 'Obesidade Grau I';
        } else if (imc >= 35 && imc < 40) {
            return 'Obesidade Grau II';
        } else {
            return 'Obesidade Grau III';
        }
    }
}