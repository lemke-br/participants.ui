import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableFooter,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import AppForm from "./AppForm";

const AppTable = ({
  participations,
  updateParticipation,
  deleteParticipation,
}) => {
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let totalParticipations = 0;
    participations.forEach((participation) => {
      totalParticipations += participation.participation;
    });

    setTotal(totalParticipations);
  }, [participations]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Primeiro Nome</TableCell>
              <TableCell>Sobrenome</TableCell>
              <TableCell>Participação</TableCell>
              <TableCell>Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participations?.map((participation) => (
              <TableRow key={participation.id}>
                <TableCell>{participation.firstName}</TableCell>
                <TableCell>{participation.lastName}</TableCell>
                <TableCell>{participation.participation}%</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedParticipant(participation);
                      handleClickOpen();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteParticipation(participation.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>TOTAL</TableCell>
              <TableCell></TableCell>
              <TableCell>{`${total}%`}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Editar Participação"}
        </DialogTitle>
        <DialogContent>
          <AppForm
            selectedParticipant={selectedParticipant}
            updateParticipation={updateParticipation}
            participations={participations}
            handleModal={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppTable;
