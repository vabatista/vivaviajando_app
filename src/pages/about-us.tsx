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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, laudantium sapiente cumque, architecto maiores magni molestiae libero ad non quo, perspiciatis molestias quasi quae natus impedit iure sunt fugiat ex!
        </div>
      </div>
    </div>
  );
}
