import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { DegreeDataProp, PersonDataProp } from "../../../backend/api/generated/schemas";
import UpdatePeopleDialog from "@/components/UpdateDialog/UpdatePeopleDialog";
import "../index.css";

import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";

import api from '../../../backend/api/generated/ClientAPI';

type dataProp = {
    data: PersonDataProp[];
    onRender: () => void;
    edit: boolean
};

export default function PersonCard({ data, onRender, edit }: dataProp) {

  const [openUpdateDialog, setOpenUpdateDialog] = useState({'state': false, 'data': {'degree': {} as { [key: string]: DegreeDataProp }, 'id': "", 'name': "", 'position': -1}});
  const [searchParams] = useSearchParams();
  const visit = searchParams.get('visitor') || '';
   
  const numberToDegree: { [key: string]: string } = {'1': 'B.S.', '2': 'M.S.', '3': 'Ph.D.'};
  const nameLabel: { [key: string]: PersonDataProp[] } = {};
  data.map((ele) => {nameLabel.hasOwnProperty(ele.name) ? nameLabel[ele.name].push({...ele}) : nameLabel[ele.name] = [{...ele}]});
  Object.keys(nameLabel).forEach((key) => {nameLabel[key].sort((a, b) => b.degree - a.degree)});

  const handleDelete = async (e: React.MouseEvent) => {
    await api.deletePeopleData({id: e.currentTarget.id});
    onRender();
  }

  return (
    <>
      {Object.keys(nameLabel).map((key) => (   
        <div className="row" key={key}>
          <div className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
            <img src={nameLabel[key][0].imgPath} className="crop rounded-circle" alt="..."/>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-8 ptext my-auto">
            <div key={key}>
              {(edit || !!visit) && (
                <>
                  <div style={{float: 'right', position: 'initial', right: '0px', top: '0px'}}>
                    <IconButton 
                      color="error"
                      onClick={!visit ? handleDelete : () => {}}
                      id={nameLabel[key][0].id}
                      style={{zIndex: 3}}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <div style={{float: 'right', position: 'initial', right: '0px', top: '0px'}}>
                    <IconButton 
                      color="success" 
                      onClick={() => {
                        const degreeLabel: { [key: string]: DegreeDataProp } = {};
                        nameLabel[key].map((ele) => degreeLabel[ele.degree] = {degree: ele.degree, school: ele.school, department: ele.department, yearStart: ele.yearStart, yearEnd: ele.yearEnd});
                        setOpenUpdateDialog({'state': true, 'data': {'degree': degreeLabel, 'id': nameLabel[key][0].id, 'name': nameLabel[key][0].name, 'position': nameLabel[key][0].position} });
                      }}
                      style={{zIndex: 2}}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>
                </>
              )}
              <div className="pplname" style={{position: 'relative'}}>
                {nameLabel[key][0].name}
              </div>
              {nameLabel[key].map((ele, index) => (
                <li key={index}>
                  {numberToDegree[ele.degree]}, {ele.department}, {ele.school}, {ele.yearStart}-{ele.yearEnd === -1 ? null : ele.yearEnd}
                </li>
              ))}
            </div>
          </div>
        </div>
      ))}
      <UpdatePeopleDialog
        {...openUpdateDialog.data}
        open={openUpdateDialog.state} 
        onClose={() => setOpenUpdateDialog({state: false, data: {degree: {} as { [key: string]: DegreeDataProp }, id: "", name: "", position: -1} })}
        onRender={onRender}
      />
    </>
  )
}
