import { useState } from "react";
import Cookies from 'js-cookie';
import { useSearchParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "@mui/material";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./index.css";

import HomePage from "@/components/HomePage"
import PeoplePage from "@/components/PeoplePage"
import ResearchPage from "@/components/ResearchPage"
import PublicationPage from "@/components/PublicationPage"
import EventPage from "@/components/EventPage"
import ContactCard from "@/components/ContactCard"
import SignInCard from "@/components/SignInCard"

import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ButtonGroup from '@mui/material/ButtonGroup';

function App() {
  
  const [edit, setEdit] = useState(Cookies.get('plasma-token') !== undefined);
  const [searchParams, setSearchParams] = useSearchParams();
  const visit = searchParams.get('visitor') || '';

  const [contactCardOpen, setContactCardOpen] = useState(false);
  const [signInCardOpen, setSignInCardOpen] = useState(false);
  const [key, setKey] = useState('home' as string | null);

  const handleSignOut = () => {
    if (edit) {
      Cookies.remove('plasma-token');
      setEdit(false);
    } else if (!!visit) {
      searchParams.delete('visitor');
      setSearchParams(searchParams);
    }
  }

  return ( 
    <div className="grid place-items-center">
      <br/>
      <Container style={{ width: '70%' }}>
        <div style={{textAlign: 'right'}}>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={() => setContactCardOpen(true)}>
              <ImportContactsIcon className="mr-2" />Contact Information
            </Button>
            <Button onClick={(edit || !!visit) ? handleSignOut : () => setSignInCardOpen(true)}>
              <AccountCircleIcon className="mr-2" />Sign {(edit || !!visit) ? "Out" : "In"}
            </Button>
          </ButtonGroup>
        </div>
        <Row>
          <Col xs={1} md={3} xl={4}>
            <h1 id="topTitle">
              <strong>plasma engineering laboratory</strong>
            </h1>
          </Col>
        </Row>
        <br/>
        <hr/>
        <br/>
        <Tabs
          id="justify-tab-example"
          activeKey={key ? key : 'home'}
          onSelect={(k) => setKey(k)}
          className="mb-3 mynav"
          justify
        >
          <Tab eventKey="home" title="HOME">
            <HomePage />
          </Tab>
          <Tab eventKey="people" title="PEOPLE">
            <PeoplePage edit={edit} />
          </Tab>
          <Tab eventKey="research" title="RESEARCH">
            <ResearchPage edit={edit} />
          </Tab>
          <Tab eventKey="publication" title="PUBLICATION">
            <PublicationPage edit={edit} />
          </Tab>
          <Tab eventKey="event" title="EVENT">
            <EventPage edit={edit} />
          </Tab>
        </Tabs>
        <br/>
        <footer>
          <div className="p-4">
            <div className="container">
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-center">
                  <img src="./ntuche_images/NTUCHElogo1.png" alt="..."/>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <br/>
      </Container>
      <ContactCard
        open={contactCardOpen}
        onClose={() => setContactCardOpen(false)}
      />
      <SignInCard 
        open={signInCardOpen}
        onClose={() => setSignInCardOpen(false)}
        onEdit={() => setEdit(true)}
      />
    </div>  
  )
}

export default App;
