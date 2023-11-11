import { useRef } from "react";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { Dialog } from '@mui/material';
import api from '../../../backend/api/generated/ClientAPI';

type SignInCardProps = {
  open: boolean;
  onClose: () => void;
};

function SignInCard({ open, onClose }: SignInCardProps) {

  const textfieldUsername = useRef<HTMLInputElement>(null);
  const textfieldPassword = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {

    const username = textfieldUsername.current?.value ?? "" ;
    const passwd = textfieldPassword.current?.value ?? "" ;

    if (!username) {
      alert("Username cannot be blank!");
      return;
    }

    if (!passwd) {
      alert("Password cannot be blank!");
      return;
    }

    // console.log(username, passwd);
    try {
      api.postLogin({username, passwd});
    } catch (error) {
      alert("Fail to sign in!");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar 
            sx={{ m: 1, bgcolor: 'secondary.main' }}
            alt="Cute Plasma"
            src="/toy_plasma_ball.png"
          />
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              inputRef={textfieldUsername}
              margin="normal"
              required
              fullWidth
              label="User Name"
              autoFocus
            />
            <TextField
              inputRef={textfieldPassword}
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
}

export default React.memo(SignInCard);