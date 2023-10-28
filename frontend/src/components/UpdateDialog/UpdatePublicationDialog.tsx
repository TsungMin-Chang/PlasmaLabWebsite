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
import dayjs from 'dayjs'

import api from '../../../../backend/api/generated/ClientAPI';

type UpdatePublicationDialogProps = {
    id: string;
    year: number;
    detail: string;
    open: boolean;
    onClose: () => void;
};

export default function UpddatePublicationDialog(props: UpdatePublicationDialogProps) {
  const { id, year, detail, open, onClose } = props;

  const [newYear, setNewYear] = useState<number>(year);
  const textfieldDetail = useRef<HTMLInputElement>(null);

  const handleSave = async () => {

    const newDetail = textfieldDetail.current?.value ?? "" ;

    console.log(newYear === -1 ? year : newYear);
    console.log(newDetail);

    handleClose();

    // if (!year) {
    //   alert("Year cannot be blank!");
    //   return;
    // }
    // if (!detail) {
    //   alert("Detail cannot be blank!");
    //   return;
    // }

    // try {
    //   await api.createPublicationData( {year, detail} as CreatePublicationDataProp );
    // } catch {
    //   alert("Error: Failed to create a new publication!");
    // } finally {
    //   handleClose();
    // }
  };

  const handleClose = () => {
    setNewYear(year);
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
                  defaultValue={newYear === -1 ? dayjs(year.toString()) : dayjs(newYear.toString())}
                  views={['year']}
                  label='Enter published year...'
                  openTo="year"
                  onChange={(e: any) => setNewYear(!e ? year : e['$y'])}
                />
              </FormControl>
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>
      </DialogTitle>
      <DialogContent className="w-[600px]">
        <FormControl sx={{ m: 1, minWidth: 510 }}>
          <TextField
            defaultValue={detail}
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
  )
}