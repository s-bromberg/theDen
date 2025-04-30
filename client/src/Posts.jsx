import { Pagination } from '@mui/material';
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
  const [newestPost, setNewestPost] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts?limit=${LIMIT}&offset=${offset}`,
        );
        const postsData = await response.json();
        console.log('postsData --->', postsData);
        setPosts(postsData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [offset]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/count`,
        );
        const { postCount } = await response.json();
        console.log('postCount --->', postCount);
        setNewestPost(postCount);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [newestPost]);

  const displayPosts = () => {
    posts.forEach(p => console.log(new Date(p.created_at).toLocaleString()));
    return (posts.map(post => (
      <div key={post.id}>
        {post.id}:{post.title}:at:{new Date(post.created_at).toLocaleString()}
      </div>)
    ))
  }

  return (
    posts.length ?
    <>
      {/* {data.map(post => <div key={post.id}>{post.id}:{post.title}`</div>)} */}
      <div>
        {displayPosts()}
      </div>
      <Pagination count={Math.ceil(newestPost / 5)} shape="rounded" onChange={(e, page) => setOffset(LIMIT * (page - 1))} />
    </>
    : <div>no length</div>
  );
}
