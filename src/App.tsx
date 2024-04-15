import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  const [posts, setPosts] = useState<Array<Post>>();
  const [showAllPosts, setShowAllPosts] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Post>();
  const [showcurrentPost, setShowCurrentPost] = useState<boolean>(false);
  const [showCurrentPostBody, setShowCurrentPostBody] =
    useState<boolean>(false);

  useEffect(() => {
    fetchPosts()
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  async function fetchPosts() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const posts = await res.json();
      return posts;
    } catch (error) {
      console.error(error);
    }
  }

  function getRandomPost() {
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex];
  }

  return (
    <>
      <div>
        <button
          onClick={() => {
            setCurrentPost(getRandomPost());
            setShowAllPosts(false);
            setShowCurrentPost(true);
            setShowCurrentPostBody(false);
          }}
        >
          Get random post
        </button>

        {showcurrentPost && (
          <div id="random-post">
            <h2 id="title">{currentPost.title}</h2>

            {showCurrentPostBody && <p>{currentPost?.body}</p>}
            <button
              onClick={() => setShowCurrentPostBody(!showCurrentPostBody)}
            >
              Toggle Post Body
            </button>
            <button
              onClick={() => {
                setShowCurrentPost(false);
                setShowCurrentPostBody(false);
              }}
            >
              Hide Post
            </button>
          </div>
        )}

        <button onClick={() => setShowAllPosts(!showAllPosts)}>
          {showAllPosts ? "Hide All Posts" : "Show All Posts"}
        </button>
        {showAllPosts && (
          <div className="flex items-center w-full h-24 p-12 bg-slate-600">
            {posts.map((post) => (
              <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
