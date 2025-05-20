import { AppBar, Toolbar, Container, Link } from '@mui/material';
import HideOnScroll from './HideOnScroll';
import NavMenuSmall from './NavMenuSmall';
import AppTitle from './AppTitle';
import NavMenuLarge from './NavMenuLarge';
import UserMenu from './UserMenu';
import RouterLink from '../RouterLink';
// import { Link as RouterLink } from 'react-router';

// const PAGES = [
//   // <Link component={RouterLink} to="/users" underline="none" color="inherit">
//   //   Users
//   // </Link>,
//   { name: 'NFL', path: '/' },
//   { name: 'NBA', path: '/' },
//   { name: 'MLB', path: '/' },
//   { name: 'All Posts', path: '/posts' }
//   // <RouterLink path={'/posts'}>
//   //   All Posts
//   // </RouterLink>
// ];

function NavBar() {
  return (
    <HideOnScroll>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NavMenuSmall />
            <AppTitle />
            <NavMenuLarge />
            <UserMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
export default NavBar;
