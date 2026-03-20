import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type Post = {
  id: number;
  title: string;
  content: string;
    authorId?: number;
};

type PostState = {
  posts: Post[];
  loading: boolean;
};

const initialState: PostState = {
  posts: [],
  loading: false,
};

// GET
export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async () => {
    const res = await fetch('/api/posts');
    return res.json();
  }
);

// CREATE
export const createPostThunk = createAsyncThunk(
  'post/createPost',
  async (data: Omit<Post, 'id'>) => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }
);

// UPDATE
export const updatePostThunk = createAsyncThunk(
  'post/updatePost',
  async (data: Post) => {
    const res = await fetch('/api/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }
);

// DELETE
export const deletePostThunk = createAsyncThunk(
  'post/deletePost',
  async (id: number) => {
    await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    return id;
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      // CREATE
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })

      // UPDATE
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (p: Post) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (p: Post) => p.id !== action.payload
        );
      });
  },
});

export default postSlice.reducer;
