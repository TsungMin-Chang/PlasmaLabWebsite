import * as React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Dialog } from '@mui/material';
import DialogContent from "@mui/material/DialogContent";
import PrintIcon from '@mui/icons-material/Print';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

type ContactCardProps = {
  open: boolean;
  onClose: () => void;
};

function ContactCard({ open, onClose }: ContactCardProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="w-[600px]">
        <Tabs
          defaultActiveKey="professor"
          id="uncontrolled-tab-example"
          className="mb-3"
          style={{color: 'rgb(46, 39, 31)', fontSize: '1.2rem'}}
        >
          <Tab 
            eventKey="professor" 
            title="Professor Office Information" 
          >
            <ul 
              className="list-group list-group-flush" 
              style={{stroke: 'rgb(46, 39, 31)', fontSize: '1.1rem'}}
            >
              <li className="list-group-item"> <LocationOnIcon /> Tseng Jiang Hall (N) N508</li>
              <li className="list-group-item"> <LocalPhoneIcon /> (02)3366-3034</li>
              <li className="list-group-item"> <EmailIcon /> chsu@ntu.edu.tw</li>
              <li className="list-group-item"> <PrintIcon /> (02)2362-3040</li>
            </ul>
          </Tab>
          <Tab 
            eventKey="student" 
            title="Student Lab Information" 
          >
            <ul 
              className="list-group list-group-flush" 
              style={{stroke: 'rgb(46, 39, 31)', fontSize: '1.1rem'}}
            >
              <li className="list-group-item"> <LocationOnIcon /> Tseng Jiang Hall (N) N503</li>
              <li className="list-group-item"> <LocalPhoneIcon /> (02)3366-9751</li>
            </ul>
          </Tab>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default React.memo(ContactCard);