import React, { FC, useEffect } from 'react';
import { Content, Header, Page, pageTheme } from '@backstage/core';
import Swal from 'sweetalert2'; // alert
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import {
  Container,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Avatar,
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { palette } from '@material-ui/system';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { DefaultApi } from '../../api/apis';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { EntEmployee } from '../../api/models/EntEmployee'; // import interface Employee
import { EntDrugType } from '../../api/models/EntDrugType'; // import interface Drugtype
import { EntDisease } from '../../api/models/EntDisease'; // import interface Disease
import { EntDrug } from '../../api';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
    color: 'blue',
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
    marginBottom: 50,
  },
  logoutButton: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white'
  },
}));


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

interface Drug {
  employee: number;
  name: string;
  drugtype: number;
  howto: string;
  property: string;
  disease: string;

  // create_by: number;
}
const Drug: FC<{}> = () => {
  const classes = useStyles();
  const http = new DefaultApi();
  const [drug, setDrug] = React.useState<Partial<Drug>>({});
  const [showInputError, setShowInputError] = React.useState(false); // for error input show
  const [employees, setEmployees] = React.useState<EntEmployee[]>([]);
  const [diseases, setDiseases] = React.useState<EntDisease[]>([]);
  const [drugtypes, setDrugTypes] = React.useState<EntDrugType[]>([]);

  const getEmployee = async () => {
    const res = await http.listEmployee({ limit: 3, offset: 0 });
    setEmployees(res);
  };

  const getDisease = async () => {
    const res = await http.listDisease({ limit: 5, offset: 0 });
    setDiseases(res);
  };

  const getDrugtype = async () => {
    const res = await http.listDrugtype({ limit: 3, offset: 0 });
    setDrugTypes(res);
  };
  // Lifecycle Hooks
  useEffect(() => {
    getEmployee();
    getDisease();
    getDrugtype();
  }, []);

  // set data to object playlist_video
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const name = event.target.name as keyof typeof Drug;
    const { value } = event.target;
    setDrug({ ...drug, [name]: value });
    console.log(drug);
  };

  // clear input form
  function clear() {
    setDrug({});
    setShowInputError(false);
  }

  // function save data
  function save() {
    setShowInputError(true);
    let { employee, name, drugtype, property, howto, disease } = drug;
    if (!employee || !name || !drugtype || !property || !howto || !disease) {
      Toast.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }
    const apiUrl = 'http://localhost:8080/api/v1/drugs';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(drug),
    };

    console.log(drug); // log ดูข้อมูล สามารถ Inspect ดูข้อมูลได้ F12 เลือก Tab Console

    fetch(apiUrl, requestOptions).then(response => {
      console.log(response);
      response.json();
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
    });
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
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ระบบบันทึกข้อมูลยาโรคติดต่อ

          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
              <Link variant="h6" onClick={redirecLogOut} className={classes.logoutButton}>
                  LOGOUT
                </Link>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            item
            xs={10}
          >
            <h1> ข้อมูลยา </h1>
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>รหัสบุคลากร</InputLabel>
              <Select
                name="employee"
                value={drug.employee || ''}
                onChange={handleChange}
                label="รหัสบุคลากร"
              >
                {employees.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                    {item.employeeName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <TextField
              required={true}
              error={!drug.name && showInputError}
              id="name"
              name="name"
              type="string"
              label="ชื่อยา , วัคซีน "
              variant="outlined"
              fullWidth
              multiline
              value={drug.name || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>ประเภทยา</InputLabel>
              <Select
                name="drugtype"
                value={drug.drugtype || ''}
                onChange={handleChange}
                label="ประเภทยา"
                fullWidth
              >
                {drugtypes.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.drugTypeName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={10}>
            <TextField
              required={true}
              error={!drug.property && showInputError}
              name="property"
              label="สรรพคุณยา"
              variant="outlined"
              fullWidth
              multiline
              value={drug.property || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required={true}
              error={!drug.howto && showInputError}
              name="howto"
              label="วิธีการใช้"
              variant="outlined"
              fullWidth
              multiline
              value={drug.howto || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>โรคติดต่อ</InputLabel>
              <Select
                name="disease"
                value={drug.disease || ''}
                onChange={handleChange}
                label="โรคติดต่อ"
              >
                {diseases.map(item => {
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
            <Button
              name="saveData"
              size="large"
              variant="contained"
              color="primary"
              disableElevation
              className={classes.buttonSty}
              onClick={save}
            >
              บันทึกข้อมูลยา
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Drug;
