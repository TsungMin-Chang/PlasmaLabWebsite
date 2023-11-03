import { useEffect, useState } from "react";

import "../index.css";
import ProfessorCard from '@/components/ProfessorCard';
import PhDStudentCard from '@/components/PhDStudentCard';
import MSStudentCard from '@/components/MSStudentCard';
import BSStudentCard from '@/components/BSStudentCard';
import AlumniCard from '@/components/AlumniCard';
import NewPeopleDialog from '@/components/NewDialog/NewPeopleDialog'; 

import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { PersonDataProp } from "../../../backend/api/generated/schemas";
import api from '../../../backend/api/generated/ClientAPI';

export default function PeoplePage() {
    const dummys: PersonDataProp[] = [
        {
            'id': '1',
            'position': 4,
            'imgPath': '/people_images/checheteacher.jpeg',
            'name': 'Cheng-Che (Jerry), Hsu',
            'degree': 3,
            'department': 'Chemical Engineering',
            'school': 'UC Berkeley', 
            'yearStart': 2002,
            'yearEnd': 2006
        },
        {
            'id': '1',
            'position': 4,
            'imgPath': '/people_images/checheteacher.jpeg',
            'name': 'Cheng-Che (Jerry), Hsu',
            'degree': 2,
            'department': 'Chemical Engineering',
            'school': 'National Taiwan University', 
            'yearStart': 1996,
            'yearEnd': 1998
        },
        {
            'id': '1',
            'position': 4,
            'imgPath': '/people_images/checheteacher.jpeg',
            'name': 'Cheng-Che (Jerry), Hsu',
            'degree': 1,
            'department': 'Chemical Engineering',
            'school': 'National Taiwan University', 
            'yearStart': 1992,
            'yearEnd': 1996
        },
        {
            'id': '2',
            'position': 1,
            'imgPath': '/people_images/sandra2.jpg',
            'name': 'Tsung-Min (Sandra), Chang',
            'degree': 1,
            'department': 'Chemical Engineering',
            'school': 'National Taiwan University', 
            'yearStart': 2020,
            'yearEnd': -1
        },
        {
            'id': '3',
            'position': 3,
            'imgPath': '/people_images/Min-Hsu2.jpg',
            'name': 'Min-Hsu (Kevin), Tai',
            'degree': 1,
            'department': 'Chemical Engineering',
            'school': 'National Cheng Kung University', 
            'yearStart': 2015,
            'yearEnd': 2019
        },
        {
            'id': '3',
            'position': 3,
            'imgPath': '/people_images/Min-Hsu2.jpg',
            'name': 'Min-Hsu (Kevin), Tai',
            'degree': 3,
            'department': 'Chemical Engineering',
            'school': 'National Taiwan University', 
            'yearStart': 2019,
            'yearEnd': -1
        },
        {
            'id': '4',
            'position': 2,
            'imgPath': '/people_images/Chen,Jian-Ti.jpg',
            'name': 'Jian-Ti, Chen',
            'degree': 2,
            'department': 'Chemical Engineering',
            'school': 'National Taiwan University', 
            'yearStart': 2022,
            'yearEnd': -1
        },
        {
            'id': '4',
            'position': 2,
            'imgPath': '/people_images/Chen,Jian-Ti.jpg',
            'name': 'Jian-Ti, Chen',
            'degree': 1,
            'department': 'Chemical Engineering',
            'school': 'National Cheng Kung University', 
            'yearStart': 2018,
            'yearEnd': 2022
        },
        {
            'id': '5',
            'position': 2,
            'imgPath': '/people_images/Po-Chien,Chang.jpg',
            'name': 'Po-Chien, Chang',
            'degree': 2,
            'department': 'Chemical Engineering',
            'school': 'National Taiwan University', 
            'yearStart': 2022,
            'yearEnd': -1
        },
        {
            'id': '5',
            'position': 2,
            'imgPath': '/people_images/Po-Chien,Chang.jpg',
            'name': 'Po-Chien, Chang',
            'degree': 1,
            'department': 'Double Major in Environmental and Chemical Engineering',
            'school': 'National Cheng Kung University', 
            'yearStart': 2016,
            'yearEnd': 2021
        },
        {
            'id': '6',
            'position': 0,
            'imgPath': '/people_images/Tsung-ShunKo.jpg',
            'name': 'Tsung-Shun, Ko',
            'degree': 2,
            'department': 'Chemical Engineering',
            'school': 'National Taiwan University', 
            'yearStart': 2019,
            'yearEnd': 2021
        }
    ]

  const [newPeopleDialogOpen, setNewPeopleDialogOpen] = useState(false);

  const positionLabel: { [key: string]: PersonDataProp[] } = {'4':[], '3':[], '2':[], '1':[], '0':[]};
  dummys.map((dummy) => {positionLabel[dummy.position.toString()].push(dummy)});

  return (
    <>
      <main>
        <nav id="navbar-example2 " className="navbar bg-light px-3 mb-3">
          <p className="navbar-brand">
            <strong>PEOPLE</strong>
            <IconButton 
              color="success" 
              onClick={() => {setNewPeopleDialogOpen(true)}} 
            >
              <AddCircleIcon />
            </IconButton>
          </p>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a className="nav-link mynav2" href="#scrollspyHeading1">Professor</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mynav2" href="#scrollspyHeading2">Ph.D. Student</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mynav2" href="#scrollspyHeading3">M.S. Student</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mynav2" href="#scrollspyHeading4">B.S. Student</a>
            </li>
            <li className="nav-item">
              <a className="nav-link mynav2" href="#scrollspyHeading5">Alumni</a>
            </li>
          </ul>
        </nav>
        <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-light p-3 rounded-2">
          <h4 id="scrollspyHeading1" className="mynav2">Professor</h4>
          <div className="container">
              <ProfessorCard data={positionLabel['4']}/>
          </div>
          <br/>
          <h4 id="scrollspyHeading2" className="mynav2">Ph.D. Student</h4>
          <div className="container">
              <PhDStudentCard data={positionLabel['3']}/> 
          </div>
          <br/>
          <h4 id="scrollspyHeading3" className="mynav2">M.S. Student</h4>
          <div className="container">
              <MSStudentCard data={positionLabel['2']}/>  
          </div>
          <br/>
          <h4 id="scrollspyHeading4" className="mynav2">B.S. Student</h4>
          <div className="container">
              <BSStudentCard data={positionLabel['1']}/>
          </div>
          <br/>
          <h4 id="scrollspyHeading5" className="mynav2">Alumni</h4>
          <div className="container">
              <AlumniCard data={positionLabel['0']}/>
          </div>
        </div>
      </main>
      <NewPeopleDialog
        open={newPeopleDialogOpen}
        onClose={() => setNewPeopleDialogOpen(false)}
      />
    </>
  )
}