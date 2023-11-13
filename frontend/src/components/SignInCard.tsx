import { useRef } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Dialog } from '@mui/material';

import { LoginDataProp } from "../../../backend/api/generated/schemas";
import api from '../../../backend/api/generated/ClientAPI';

type SignInCardProps = {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
};

function SignInCard({ open, onClose, onEdit }: SignInCardProps) {

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

    try {
      api.postLogin({username, passwd} as LoginDataProp)
        .on(201, () => onEdit())
        .on(401, () => alert("Fail to sign in!")); 
    } catch (error) {
      alert("Fail to sign in!");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" className="labeltext">
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
              style={{backgroundColor: 'rgb(46, 39, 31)'}}
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

export default SignInCard;
