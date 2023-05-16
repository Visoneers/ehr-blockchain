import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../assets/theme';
import axios from '../../api/axios';



const NewHospital = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  const handleInputChange = e => {
    const { name, value } = e.target
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

    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ email, pwd, values }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //clear state and controlled inputs
      setEmail('');
      setPwd('');
      setMatchPwd('');
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
          <Grid container>
            <Grid item lg={6} xs={12}>
              <Box m='15px'>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  label="Hospial Name"
                  name="name"
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

export default NewHospital;

const initialFValues = {
  id: "0",
  name: "",
  mobileNo: "",
  address: "",
  city: "",
  pinCode: "",
};

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const REGISTER_URL = '/register';