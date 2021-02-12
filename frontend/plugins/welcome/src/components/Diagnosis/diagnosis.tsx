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
  Menu,
  MenuProps,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { DefaultApi } from '../../api/apis'; // Api Gennerate From Command
import { EntDisease } from '../../api/models/EntDisease'; //import interface Disease
import { EntEmployee } from '../../api/models/EntEmployee'; //import interface Employee
import { EntPatient } from '../../api/models/EntPatient'; //import interface Patient
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(10),
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
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

interface Diagnosis {

  DiagnosticMessages: string;
  SurveillancePeriod: string;
  Treatment: string;
  Diagnosisdate: Date;
  Disease: number;
  Employee: number;
  Patient: number;

}

const Diagnosis: FC<{}> = () => {
  const classes = useStyles();
  const http = new DefaultApi();
  

  const [diagnosis, setDiagnosiss] = React.useState<Partial<Diagnosis>>({});
  const [disease, setDiseases] = React.useState<EntDisease[]>([]);
  const [employee, setEmployees] = React.useState<EntEmployee[]>([]);
  const [patient, setPatients] = React.useState<EntPatient[]>([]);

  const [diagnosticMessagesError, setDiagnosticMessagesError] = React.useState('');
  const [surveillancePeriodError, setSurveillancePeriodError] = React.useState('');
  const [treatmentError, setTreatmentError] = React.useState('');
  const [showInputError, setShowInputError] = React.useState(false); // for error input show

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getDisease = async () => {
    const res = await http.listDisease({ limit: undefined, offset: 0 });
    setDiseases(res);
  }

  const getEmployee = async () => {
    const res = await http.listEmployee({ limit: undefined, offset: 0 });
    setEmployees(res);
  }

  const getPatient = async () => {
    const res = await http.listPatient({ limit: undefined, offset: 0 });
    setPatients(res);
  }
  
  // Lifecycle Hooks
  useEffect(() => {
    getDisease();
    getEmployee();
    getPatient();
  }, []);

  // set data to object diagnosis
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>,) => {
    const name = event.target.name as keyof typeof diagnosis;
    const { value } = event.target;
    const validateValue = value.toString()
    checkPattern(name, validateValue)
    setDiagnosiss({ ...diagnosis, [name]: value });
    console.log(diagnosis);
  };

  // ฟังก์ชั่นสำหรับ validate การวินิจฉัย
  const DiagnosticMessages = (val: string) => {
    return val.match("[พบเชื้อ, ไม่พบเชื้อ]");
  }

  // ฟังก์ชั่นสำหรับ validate การเฝ้าระวัง
  const SurveillancePeriod = (val: string) => {
    return val.match("[เฝ้าระวัง]");
  }

  // ฟังก์ชั่นสำหรับ validate รูปแบบการรักษา
  const Treatment = (val: string) => {
    return val.match("[แผนไทย,แผนจีน,แผนปัจจุบัน]");
  }

  // สำหรับตรวจสอบรูปแบบข้อมูลที่กรอก ว่าเป็นไปตามที่กำหนดหรือไม่
  const checkPattern = (id: string, value: string) => {
    switch (id) {
      case 'DiagnosticMessages':
        DiagnosticMessages(value) ? setDiagnosticMessagesError('') : setDiagnosticMessagesError('ต้องขึ้นต้นด้วยคำว่า พบเชื้อ,ไม่พบเชื้อ');
        return;
      case 'SurveillancePeriod':
        SurveillancePeriod(value) ? setSurveillancePeriodError('') : setSurveillancePeriodError('ต้องขึ้นต้นด้วยคำว่า เฝ้าระวัง');
        return;
      case 'Treatment':
        Treatment(value) ? setTreatmentError('') : setTreatmentError('ต้องกรอกคำว่า แผนไทย,แผนจีน,แผนปัจจุบัน')
        return;
      default:
        return;
    }
  }

  const Toast = Swal.mixin({
    toast: true,
    position: undefined,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const alertMessage = (icon: any, title: any) => {
    Toast.fire({
      icon: icon,
      title: title,
    });
  }

  const checkCaseSaveError = (field: string) => {
    switch (field) {
      case 'DiagnosticMessages':
        alertMessage("error", "การวินิจฉัยหรืออาการที่แสดงต้องขึ้นต้นด้วยคำว่า พบเชื้อ,ไม่พบเชื้อ");
        return;
      case 'SurveillancePeriod':
        alertMessage("error", "ระยะเฝ้าระวังต้องขึ้นต้นด้วยคำว่า เฝ้าระวัง");
        return;
      case 'Treatment':
        alertMessage("error", "การรักษาต้องกรอกคำว่า แผนไทย, แผนจีน, แผนปัจจุบัน, ฯลฯ");
        return;
      default:
        alertMessage("error", "กรอกบันทึกข้อมูลไม่สำเร็จ");
        return;
    }
  }

  function clear() {
    setDiagnosiss({});
    setShowInputError(false);
  }

  function save() {
    setShowInputError(true);
    let { DiagnosticMessages, SurveillancePeriod, Treatment, Diagnosisdate, Patient, Disease } = diagnosis;
    if (!DiagnosticMessages || !SurveillancePeriod || !Treatment || !Diagnosisdate || !Patient || !Disease) {
      Toast.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }

    //เช็คแล้วเก็บค่าไว้ใน employee
    diagnosis.Employee = employee.filter(emp => emp.userId === window.localStorage.getItem("username"))[0].id;

    const apiUrl = 'http://localhost:8080/api/v1/diagnosiss';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(diagnosis),
    };

    console.log(diagnosis); // log ดูข้อมูล สามารถ Inspect ดูข้อมูลได้ F12 เลือก Tab Console

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {console.log(data.save);
        if (data.status === true) {
          clear();
          Toast.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
          });
        } else {
          checkCaseSaveError(data.error.Name)
        }
      });
  }

  function redirecLogOut() {
    // redirect Page ... http://localhost:3000/
    window.location.href = "http://localhost:3000/";
  }
  function redirectToDiagnosis() {
    window.location.href = "http://localhost:3000/diagnosis"
  }

  function redirectToSearchDiagnosis() {
    window.location.href = "http://localhost:3000/searchdiagnosis"
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton
            onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem button onClick={redirectToDiagnosis}>
              <ListItemIcon>
                <LocalHospitalRoundedIcon fontSize="default" />
              </ListItemIcon>
              <ListItemText primary="Add Diagnosis" />
            </StyledMenuItem>

            <StyledMenuItem button onClick={redirectToSearchDiagnosis}>
              <ListItemIcon>
                <SearchIcon fontSize="default" />
              </ListItemIcon>
              <ListItemText primary="Search Diagnosis" />
            </StyledMenuItem>
          </StyledMenu>

          <Typography variant="h4" className={classes.title}>
            ระบบจัดการโรคติดต่อ
          </Typography>
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
        </Toolbar>
      </AppBar>

      <Content>
        <Button
          size="large"
          color="secondary"
          style={{ float: 'right' }}
          component={RouterLink}
          to="/SearchDiagnosis"
          variant="contained"
        >
          แสดงข้อมูล
             </Button>

        <Container maxWidth="sm">
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <h2 style={{ textAlign: 'center' }}> การวินิจฉัยโรคติดต่อ </h2>
            </Grid>

            <Grid item xs={12}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel>ชื่อผู้เข้ารับการรักษา</InputLabel>
                <Select
                  name="Patient"
                  value={diagnosis.Patient || ''}
                  onChange={handleChange}
                  label="ชื่อผู้เข้ารับการรักษา"
                  fullWidth
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
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel>ชื่อโรคติดต่อ</InputLabel>
                <Select
                  name="Disease"
                  value={diagnosis.Disease || ''}
                  onChange={handleChange}
                  label="ชื่อโรคติดต่อ"
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

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  error={diagnosticMessagesError ? true : false}
                  className={classes.formControl}
                  name="DiagnosticMessages"
                  label="การวินิจฉัยโรค หรือ อาการที่แสดง"
                  variant="outlined"
                  type="string"
                  helperText={diagnosticMessagesError}
                  value={diagnosis.DiagnosticMessages || ''}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={10}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <TextField
                  error={surveillancePeriodError ? true : false}
                  className={classes.formControl}
                  name="SurveillancePeriod"
                  label="ระยะเวลาเฝ้าระวัง"
                  variant="outlined"
                  type="string"
                  helperText={surveillancePeriodError}
                  value={diagnosis.SurveillancePeriod || ''}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  error={treatmentError ? true : false}
                  className={classes.formControl}
                  name="Treatment"
                  label="การรักษา (เช่น แผนไทย)"
                  variant="outlined"
                  type="string"
                  helperText={treatmentError}
                  value={diagnosis.Treatment || ''}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  variant="outlined"
                  required
                  label="วันที่ทำการวินิจฉัย"
                  name="Diagnosisdate"
                  type="date"
                  value={diagnosis.Diagnosisdate || ''}
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
                <TextField
                  required={true}
                  disabled // ห้ามแก้ไข
                  // id="name"
                  name="employee"
                  type="string"
                  label="รหัสผู้บันทึกข้อมูล"
                  variant="outlined"
                  fullWidth
                  multiline
                  value={window.localStorage.getItem("username") || ""}
                  onChange={handleChange}
                />
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
