import { useEffect, useState } from "react";

import "../index.css";
import NewResearchDialog from '@/components/NewDialog/NewResearchDialog'; 
import UpdateResearchDialog from '@/components/UpdateDialog/UpdateResearchDialog'; 

import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export type ResearchDataProp = {
  id: string;
	title: string;
	imgPath: string;
	description: string;
	reference: string;
};

export default function ResearchPage() {
    const dummys: ResearchDataProp[] = [
        {
            'id': '1',
            'title': 'Analysis of Metallic Elements',
            'imgPath': '/research_images/liquid.png',
            'description': 'Development of plasma in solution for various applications. One promising example is metallic element analysis using plasma optical emission spectroscopy.',
            'reference': 'Reference: C.-Y. Wang and C.-C. Hsu, Environmental Science & Technology 53 (18), 10888-10896 (2019).'
        },
        {
            'id': '2',
            'title': 'Machine Learning',
            'imgPath': '/research_images/machinelearning.png',
            'description': 'Machine learning using plasma spectroscopy for analysis purposes. Following shows an example using CNN for discriminant of volatile organic compounds.',
            'reference': 'Reference: C.-Y. Wang, T.-S. Ko and C.-C. Hsu, Analytica Chimica Acta 1179, 338822 (2021).'
        },
        {
            'id': '3',
            'title': 'Portable Plasma System',
            'imgPath': '/research_images/portable.png',
            'description': 'Development of various portable and low cost plasma systems. Following shows a portable plasma power source that can be modulated using a mobile phone with a Bluetooth-module.',
            'reference': 'Reference: NTU ChE Plasma Engineering Lab.'
        },
        {
            'id': '4',
            'title': 'Materials Processing',
            'imgPath': '/research_images/materialprocessing.png',
            'description': 'Using various plasmas sources for materials processing. One novel example is using a microplasma generation device to fabricate microfluidic paper-based analytical devices.',
            'reference': 'Reference: P.-K. Kao and C.-C. Hsu, Anal. Chem. 86, 8757 (2014).'
        }
    ]
  
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
            <div className="card mb-3" id={"scrollspyHeading_"+dummy.id} style={{maxWidth: '1000px'}}>
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
                          onClick={() => {}} 
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