import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import { Dialog } from '@mui/material';

type ContactCardProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactCard({ open, onClose }: ContactCardProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Card className="grid place-items-center" style={{ width: '25rem', backgroundColor: 'darkred' }}>
        <Box 
          className="footertext"
          sx={{
            margin: '30px',
            width: 300,
            backgroundColor: 'rgb(230, 230, 230)',
          }}
        >
          <Card.Body>
            <Card.Title><strong>Professor Office Information</strong></Card.Title>
          </Card.Body>
          <ul className="list-group list-group-flush" style={{ width: 300 }}>
            <li className="list-group-item">OFFICE:   Tseng Jiang Hall (N) N508</li>
            <li className="list-group-item">PHONE:   (02)3366-3034</li>
            <li className="list-group-item">EMAIL:    chsu@ntu.edu.tw</li>
            <li className="list-group-item">FAX:    (02)2362-3040</li>
          </ul>
        </Box>
        <Box className="footertext"
          sx={{
            margin: '30px',
            width: 300,
            backgroundColor: 'rgb(230, 230, 230)',
          }} 
        >
          <Card.Body>
            <Card.Title><strong>Student Lab Information</strong></Card.Title>
          </Card.Body>
          <ul className="list-group list-group-flush" style={{ width: 300 }}>
            <li className="list-group-item">LAB:    Tseng Jiang Hall (N) N503</li>
            <li className="list-group-item">PHONE:    (02)3366-9751</li>
          </ul>
        </Box>
      </Card>
    </Dialog>
  )
}