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

import { DegreeDataProp, UpdateDegreeDataProp, UpdatePersonDataProp } from "../../../../backend/api/generated/schemas";
import api from '../../../../backend/api/generated/ClientAPI';

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
  const [newDegree, setNewDegree] = useState<{ [key: string]: UpdateDegreeDataProp }>(data);
  const sortedKeys = Object.keys(data).sort((a, b) => parseInt(a) - parseInt(b));

  const [edittingName, setEdittingName] = useState(false);
  const [edittingSchool, setEdittingSchool] = useState(false);
  const [edittingDepartment, setEdittingDepartment] = useState(false);

  const handleSave = async () => {

    // if (buffer[activeStep].yearEnd && buffer[activeStep].yearEnd !== -1 && buffer[activeStep].yearEnd < buffer[activeStep].yearStart) {
    //   alert("The year you finish should not be earlier than the year you start!");
    //   return;
    // }
    
    // console.log(id);
    // console.log(!newName ? name : newName);
    // console.log(newPosition === -1 ? position : newPosition);
    // console.log(newDegree);

    try {
      await api.updatePeopleData( {id, name: newName, position: newPosition, bs: newDegree[1], ms: newDegree[2], phd: newDegree[3]} as UpdatePersonDataProp );
    } catch {
      alert("Error: Failed to update an old member!");
    } finally {
      handleClose();
    }

  };

  const handleClose = () => {
    setNewName(name);
    setNewPosition(position);
    setNewDegree(data);
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
                  value={!newName ? name : newName}
                  onChange={(e) => setNewName(e.target.value ?? name)}
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
                <Typography className="text-start">{!newName ? name : newName}</Typography>
              </button>
            )}
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 220 }}>
              <InputLabel id="lab-position">Lab Position</InputLabel>
              <Select
                labelId="lab-position"
                label="position"
                value={newPosition === -1 ? position : newPosition}
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
                  value={!newDegree[key]?.school ? data[key].school : newDegree[key].school}
                  onChange={(e) => setNewDegree({...newDegree, [key]: { ...newDegree[key], school: e.target.value ?? data[key].school }})}
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
                <Typography className="text-start">{!newDegree[key]?.school ? data[key].school : newDegree[key].school}</Typography>
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
                  value={!newDegree[key]?.department ? data[key].department : newDegree[key].department}
                  onChange={(e) => setNewDegree({...newDegree, [key]: { ...newDegree[key], department: e.target.value ?? data[key].department }})}
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
                <Typography className="text-start">{!newDegree[key]?.department ? data[key].department : newDegree[key].department}</Typography>
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
                      defaultValue={data[key].yearEnd === -1 ? null : dayjs((data[key].yearEnd).toString())}
                      views={['year']}
                      label='Enter the year you finish... (leave blank if studying)'
                      openTo="year" 
                      onChange={(e: any) => setNewDegree({...newDegree, [key]: { ...newDegree[key], yearEnd: !e ? data[key].yearEnd : e['$y'] }})}
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