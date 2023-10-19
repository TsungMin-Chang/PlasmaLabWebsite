import { useState } from "react";

import "../index.css";
import NewPublicationDialog from '@/components/NewDialog/NewPublicationDialog'; 
import UpdatePublicationDialog from '@/components/UpdateDialog/UpdatePublicationDialog'; 

import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

export type PublicationDataProp = {
  id: string;
	year: number;
	detail: string;
};

export default function PublicationPage() {
    const dummys: PublicationDataProp[] = [
        {
            'id': '1',
            'year': 2022,
            'detail': 'Lin, K.-Y., Liang, C.-S., Hsu, C.-C., Lin, S.-L., Chen, Y.-T., Huang, F.-S., Wang, S.-L., Jang, J.-S., and Lu, Y.-W., “Optoelectronic online monitoring system for hemodialysis and its data analysis.” Sensors and Actuators B: Chemical 2022, 364, 131859.'
        },
        {
            'id': '2',
            'year': 2022,
            'detail': 'Lai, J.-Y., Hsu, C.-C., and Chen, J.-Z., “Comparison between atmospheric-pressure-plasma-jet-processed and furnace-calcined rGO-MnOx nanocomposite electrodes for gel-electrolyte supercapacitors.” Journal of Alloys and Compounds 2022, 165006.'
        },
        {
            'id': '3',
            'year': 2021,
            'detail': 'Wang, C.-Y., Ko, T.-S., and Hsu, C.-C., “Machine Learning with Explainable Artificial Intelligence Vision for Characterization of Solution Conductivity Using Optical Emission Spectroscopy of Plasma in Aqueous Solution.” Plasma Processes and Polymers 2021, e2100096.'
        },
        {
            'id': '4',
            'year': 2021,
            'detail': 'Wang, C.-Y., Ko, T.-S., and Hsu, C.-C., “Interpreting convolutional neural network for real-time volatile organic compounds detection and classification using optical emission spectroscopy of plasma.” Analytica Chimica Acta 2021, 1179, 338822.'
        },
        {
            'id': '5',
            'year': 2020,
            'detail': 'Tsai, J.-H., Cheng, I. C., Hsu, C.-C., and Chen, J.-Z., “Low-Temperature (<40 °C) Atmospheric-Pressure Dielectric-Barrier-Discharge-Jet Treatment on Nickel Oxide for p–i–n Structure Perovskite Solar Cells.” ACS Omega 2020, 5 (11), 6082-6089.'
        }
    ]

  const yearLabel: { [key: string]: PublicationDataProp[] } = {};
  dummys.map((ele) => yearLabel.hasOwnProperty(ele.year) ? yearLabel[ele.year].push({...ele}) : yearLabel[ele.year]=[{...ele}]);
  // Get the keys and sort them
  const sortedKeys = Object.keys(yearLabel).sort((a, b) => parseInt(b) - parseInt(a));
  
  const [newPublicationDialogOpen, setNewPublicationDialogOpen] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState({'state': false, 'data': {'id': "", year: -1, detail: ""} as PublicationDataProp});

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
                        onClick={() => {}}
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
      />
      <UpdatePublicationDialog
        {...openUpdateDialog.data}
        open={openUpdateDialog.state} 
        onClose={() => setOpenUpdateDialog({'state': false, 'data': {'id': "", year: -1, detail: ""} as PublicationDataProp})}
      />
    </>
  )
}