import { Box, CircularProgress } from '@mui/material';
const Loading = () => {
  return (
    <Box textAlign="center">
      <CircularProgress size={25} />
    </Box>
  );
};

export default Loading;
