import React from "react";
import "../index.css";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from "@mui/icons-material/Delete";

export type EventDataProp = {
  id: string;
  year: number;
	imgPath: string;
};

function EventPage() {
    const dummys: EventDataProp[] = [
        {
            'id': '1',
            'year': 2022,
            'imgPath': '/events_images/2022school_of_engineering_award.jpg',
        },
        {
            'id': '2',
            'year': 2022,
            'imgPath': '/events_images/2022groupdinner.jpg',
        },
        {
            'id': '3',
            'year': 2020,
            'imgPath': '/events_images/2020group1.jpg',
        },
        {
            'id': '4',
            'year': 2020,
            'imgPath': '/events_images/2020group2.jpg',
        },
        {
            'id': '5',
            'year': 2019,
            'imgPath': '/events_images/2019group.jpg',
        }
    ]

  const yearLabel: { [key: string]: EventDataProp[] } = {};
  dummys.map((ele) => yearLabel.hasOwnProperty(ele.year) ? yearLabel[ele.year].push({...ele}) : yearLabel[ele.year]=[{...ele}]);
  // Get the keys and sort them
  const sortedKeys = Object.keys(yearLabel).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <>
      <nav id="navbar-example2 " className="navbar bg-light px-3 mb-3">
        <p className="navbar-brand">
          <strong>EVENT</strong>
          <IconButton 
            color="success" 
            onClick={() => {}} 
          >
            <AddCircleIcon />
          </IconButton>
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
                    <IconButton 
                      color="error"
                      onClick={() => {}}
                      style={{zIndex: 3}}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <img src={ele.imgPath} className="figure-img img-fluid rounded" alt="..." style={{position: 'relative'}} />
                </figure>
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  )
}
export default React.memo(EventPage);
