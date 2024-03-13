import axios from 'axios';
import { useEffect, useState } from 'react';
import FeaturedPostCard from '../components/featured-post-card';
import LatestPostCard from '../components/latest-post-card';
import { FeaturedPostCardSkeleton } from '../components/skeletons/featured-post-card-skeleton';
import { LatestPostCardSkeleton } from '../components/skeletons/latest-post-card-skeleton';
import CategoryPill from '../components/category-pill';
import { categories } from '../utils/category-colors';
import React from 'react';

export default function BlogFeed() {
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    let categoryEndpoint =
      selectedCategory === 'featured'
        ? '/api/posts/featured'
        : `/api/posts/categories/${selectedCategory}`;

    axios
      .get(process.env.REACT_APP_API_PATH + categoryEndpoint)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedCategory]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_PATH + '/api/posts/latest')
      .then((response) => {
        setLatestPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="mx-auto my-6">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full p-4 md:w-2/3">
          <div className="-mb-1 text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
            Novidades
          </div>
          <h1 className="mb-2 text-xl font-semibold dark:text-dark-primary">
            {selectedCategory === 'featured'
              ? 'Destaques'
              : `Textos relacionados a "${selectedCategory}"`}
          </h1>
          <div className="flex flex-col gap-6">
            {posts.length === 0
              ? Array(5)
                  .fill(0)
                  .map((_, index) => <FeaturedPostCardSkeleton key={index} />)
              : posts
                  .slice(0, 5)
                  .map((post, index) => <FeaturedPostCard key={index} post={post} />)}
          </div>
        </div>
        <div className="w-full p-4 md:w-1/3">
          <div className="mb-6">
            <div className="-mb-1 text-base tracking-wide text-light-tertiary dark:text-dark-tertiary">
              Escolha por tema
            </div>
            <h2 className="mb-2 text-xl font-semibold dark:text-dark-primary">Categorias</h2>
            <div className="flex flex-wrap gap-3 dark:rounded-lg dark:bg-dark-card dark:p-3">
              {categories.map((category) => (
                <button
                  key={category}
                  aria-label={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(selectedCategory === category ? 'featured' : category)
                  }
                >
                  <CategoryPill category={category} selected={selectedCategory === category} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="-mb-1 text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
              Novidades
            </div>
            <h2 className="mb-2 text-xl font-semibold dark:text-dark-primary">Últimos textos</h2>
            <div className="flex flex-col gap-4">
              {latestPosts.length === 0
                ? Array(5)
                    .fill(0)
                    .map((_, index) => <LatestPostCardSkeleton key={index} />)
                : latestPosts
                    .slice(0, 5)
                    .map((post, index) => <LatestPostCard key={index} post={post} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
