import React from "react";
import { useEffect, useState } from "react";

import "../index.css";
import PersonCard from '@/components/PersonCard';
import NewPeopleDialog from '@/components/NewDialog/NewPeopleDialog'; 

import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { PersonDataProp } from "../../../backend/api/generated/schemas";
import api from '../../../backend/api/generated/ClientAPI';

function PeoplePage({ edit }: { edit: boolean }) {

  const [render, setRender] = useState(0);
  const [dummys, setDummys]  = useState([] as PersonDataProp[])
  useEffect(()=>{
    api.getPeoplesData()
      .on(200, data => {
        setDummys(data)  
      })
      .on(404, error=>{
         alert(error)
      });
  },[render])

  const [newPeopleDialogOpen, setNewPeopleDialogOpen] = useState(false);

  const positionLabel: { [key: string]: PersonDataProp[] } = {'4':[], '3':[], '2':[], '1':[], '0':[]};
  dummys.map((dummy) => {positionLabel[dummy.position.toString()].push(dummy)});

  return (
    <>
      <main>
        <nav id="navbar-example2 " className="navbar bg-light px-3 mb-3">
          <p className="navbar-brand">
            <strong>PEOPLE</strong>
            {edit && (
              <IconButton 
                color="success" 
                onClick={() => {setNewPeopleDialogOpen(true)}} 
              >
                <AddCircleIcon />
              </IconButton>
            )}
          </p>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a className="nav-link mynav2" href="#scrollspyHeading_professor">Professor</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mynav2" href="#scrollspyHeading_phd">Ph.D. Student</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mynav2" href="#scrollspyHeading_ms">M.S. Student</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mynav2" href="#scrollspyHeading_bs">B.S. Student</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mynav2" href="#scrollspyHeading_alumni">Alumni</a>
            </li>
          </ul>
        </nav>
        <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-light p-3 rounded-2">
          <h4 id="scrollspyHeading_professor" className="mynav2">Professor</h4>
          <div className="container">
              <PersonCard data={positionLabel['4']} onRender={() => setRender(render + 1)} edit />
          </div>
          <br/>
          <h4 id="scrollspyHeading_phd" className="mynav2">Ph.D. Student</h4>
          <div className="container">
              <PersonCard data={positionLabel['3']} onRender={() => setRender(render + 1) } edit /> 
          </div>
          <br/>
          <h4 id="scrollspyHeading_ms" className="mynav2">M.S. Student</h4>
          <div className="container">
              <PersonCard data={positionLabel['2']} onRender={() => setRender(render + 1) } edit />  
          </div>
          <br/>
          <h4 id="scrollspyHeading_bs" className="mynav2">B.S. Student</h4>
          <div className="container">
              <PersonCard data={positionLabel['1']} onRender={() => setRender(render + 1) } edit />
          </div>
          <br/>
          <h4 id="scrollspyHeading_alumni" className="mynav2">Alumni</h4>
          <div className="container">
              <PersonCard data={positionLabel['0']} onRender={() => setRender(render + 1) } edit />
          </div>
        </div>
      </main>
      <NewPeopleDialog
        open={newPeopleDialogOpen}
        onClose={() => setNewPeopleDialogOpen(false)}
        onRender={() => setRender(render + 1)}
      />
    </>
  )
}
export default React.memo(PeoplePage);
