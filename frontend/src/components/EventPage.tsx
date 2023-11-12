import React from "react";
import { useEffect, useState } from "react";

import "../index.css";
import NewEventDialog from '@/components/NewDialog/NewEventDialog'; 

import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from "@mui/icons-material/Delete";

import { EventDataProp } from "../../../backend/api/generated/schemas";
import api from '../../../backend/api/generated/ClientAPI';

function EventPage({ edit }: { edit: boolean }) {

  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);

  const [render, setRender] = useState(0);
  const [dummys, setDummys]  = useState([] as EventDataProp[])
  useEffect(()=>{
    api.getEventsData()
      .on(200, data => {
        setDummys(data)  
      })
      .on(404, error=>{
         alert(error)
      });
  },[render])

  const yearLabel: { [key: string]: EventDataProp[] } = {};
  dummys.map((ele) => yearLabel.hasOwnProperty(ele.year) ? yearLabel[ele.year].push({...ele}) : yearLabel[ele.year]=[{...ele}]);
  // Get the keys and sort them
  const sortedKeys = Object.keys(yearLabel).sort((a, b) => parseInt(b) - parseInt(a));

  const handleDelete = async (e: React.MouseEvent) => {
    await api.deleteEventData({id: e.currentTarget.id});
    setRender(render + 1);
  }

  return (
    <>
      <nav id="navbar-example2 " className="navbar bg-light px-3 mb-3">
        <p className="navbar-brand">
          <strong>EVENT</strong>
          {edit && (
            <IconButton 
              color="success" 
              onClick={() => setNewEventDialogOpen(true)} 
            >
              <AddCircleIcon />
            </IconButton>
          )}
        </p>
        <ul className="nav nav-pills">
          {sortedKeys.map((key) => (
            <li className="nav-item" key={key}>
              <a className="nav-link mynav2" href={"#scrollspyHeading_event"+key}>{key}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-light p-3 rounded-2">
        {sortedKeys.map((key) => (
          <>
            <h4 id={"scrollspyHeading_event"+key} className="mynav2" key={key}>{key}</h4>
            <div className="container">
              {yearLabel[key].map((ele) => (
                <figure className="figure" key={ele.id}>
                  <div style={{float: 'right', position: 'initial', right: '0px', top: '0px'}}>
                    { edit && (
                      <IconButton 
                        color="error"
                        onClick={handleDelete}
                        id={ele.id}
                        style={{zIndex: 3}}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </div>
                  <img src={ele.imgPath} className="figure-img img-fluid rounded" alt="..." style={{position: 'relative'}} />
                </figure>
              ))}
            </div>
          </>
        ))}
      </div>
      <NewEventDialog
        open={newEventDialogOpen}
        onClose={() => setNewEventDialogOpen(false)}
        onRender={() => setRender(render + 1)}
      />
    </>
  )
}

export default React.memo(EventPage);
