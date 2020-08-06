import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {    

    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: ''
    }

    const [categorias, setCategorias] = useState([]);

    const [values, setValues] = useState(valoresIniciais);

    function setValue(chave, valor) {
      setValues({
        ...values,
        [chave]: valor // nome: 'value'
      })
    }   

    function handleChange(infoEvento) {
      // const { getAttribute, value } = infoEvento.target;
      setValue(
        infoEvento.target.getAttribute('name'), 
        infoEvento.target.value
       );
    }

    useEffect(() => {
      const URL_TOP = 'http://localhost:8081/categorias';
      /*fetch(URL_TOP)
      .then((respostaDoServidor) => { 
          return respostaDoServidor.json(); 
      })
       .then((respostaConvertidaEmObj) => { 
          console.log(respostaConvertidaEmObj);
      });*/

      // "server": "json-server --watch db.json --port 8081",
      // "dev": "concurrently \"react-scripts start\" \"npm run server\"",
      // "start": "react-scripts start",

      fetch(URL_TOP)
       .then(async (respostaDoServidor) => {
          const resposta = await respostaDoServidor.json();
          setCategorias([
            ...resposta,
          ]);
       });

      /*setTimeout(() => {
        setCategorias([
          ...categorias,
          {
            id: 1,
            nome: 'Front End',
            descricao: 'Uma categoria show',
            cor: '#cbd1ff'
          },
          {
            id: 2,
            nome: 'Back End',
            descricao: 'Outra categoria show',
            cor: '#cbd1ff'
          },
        ]);
      }, 4 * 1000);*/
   }, []);

    return (
      <PageDefault>
        <h1>Cadastro de Categoria: {values.nome} </h1>

        <form onSubmit={(infoEvento) => {
          infoEvento.preventDefault();
          setCategorias([
            ...categorias,
            values
          ]);  
          
          setValues(valoresIniciais);
        }}>

        <FormField
            label="Nome da Categoria"
            type="text"
            name="nome"
            value={values.nome}
            onChange={handleChange}
        />

        <FormField
            label="Descição"
            type="textarea"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
        />

        <FormField
            label="Cor"
            type="color"
            name="cor"
            value={values.nome}
            onChange={handleChange}
        />          
          <Button>
            Cadastrar
          </Button>

          {categorias.length === 0 && (
            <div>
              Loading
            </div>
          )}

        </form>

        <ul>
          {categorias.map((categoria) => {
            return (
              <li key={`${categoria.nome}`}>
                {categoria.nome}
              </li>
            );
          })}
        </ul>

        <Link to="/">
           Ir para home
        </Link>
      </PageDefault>
    );
  }

  export default CadastroCategoria;