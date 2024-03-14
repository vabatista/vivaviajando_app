import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/wanderlustbg.webp';
import BlogFeed from '../components/blog-feed';
import PostCard from '../components/post-card';
import Post from '../types/post-type';
import { PostCardSkeleton } from '../components/skeletons/post-card-skeleton';
import ThemeToggle from '../components/theme-toggle-button';
import AddIcon from '../assets/svg/add-icon-white.svg';
import '../assets/custom.styles.css';
import Footer from '../components/footer';
import logo from '../assets/logo_viva_viajando_transparente.jpeg'
import React from 'react';
import ReactGA from 'react-ga4';
import { jwtDecode } from "jwt-decode";
import GoogleLogin from '../components/google-login';

ReactGA.initialize('G-YYECSC1FEY');
ReactGA.send({ hitType: "pageview", page: "/Home", title: "Página Inicial" });


function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loggedUser, setLoggedUser] = useState('');
  const [triedLogin, setTriedLogin] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_PATH + '/api/posts')
      .then((response) => {
        setPosts(response.data);
        console.log('Posts retrieved')
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const gtoken = localStorage.getItem('g-token');
    setTriedLogin(true);
    if (gtoken !== null) {
      const decoded: { email: string } = jwtDecode(gtoken as string);
      setLoggedUser(decoded.email);
      
    }
  }, []);

  const authUsers = [
    'vabatista@gmail.com',
    'gabi.estrella@yahoo.com'
  ]

  return (
    <div className="w-full cursor-default bg-light dark:bg-dark">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="relative -mt-2 h-[100px] bg-cover bg-fixed bg-center"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col px-4 py-8 text-slate-50 md:px-16">
          <div className="flex w-full justify-between">
            <div>
              <img src={logo} style={{height: 85}} />
            </div>  
            <div className="hidden flex max-h-20 px-4 items-left justify-between text-2xl font-semibold md:inline-block">
              Viva Viajando
            </div>
            <div className="flex justify-between px-2">
            {loggedUser === '' && triedLogin ? (<GoogleLogin setUserFunc={setLoggedUser} />) : authUsers.includes(loggedUser) ? (
              <>
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
                </>
              ) : <></>}
              <div className="flex max-h-12 items-center justify-end px-2 py-2 md:px-20">
                <ThemeToggle />
              </div>
    
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 md:mx-8 lg:mx-16">
        <BlogFeed />
        <h1 className="text-xl sm:pb-0 pb-4 font-semibold dark:text-dark-primary">Todos os textos</h1>
        <div className="flex flex-wrap">
          {posts.length === 0
            ? Array(8)
                .fill(0)
                .map((_, index) => <PostCardSkeleton key={index} />)
            : posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default HomePage;
