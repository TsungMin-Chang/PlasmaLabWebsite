import { useState, useRef } from "react";
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";

import { UpdateResearchDataProp } from "../../../../backend/api/generated/schemas";
import api from '../../../../backend/api/generated/ClientAPI';

type UpdateResearchDialogProps = {
  id: string;
  title: string;
  description: string;
  reference: string;
  open: boolean;
  onClose: () => void;
};

export default function NewResearchDialog(props: UpdateResearchDialogProps) {
  const {id, title, description, reference, open, onClose} = props;

  const [newTitle, setNewTitle] = useState<string>(title);
  const textfieldDescription = useRef<HTMLInputElement>(null);
  const textfieldReference = useRef<HTMLInputElement>(null);

  const [edittingTitle, setEdittingTitle] = useState(false);

  const handleSave = async () => {
    
    const newDescription = textfieldDescription.current?.value ?? description;
    const newReference = textfieldReference.current?.value ?? reference;

    console.log(!newTitle ? title : newTitle);
    console.log(newDescription);
    console.log(newReference);

    handleClose();

    // if (!title) {
    //   alert("Title cannot be blank!");
    //   return;
    // }
    // if (!description) {
    //   alert("Description cannot be blank!");
    //   return;
    // }
    // if (!reference) {
    //   alert("Reference cannot be blank!");
    //   return;
    // }

    // try {
    //   await api.createResearchData( {title, description, reference, imgPath: uuidFileName} as CreateResearchDataProp );
    // } catch {
    //   alert("Error: Failed to create a new publication!");
    // } finally {
    //   handleClose();
    // }
  };

  const handleClose = () => {
    setNewTitle("");
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="flex gap-4">
        <FormControl sx={{ m: 1, minWidth: 510 }}>
        {edittingTitle ? (
          <ClickAwayListener
            onClickAway={() => { setEdittingTitle(false) }}
          >
            <Input
              autoFocus
              value={!newTitle ? title : newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="grow"
              placeholder="Enter a title..."
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEdittingTitle(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
            style={{background: 'transparent', borderRightColor: 'transparent'}}
          >
            <Typography className="text-start">{!newTitle ? title : newTitle}</Typography>
          </button>
        )}
        </FormControl>
      </DialogTitle>
      <DialogContent className="w-[600px]">
        <FormControl sx={{ m: 1, minWidth: 510 }}>
          <TextField
            defaultValue={description}
            inputRef={textfieldDescription}
            label="Research Description"
            variant="outlined"
            multiline
            rows={5}
            autoFocus
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 510 }}>
          <TextField
            defaultValue={reference}
            inputRef={textfieldReference}
            label="Research Reference"
            variant="outlined"
            multiline
            rows={3}
          />
        </FormControl>
        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
