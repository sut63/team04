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

import { DefaultApi } from '../../api/apis';
import { EntDisease } from '../../api/models/EntDisease';
import { EntEmployee } from '../../api/models/EntEmployee';
import { EntPatient } from '../../api/models/EntPatient';
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

  diagnosticmessages: string;
  surveillanceperiod: string;
  diagnosisdate: Date;
  disease: number;
  employee: number;
  patient: number;
  

}

const Diagnosis: FC<{}> = () => {
  const classes = useStyles();
  const http = new DefaultApi();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    position: undefined,
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
    let {diagnosticmessages, surveillanceperiod, diagnosisdate } = diagnosis;
    if (!diagnosticmessages || !surveillanceperiod || !diagnosisdate) {
      Toast.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }

    //เช็คแล้วเก็บค่าไว้ใน employee
diagnosis.employee = employee.filter(emp => emp.userId === window.localStorage.getItem("username"))[0].id;

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
                    {item.idcard}
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
          


            <Grid item xs={10}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  error={!diagnosis.surveillanceperiod && showInputError}
                  name="userId"
                  label="ระยะเวลาเฝ้าระวัง"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={diagnosis.surveillanceperiod || ''}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  error={!diagnosis.diagnosticmessages && showInputError}
                  name="DiagnosticMessages"
                  label="การวินิจฉัยโรค หรือ อาการที่แสดง"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={diagnosis.diagnosticmessages || ''}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  variant="outlined"
                  required
                  error={!diagnosis.diagnosisdate && showInputError}
                  label="วันที่ทำการวินิจฉัย"
                  name="DiagnosisDate"
                  type="date"
                  value={diagnosis.diagnosisdate || ''}
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
                    {item.userId}
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
