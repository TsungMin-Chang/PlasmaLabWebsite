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

type NewResearchDialogProps = {
  open: boolean;
  onClose: () => void;
  onRender: () => void;
};

export default function NewResearchDialog({ open, onClose, onRender }: NewResearchDialogProps) {

  const [title, setTitle] = useState<string>("");
  const [imageString, setImageString] = useState({imageName: "", image: ""});
  const textfieldDescription = useRef<HTMLInputElement>(null);
  const textfieldReference = useRef<HTMLInputElement>(null);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    // get file name
    const fileName = e.currentTarget.value.match(/^.*\\(.*?)\..*?$/);
    if (!fileName) return;

    // check file extension
    const validImageType = ['jpg', 'jpeg', 'png'];
    const fileExtension = fileName[0].split('.');
    if ( !validImageType.includes(fileExtension[fileExtension.length - 1]) ) {
      alert("Only .jpg, .jpeg, .png files are accepted!");
      handleClose();
      return;
    }
    
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

    // console.log(title);
    // console.log(imageString.imageName);
    // console.log(description);
    // console.log(reference);

    try {
      // POST request sends imgage file name and image file
      const response = await axios.post('/image', imageString);
      try {
        // POST request sends research data to store in db
        await api.createResearchData( {title, description, reference, imgPath: response.data.uuid} as CreateResearchDataProp );
      } catch {
        alert("Error: Failed to create a new research topic!");
        return;
      }
    } catch {
      alert("Error: Failed to save uploaded image!");
      return;
    } finally {
      onRender();
      handleClose();
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="grow"
              placeholder="Enter Title"
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
            label="Enter Description"
            multiline
            rows={5}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 510 }}>
          <TextField
            inputRef={textfieldReference}
            label="Enter Reference"
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
