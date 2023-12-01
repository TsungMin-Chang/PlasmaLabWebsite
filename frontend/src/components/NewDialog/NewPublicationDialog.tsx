import { useState, useRef } from "react";

import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from '@mui/material/TextField';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { CreatePublicationDataProp } from "../../../../backend/api/generated/schemas";
import api from '../../../../backend/api/generated/ClientAPI';

type NewPublicationDialogProps = {
    open: boolean;
    edit: boolean;
    onClose: () => void;
    onRender: () => void;
};

export default function NewPublicationDialog({ open, edit, onClose, onRender }: NewPublicationDialogProps) {
  const [year, setYear] = useState<number>(-1);
  const textfieldDetail = useRef<HTMLInputElement>(null);

  const handleSave = async () => {

    const detail = textfieldDetail.current?.value ?? "" ;

    if (!year || year === -1) {
      alert("Year cannot be blank!");
      return;
    }
    if (!detail) {
      alert("Detail cannot be blank!");
      return;
    }

    // console.log(year);
    // console.log(detail);

    try {
      // POST request sends people data to store in db
      await api.createPublicationData( {year, detail} as CreatePublicationDataProp ); 
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
                  label='Enter Published Year'
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
          <TextField
            inputRef={textfieldDetail}
            label="Enter Publication Detail"
            variant="outlined"
            multiline
            rows={5}
            autoFocus
          />
        </FormControl>
        <DialogActions>
          <Button onClick={edit ? handleSave : () => {}}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
