import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [readTime, setReadTime] = useState(0);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      handleScroll();
    }
  }, [posts]);

  const handleScroll = () => {
    const scrollBarPos = window.scrollY;
    const scrollBarSize = window.innerHeight;
    const totalSize = document.body.clientHeight;

    setProgress(`${((scrollBarPos + scrollBarSize) / totalSize) * 100}%`);
  };

  return (
    <>
      <div className="progress-bar" style={{ width: progress }}></div>
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
