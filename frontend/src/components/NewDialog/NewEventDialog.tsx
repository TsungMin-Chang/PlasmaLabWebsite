import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { CreateEventDataProp } from "../../../../backend/api/generated/schemas";
import api from '../../../../backend/api/generated/ClientAPI';

type NewEventDialogProps = {
  open: boolean;
  onClose: () => void;
  onRender: () => void;
};

export default function NewResearchDialog({ open, onClose, onRender }: NewEventDialogProps) {

  const [year, setYear] = useState<number>(-1);
  const [imageString, setImageString] = useState({imageName: "", image: ""});
  const [searchParams] = useSearchParams();
  const visit = searchParams.get('visitor') || '';

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
    
    if (!year || year === -1) {
      alert("Year cannot be blank!");
      return;
    }
    if (!imageString.image || !imageString.imageName) {
      alert("Please upload an image!");
      return;
    }

    try {
      // POST request sends imgage file name and image file
      const response = await axios.post('/image', imageString);
      try {
        // POST request sends event data to store in db
        await api.createEventData( {year, imgPath: response.data.uuid} as CreateEventDataProp );
      } catch {
        alert("Error: Failed to create a new event!");
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
    setYear(-1);
    setImageString({imageName: "", image: ""});
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="flex gap-4">
        <FormControl sx={{ m: 1 }}> 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <FormControl sx={{ minWidth: 510 }}>
                <DatePicker
                  views={['year']}
                  label='Enter Year'
                  openTo="year"
                  value={year === -1 ? null : dayjs(year.toString())}
                  onChange={(e: any) => setYear(!e ? -1 : e['$y'])}
                />
              </FormControl>
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>
      </DialogTitle>
      <DialogContent className="w-[600px]">
        <FormControl sx={{ m: 1, minWidth: 510 }}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload an image of the event</Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
              onChange={handleImage}
            />
          </Form.Group>
        </FormControl>
        <DialogActions>
          <Button onClick={!visit ? handleSave : handleClose}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
