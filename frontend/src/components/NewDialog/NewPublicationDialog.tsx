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

import { CreatePublicationDataProp } from "../../../../backend/api/generated/schemas";
import api from '../../../../backend/api/generated/ClientAPI';

type NewPublicationDialogProps = {
    open: boolean;
    onClose: () => void;
};

export default function NewPublicationDialog({ open, onClose }: NewPublicationDialogProps) {
  console.log('hhihihi');
  const [year, setYear] = useState<number | null>(null);
  const textfieldDetail = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    console.log('hhihihi'); 
    const detail = textfieldDetail.current?.value ?? "" ;

    if (!year) {
      alert("Year cannot be blank!");
      return;
    }
    if (!detail) {
      alert("Detail cannot be blank!");
      return;
    }

    try {
      console.log('hhihihi');
      await api.createPublicationData( {year, detail} as CreatePublicationDataProp );
    } catch {
      alert("Error: Failed to create a new publication!");
    } finally {
      handleClose();
    }
  };

  const handleClose = () => {
    setYear(null);
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
                  label='Enter published year...'
                  openTo="year" 
                  onChange={(e: any) => setYear(!e ? null : e['$y'])}
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
            label="Detail"
            variant="outlined"
            multiline
            rows={5}
            autoFocus
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
