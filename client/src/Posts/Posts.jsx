import { Box, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import NewPostAlert from './NewPostAlert';
import Post from './Post';
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
  const [snackbarState, setSnackbarState] = useState(false);
  const [page, setPage] = useState(1);

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
        const response = await fetch(`http://localhost:8080/api/posts/count`);
        const { postCount } = await response.json();
        console.log('postCount --->', postCount);
        setNewestPost(postCount);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const socket = io('http://localhost:8080');

  useEffect(() => {
    const receivePost = newPost => {
      //Update array if user is looking at newest posts else show snackbar with alert
      if (offset === 0) {
        const postsDeepCopy = structuredClone(posts);
        postsDeepCopy.pop();
        postsDeepCopy.unshift(newPost);
        setPosts(postsDeepCopy);
      } else {
        setSnackbarState(true);
      }

      setNewestPost(newestPost + 1);
    };

    socket.on('newPost', receivePost);

    return () => socket.off('newPost', receivePost);
  }, [offset, newestPost, posts, socket]);

  //const displayPosts = posts.map(post => <Post post={post} />)
  // () => {
  //   posts.forEach(p => console.log(new Date(p.created_at).toLocaleString()));
  //   return posts.map(post => (
  //     <Post post={post}/>
  //   ));
  // };

  const handlePageChange = (e, page) => {
    setOffset(LIMIT * (page - 1));
    setPage(page);
  };

  return posts.length ? (
    <Box>
      <NewPostAlert
        snackbarState={snackbarState}
        setSnackbarState={setSnackbarState}
        changePage={handlePageChange}
      />
      {posts.map(post => <Post key={post.id} post={post} />)}
      <Pagination
        count={Math.ceil(newestPost / 5)}
        shape="rounded"
        page={page}
        onChange={handlePageChange}
      />
    </Box>
  ) : (
    <div>no length</div>
  );
}
