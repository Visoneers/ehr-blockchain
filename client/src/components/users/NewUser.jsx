import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, FormControl, FormLabel, InputLabel, RadioGroup, FormControlLabel, Radio, Button, IconButton, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import { tokens } from '../../assets/theme';
import axios from '../../api/axios';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const NewUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [societies, setSocieties] = useState([])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  const handleInputChange = e => {
    const { name, value } = e.target
    console.log(name, value)
    setValues({
      ...values,
      [name]: value
    })
  }

  const resetForm = () => {
    setValues(initialFValues);
    setEmail("")
    setPwd("")
    setMatchPwd("")
  }
  const addMultiInput = (name) => {
    setValues((old) => ({
      ...values,
      [name]: [...old[name], []]
    }))
  }
  const deleteMultiInput = (name, index) => {
    const diseases = values[name]
    diseases.splice(index, 1)
    setValues((old) => ({
      ...values,
      [name]: diseases
    }))
  }
  const handleMultipleInputChange = (e, index) => {
    const { name, value } = e.target
    const diseases = values[name]
    diseases[index] = value
    setValues((old) => ({
      ...values,
      [name]: diseases
    }))
  }

  const handleDateChange = (e) => {
    console.log(e);
    setValues({
      ...values,
      dob: moment(e).format('DD,MM,YYYY')
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      console.log(email, pwd, values);
      const response = await axios.post(REGISTER_URL,
        // JSON.stringify({ email:"rohitdivekar463@gmail.com", password:pwd,...values, name:values.fullName ,role:"644e0dc7e22255e5791984b8" }),

        JSON.stringify({ email, password: pwd, ...values, name: values.fullName, role: "644e0dc7e22255e5791984b8" }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      // TODO: remove console.logs before deployment
      // console.log(JSON.stringify(response?.data));
      //clear state and controlled inputs
      setEmail('');
      setPwd('');
      setMatchPwd('');
      setErrors("")
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
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchSocieties = async () => {
      try {

        const response = await axios.get(
          `http://localhost:3000/society/`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
          }
        );
        console.log("set society");
        console.log(response.data.data);
        setSocieties(response.data.data[0].paginetResult);
      } catch (error) {
        console.error(error);
      }
    };

    // useEffect(() => {
    fetchSocieties();
    // }, []);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  
  console.log(values);
  console.log(societies, "societies")
  return (
    <>
      <Box m='20px'>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item lg={6} xs={12}>
              <Box m='15px'>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  label="Full Name"
                  name="fullName"
                  autoComplete="on"
                  onChange={handleInputChange}
                  value={values.fullName}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  autoComplete="on"
                  label="Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  error={validEmail ? false : true}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  label="Password"
                  name="pwd"
                  type="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  error={validPwd ? false : true}
                  margin="normal"
                />
                <p className={validPwd ? "offscreen" : "instructions"}>
                  8 to 24 characters.<br />
                  Must include uppercase and lowercase letters, a number and a special character.<br />
                  Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  label="Confirm Password"
                  name="matchPwd"
                  type="password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  color={validMatch ? "success" : "warning"}
                  margin="normal"
                />
                <p className={validMatch ? "offscreen" : "instructions"}>
                  Must match the first password input field.
                </p>

                <Box mt='15px' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <InputLabel margin='dense' sx={{ fontSize: '14px', fontWeight: '500' }}>Diseases</InputLabel>
                  <Button sx={{ backgroundColor: colors.blueAccent[800], p: 1 }} onClick={() => addMultiInput('diseases')}>Add More</Button>
                </Box>
                {values.diseases.map((data, index) => {
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }} key={index}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Disease"
                        name="diseases"
                        value={data}
                        onChange={e => handleMultipleInputChange(e, index)}
                        margin="normal"
                      />
                      <IconButton type='button' sx={{ width: '50px', height: '50px' }} onClick={() => deleteMultiInput('diseases', index)}><DeleteIcon /></IconButton>
                    </Box>
                  )
                })
                }

                <Box mt='15px' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <InputLabel margin='dense' sx={{ fontSize: '14px', fontWeight: '500' }}>Alergies</InputLabel>
                  <Button sx={{ backgroundColor: colors.blueAccent[800], p: 1 }} onClick={() => addMultiInput('allergies')}>Add More</Button>
                </Box>
                {values.allergies.map((data, index) => {
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }} key={index}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Allergies"
                        name="allergies"
                        value={data}
                        onChange={e => handleMultipleInputChange(e, index)}
                        margin="normal"
                      />
                      <IconButton type='button' sx={{ width: '50px', height: '50px' }} onClick={() => deleteMultiInput('allergies', index)}><DeleteIcon /></IconButton>
                    </Box>
                  )
                })
                }

              </Box>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Box m='10px'>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Phone Number"
                  name="mobileNo"
                  value={values.mobileNo}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <FormControl sx={{ m: "10px"}} fullWidth>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row
                    name="gender"
                    value={values.gender}
                    onChange={handleInputChange}>
                    {
                      genderItems.map(
                        item => (
                          <FormControlLabel key={item.id} value={item.value} control={<Radio />} label={item.value} />
                        )
                      )
                    }
                  </RadioGroup>
                </FormControl>

                <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs} defaultValue={dayjs('2022-04-17')}>
                    <DatePicker
                      label="Enter Birth Date"
                      format='MMMM D, YYYY'
                      inputFormat="MMMM D, YYYY"
                      onChange={handleDateChange}
                    />
                </LocalizationProvider>
                </Box>

                <TextField
                  fullWidth
                  variant="outlined"
                  label="Society Id"
                  name="societyId"
                  select
                  value={values.societyId}
                  onChange={handleInputChange}
                  margin="normal"
                  SelectProps={{
                    MenuProps: {
                      getContentAnchorEl: null,
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                      },
                    },
                  }}
                  inputProps={{
                    style: { padding: '10px' }, // Custom styling for the input text
                  }}
                  SelectDisplayProps={{
                    style: { maxHeight: '200px' }, // Custom styling for the options list
                  }}
                >
                  {societies.map(society => (
                    <MenuItem key={society._id} value={society._id}>
                      {society.name}
                    </MenuItem>
                  ))}
                </TextField>

                {!values.societyId ?
                  <>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Address"
                      name="address"
                      value={values.address}
                      onChange={handleInputChange}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Pincode"
                      name="pinCode"
                      value={values.pinCode}
                      onChange={handleInputChange}
                      margin="normal"
                    />
                  </> : null}
                  <TextField
                  fullWidth
                  variant="outlined"
                  label="Guardian Name"
                  name="guardianName"
                  value={values.guardianName}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Guardian Number"
                  name="guardianNo"
                  value={values.guardianNo}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Insurance Policy Name"
                  name="insauranceName"
                  value={values.insauranceName}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <Box mt='15px' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <InputLabel margin='dense' sx={{ fontSize: '14px', fontWeight: '500' }}>Regular Medicines</InputLabel>
                  <Button sx={{ backgroundColor: colors.blueAccent[800], p: 1 }} onClick={() => addMultiInput('medicines')}>Add More</Button>
                </Box>
                {values.medicines.map((data, index) => {
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }} key={index}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Medicines"
                        name="medicines"
                        value={data}
                        onChange={e => handleMultipleInputChange(e, index)}
                        margin="normal"
                      />
                      <IconButton type='button' sx={{ width: '50px', height: '50px' }} onClick={() => deleteMultiInput('medicines', index)}><DeleteIcon /></IconButton>
                    </Box>
                  )
                })
                }
                <p className={errors ? 'instruction' : 'offscreen'}>{errors}</p><br />
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
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}

export default NewUser;

const initialFValues = {
  id: "0",
  pinCode: "",
  fullName: "",
  mobileNo: "",
  city: "",
  gender: "Male",
  societyId: "",
  vaccinated: false,
  address: "",
  age: 0,
  dob: "",
  guardianName: "",
  guardianNo: "",
  insauranceName: "",
  diseases: [""],
  allergies: [""],
  medicines: [""],
};

const genderItems = [
  { id: "Male", value: "Male" },
  { id: "Female", value: "Female" },
  { id: "Other", value: "Other" },
];

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/auth/register';