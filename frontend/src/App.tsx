import { useEffect, useState } from "react";

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

import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ButtonGroup from '@mui/material/ButtonGroup';

import useCards from "@/hooks/useCards";

function App() {
  const { lists, fetchLists, fetchCards } = useCards();
  const [detailListDisplay, setDetailListDisplay] = useState({'state':false, 'id':""});
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);

  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  const handleListClick = (listId: string) => {
    setDetailListDisplay({'state':true, 'id':listId});
  };

  const [key, setKey] = useState('home' as string | null);

  return (
    <div className="grid place-items-center">
      <br/>
      <Container style={{ width: '70%' }}>
        <div style={{textAlign: 'right'}}>
          <ButtonGroup size="large" variant="text" aria-label="text button group">
            <Button onClick={() => setNewListDialogOpen(true)}>
              <ImportContactsIcon className="mr-2" />
              Contact Info
            </Button>
            <Button>
              <AccountCircleIcon className="mr-2" />
              Log in
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
            <PeoplePage />
          </Tab>
          <Tab eventKey="research" title="RESEARCH">
            <ResearchPage />
          </Tab>
          <Tab eventKey="publication" title="PUBLICATION">
            <PublicationPage />
          </Tab>
          <Tab eventKey="event" title="EVENT">
            <EventPage />
          </Tab>
        </Tabs>
        <br/>
        <footer>
          <div className="p-4">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="grid place-items-center">
                    <img src="./ntuche_images/NTUCHElogo1.png" alt="..."/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  )
}

export default App;
