import { useState } from "react";

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

import useCards from "@/hooks/useCards";
import { createCard } from "@/utils/client";

type NewPeopleDialogProps = {
    open: boolean;
    onClose: () => void;
};

export default function NewPeopleDialog({ open, onClose }: NewPeopleDialogProps) {

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [reference, setReference] = useState<string>("");

  const handleSave = async () => {
    if (!title) {
      alert("Title cannot be blank!");
      return;
    }
    if (!description) {
      alert("Description cannot be blank!");
      return;
    }
    if (!reference) {
      alert("Reference cannot be blank!");
      return;
    }
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
    setTitle("");
    setDescription("");
    setReference("");
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="flex gap-4">
        <FormControl sx={{ m: 1, minWidth: 510 }}>
              <ClickAwayListener
              onClickAway={() => {}}
              >
              <Input
                  autoFocus
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="grow"
                  placeholder="Enter a title..."
              />
              </ClickAwayListener>
          </FormControl>
      </DialogTitle>
      <DialogContent className="w-[600px]">
        <FormControl sx={{ m: 1, minWidth: 510 }}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload an illustration of your research</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 510 }}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={8}
            defaultValue={description}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 510 }}>
          <TextField
            id="outlined-multiline-static"
            label="Reference"
            multiline
            rows={5}
            defaultValue={reference}
          />
        </FormControl>
        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
