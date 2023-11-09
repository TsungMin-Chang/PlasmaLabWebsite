import { useEffect, useState } from "react";

import "../index.css";
import NewResearchDialog from '@/components/NewDialog/NewResearchDialog'; 
import UpdateResearchDialog from '@/components/UpdateDialog/UpdateResearchDialog'; 

import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { ResearchDataProp } from "../../../backend/api/generated/schemas";
import api from '../../../backend/api/generated/ClientAPI';

export default function ResearchPage() {

  const [dummys, setDummys]  = useState([] as ResearchDataProp[])
  useEffect(()=>{
    api.getResearchsData()
      .on(200, data => {
        setDummys(data)  
      })
      .on(404, error=>{
         alert(error)
      });
  },[setDummys]) 

  const [newResearchDialogOpen, setNewResearchDialogOpen] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState({'state': false, 'data': {'id': "", 'title': "", 'description': "", 'reference': ""} as ResearchDataProp});

  return (
    <>
      <main>
        <nav id="navbar-example2 " className="navbar bg-light px-3 mb-3">
          <p className="navbar-brand">
            <strong>RESEARCH</strong>
            <IconButton 
                color="success" 
                onClick={() => {setNewResearchDialogOpen(true)}} 
            >
                <AddCircleIcon />
            </IconButton>
          </p>
          <ul className="nav nav-pills">
            {dummys.map((dummy) => (
              <li className="nav-item" key={dummy.id}>
                <a className="nav-link mynav2" href={"#scrollspyHeading_"+dummy.id}>{dummy.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-light p-3 rounded-2">
          {dummys.map((dummy) => (
            <div className="card mb-3" id={"scrollspyHeading_" + dummy.id} style={{maxWidth: '1000px'}}>
              <div className="row">
                <div className="col-sm-12 col-lg-7">
                  <br />
                  <img src={dummy.imgPath} className="img-fluid rounded-start" alt="..." />
                  <br />
                </div>
                <div className="col-sm-12 col-lg-5">
                  <div key={dummy.id}>
                    <div className="card-body">
                      <div style={{float: 'right', position: 'initial', right: '0px', top: '0px'}}>
                        <IconButton 
                          color="error"
                          onClick={async () => await api.deleteResearchData({id: dummy.id})}
                          style={{zIndex: 3}}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                      <div style={{float: 'right', position: 'initial', right: '0px', top: '0px'}}>
                        <IconButton 
                          color="success" 
                          onClick={() => setOpenUpdateDialog({'state': true, 'data': dummy})}
                          style={{zIndex: 3}}
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                      <div className="pplname" style={{position: 'relative'}}>
                        {dummy.title}
                      </div>
                      <ul style={{paddingLeft: 'unset'}}>
                        <li 
                          className="card-text-content"
                          style={{listStyleType: 'none'}}
                        >
                          {dummy.description}
                        </li>
                        <br />
                        <li 
                          className="card-footer-ref"
                          style={{listStyleType: 'none'}}
                        >
                          {'('+dummy.reference+')'}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <NewResearchDialog
        open={newResearchDialogOpen}
        onClose={() => setNewResearchDialogOpen(false)}
      />
      <UpdateResearchDialog
        {...openUpdateDialog.data}
        open={openUpdateDialog.state} 
        onClose={() => setOpenUpdateDialog({'state': false, 'data': {'id': "", 'title': "", 'description': "", 'reference': ""} as ResearchDataProp})}
      />
    </>
  )
}
