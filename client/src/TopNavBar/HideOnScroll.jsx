import { Slide, useScrollTrigger } from '@mui/material';

export default function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return <Slide in={!trigger}>{children}</Slide>;
}
