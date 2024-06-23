import Cadastro from "@/components/cadastro";
import { Notification } from "@/components/notification";
import { Pessoa } from "@/pages";
import { editarPessoa, getPessoaSelecionada } from "@/services/pessoa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type ContatoResponse = {
    nome: string,
    telefone: string,
    email: string,
    id: number,
};

const cadastroDefault = {
    nome: "",
    cpf: "",
    dataNascimento: "",
    contatos: [
        {
            nomeContato: "",
            telefone: "",
            email: "",
        }
    ]
}

const notificacaoDefault = {
    open: false,
    mensagem: "",
    type: "",
}

export default function CadastroSelecionado() {
    const router = useRouter();
    const { query } = router;

    const [pessoaSelecionada, setPessoaSelecionada] = useState(cadastroDefault);
    const [notificacao, setNotificacao] = useState(notificacaoDefault);

    useEffect(() => {
        query.id && getDados();

    }, [query.id]);

    const getDados = async() => {
        const dados = await getPessoaSelecionada(Number(query.id));
        const contatos = dados.contatos.map((item: ContatoResponse) => {
            const { id, nome, telefone, email } = item;
            return {
                id,
                telefone,
                email,
                nomeContato: nome,
            }
        })
        setPessoaSelecionada({
            ...dados,
            contatos
        });
    };

    const savePessoa = async(pessoa:Pessoa) => {
        try {
            await editarPessoa(pessoa);

            router.push({
                pathname: '/',
            });

        } catch {
            setNotificacao({
                open: true,
                mensagem: "Erro ao salvar o cadastro!",
                type: "error",
            })
        }
    }

    return (
        <>
            <Cadastro
                savePessoa={savePessoa}
                pessoaSelecionada={pessoaSelecionada}
            />
            {
                notificacao.open && <Notification mensagem={notificacao.mensagem} type={notificacao.type}/>
            }
        </>
    )
} 