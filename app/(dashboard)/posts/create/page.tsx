import { createPostAction } from './actions';

export default function CreatePostPage() {

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        Add Post
      </h1>

      <form
        action={createPostAction}
        className="space-y-4 bg-white p-6 rounded-2xl shadow border"
      >
        <input
          name="title"
          className="w-full border p-2 rounded"
          placeholder="Title"
          required
        />

        <textarea
          name="content"
          className="w-full border p-2 rounded h-32"
          placeholder="Content"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
          Create
        </button>
      </form>
    </div>
  );
}
