import { Pessoa } from "@/pages";
import { validaContatos, validaCpf, validaDataNascimento } from "@/utils";
import moment from "moment";
import Link from "next/link";
import {  useEffect, useState } from "react";
import { Notification } from "./notification";

export type Contato = {
    id?: number,
    nomeContato: string,
    telefone: string,
    email: string,
};

type CadastroProp = {
    savePessoa: (dados: Pessoa) => {},
    pessoaSelecionada: Pessoa,
};

const contatoDefault = {
    nomeContato: "",
    telefone: "",
    email: "",
}

const formaDataDefault = {
    nome: "",
    cpf: "",
    dataNascimento: "",
    contatos: [
        contatoDefault
    ]
}

const notificacaoDefault = {
    open: false,
    mensagem: "",
    type: "",
}

export default function Cadastro({ savePessoa, pessoaSelecionada }: CadastroProp) {
    const [formData, setFormData] = useState(formaDataDefault);
    const [notificacao, setNotificacao] = useState(notificacaoDefault);

    useEffect(() => {
        pessoaSelecionada?.id && setFormData(pessoaSelecionada)
    }, [pessoaSelecionada])

    const { nome, cpf, dataNascimento, contatos } = formData || {};

    const validarCampos = () => {
        if(!nome) {
            return {
                valido: false,
                mensagem: "Favor preencher o campo do nome."
            }
        };

        const dataNascimentoValido = validaDataNascimento(dataNascimento)

        if(!dataNascimentoValido.valido) {
            return {
                valido: false,
                mensagem: dataNascimentoValido.mensagem,
            }
        };

        if(!validaCpf(cpf)) {
            return {
                valido: false,
                mensagem: "Favor preencher um cpf válido"
            }
        };

        const contatosValido = validaContatos(contatos);

        if(!contatosValido.valido) {
            return {
                valido: false,
                mensagem: contatosValido.mensagem
            }
        }

        return {
            valido: true,
        }
    };

    const handleClickSalvar = async() => {
        try {
            const validacaoCampos = validarCampos();
            if(!validacaoCampos.valido && validacaoCampos.mensagem) {
                setNotificacao({
                    open: true,
                    mensagem: validacaoCampos.mensagem,
                    type: "error",
                })
                return
            }

            const dados = {
                ...formData,
                dataNascimento: moment(dataNascimento).format("yyyy-MM-DD"),
                contatos: contatos.map(item => {
                    const { nomeContato, telefone, email } = item;
                    return ({
                        nome: nomeContato,
                        telefone,
                        email,
                        ...(item?.id && {id: item.id})
                    })
                })
            }

            await savePessoa(dados);

        } catch {
            setNotificacao({
                open: true,
                mensagem: "Erro ao salvar cadastro",
                type: "error",
            })
        }
    };

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleChangeFormContato = (e: React.ChangeEvent<HTMLInputElement>, posicao: number) => {
        const { value, name } = e.target;

        let contatos = formData.contatos;

        contatos[posicao] = {
            ...contatos[posicao],
            [name]: value,
        };

        setFormData((prev) => ({
            ...prev,
            contatos
        }))
    };

    const handleClickAdicionarContato = () => {
       let contatos = [...formData.contatos];
       contatos = [...contatos, contatoDefault]

       setFormData((prev) => ({
            ...prev,
            contatos
       }))
    };

    const handleClickDeletarContato = (posicao:number) => {
        let contatos = formData.contatos;
        contatos.splice(posicao, 1);
 
        setFormData((prev) => ({
             ...prev,
             contatos
        }))
     };

    return (
        <>
            <Link href={"/"} className=""> {'< '} Voltar para a lista de cadastro</Link>
            <div>
                <div>
                    <label>Nome</label>
                    <input name="nome" value={nome} onChange={handleChangeForm} />
                </div>
                <div>
                    <label>CPF</label>
                    <input name="cpf" maxLength={11} value={cpf} onChange={handleChangeForm} />
                </div>
                <div>
                    <label>Data nascimento</label>
                    <input name="dataNascimento" type="date" value={dataNascimento} onChange={handleChangeForm} />

                </div>
                <div>
                    <label>Contato</label>
                    <button 
                    className="w-8 h-8 bg-green-400	p-1	border-solid border-2 border-green-600 rounded-full text-white"
                    onClick={handleClickAdicionarContato}> + </button>
                </div>
                {
                    contatos.map((item: Contato, index: number) => {
                        const { nomeContato, telefone, email } = item;
                        return (<div key={index}>
                            <label>Nome</label>
                            <input name="nomeContato" value={nomeContato} onChange={(e) => handleChangeFormContato(e, index)} />
                            <label>Telefone</label>
                            <input name="telefone" type="tel" maxLength={11} value={telefone} onChange={(e) => handleChangeFormContato(e, index)} />
                            <label>Email</label>
                            <input name="email" type="email" value={email} onChange={(e) => handleChangeFormContato(e, index)} />
                            {contatos.length > 1 && <button 
                                className="w-8 h-8 bg-red-400	p-1	border-solid border-2 border-red-600 rounded-full text-white"
                            onClick={() => handleClickDeletarContato(index)}> - </button>}
                        </div>)
                    })
                }
                <button 
                    className="bg-green-400	p-1	border-solid border-2 border-green-600 rounded-lg text-white absolute bottom-14 right-14"
                    onClick={handleClickSalvar}
                > Salvar cadastro </button>
            </div>
            {
                notificacao.open && <Notification mensagem={notificacao.mensagem} type={notificacao.type}/>
            }
        </>
    )
} 