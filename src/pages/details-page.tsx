import { useLocation, useNavigate, useParams } from 'react-router-dom';
import navigateBackWhiteIcon from '../assets/svg/navigate-back-white.svg';
import formatPostTime from '../utils/format-post-time';
import CategoryPill from '../components/category-pill';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';
import Footer from '../components/footer';
import ThemeToggle from '../components/theme-toggle-button';
import mdstyles from '../assets/markdown.styles.module.css'
import { DiscussionEmbed } from 'disqus-react';
import ReactGA from 'react-ga4';
import DocumentMeta from 'react-document-meta';



export default function DetailsPage() {
  const { state } = useLocation();
  const [post, setPost] = useState(state?.post);
  const initialVal = post === undefined;
  const [loading, setIsLoading] = useState(initialVal);
  const { postId, title: routeTitle, lang } = useParams();
  const currentLang = lang || 'pt-br';
  const navigate = useNavigate();
  const gaId = process.env.REACT_APP_GA_ID || ''; // Provide a default value if REACT_APP_GA_ID is undefined
  ReactGA.initialize(gaId);
  
  function getFirstParagraph(desc: any) {
    const text = typeof desc === 'object' ? (desc[currentLang] || desc['pt-br'] || '') : (desc || '');
    // Split the text into an array of paragraphs
    const paragraphs = text.split('\n\n'); // Assuming paragraphs are separated by double line breaks

    // Return the first paragraph
    if(paragraphs.length > 0) {
        return paragraphs[0];
    } else {
        return "";
    }
  }
  
  useEffect(() => {
    const getPostById = async () => {
      try {
        await axios.get(process.env.REACT_APP_API_PATH + `/api/posts/${postId}`).then((response) => {
          setIsLoading(false);
          setPost(response.data);

        });
      } catch (error) {
        console.log(error);
      }
    };
    if (post === undefined) {
      getPostById();
    }
  }, [post]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') ?? 'light';
    const textContainer = document.getElementById('textcontainer');
    if (textContainer) {
      textContainer.setAttribute('data-color-mode', storedTheme);
    }
  }, [])

  if (!loading) {
    const meta = {
      title: post.title,
      description: 'Blog Viva Viajando ' + getFirstParagraph(post.description),
      canonical: window.location.href,
    };    
    ReactGA.send({ hitType: "pageview", page: postId, title: post.title });
    return (
      
      <div className="min-h-screen bg-light dark:bg-dark">
        <DocumentMeta {...meta}></DocumentMeta>
        <div className="relative flex flex-col">
          <img src={post.imageLink} alt={post.title} className="h-80 w-full object-cover md:h-96" />
          <div className="absolute left-0 top-0 h-full w-full bg-slate-950/60"></div>
          <div>
            <div className="absolute top-12 left-2 cursor-pointer text-lg text-slate-50 md:top-20 md:left-8 lg:left-12">
              <img src={navigateBackWhiteIcon} className="h-5 w-10" onClick={() => navigate('/')} />
            </div>
            <div className="absolute top-12 right-4 z-10 md:top-20 md:right-8 lg:right-12">
              <div className="flex items-center space-x-1 bg-slate-950/60 rounded-full p-1 border border-slate-600/35">
                <button
                  onClick={() => {
                    localStorage.setItem('lang', 'pt-br');
                    navigate(`/details-page/${routeTitle}/pt-br/${postId}`, { state: { post } });
                  }}
                  className={`p-1 rounded-full hover:scale-110 transition-transform ${currentLang === 'pt-br' ? 'bg-slate-700 ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'}`}
                  title="Português"
                >
                  <img src="https://flagcdn.com/w40/br.png" className="h-4 w-6 object-cover rounded-sm" alt="BR" />
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('lang', 'en');
                    navigate(`/details-page/${routeTitle}/en/${postId}`, { state: { post } });
                  }}
                  className={`p-1 rounded-full hover:scale-110 transition-transform ${currentLang === 'en' ? 'bg-slate-700 ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'}`}
                  title="English"
                >
                  <img src="https://flagcdn.com/w40/gb.png" className="h-4 w-6 object-cover rounded-sm" alt="EN" />
                </button>
              </div>
            </div>
          </div>


          <div className="absolute bottom-6 w-full max-w-xl px-4 text-slate-50 md:bottom-8 md:max-w-3xl md:px-8 lg:bottom-12 lg:max-w-5xl lg:px-12">
            <div className="mb-4 flex space-x-2">
              {post.categories.map((category: string) => (
                <CategoryPill category={category} />
              ))}
            </div>
            <h1 className="mb-4 text-xl font-semibold md:text-2xl lg:text-3xl">{post.title}</h1>
            <p className="text-xs font-semibold text-dark-secondary md:text-sm">
              {post.authorName}
            </p>
            <p className="text-xs text-dark-secondary/80 md:text-sm">
              {formatPostTime(post.timeOfPost)}
            </p>
          </div>
        </div>
        <div
          id="textcontainer"
          className={`wmde-markdown-var items-center gap-y-4 px-4 py-10 ${
            localStorage.getItem('theme') === 'dark' ? 'bg-dark text-white' : 'bg-light text-black'
          }`}
        >
          <MDEditor.Markdown
            source={typeof post.description === 'object' ? (post.description[currentLang] || post.description['pt-br'] || '') : (post.description || '')}
            className={`${mdstyles.reactMarkDown} ${
              localStorage.getItem('theme') === 'dark' ? 'bg-dark text-white' : 'bg-light text-black'
            }`}
          />
        </div>        
        <DiscussionEmbed
          shortname={process.env.REACT_APP_DISQUS_APP_ID || ''}
          config={
              {
                  url: window.location.href,
                  identifier: postId,
                  title: post.title,
                  language: 'pt_BR' 
              }
          }
      />        
        <Footer/>

      </div>
    );
  }
  else return <h1>Loading...</h1>;
}
