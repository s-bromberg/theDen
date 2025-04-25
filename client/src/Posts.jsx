import { useEffect, useState } from 'react';
// import { /*useLoaderData,*/ useNavigate } from "react-router";
// add mui backdrop component on load
// mui pagination component for navigating posts
const LIMIT = 5;

export default function Posts() {
  // const data = useLoaderData();
  const [posts, setPosts] = useState([]);
  // const navigate = useNavigate();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts?limit=${LIMIT}&offset=${offset}`,
        );
        setPosts(await response.json());
        // console.log(posts);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [offset]);

  return (
    <div>
      {/* {data.map(post => <div key={post.id}>{post.id}:{post.title}`</div>)} */}
      <div>
        {posts.map(post => (
          <div key={post.id}>
            {post.id}:{post.title}
          </div>
        ))}
      </div>
      <button onClick={() => setOffset(offset + LIMIT)}>next</button>
    </div>
  );
}
