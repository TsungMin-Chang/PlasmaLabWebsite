import React from "react";
import { useState, useEffect } from "react";

import "../index.css";
import NewPublicationDialog from '@/components/NewDialog/NewPublicationDialog'; 
import UpdatePublicationDialog from '@/components/UpdateDialog/UpdatePublicationDialog'; 

import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

import { PublicationDataProp } from "../../../backend/api/generated/schemas";
import api from '../../../backend/api/generated/ClientAPI';

function PublicationPage() {

  const [render, setRender] = useState(0);
  
  const [dummys, setDummys]  = useState([] as PublicationDataProp[])
  useEffect(() => {
    api.getPublicationsData()
      .on(200, data => {
        setDummys(data)  
      })
      .on(404, error=>{
         alert(error)
      });
  },[render])

  const yearLabel: { [key: string]: PublicationDataProp[] } = {};
  dummys.map((ele) => yearLabel.hasOwnProperty(ele.year) ? yearLabel[ele.year].push({...ele}) : yearLabel[ele.year]=[{...ele}]);
  // Get the keys and sort them
  const sortedKeys = Object.keys(yearLabel).sort((a, b) => parseInt(b) - parseInt(a));
  
  const [newPublicationDialogOpen, setNewPublicationDialogOpen] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState({'state': false, 'data': {'id': "", year: -1, detail: ""} as PublicationDataProp});

  const handleDelete = async (e: React.MouseEvent) => {
    await api.deletePublicationData({id: e.currentTarget.id});
    setRender(render + 1);
  }

  return (
    <>
      <nav id="navbar-example2 " className="navbar bg-light px-3 mb-3">
        <p className="navbar-brand">
          <strong>PUBLICATION</strong>
          <IconButton 
            color="success" 
            onClick={() => {setNewPublicationDialogOpen(true)}} 
          >
            <AddCircleIcon />
          </IconButton>
        </p>
        <ul className="nav nav-pills">
          {sortedKeys.map((key) => (
            <li className="nav-item" key={key}>
              <a className="nav-link mynav2" href={"#scrollspyHeading_publication"+key}>{key}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-light p-3 rounded-2">
        {sortedKeys.map((key) => (
          <>
            <h4 id={"scrollspyHeading_publication"+key} className="mynav2" key={key}>{key}</h4>
            <ul className="list-group list-group-flush">
              {yearLabel[key].map((ele, index) => {
                const colorClass = index % 2 === 0 ? "publication-wording list-group-item" : "publication-wording list-group-item list-group-item-secondary";
                return (
                  <li className={colorClass} key={ele.id}>
                    <div style={{float: 'right', position: 'initial', right: '0px', top: '0px'}}>
                      <IconButton 
                        color="error"
                        onClick={handleDelete}
                        id={ele.id}
                        style={{zIndex: 3}}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                    <div style={{float: 'right', position: 'initial', right: '0px', top: '0px'}}>
                      <IconButton 
                        id={ele.id}
                        color="success" 
                        onClick={() => setOpenUpdateDialog({'state': true, 'data': ele})}
                        style={{zIndex: 2}}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                    <div style={{position: 'relative'}}>
                      {ele.detail}
                    </div>
                  </li>
                );
              })}
            </ul>
            <br />
          </>
        ))}
      </div>
      <NewPublicationDialog
        open={newPublicationDialogOpen}
        onClose={() => setNewPublicationDialogOpen(false)}
        onRender={() => setRender(render + 1)}
      />
      <UpdatePublicationDialog
        {...openUpdateDialog.data}
        open={openUpdateDialog.state} 
        onClose={() => setOpenUpdateDialog({'state': false, 'data': {'id': "", year: -1, detail: ""} as PublicationDataProp})}
        onRender={() => setRender(render + 1)}
      />
    </>
  )
}

export default React.memo(PublicationPage);
