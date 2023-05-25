import React, { useState } from 'react';
import { Box, Grid, TextField, Button, InputLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import { tokens } from '../../assets/theme';
import axios from 'axios'
import { useParams } from 'react-router-dom';



const AddPrescription = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {userID}=useParams()

  const medicinesTemplate = { name: "", type: "", days: "", instruction: ""}

  const [values, setValues] = useState(initialFValues);
  const [medicines, setMedicines] = useState([medicinesTemplate]);
  const [errors, setErrors] = useState({});

    const handleInputChange = e => {
      const { name, value } = e.target
      setValues({
        ...values,
        [name]: value
      })
    }

  const addMultiInput = () => {
    setMedicines([...medicines, medicinesTemplate]);
  }

  const handleMultipleInputChange = (e, index) => {
    const { name, value } = e.target
    console.log(index, name, value);
    const upadteMedicines = medicines.map((med, i) => index === i ? Object.assign(med, {[name]: value}) : med)
    console.log(upadteMedicines);
    setMedicines(upadteMedicines)
  }
  console.log(medicines)

  const deleteMultiInput = (index) => {
    const filteredmed = [...medicines]
    filteredmed.splice(index, 1)
    setMedicines(filteredmed)
  }
  const resetForm = () => {
    setValues(initialFValues);
    setMedicines([medicinesTemplate]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log(values,"values")
    try {
      console.log(userID)
      const doctorId=localStorage.getItem("user_id")
      const response = await axios.post(`http://localhost:3000/prescription/${userID}`,
        JSON.stringify({ ...values,data:medicines,doctorId }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data),"response");
      //clear state and controlled inputs
      setValues(initialFValues);
    } catch (err) {
      if (!err?.response) {
        setErrors('No Server Response');
      } else if (err.response?.status === 409) {
        setErrors('Username Taken');
      } else {
        setErrors('Registration Failed')
      }
    }
  }

  return (
    <>
      <Box m='20px'>
        <form onSubmit={handleSubmit}>
          <Box mt='15px' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <InputLabel margin='dense' sx={{ fontSize: '14px', fontWeight: '500' }}>Medicines</InputLabel>
            <Button sx={{ backgroundColor: colors.blueAccent[800], p: 1 }} onClick={addMultiInput}>Add More</Button>
          </Box>
          { 
            medicines.map((data, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item lg={3} md={3} xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Medicines"
                      name="name"
                      value={data.name}
                      onChange={e => handleMultipleInputChange(e, index)}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item lg={3} md={3} xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Type"
                      name="type"
                      value={data.type}
                      onChange={e => handleMultipleInputChange(e, index)}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Days"
                      name="days"
                      value={data.days}
                      onChange={e => handleMultipleInputChange(e, index)}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item lg={3} md={3} xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Instruction"
                      name="instruction"
                      value={data.instruction}
                      onChange={e => handleMultipleInputChange(e, index)}
                      margin="normal"
                    />
                  </Grid>
                  <Box mt="40px" ml="5px"><Button type='button' onClick={() => deleteMultiInput(index)}><DeleteIcon /></Button></Box>
                </Grid>
              )
            )
          }
          <TextField
            fullWidth
            variant="outlined"
            label="Note"
            name="notes ......"
            value={values.note}
            multiline
            rows={4}
            onChange={e => handleInputChange(e)}
            margin="normal"
          />
            

          <Box m='10px'>
            <Box mt='20px' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button sx={{
                m: 2, backgroundColor: colors.redAccent[800], fontSize: "13px",
                padding: "10px 20px",
                width: "80px"
              }} onClick={resetForm}>Reset</Button>
              <Button sx={{
                m: 2, backgroundColor: colors.greenAccent[800], fontSize: "13px",
                padding: "10px 20px",
                width: "80px"
              }} type='submit'>Submit</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default AddPrescription;


const initialFValues = {
  id: "0",
  note: "",
  patientID: "",
  doctorID: "",
  date: "",
};
