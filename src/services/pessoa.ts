import { Pessoa } from "@/pages";

export const getPessoas = async () => {
    try {
      const pessoasResponse = await fetch('http://localhost:8080/pessoa', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });
  
      if (!pessoasResponse.ok) {
        throw new Error(`HTTP error! status: ${pessoasResponse.status}`);
      }
  
      return await pessoasResponse.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
};

export const getPessoaSelecionada = async (id:number) => {
    try {
      const pessoaResponse = await fetch(`http://localhost:8080/pessoa/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });
  
      if (!pessoaResponse.ok) {
        throw new Error(`HTTP error! status: ${pessoaResponse.status}`);
      }
  
      return await pessoaResponse.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
};
  

export const deletePessoa = async (id: number) => {
    try {
      const pessoasResponse = await fetch(`http://localhost:8080/pessoa/${id}`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: "DELETE",
      });
  
      if (!pessoasResponse.ok) {
        throw new Error(`Erro ao deletar o cadastro!`);
      }
  
      return await pessoasResponse.json();
  
    } catch (error) {
      console.error('Fetch error:', error);
    }
};

export const criarPessoa = async (pessoa: Pessoa) => {
    try {
      const pessoasResponse = await fetch(`http://localhost:8080/pessoa`, {
        headers: {
          'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(pessoa)
      });
  
      if (!pessoasResponse.ok) {
        throw new Error(`Erro ao criar o cadastro!`);
      }
  
      return await pessoasResponse.json();
  
    } catch (error) {
      console.error('Fetch error:', error);
    }
};

export const editarPessoa = async (pessoa: Pessoa) => {
    try {
      const pessoasResponse = await fetch(`http://localhost:8080/pessoa/${pessoa.id}`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: "PUT",
        body: JSON.stringify(pessoa)
      });
  
      if (!pessoasResponse.ok) {
        throw new Error(`Erro ao salvar o cadastro!`);
      }
  
      return await pessoasResponse.json();
  
    } catch (error) {
      console.error('Fetch error:', error);
    }
};