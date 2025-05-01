import { AppBar, Toolbar, Container, Link } from '@mui/material';
import HideOnScroll from './HideOnScroll';
import NavMenuSmall from './NavMenuSmall';
import AppTitle from './AppTitle';
import NavMenuLarge from './NavMenuLarge';
import UserMenu from './UserMenu';
import { Link as RouterLink } from 'react-router';

const PAGES = [
  <Link component={RouterLink} to="/users" underline="none" color="inherit">
    Users
  </Link>,
  'NFL',
  'NBA',
  'MLB',
  <Link component={RouterLink} to="/posts" underline="none" color="inherit">
    All Posts
  </Link>,
];

function NavBar() {
  return (
    <HideOnScroll>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NavMenuSmall pages={PAGES} />
            <AppTitle />
            <NavMenuLarge pages={PAGES} />
            <UserMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
export default NavBar;
