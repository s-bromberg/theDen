import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/orbitron';

import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {
  /*createBrowserRouter, RouterProvider*/ BrowserRouter,
  Route,
  Routes,
} from 'react-router';
import Posts from './Posts/Posts.jsx';

/*const postsLoader = ({ request }) => {
  console.log(request);
  const url = new URL(request.url);
  const offset = url.searchParams.get('offset') || 0;
  return fetch(`http://localhost:8080/api/posts?limit=5&offset=${offset}`)
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Something went wrong</div>,
    children: [
      {
        path: '/posts',
        element: <Posts />,
        loader: postsLoader,
      }
    ]
  },
]);*/
createRoot(document.getElementById('root')).render(
  //<RouterProvider router={router} />
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="posts" element={<Posts />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
