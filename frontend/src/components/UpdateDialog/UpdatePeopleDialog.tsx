import { useState } from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { StudentInfoProps, UpdatePersonDataProp } from "../../../../backend/api/generated/schemas";
import api from '../../../../backend/api/generated/ClientAPI';
import type { PersonDataProp, DegreeDataProp } from "../PeoplePage";;

type UpdatePeopleDialogProps = {
  id: string;
  name: string;
  position: number;
  data: {[key: string]: DegreeDataProp};
  open: boolean;
  onClose: () => void;
};

export default function UpdatePeopleDialog(props: UpdatePeopleDialogProps) {
  
  const { id, name, position, data, open, onClose } = props;
  const numberToDegree: { [key: string]: string } = {'1': 'B.S.', '2': 'M.S.', '3': 'Ph.D.'};

  const [newName, setNewName] = useState(name);
  const [newPosition, setNewPosition] = useState(position);
  const [newDegree, setNewDegree] = useState<{ [key: string]: DegreeDataProp }>(data);
  const sortedKeys = Object.keys(data).sort((a, b) => parseInt(a) - parseInt(b));

  const [edittingName, setEdittingName] = useState(false);
  const [edittingSchool, setEdittingSchool] = useState(false);
  const [edittingDepartment, setEdittingDepartment] = useState(false);

  const handleSave = async () => {
    
    if (!newName) {
      alert("Name cannot be blank!");
      return;
    }
    if (!newPosition) {
      alert("Position cannot be blank!");
      return;
    }

    const bsUpdateInfo = {} as StudentInfoProps;
    if (newDegree['1'].school && newDegree['1'].department && newDegree['1'].yearStart && newDegree['1'].yearEnd) {
      bsUpdateInfo.bsDegree = 1;
      bsUpdateInfo.bsSchool = newDegree['1'].school;
      bsUpdateInfo.bsDepartment = newDegree['1'].department;
      bsUpdateInfo.bsYearStart = newDegree['1'].yearStart;
      bsUpdateInfo.bsYearEnd = newDegree['1'].yearEnd;
    }

    const msUpdateInfo = {} as StudentInfoProps;
    if (newDegree['2'].school && newDegree['2'].department && newDegree['2'].yearStart && newDegree['2'].yearEnd) {
      msUpdateInfo.msDegree = 2;
      msUpdateInfo.msSchool = newDegree['2'].school;
      msUpdateInfo.msDepartment = newDegree['2'].department;
      msUpdateInfo.msYearStart = newDegree['2'].yearStart;
      msUpdateInfo.msYearEnd = newDegree['2'].yearEnd;
    }

    const phdUpdateInfo = {} as StudentInfoProps;
    if (newDegree['3'].school && newDegree['3'].department && newDegree['3'].yearStart && newDegree['3'].yearEnd) {
      phdUpdateInfo.phdDegree = 3;
      phdUpdateInfo.phdSchool = newDegree['3'].school;
      phdUpdateInfo.phdDepartment = newDegree['3'].department;
      phdUpdateInfo.phdYearStart = newDegree['3'].yearStart;
      phdUpdateInfo.phdYearEnd = newDegree['3'].yearEnd;
    }

    console.log(newName);
    console.log(newPosition);
    console.log(bsUpdateInfo);
    console.log(msUpdateInfo); 
    console.log(phdUpdateInfo); 

    // try {
    //   await api.updatePeopleData( {id, name, position, bs: bsUpdateInfo, ms: msUpdateInfo, phd: phdUpdateInfo} as UpdatePersonDataProp );
    // } catch {
    //   alert("Error: Failed to create a new member!");
    // } finally {
    //   handleClose();
    // }
  };

  const handleClose = () => {
    // useEffect ??
    // setName("");
    // setPosition(null);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="w-[600px]">
        <Tabs
          defaultActiveKey="personal"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="personal" title="Edit Personal Info">
            <FormControl sx={{ m: 1, minWidth: 300 }}>
            {edittingName ? (
              <ClickAwayListener
                onClickAway={() => { setEdittingName(false) }}
              >
                <Input
                  autoFocus
                  defaultValue={name}
                  onChange={(e) => setNewName(e.target.value)}
                  className="grow"
                  placeholder="Enter Passport English Name..."
                />
              </ClickAwayListener>
            ) : (
              <button
                onClick={() => setEdittingName(true)}
                className="w-full rounded-md p-2 hover:bg-white/10"
                style={{background: 'transparent', borderRightColor: 'transparent'}}
              >
                <Typography className="text-start">{name}</Typography>
              </button>
            )}
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 220 }}>
              <InputLabel id="lab-position">Lab Position</InputLabel>
              <Select
                labelId="lab-position"
                label="position"
                defaultValue={position}
                onChange={(e: any) => setNewPosition(e.target.value)}
              >
                <MenuItem value={4}>Professor</MenuItem>
                <MenuItem value={3}>Ph.D. Student</MenuItem>
                <MenuItem value={2}>M.S. Student</MenuItem>
                <MenuItem value={1}>B.S. Student</MenuItem>
                <MenuItem value={0}>Alumni</MenuItem>
              </Select>
            </FormControl>
          </Tab>
          {sortedKeys.map((key) => (
          <Tab eventKey={"degree"+key} title={"Edit " + numberToDegree[key] + " Degree"} key={key}>
            <FormControl sx={{ m: 1, minWidth: 510 }}>
            {edittingSchool ? (
              <ClickAwayListener
                onClickAway={() => { setEdittingSchool(false) }}
              >
                <Input
                  autoFocus
                  defaultValue={data[key].school}
                  onChange={(e) => setNewDegree({...newDegree, [key]: { ...newDegree[key], school: e.target.value }})}
                  className="grow"
                  placeholder="Enter School Name..."
                />
              </ClickAwayListener>
            ) : (
              <button
                onClick={() => setEdittingSchool(true)}
                className="w-full rounded-md p-2 hover:bg-white/10"
                style={{background: 'transparent', borderRightColor: 'transparent'}}
              >
                <Typography className="text-start">{data[key].school}</Typography>
              </button>
            )}
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 510 }}>
            {edittingDepartment ? (
              <ClickAwayListener
                onClickAway={() => { setEdittingDepartment(false) }}
              >
                <Input
                  autoFocus
                  defaultValue={data[key].department}
                  onChange={(e) => setNewDegree({...newDegree, [key]: { ...newDegree[key], department: e.target.value }})}
                  className="grow"
                  placeholder="Enter Department Name..."
                />
              </ClickAwayListener>
            ) : (
              <button
                onClick={() => setEdittingDepartment(true)}
                className="w-full rounded-md p-2 hover:bg-white/10"
                style={{background: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', borderTopColor: 'transparent'}}
              >
                <Typography className="text-start">{data[key].department}</Typography>
              </button>
            )}
            </FormControl>
            <FormControl sx={{ m: 1 }}> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <FormControl sx={{ minWidth: 510 }}>
                    <DatePicker
                      defaultValue={dayjs((data[key].yearStart).toString())}
                      views={['year']}
                      label='Enter the year you start...'
                      openTo="year"
                      onChange={(e: any) => setNewDegree({...newDegree, [key]: { ...newDegree[key], yearStart: !e ? data[key].yearStart : e['$y'] }})}
                    />
                  </FormControl>
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ m: 1 }}> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <FormControl sx={{ minWidth: 510 }}>
                    <DatePicker
                      defaultValue={dayjs(data[key].yearEnd === -1 ? null : (data[key].yearEnd).toString())}
                      views={['year']}
                      label='Enter the year you finish... (leave blank if studying)'
                      openTo="year" 
                      onChange={(e: any) => setNewDegree({...newDegree, [key]: { ...newDegree[key], yearEnd: !e ? null : e['$y'] }})}
                    />
                  </FormControl>
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
          </Tab>
          ))}
          </Tabs>
        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}