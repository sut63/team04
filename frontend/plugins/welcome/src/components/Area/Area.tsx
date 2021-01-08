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
import { DefaultApi } from '../../api/apis';
import { EntDisease } from '../../api/models/EntDisease';
import { EntEmployee } from '../../api/models/EntEmployee';
import { EntLevel } from '../../api/models/EntLevel';
import { EntStatistic } from '../../api/models/EntStatistic';


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
  buttonSty: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    marginBottom: 50
  },
  header: {
    textAlign: 'center'
  },
  logoutButton: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white'
  },

}));

interface area {
  employee: number;
  areaName: string;
  level: number;
  statistic: number;
  disease: number;

}

const Area: FC<{}> = () => {
  const classes = useStyles();
  const http = new DefaultApi();
  const [showInputError, setShowInputError] = React.useState(false); // for error input show
  const [areas, setAreas] = React.useState<Partial<area>>({});
  const [levels, setLevels] = React.useState<EntLevel[]>([]);
  const [statistics, setStatistics] = React.useState<EntStatistic[]>([]);
  const [diseases, setDiseases] = React.useState<EntDisease[]>([]);
  const [employees, setEmployees] = React.useState<EntEmployee[]>([]);

  // alert setting


  const getLevel = async () => {
    const res = await http.listLevel({ limit: 3, offset: 0 });
    setLevels(res);
  }

  const getStatistic = async () => {
    const res = await http.listStatistic({ limit: 5, offset: 0 });
    setStatistics(res);
  }

  const getDisease = async () => {
    const res = await http.listDisease({ limit: 3, offset: 0 });
    setDiseases(res);
  }

  const getEmployee = async () => {
    const res = await http.listEmployee({ limit: 2, offset: 0 });
    setEmployees(res);
  }

  // Lifecycle Hooks
  useEffect(() => {
    getLevel();
    getStatistic();
    getDisease();
    getEmployee();
  }, []);


  const handleInputChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const name = event.target.name as keyof typeof Area;
    const { value } = event.target;
    setAreas({ ...areas, [name]: value });
  }
  function clear() {
    setAreas({});
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

    setShowInputError(true)
    let { areaName, level, statistic, disease, employee } = areas;
    if (!areaName || !level || !statistic || !disease || !employee) {
      Toast.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }
    const apiUrl = 'http://localhost:8080/api/v1/areas';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(areas),
    };
    console.log(areas); // log ดูข้อมูล สามารถ Inspect ดูข้อมูลได้ F12 เลือก Tab Console

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
    //redirec Page ... http://localhost:3000/
    window.location.href = "http://localhost:3000/";  }
return (
  <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            ระบบจัดการโรคติดต่อ
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
            <h2 style={{ textAlign: 'center' }}> เพิ่มข้อมูลพื้นที่เสี่ยง </h2>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  name="areaName"
                  error={!areas.areaName && showInputError}
                  label="ชื่อสถานที่"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={areas.areaName || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
          <Grid item xs={9}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>ระดับความเสี่ยง</InputLabel>
              <Select
                error={!areas.level && showInputError}
                name="level"
                value={areas.level || ''}
                onChange={handleInputChange}
                label="ระดับความเสี่ยง"
                fullWidth
              >
                {levels.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.levelName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={9}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>สถิติผู้ป่วยที่ติดโรค</InputLabel>
              <Select
                error={!areas.statistic && showInputError}
                name="statistic"
                value={areas.statistic || ''}
                onChange={handleInputChange}
                label="สถิติผู้ป่วยที่ติดโรค"
                fullWidth
              >
                {statistics.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.statisticName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={9}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>โรคติดต่อ</InputLabel>
              <Select
                error={!areas.disease && showInputError}
                name="disease"
                value={areas.disease || ''} 
                onChange={handleInputChange}
                label="โรคติดต่อ"
                fullWidth
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

          <Grid item xs={9}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>ผู้บันทึก</InputLabel>
              <Select
                error={!areas.employee && showInputError}
                name="employee"
                value={areas.employee || ''}
                onChange={handleInputChange}
                label="ผู้บันทึก"
                fullWidth
              >
                {employees.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.userId}{item.employeeName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
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

export default Area;
