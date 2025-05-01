import { Alert, Box, Button, Snackbar } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

export default function NewPostAlert({
  snackbarState,
  setSnackbarState,
  changePage,
}) {
  const handleClose = () => setSnackbarState(false);
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        open={snackbarState}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          sx={{ width: '100%' }}
          iconMapping={{
            info: <PostAddIcon fontSize="inherit" />,
          }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => changePage(null, 1)}
            >
              SEE POST
            </Button>
          }
        >
          New post added
        </Alert>
      </Snackbar>
    </Box>
  );
}
