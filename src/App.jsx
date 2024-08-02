import { useEffect, useState } from "react";
import useProgressBar from "./hooks/useProgressBar";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [readTime, setReadTime] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const progressBar = useProgressBar(dataLoaded);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    const calculateTotalWords = () => {
      let wordCount = 0;

      posts.forEach((post) => {
        const titleWords = post.title.split(" ").length;
        const bodyWords = post.body.split(" ").length;
        wordCount += titleWords + bodyWords;
      });

      return wordCount;
    };

    if (posts.length > 0) {
      const totalWords = calculateTotalWords();
      setReadTime(Math.round(totalWords / 265));
      setDataLoaded(true);
    }
  }, [posts]);

  return (
    <>
      <div className="progress-bar" style={{ width: progressBar }}></div>
      <span className="read-time">{readTime} min read</span>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h2 className="post__title">{post.title}</h2>
            <p className="post__body">{post.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
