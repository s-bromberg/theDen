import { Link } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router';

export default function RouterLink({ children, path }) {
  return (
    <Link component={ReactRouterLink} to={path} underline="none" color="inherit">
      {children}
    </Link>
  )
}
// 