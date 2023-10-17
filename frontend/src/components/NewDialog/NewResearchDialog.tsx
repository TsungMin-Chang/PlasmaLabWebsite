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

import { CreateResearchDataProp } from "../../../../backend/api/generated/schemas";
import api from '../../../../backend/api/generated/ClientAPI';
import * as base64 from 'base64-js';

type NewResearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewResearchDialog({ open, onClose }: NewResearchDialogProps) {

  const [title, setTitle] = useState<string>("");
  const [imageString, setImageString] = useState({imageName: "", image: ""});
  const textfieldDescription = useRef<HTMLInputElement>(null);
  const textfieldReference = useRef<HTMLInputElement>(null);

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
    
    const description = textfieldDescription.current?.value ?? "" ;
    const reference = textfieldReference.current?.value ?? "" ;

    if (!title) {
      alert("Title cannot be blank!");
      return;
    }
    if (!imageString.image || !imageString.imageName) {
      alert("Please upload an image!");
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

    try {
      // POST request sends file name and file
      await axios.post('/image', imageString)
                 .then(response => {
                    console.log(response.data);
                    const uuidFileName = response.data as string;
                    try {
                      api.createResearchData( {title, description, reference, imgPath: uuidFileName} as CreateResearchDataProp );
                    } catch {
                      alert("Error: Failed to create a new publication!");
                    } finally {
                      handleClose();
                    }
                  });
    } catch {
      alert("Error: Failed to save uploaded image!");
      handleClose();
      return;
    }
  };

  const handleClose = () => {
    setTitle("");
    setImageString({imageName: "", image: ""});
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
            <Form.Control
              type="file"
              required
              name="file"
              onChange={handleImage}
            />
          </Form.Group>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 510 }}>
          <TextField
            inputRef={textfieldDescription}     
            label="Description"
            multiline
            rows={8}
            autoFocus
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 510 }}>
          <TextField
            inputRef={textfieldReference}
            label="Reference"
            multiline
            rows={5}
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
