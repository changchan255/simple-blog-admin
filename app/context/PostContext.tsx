'use client';

import { createContext, useContext, useState } from 'react';

const PostContext = createContext<any>(null);

export function PostProvider({ children }: any) {
  const [posts, setPosts] = useState([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);
