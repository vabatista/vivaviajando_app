import { useNavigate  } from 'react-router-dom';
import navigateBackWhiteIcon from '../assets/svg/navigate-back-white.svg';
import bg from '../assets/wanderlustbg.webp';
import ThemeToggle from '../components/theme-toggle-button';
import AddIcon from '../assets/svg/add-icon-white.svg';
import logo from '../assets/logo_viva_viajando_transparente.jpeg'
import React from 'react';


export default function AboutUs() {
  const navigate = useNavigate();

  return (

    <div className="w-full cursor-default bg-light dark:bg-dark">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="relative -mt-2 h-[100px] bg-cover bg-fixed bg-center"
      >

        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col px-4 py-8 text-slate-50 md:px-16">
          <div className="flex w-full justify-between">
          <div className="absolute inset-4 px-0 py-10">
            <img src={navigateBackWhiteIcon} className="h-5 w-10" onClick={() => navigate(-1)} />
          </div>                              

            <div>
              <img src={logo} style={{height: 85}} />
            </div>  
            <div className="hidden flex max-h-20 px-4 items-left justify-between text-2xl font-semibold md:inline-block">
              Viva Viajando
            </div>
            <div className="flex justify-between px-2">
            <button
                className="hidden max-h-12 rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
                onClick={() => {
                  navigate('/add-blog');
                }}
              >
                Novo post
              </button>
              <button
                className="px-0 py-0 min-h-10 max-h-12 hover:bg-slate-500/25 md:hidden"
                onClick={() => {
                  navigate('/add-blog');
                }}
              >
                <img className="h-10 w-10" src={AddIcon} />
              </button>
              <div className="flex max-h-12 items-center justify-end px-2 py-2 md:px-20">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 md:mx-8 lg:mx-16">
        <br/>
        <br/>
        <h1 className="text-xl sm:pb-0 pb-4 font-semibold dark:text-dark-primary">Sobre nós</h1>
        <div className="flex flex-wrap">
          Não somos uma empresa. É importante começar por aí. Não temos a intenção de fazer dinheiro com esse blogue, mas apenas passar o tempo e relembrar um pouco das nossas viagens.
          Somos um casal, Vitor e Gabriela. Vitor é nascido mineiro, habitante do Rio de Janeiro e com Greencard baiano, por ser casado com uma baiana residente no Rio de Janeiro. Esse blogue é desenvolvido e mantido por nós, portanto, não espere algo profissional. Por outro lado, aqui não fazemos recomendações ou damos dicas com conflito de interesses, já que não temos qualquer tipo de patrocínio nas nossas viagens. 
          Para entender o que vai encontrar aqui, é importante saber do que gostamos, para entender se está alinhado com sua expectativa. Gostamos muito de viajar, cozinhar, comer, sambar e caminhar pelas ruas. Como a saudosa Rita Lee, não gostamos nem de luxo nem de lixo. Procuramos fazer escolhas médias em termos de conforto e preço. A gente é bem fã de transporte público (não temos carro). Raras vezes usamos Taxi ou Uber em cidades com boa estrutura de transporte público. Também gostamos muito de caminhar: é normal para nós andar até 20km em um dia de viagem. Por isso também procuramos nos organizar para nos hospedar próximo aos pontos que desejamos visitar ou ao transporte público.
          Então é isso. Espero que nossos relatos te ajudem em alguma coisa na sua próxima viagem. O importante pra nós é que nos divertimos desenvolvendo esse blog e acabamos relembrando as viagens e experiências antigas!
        </div>
      </div>
    </div>
  );
}
