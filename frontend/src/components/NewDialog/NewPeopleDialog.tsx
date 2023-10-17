import { useState } from "react";
import axios from 'axios';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { StudentInfoProps, CreatePersonDataProp } from "../../../../backend/api/generated/schemas";
import api from '../../../../backend/api/generated/ClientAPI';

type NewPeopleDialogProps = {
    open: boolean;
    onClose: () => void;
};

export default function NewPeopleDialog({ open, onClose }: NewPeopleDialogProps) {

  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<number | null>(null);
  const [imageString, setImageString] = useState({imageName: "", image: ""});
  const [studentInfo, setStudentInfo] = useState<StudentInfoProps>({});

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    // get file name
    const fileName = e.currentTarget.value.match(/^.*\\(.*?)\..*?$/);
    if (!fileName) return;
    
    // get file in base64 String
    const fakeFile = e.currentTarget.files;
    if (!fakeFile) return;
    const file = fakeFile[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      // save my image data
      setImageString({imageName: fileName[1], image: base64String});
    };
    // Read the file as a data URL, which will be base64-encoded
    reader.readAsDataURL(file);
  }

  const handleSave = async () => {
    
    if (!name) {
      alert("Name cannot be blank!");
      return;
    }
    if (!position) {
      alert("Position cannot be blank!");
      return;
    }
    if (!imageString.image || !imageString.imageName) {
      alert("Please upload an image!");
      return;
    }

    const updateBSStudentInfo = {} as StudentInfoProps;
    if (studentInfo.bsSchool && studentInfo.bsDepartment && studentInfo.bsYearStart) {
      updateBSStudentInfo['bsSchool'] = studentInfo.bsSchool;
      updateBSStudentInfo['bsDepartment'] = studentInfo.bsDepartment;
      updateBSStudentInfo['bsYearStart'] = studentInfo.bsYearStart;
      updateBSStudentInfo['bsDegree'] = 1;
      if (!studentInfo.bsYearEnd) {
        updateBSStudentInfo['bsYearEnd'] = -1;
      } else {
        updateBSStudentInfo['bsYearEnd'] = studentInfo.bsYearEnd;
      }
    }

    const updateMSStudentInfo = {} as StudentInfoProps;
    if (studentInfo.msSchool && studentInfo.msDepartment && studentInfo.msYearStart) {
      updateMSStudentInfo['msSchool'] = studentInfo.msSchool;
      updateMSStudentInfo['msDepartment'] = studentInfo.msDepartment;
      updateMSStudentInfo['msYearStart'] = studentInfo.msYearStart;
      updateMSStudentInfo['msDegree'] = 2;
      if (!studentInfo.msYearEnd) {
        updateMSStudentInfo['msYearEnd'] = -1;
      } else {
        updateMSStudentInfo['msYearEnd'] = studentInfo.msYearEnd;
      }
    }

    const updatePHDStudentInfo = {} as StudentInfoProps;
    if (studentInfo.phdSchool && studentInfo.phdDepartment && studentInfo.phdYearStart) {
      updatePHDStudentInfo['phdSchool'] = studentInfo.phdSchool;
      updatePHDStudentInfo['phdDepartment'] = studentInfo.phdDepartment;
      updatePHDStudentInfo['phdYearStart'] = studentInfo.phdYearStart;
      updatePHDStudentInfo['phdDegree'] = 3;
      if (!studentInfo.phdYearEnd) {
        updatePHDStudentInfo['phdYearEnd'] = -1;
      } else {
        updatePHDStudentInfo['phdYearEnd'] = studentInfo.phdYearEnd;
      }
    }

    // console.log(name);
    // console.log(position);
    // console.log(imageString.imageName);
    // console.log(updateBSStudentInfo);
    // console.log(updateMSStudentInfo); 
    // console.log(updatePHDStudentInfo); 

    try {
      // POST request sends file name and file
      axios.post('/image', imageString);
    } catch {
      alert("Error: Failed to save uploaded image!");
      handleClose();
      return;
    }

    try {
      api.createPeopleData( {name, position, imgPath: imageString.imageName, bs: updateBSStudentInfo, ms: updateMSStudentInfo, phd: updatePHDStudentInfo} as CreatePersonDataProp );
    } catch {
      alert("Error: Failed to create a new member!");
    } finally {
      handleClose();
    }
  };

  const handleClose = () => {
    setName("");
    setImageString({imageName: "", image: ""});
    setPosition(null);
    setStudentInfo({});
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="flex gap-4">
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          Please only fill out the degrees you had <strong>finished</strong> or are <strong>currently studying!</strong>
        </Alert>
      </DialogTitle>
      <DialogContent className="w-[600px]">
        <Tabs
          defaultActiveKey="personal"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="personal" title="Personal Info">
            <FormControl sx={{ m: 1, minWidth: 320 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  className="grow"
                  placeholder="Enter Passport English Name..."
                />
              </ClickAwayListener>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="lab-position">Lab Position</InputLabel>
              <Select
                labelId="lab-position"
                label="position"
                value={position}
                onChange={(e) => setPosition(typeof e.target.value === 'string' ? null : e.target.value)}
              >
                <MenuItem value={4}>Professor</MenuItem>
                <MenuItem value={3}>Ph.D. Student</MenuItem>
                <MenuItem value={2}>M.S. Student</MenuItem>
                <MenuItem value={1}>B.S. Student</MenuItem>
                <MenuItem value={0}>Alumni</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 510 }}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload a profile picture</Form.Label>
                <Form.Control
                  type="file"
                  required
                  name="file"
                  onChange={handleImage}
                />
              </Form.Group>
            </FormControl>
          </Tab>
          <Tab eventKey="bs" title="B.S. Degree">
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  onChange={(e) => setStudentInfo({...studentInfo, bsSchool: e.target.value})}
                  className="grow"
                  placeholder="Enter School Name..."
                />
              </ClickAwayListener>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  onChange={(e) => setStudentInfo({...studentInfo, bsDepartment: e.target.value})}
                  className="grow"
                  placeholder="Enter Department Name..."
                />
              </ClickAwayListener> 
            </FormControl>

            <FormControl sx={{ m: 1 }}> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <FormControl sx={{ minWidth: 450 }}>
                    <DatePicker
                      views={['year']}
                      label='Enter the year you start...'
                      openTo="year" 
                      onChange={(e: any) => setStudentInfo({...studentInfo, bsYearStart: !e ? null : e['$y']})}
                    />
                  </FormControl>
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ m: 1 }}> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <FormControl sx={{ minWidth: 450 }}>
                    <DatePicker
                      views={['year']}
                      label='Enter the year you finish... (leave blank if studying)'
                      openTo="year" 
                      onChange={(e: any) => setStudentInfo({...studentInfo, bsYearEnd: !e ? null : e['$y']})}
                    />
                  </FormControl>
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
          </Tab>
          <Tab eventKey="ms" title="M.S. Degree">
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  onChange={(e) => setStudentInfo({...studentInfo, msSchool: e.target.value})}
                  className="grow"
                  placeholder="Enter School Name..."
                />
              </ClickAwayListener>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  onChange={(e) => setStudentInfo({...studentInfo, msDepartment: e.target.value})}
                  className="grow"
                  placeholder="Enter Department Name..."
                />
              </ClickAwayListener> 
            </FormControl>
            <FormControl sx={{ m: 1 }}> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <FormControl sx={{ minWidth: 450 }}>
                    <DatePicker
                      views={['year']}
                      label='Enter the year you start...'
                      openTo="year" 
                      onChange={(e: any) => setStudentInfo({...studentInfo, msYearStart: !e ? null : e['$y']})}
                    />
                  </FormControl>
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ m: 1 }}> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <FormControl sx={{ minWidth: 450 }}>
                    <DatePicker
                      views={['year']}
                      label='Enter the year you finish... (leave blank if studying)'
                      openTo="year" 
                      onChange={(e: any) => setStudentInfo({...studentInfo, msYearEnd: !e ? null : e['$y']})}
                    />
                  </FormControl>
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
          </Tab>
          <Tab eventKey="phd" title="Ph.D. Degree">
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  onChange={(e) => setStudentInfo({...studentInfo, phdSchool: e.target.value})}
                  className="grow"
                  placeholder="Enter School Name..."
                />
              </ClickAwayListener>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  onChange={(e) => setStudentInfo({...studentInfo, phdDepartment: e.target.value})}
                  className="grow"
                  placeholder="Enter Department Name..."
                />
              </ClickAwayListener> 
            </FormControl>
            <FormControl sx={{ m: 1 }}> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <FormControl sx={{ minWidth: 450 }}>
                    <DatePicker
                      views={['year']}
                      label='Enter the year you start...'
                      openTo="year" 
                      onChange={(e: any) => setStudentInfo({...studentInfo, phdYearStart: !e ? null : e['$y']})}
                    />
                  </FormControl>
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ m: 1 }}> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <FormControl sx={{ minWidth: 450 }}>
                    <DatePicker
                      views={['year']}
                      label='Enter the year you finish... (leave blank if studying)'
                      openTo="year" 
                      onChange={(e: any) => setStudentInfo({...studentInfo, phdYearEnd: !e ? null : e['$y']})}
                    />
                  </FormControl>
                </DemoContainer>
              </LocalizationProvider>
            </FormControl> 
          </Tab>
        </Tabs>
        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
