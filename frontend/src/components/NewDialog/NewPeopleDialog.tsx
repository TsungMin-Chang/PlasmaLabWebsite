import { useState } from "react";
import axios from 'axios';
import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Form from 'react-bootstrap/Form';
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
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { StudentInfoProps, CreatePersonDataProp } from "../../../../backend/api/generated/schemas";
import api from '../../../../backend/api/generated/ClientAPI';

type NewPeopleDialogProps = {
  open: boolean;
  onClose: () => void;
};

type DegreeDataProp = {
  school: string;
  department: string;
  yearStart: number;
  yearEnd: number | null;
};

const steps = ['', '', '', ''];

export default function NewPeopleDialog({ open, onClose }: NewPeopleDialogProps) {

  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<number | null>(null);
  const [imageString, setImageString] = useState({imageName: "", image: ""});
  const [bsStudentInfo, setbsStudentInfo] = useState<StudentInfoProps>({});
  const [msStudentInfo, setmsStudentInfo] = useState<StudentInfoProps>({});
  const [phdStudentInfo, setphdStudentInfo] = useState<StudentInfoProps>({});
  const [buffer, setBuffer] = useState<DegreeDataProp>({school: "", department: "", yearStart: -1, yearEnd: null});

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

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
  
    console.log(name);
    console.log(position);
    console.log(imageString.imageName);
    console.log(bsStudentInfo);
    console.log(msStudentInfo); 
    console.log(phdStudentInfo); 

    try {
      // POST request sends file name and file
      await axios.post('/image', imageString);
    } catch {
      alert("Error: Failed to save uploaded image!");
      handleClose();
      return;
    }

    try {
      await api.createPeopleData( {name, position, imgPath: imageString.imageName, bs: bsStudentInfo, ms: msStudentInfo, phd: phdStudentInfo} as CreatePersonDataProp );
    } catch {
      alert("Error: Failed to create a new member!");
    } finally {
      handleClose();
    }

  };

  const handleClose = () => {
    setName("");
    setPosition(null);
    setImageString({imageName: "", image: ""});
    setbsStudentInfo({});
    setmsStudentInfo({});
    setphdStudentInfo({});
    setBuffer({school: "", department: "", yearStart: -1, yearEnd: null});
    setActiveStep(0);
    onClose();
  }

  const handleNext = () => {

    if (activeStep === 0) {
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
    } else if (activeStep < steps.length) {
      
      if (!buffer.school || !buffer.department || !buffer.yearStart) {
        alert('Please fill out the form completely or press "SKIP" to skip!');
        return;
      }

      if (buffer.school && buffer.department && buffer.yearStart) {
        if (activeStep === 1) {
          setbsStudentInfo({
            bsDegree: 1, 
            bsSchool: buffer.school, 
            bsDepartment: buffer.department, 
            bsYearStart: buffer.yearStart,
            bsYearEnd: !buffer.yearEnd ? -1 : buffer.yearEnd 
          });
        } else if (activeStep === 2) {
          setmsStudentInfo({
            msDegree: 2,
            msSchool: buffer.school, 
            msDepartment: buffer.department, 
            msYearStart: buffer.yearStart,
            msYearEnd: !buffer.yearEnd ? -1 : buffer.yearEnd 
          });
        } else if (activeStep === 3) {
          setphdStudentInfo({
            phdDegree: 3,
            phdSchool: buffer.school, 
            phdDepartment: buffer.department, 
            phdYearStart: buffer.yearStart,
            phdYearEnd: !buffer.yearEnd ? -1 : buffer.yearEnd 
          });
        }
        setBuffer({school: "", department: "", yearStart: -1, yearEnd: null});
      }

    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === steps.length - 1) handleSave();

  };

  const isStepOptional = (step: number) => {
    return step !== 0;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ width: '100%' }}>
      <DialogTitle className="flex gap-4">
        <Stepper activeStep={activeStep} style={{color: 'rgb(46, 39, 31)', backgroundColor: 'rgb(230, 230, 230)'}}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps} style={{fontSize: 30}}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </DialogTitle>
      </Box>
      <DialogContent className="w-[600px]">
        { activeStep === steps.length ? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Great - you are all set!
          </Alert>
        ) : (
          <>
            { activeStep === 0 ? (
              <>
                <FormControl sx={{ m: 1, minWidth: 510 }}>
                  <ClickAwayListener
                    onClickAway={() => {}}
                  >
                    <Input
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="grow"
                      placeholder="Enter Passport English Name..."
                    />
                  </ClickAwayListener>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 510 }}>
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
                      style={{ display: imageString.imageName }}
                      type="file"
                      required
                      name="file"
                      onChange={handleImage}
                    />
                  </Form.Group>
                </FormControl>
              </>
            ) : (
              <>
                <FormControl sx={{ m: 1, minWidth: 510 }}>
                  <ClickAwayListener
                    onClickAway={() => {}}
                  >
                    <Input
                      autoFocus
                      value={buffer.school}
                      onChange={(e) => setBuffer({...buffer, school: e.target.value})}
                      className="grow"
                      placeholder="Enter School Name..."
                    />
                  </ClickAwayListener>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 510 }}>
                  <ClickAwayListener
                    onClickAway={() => {}}
                  >
                    <Input
                      value={buffer.department}
                      autoFocus
                      onChange={(e) => {setBuffer({...buffer, department: e.target.value})}}
                      className="grow"
                      placeholder="Enter Department Name..."
                    />
                  </ClickAwayListener> 
                </FormControl>
                <FormControl sx={{ m: 1 }}> 
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <FormControl sx={{ minWidth: 510 }}>
                        <DatePicker
                          views={['year']}
                          label='Enter the year you start...'
                          openTo="year" 
                          onChange={(e: any) => setBuffer({...buffer, yearStart: !e ? null : e['$y']})}
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
                          views={['year']}
                          label='Enter the year you finish... (leave blank if studying)'
                          openTo="year" 
                          onChange={(e: any) => setBuffer({...buffer, yearEnd: !e ? null : e['$y']})}
                        />
                      </FormControl>
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
              </>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}