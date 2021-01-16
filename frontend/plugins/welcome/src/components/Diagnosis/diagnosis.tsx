import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';
import { Content } from '@backstage/core';
import { Link as RouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Container,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';

import { DefaultApi } from '../../api/apis';
import { EntDisease } from '../../api/models/EntDisease';
import { EntEmployee } from '../../api/models/EntEmployee';
import { EntPatient } from '../../api/models/EntPatient';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
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
  buttonSty: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    marginBottom: 50
  },
  button: {
    textAlign: 'right'
  },
  header: {
    textAlign: 'center'
  },
  logoutButton: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white'
  },
  textTime: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(1),
    width: "100%",
    color: "blue"
  },

}));

interface Diagnosis {

  DiagnosticMessages: string;
  SurveillancePeriod: string;
  DiagnosisDate: Date;
  disease: number;
  employee: number;
  patient: number;
  

}

const Diagnosis: FC<{}> = () => {
  const classes = useStyles();
  const http = new DefaultApi();

  const [diagnosis, setDiagnosiss] = React.useState<Partial<Diagnosis>>({});
  const [disease, setDiseases] = React.useState<EntDisease[]>([]);
  const [employee, setEmployees] = React.useState<EntEmployee[]>([]);
  const [patient, setPatients] = React.useState<EntPatient[]>([]);
  const [showInputError, setShowInputError] = React.useState(false); // for error input show

  const getDisease = async () => {
    const res = await http.listDisease({ limit: 10, offset: 0 });
    setDiseases(res);
  }

  const getEmployee = async () => {
    const res = await http.listEmployee({ limit: 5, offset: 0 });
    setEmployees(res);
  }

  const getPatient = async () => {
    const res = await http.listPatient({ limit: 5, offset: 0 });
    setPatients(res);
  }

  // Lifecycle Hooks
  useEffect(() => {
    getDisease();
    getEmployee();
    getPatient();
  }, []);

  // set data to object playlist_video
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const name = event.target.name as keyof typeof Diagnosis;
    const { value } = event.target;
    setDiagnosiss({ ...diagnosis, [name]: value });
    console.log(diagnosis);
  };


  function clear() {
    setDiagnosiss({});
    setShowInputError(false);
  }

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

  function save() {
    setShowInputError(true);
    let {DiagnosticMessages, SurveillancePeriod, DiagnosisDate } = diagnosis;
    if (!DiagnosticMessages || !SurveillancePeriod || !DiagnosisDate) {
      Toast.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }

    const apiUrl = 'http://localhost:8080/api/v1/diagnosiss';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(diagnosis),
    };
    console.log(diagnosis);

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

  function redirecLogOut() {
    // redirect Page ... http://localhost:3000/
    window.location.href = "http://localhost:3000/";
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            ระบบจัดเก็บการวินิจฉัยโรคติดต่อ
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              size="medium"
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

      <Content>
        <Button
          size="large"
          color="secondary"
          style={{ float: 'right' }}
          component={RouterLink}
          to="/Table"
          variant="contained"
        >
          แสดงข้อมูล
             </Button>

        <Container maxWidth="sm">
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <h2 style={{ textAlign: 'center' }}> การวินิจฉัยโรค </h2>
            </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>ชื่อผู้เข้ารับการรักษา</InputLabel>
              <Select
                name="patient"
                value={diagnosis.patient || ''}
                onChange={handleChange}
                label="ชื่อผู้เข้ารับการรักษา"
              >
                {patient.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                    {item.patientName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>ชื่อโรคติดต่อ</InputLabel>
              <Select
                name="disease"
                value={diagnosis.disease || ''}
                onChange={handleChange}
                label="ชื่อผู้เข้ารับการรักษา"
              >
                {disease.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                    {item.diseaseName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          


            <Grid item xs={10}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  error={!diagnosis.SurveillancePeriod && showInputError}
                  name="userId"
                  label="ระยะเวลาเฝ้าระวัง"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={diagnosis.SurveillancePeriod || ''}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  error={!diagnosis.DiagnosticMessages && showInputError}
                  name="DiagnosticMessages"
                  label="การวินิจฉัยโรค หรือ อาการที่แสดง"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={diagnosis.DiagnosticMessages || ''}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  variant="outlined"
                  required
                  error={!diagnosis.DiagnosisDate && showInputError}
                  label="วันที่ทำการวินิจฉัย"
                  name="DiagnosisDate"
                  type="date"
                  value={diagnosis.DiagnosisDate || ''}
                  className={classes.textTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>ผู้บันทึกข้อมูล</InputLabel>
              <Select
                name="employee"
                value={diagnosis.employee || ''}
                onChange={handleChange}
                label="ผู้บันทึกข้อมูล"
              >
                {employee.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                    {item.employeeName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>


            <Grid item xs={10} >
              <Button
                name="saveData"
                size="large"
                variant="contained"
                color="primary"
                disableElevation
                className={classes.buttonSty}
                onClick={save}
              >
                บันทึก
            </Button>
            </Grid>
          </Grid>
        </Container>
      </Content>
    </div>
  );
};

export default Diagnosis;
