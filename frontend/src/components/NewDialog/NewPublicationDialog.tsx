import { useState } from "react";

import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import TextField from '@mui/material/TextField';

import { CreatePublicationDataProp } from "../../../../backend/api/generated/schemas";
import api from '../../../../backend/api/generated/ClientAPI';

type NewPeopleDialogProps = {
    open: boolean;
    onClose: () => void;
};

export default function NewPeopleDialog({ open, onClose }: NewPeopleDialogProps) {

  const [year, setYear] = useState<number | null>(null);
  const [detail, setDetail] = useState<string>("");

  const handleSave = async () => {
    api.createPublicationData({year,detail}as CreatePublicationDataProp)
    if (!year) {
      alert("Year cannot be blank!");
      return;
    }
    if (!detail) {
      alert("Detail cannot be blank!");
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
    setYear(null);
    setDetail("");
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
            defaultValue={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="grow"
            placeholder="Enter published year..."
          />
          </ClickAwayListener>
        </FormControl>
      </DialogTitle>
      <DialogContent className="w-[600px]">
        <FormControl sx={{ m: 1, minWidth: 510 }}>
          <TextField
            id="outlined-multiline-static"
            label="Detail"
            multiline
            rows={5}
            defaultValue={detail}
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
