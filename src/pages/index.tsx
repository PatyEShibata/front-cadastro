
import { deletePessoa, getPessoas } from '@/services/pessoa';
import moment from 'moment';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Contato } from '@/components/cadastro';

export type Pessoa = {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
};

export default function Home() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const pessoasData = await getPessoas();
        setPessoas(pessoasData);
      } catch (error) {
        console.log('error', error)
        setError("Erro ao carregar pessoas");
      } finally {
        setLoading(false);
      }
    };

    fetchPessoas();
  }, []);

  const handleClickApagar = async (idPessoa: number) => {
    try {
      await deletePessoa(idPessoa);
      setPessoas(pessoas.filter(pessoa => pessoa.id !== idPessoa));
    } catch (error) {
      setError("Erro ao apagar pessoa");
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      {pessoas.map((pessoa: Pessoa) => {
        const {id, nome, cpf, dataNascimento} = pessoa || {};
        return (
        <div key={id} className='rounded-lg p-1 border-solid border-2 border-black-600 flex justify-between'>
          <div className='flex flex-row gap-4'>
            <div>ID: {id}</div>
            <div>Nome: {nome}</div>
            <div>CPF: {cpf}</div>
            <div>Data nascimento: {moment(dataNascimento).format('DD/MM/YYYY')}</div>
          </div>
          <div className='flex flex-row gap-2'>
            <Link href={`/cadastro/${id}`} className='bg-yellow-400	p-1	border-solid border-2 border-yellow-600 rounded-lg text-white'>Editar</Link>
            <button className='bg-red-400	p-1	border-solid border-2 border-red-600 rounded-lg text-white' onClick={() => handleClickApagar(id!)}>Apagar</button>
          </div>
        </div>
      )})}
      <Link className="bg-green-400	p-1	border-solid border-2 border-green-600 rounded-lg text-white absolute bottom-14 right-14" href={"/cadastro"}> Criar cadastro </Link>
    </main>
  );
}


