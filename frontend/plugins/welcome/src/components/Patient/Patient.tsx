import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';
import Swal from 'sweetalert2'; // alert
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  TextField,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';

// css style 
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
    color: "blue"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formControl: {
    width: 455,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  header: {
    textAlign: 'center'
  },

  buttonSty: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    marginBottom: 50
  },
  logoutButton: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white'
  },

}));

import { DefaultApi } from '../../api/apis'; // Api Gennerate From Command
import { EntEmployee } from '../../api/models/EntEmployee'; //import interface Employee 
import { EntCategory } from '../../api/models/EntCategory'; //import interface Category
import { EntNametitle } from '../../api/models/EntNametitle'; //import interface Nametitle
import { EntBloodtype } from '../../api/models/EntBloodtype'; //import interface Bloodtype
import { EntGender } from '../../api/models/EntGender'; //import interface Gender  

interface Patient {
  idcard: string;
  category: number;
  nametitle: number;
  patientname: string;
  bloodtype: number;
  gender: number;
  address: string;
  congenital: string;
  allergic: string;
  employee: number;
}


const Patient: FC<{}> = () => {
  const classes = useStyles();
  const api = new DefaultApi();

  const [showInputError, setShowInputError] = React.useState(false); // for error input show
  const [patient, setPatient] = React.useState<Partial<Patient>>({});
  const [employees, setEmployees] = React.useState<EntEmployee[]>([]);
  const [categorys, setCategorys] = React.useState<EntCategory[]>([]);
  const [nametitles, setNametitles] = React.useState<EntNametitle[]>([]);
  const [bloodtypes, setBloodtypes] = React.useState<EntBloodtype[]>([]);
  const [genders, setGenders] = React.useState<EntGender[]>([]);

  // alert setting
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const getEmployee = async () => {
    const res = await api.listEmployee({ limit: 2, offset: 0 });
    setEmployees(res);
  };

  const getCategory = async () => {
    const res = await api.listCategory({ limit: 4, offset: 0 });
    setCategorys(res);
  };

  const getNametitle = async () => {
    const res = await api.listNametitle({ limit: 5, offset: 0 });
    setNametitles(res);
  };

  const getBloodtype = async () => {
    const res = await api.listBloodtype({ limit: 4, offset: 0 });
    setBloodtypes(res);
  };
  const getGender = async () => {
    const res = await api.listGender({ limit: 2, offset: 0 });
    setGenders(res);
  };

  // Lifecycle Hooks
  useEffect(() => {
    getEmployee();
    getCategory();
    getNametitle();
    getBloodtype();
    getGender();

  }, []);

  // set data to object patient
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const name = event.target.name as keyof typeof patient;
    const { value } = event.target;
    setPatient({ ...patient, [name]: value });
    console.log(patient);
  };

  // clear input form
  function clear() {
    setPatient({});
    setShowInputError(false);
  }

  // function save data
  function save() {
    setShowInputError(true)
    let { idcard, patientname, address, congenital, allergic } = patient;
    if (!idcard || !patientname || !address || !congenital || !allergic) {
      Toast.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }
    const apiUrl = 'http://localhost:8080/api/v1/patients';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patient),
    };

    console.log(patient); // log ดูข้อมูล สามารถ Inspect ดูข้อมูลได้ F12 เลือก Tab Console

    fetch(apiUrl, requestOptions)
      .then(response => {
        console.log(response)
        response.json()
        if (response.ok === true) {
          clear();
          Toast.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
          });
        } else {
          Toast.fire({
            icon: 'error',
            title: 'บันทึกข้อมูลไม่สำเร็จ',
          });
        }
      })
  }
  //Java 
  function redirecLogOut() {
    //redirec Page ... http://localhost:3000/
    window.location.href = "http://localhost:3000/";
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ระบบข้อมูลผู้ป่วย
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"

            >


              <AccountCircle />
              <Typography>
                <Link variant="h6" onClick={redirecLogOut} className={classes.logoutButton}>
                  LOGOUT
                </Link>
              </Typography>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">

        <Grid container spacing={3}>

          <Grid item xs={10}>
            <h2 style={{ textAlign: 'center' }} >ข้อมูลประจำตัวผู้ป่วย </h2>
          </Grid>

          <Grid item xs={10}>
            <TextField
              required={true}
              error={!patient.idcard && showInputError}
              id="idcard"
              name="idcard"
              type="intrger"
              label="เลขบัตรประจำตัวประชาชน"
              variant="outlined"
              fullWidth
              multiline
              value={patient.idcard || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel >ประเภทผู้ป่วย</InputLabel>
              <Select
                name="category"
                value={patient.category || ''}
                onChange={handleChange}
                label="ประเภทผู้ป่วย"
              >
                {categorys.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.categoryName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel >คำนำหน้าชื่อ</InputLabel>
              <Select
                name="nametitle"
                value={patient.nametitle || ''}
                onChange={handleChange}
                label="คำนำหน้าชื่อ"
                fullWidth
              >
                {nametitles.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={10}>
            <TextField
              required={true}
              error={!patient.patientname && showInputError}
              name="patientname"
              label="ชื่อ-นามสกุล"
              variant="outlined"
              fullWidth
              multiline
              value={patient.patientname || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>เพศ</InputLabel>
              <Select
                name="gender"
                value={patient.gender || ''}
                onChange={handleChange}
                label="เพศ"
              >
                {genders.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.genderName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel >กรุ๊ปเลือด</InputLabel>
              <Select
                name="bloodtype"
                value={patient.bloodtype || ''}
                onChange={handleChange}
                label="กรุ๊ปเลือด"
                fullWidth
              >
                {bloodtypes.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.bloodtypeName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={10}>
            <TextField
              name="address"
              label="ที่อยู่"
              variant="outlined"
              fullWidth
              multiline
              value={patient.address || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={10}>
            <h2 style={{ textAlign: 'center' }}> ข้อมูลทางการแพทย์ </h2>
          </Grid>

          <Grid item xs={10}>
            <TextField
              required={true}
              error={!patient.congenital && showInputError}
              name="congenital"
              label="โรคประจำตัว"
              variant="outlined"
              fullWidth
              multiline
              value={patient.congenital || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required={true}
              error={!patient.allergic && showInputError}
              name="allergic"
              label="ประวัติการแพ้ยา"
              variant="outlined"
              fullWidth
              multiline
              value={patient.allergic || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel >ผู้บันทึกข้อมูล</InputLabel>
              <Select
                name="employee"
                value={patient.employee || ''}
                onChange={handleChange}
                label="ผู้บันทึกข้อมูล"
                fullWidth
              >
                {employees.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.userId}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={10}>
            <Button
              name="saveData"
              size="large"
              variant="contained"
              color="primary"
              disableElevation
              className={classes.buttonSty}
              onClick={save}
            >
              บันทึกข้อมูล
              </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Patient;