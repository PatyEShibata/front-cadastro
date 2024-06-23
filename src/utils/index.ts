import moment from "moment";

export const validaCpf = (cpf:string) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
};

export const validaDataNascimento = (dataNascimento:string) => {
    if(!dataNascimento) {
        return {
            valido: false,
            mensagem: "Favor preencher o campo da data de nascimento."
        }
    };

    const dataAtual = moment();
    const dataNascimentoMoment = moment(dataNascimento);

    if(dataNascimentoMoment.isAfter(dataAtual)) {
        return {
            valido: false,
            mensagem: "Favor preencher uma data de nascimento válida."
        }
    }

    return {
        valido: true,
    }
};

export const validaContatos = (contatos:[]) => {
    if(contatos.length === 0) {
        return {
            valido: false,
            mensagem: "Favor preencher os campos do contato",
    
        }
    };

    let campoInvalido = false;
    const expressionEmail = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    contatos.forEach(element => {
        const { nomeContato, telefone, email} = element;

        if(!email) {
            campoInvalido = true;
        } else {
            campoInvalido = expressionEmail.test(String(email))

        }

        campoInvalido = !nomeContato || !telefone;
    });

    return {
        valido: !campoInvalido,
        mensagem: "Favor preencher os campos do contato",
    }
}