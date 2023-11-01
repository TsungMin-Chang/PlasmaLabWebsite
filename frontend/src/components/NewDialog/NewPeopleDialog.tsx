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
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import { CreatePersonDataProp } from "../../../../backend/api/generated/schemas";
import type { DegreeDataProp } from "../PeoplePage";;
import api from '../../../../backend/api/generated/ClientAPI';

type NewPeopleDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewPeopleDialog({ open, onClose }: NewPeopleDialogProps) {

  const numberToDegree: { [key: string]: string } = {'1': 'B.S.', '2': 'M.S.', '3': 'Ph.D.'};
  const steps = ['', '', '', '', ''];

  const [name, setName] = useState<string | null >(null);
  const [position, setPosition] = useState<number | null>(null);
  const [imageString, setImageString] = useState({imageName: "", image: ""});
  const [buffer, setBuffer] = useState<{[key: string]: DegreeDataProp}>({});

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
      // save data
      setImageString({imageName: fileName[1], image: base64String});
    };
    // Read the file as a data URL, which will be base64-encoded
    reader.readAsDataURL(file);
  }

  const handleNext = () => {

    if (activeStep === 0) {

      if (!name) {
        alert("Name cannot be blank!");
        return;
      }

      if (position === null) {
        alert("Position cannot be blank!");
        return;
      }

      if (!imageString.image || !imageString.imageName) {
        alert("Please upload an image!");
        return;
      }
      
    } else if (activeStep < steps.length - 1) {

      if (!buffer[activeStep] || !buffer[activeStep].school || !buffer[activeStep].department || !buffer[activeStep].yearStart || buffer[activeStep].yearStart === -1) {
        alert('Please fill out the form completely or press "SKIP" to skip!');
        return;
      }
      
      if (buffer[activeStep].yearEnd && buffer[activeStep].yearEnd !== -1 && buffer[activeStep].yearEnd < buffer[activeStep].yearStart) {
        alert("The year you finish should not be earlier than the year you start!");
        return;
      }
      
      setBuffer({...buffer, [activeStep]: { ...buffer[activeStep], degree: activeStep, yearEnd: buffer[activeStep].yearEnd ?? -1 }});

    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

  };

  const handleSave = async () => {
  
    console.log(name);
    console.log(position);
    console.log(imageString.imageName);
    console.log(buffer);
    
    // handleClose();

    try {
      // POST request sends imgage file name and image file
      const response = await axios.post('/image', imageString);
      try {
        // POST request sends people data to store in db
        await api.createPeopleData( {name, position, imgPath: response.data, bs: buffer.bs, ms: buffer.ms, phd: buffer.phd} as CreatePersonDataProp );
      } catch {
        alert("Error: Failed to create a new member!");
        return;
      }
    } catch {
      alert("Error: Failed to save uploaded image!");
      return;
    } finally {
      handleClose();
    }

  };

  const handleClose = () => {
    setName(null);
    setPosition(null);
    setImageString({imageName: "", image: ""});
    setBuffer({});
    setActiveStep(0);
    onClose();
  }

  const isStepOptional = (step: number) => {
    return step !== 0 && step !== steps.length - 1;
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
      <DialogTitle className="flex gap-4">
        <Box sx={{ width: '100%' }}>
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
        </Box>
      </DialogTitle>
      <DialogContent className="w-[600px]">
        {activeStep === 0 || activeStep === steps.length - 1? (
          <>
            {activeStep === 0 && (
              <>
                <Typography gutterBottom variant="h5" component="div">
                  Personal Information Page
                </Typography>
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
                      type="file"
                      required
                      name="file"
                      onChange={handleImage}
                    />
                  </Form.Group>
                </FormControl>
              </>
            )}
            {activeStep === steps.length - 1 && (
              <FormControl sx={{ m: 1, minWidth: 510 }}>
                <Alert severity="info">
                  <AlertTitle>Submission</AlertTitle>
                  Your information will be sent out — <strong>Are you sure?</strong>
                </Alert>
              </FormControl>
            )}
          </>
        ) : (
          <>
            <FormControl sx={{ m: 1, minWidth: 510 }}>
              <Typography gutterBottom variant="h5" component="div">
                {numberToDegree[activeStep] + " Degree Information Page (optional)"}
              </Typography>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  value={buffer[activeStep]?.school ?? ""}
                  onChange={(e) => setBuffer({...buffer, [activeStep]: { ...buffer[activeStep], school: e.target.value ?? "" }})}
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
                  value={buffer[activeStep]?.department ?? ""}
                  onChange={(e) => setBuffer({...buffer, [activeStep]: { ...buffer[activeStep], department: e.target.value ?? "" }})}
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
                      value={buffer[activeStep]?.yearStart ? (buffer[activeStep].yearStart === -1 ? null : dayjs((buffer[activeStep].yearStart).toString())) : null}
                      onChange={(e: any) => {
                        setBuffer({...buffer, [activeStep]: { ...buffer[activeStep], yearStart: !e ? -1 : e['$y']}});
                      }}
                      views={['year']}
                      label='Enter the year you start...'
                      openTo="year"
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
                      value={buffer[activeStep]?.yearEnd ? (buffer[activeStep].yearEnd === -1 ? null : dayjs((buffer[activeStep].yearEnd).toString())) : null}
                      onChange={(e: any) => {
                        setBuffer({...buffer, [activeStep]: { ...buffer[activeStep], yearEnd: !e ? -1 : e['$y'] }})
                      }}
                      views={['year']}
                      label='Enter the year you finish... (leave blank if studying)'
                      openTo="year"
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
            onClick={handleClose}
            sx={{ mr: 1 }}
          >
            Close
          </Button>
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
          {activeStep < steps.length - 1 && (
            <Button onClick={handleNext}>
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button onClick={handleSave}>
              Submit
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}