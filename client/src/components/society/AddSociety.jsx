import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, TextField, FormControl, FormLabel, InputLabel, RadioGroup, FormControlLabel, Radio, Button, IconButton, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import { tokens } from '../../assets/theme';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';



const Newsociety = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [hospitals, setHospitals] = useState([])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  const handleInputChange = e => {
    const { name, value } = e.target
    console.log(value, name);
    setValues({
      ...values,
      [name]: value
    })
  }

  const resetForm = () => {
    setValues(initialFValues);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(values);
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ email, password:pwd,...values,role: '644e0da2e22255e5791984b6' }),
        {
          headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json', },
          withCredentials: true
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      
      //clear state and controlled inputs
      setEmail('');
      setPwd('');
      setMatchPwd('');
      setValues(initialFValues);
      navigate('/admin/society')
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
          `http://localhost:3000/hospitals/`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
          }
        );
        console.log("set hospital");
        console.log(response.data.data);
        setHospitals(response.data.data[0].paginetResult);
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
                  label="Scoiety Name"
                  name="name"
                  autoComplete="on"
                  onChange={handleInputChange}
                  value={values.name}
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
                {/* <p>hello{auth}</p>/ */}
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
              </Box>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Box m='10px'>

              <TextField
                  fullWidth
                  variant="outlined"
                  label="Hospital Id"
                  name="hospitalId"
                  select
                  value={values.hospitalId}
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
                  {hospitals.map(hospital => (
                    <MenuItem key={hospital._id} value={hospital._id}>
                      {hospital.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Phone Number"
                  name="contact"
                  value={values.contact}
                  onChange={handleInputChange}
                  margin="normal"
                />
                
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Area"
                  name="area"
                  value={values.area}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="State"
                  name="state"
                  value={values.state}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="City"
                  name="city"
                  value={values.city}
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
                 
                
                <Box mt='20px' sx={{ display: 'flex', justifyContent: 'flex-end'}}>
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

export default Newsociety;

const initialFValues = {
  id: "0",
  name: "",
  hospitalId:"",
  contact: "",
  area: "",
  state: "",
  city: "",
  pinCode: "",
};

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/auth/register';