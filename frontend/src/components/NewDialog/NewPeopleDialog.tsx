import { useState } from "react";

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

import useCards from "@/hooks/useCards";
import { createCard } from "@/utils/client";

type NewPeopleDialogProps = {
    open: boolean;
    onClose: () => void;
};

export default function NewPeopleDialog({ open, onClose }: NewPeopleDialogProps) {

  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<null | number>(null);

  const [bsDegree, setBSDegree] = useState<null | number>(null);
  const [bsSchool, setBSSchool] = useState<string>("");
  const [bsDepartment, setBSDepartment] = useState<string>("");
  const [bsYearStart, setBSYearStart] = useState<null | number>(null);
  const [bsYearEnd, setBSYearEnd] = useState<null | number>(null);

  const [msDegree, setMSDegree] = useState<null | number>(null);
  const [msSchool, setMSSchool] = useState<string>("");
  const [msDepartment, setMSDepartment] = useState<string>("");
  const [msYearStart, setMSYearStart] = useState<null | number>(null);
  const [msYearEnd, setMSYearEnd] = useState<null | number>(null);

  const [phdDegree, setPhDDegree] = useState<null | number>(null);
  const [phdSchool, setPhDSchool] = useState<string>("");
  const [phdDepartment, setPhDDepartment] = useState<string>("");
  const [phdYearStart, setPhDYearStart] = useState<null | number>(null);
  const [phdYearEnd, setPhDYearEnd] = useState<null | number>(null);

  const handleSave = async () => {
    if (!name) {
      alert("Name cannot be blank!");
      return;
    }
    if (!position) {
      alert("Position cannot be blank!");
      return;
    }
    console.log(name);
    console.log(position);
    console.log(msSchool);
    console.log(msDepartment);
    console.log(msYearStart);
    console.log(msYearEnd);
    handleClose();
    // if () {
    //   alert("Link cannot be blank!");
    //   return;
    // }
    // try {
    //   const sendId = newListId === listId ? listId : listId + '_' + newListId;
    //   await createCard({
    //     title: title,
    //     singer: textfieldSinger.current!.value,
    //     link: textfieldLink.current!.value,
    //     list_id: sendId,
    //   });
    //   setTitle("");
    //   fetchCards();
    // } catch (error) {
    //   alert("Error: Failed to save card");
    // } finally {
    //   onClose();
    // }
  };

  const handleClose = () => {
    setName("");
    setPosition(null);
    setBSSchool("");
    setBSDepartment("");
    setBSYearStart(null);
    setBSYearEnd(null);
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
                <Form.Label>Upload an illustration of your research</Form.Label>
                <Form.Control type="file" />
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
                  defaultValue={bsSchool}
                  onChange={(e) => setBSSchool(e.target.value)}
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
                  defaultValue={bsDepartment}
                  onChange={(e) => setBSDepartment(e.target.value)}
                  className="grow"
                  placeholder="Enter Department Name..."
                />
              </ClickAwayListener> 
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  defaultValue={bsYearStart}
                  onChange={(e) => setBSYearStart(!parseInt(e.target.value) ? null : parseInt(e.target.value))}
                  className="grow"
                  placeholder="Enter the year you start..."
                />
              </ClickAwayListener>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  defaultValue={bsYearEnd}
                  onChange={(e) => setBSYearEnd(!parseInt(e.target.value) ? null : parseInt(e.target.value))}
                  className="grow"
                  placeholder="Enter the year you finish... (leave blank if currently studying)"
                />
              </ClickAwayListener> 
            </FormControl>
          </Tab>
          <Tab eventKey="ms" title="M.S. Degree">
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  defaultValue={msSchool}
                  onChange={(e) => setMSSchool(e.target.value)}
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
                  defaultValue={msDepartment}
                  onChange={(e) => setMSDepartment(e.target.value)}
                  className="grow"
                  placeholder="Enter Department Name..."
                />
              </ClickAwayListener> 
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  defaultValue={msYearStart}
                  onChange={(e) => setMSYearStart(!parseInt(e.target.value) ? null : parseInt(e.target.value))}
                  className="grow"
                  placeholder="Enter the year you start..."
                />
              </ClickAwayListener>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  defaultValue={msYearEnd}
                  onChange={(e) => setMSYearEnd(!parseInt(e.target.value) ? null : parseInt(e.target.value))}
                  className="grow"
                  placeholder="Enter the year you finish... (leave blank if currently studying)"
                />
              </ClickAwayListener> 
            </FormControl>
          </Tab>
          <Tab eventKey="phd" title="Ph.D. Degree">
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  defaultValue={phdSchool}
                  onChange={(e) => setPhDSchool(e.target.value)}
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
                  defaultValue={phdDepartment}
                  onChange={(e) => setPhDDepartment(e.target.value)}
                  className="grow"
                  placeholder="Enter Department Name..."
                />
              </ClickAwayListener> 
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  defaultValue={phdYearStart}
                  onChange={(e) => setPhDYearStart(!parseInt(e.target.value) ? null : parseInt(e.target.value))}
                  className="grow"
                  placeholder="Enter the year you start..."
                />
              </ClickAwayListener>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <ClickAwayListener
                onClickAway={() => {}}
              >
                <Input
                  autoFocus
                  defaultValue={phdYearEnd}
                  onChange={(e) => setPhDYearEnd(!parseInt(e.target.value) ? null : parseInt(e.target.value))}
                  className="grow"
                  placeholder="Enter the year you finish... (leave blank if currently studying)"
                />
              </ClickAwayListener> 
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
