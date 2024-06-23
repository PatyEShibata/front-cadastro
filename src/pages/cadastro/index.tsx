import Cadastro from "@/components/cadastro";
import { criarPessoa } from "@/services/pessoa";
import { Pessoa } from "..";
import { useRouter } from "next/router";
import { useState } from "react";
import { Notification } from "@/components/notification";

const notificacaoDefault = {
    open: false,
    mensagem: "",
    type: "",
}

export default function NovoCadastro() {
    const router = useRouter();
    const [notificacao, setNotificacao] = useState(notificacaoDefault);


    const handleClickSalvar = async(pessoa:Pessoa) => {
        try {
            await criarPessoa(pessoa);
    
            router.push({
                pathname: '/',
            });

        } catch {
            setNotificacao({
                open: true,
                mensagem: "Erro ao criar o cadastro!",
                type: "error",
            })
        }
    }

    return (
        <>
            <Cadastro
                savePessoa={handleClickSalvar}
            />
            {
                notificacao.open && <Notification mensagem={notificacao.mensagem} type={notificacao.type}/>
            }
        </>
    )
} 