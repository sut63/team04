import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';
import Swal from 'sweetalert2'; // alert Function

import {
  Content,
} from '@backstage/core';

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
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuProps,
  Menu,
  Button
} from '@material-ui/core';
import AddLocationRoundedIcon from '@material-ui/icons/AddLocationRounded';
import SentimentVeryDissatisfiedRoundedIcon from '@material-ui/icons/SentimentVeryDissatisfiedRounded';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

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


// css style 
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(10),
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

import { DefaultApi } from '../../api/apis'; // Api Gennerate From Command //npx @openapitools/openapi-generator-cli@1.0.15-4.3.1...
import { EntEmployee } from '../../api/models/EntEmployee'; //import interface Employee
import { EntDiseasetype } from '../../api/models/EntDiseasetype'; //import interface Diseasetype
import { EntSeverity } from '../../api/models/EntSeverity'; //import interface Severity

interface Disease {
  DiseaseName: string;
  Symptom: string;
  Contagion: string;
  Diseasetype: number;
  Employee: number;
  Severity: number;
}

const Disease: FC<{}> = () => {
  const classes = useStyles();
  const api = new DefaultApi();

  const [showInputError, setShowInputError] = React.useState(false); // for error input show
  const [disease, setDisease] = React.useState<Partial<Disease>>({});

  const [employees, setEmployees] = React.useState<EntEmployee[]>([]);
  const [diseasetypes, setDiseasetypes] = React.useState<EntDiseasetype[]>([]);
  const [severitys, setSeveritys] = React.useState<EntSeverity[]>([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

function redirectToArea() {
    window.location.href = "http://localhost:3000/area"
}

function redirectToSearchArea() {
  window.location.href = "http://localhost:3000/searcharea"
}

function redirectToDisease() {
    window.location.href = "http://localhost:3000/disease"
}

function redirectToSearchDisease() {
  window.location.href = "http://localhost:3000/searchdisease"
}

  // alert setting
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

  const getEmployee = async () => {
    const res = await api.listEmployee({ limit: 5, offset: 0 });
    setEmployees(res);
  };

  const getDiseasetype = async () => {
    const res = await api.listDiseasetype({ limit: 3, offset: 0 });
    setDiseasetypes(res);
  };

  const getSeverity = async () => {
    const res = await api.listSeverity({ limit: 3, offset: 0 });
    setSeveritys(res);
  };

  // Lifecycle Hooks
  useEffect(() => {
    getEmployee();
    getSeverity();
    getDiseasetype();
  }, []);

  // set data to object disease
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const name = event.target.name as keyof typeof disease;
    const { value } = event.target;
    setDisease({ ...disease, [name]: value });
    console.log(disease);
  };

  // clear input form
  function clear() {
    setDisease({});
    setShowInputError(false);
  }

  // function save data 
  function save() {

    setShowInputError(true)
    let { DiseaseName, Symptom, Contagion } = disease;
    if (!DiseaseName || !Symptom || !Contagion) {
      Toast.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }
//เช็คแล้วเก็บค่าไว้ใน employee
disease.Employee = employees.filter(emp => emp.userId === window.localStorage.getItem("username"))[0].id;

    const apiUrl = 'http://localhost:8080/api/v1/diseases';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(disease),
    };

    console.log(disease); // log ดูข้อมูล สามารถ Inspect ดูข้อมูลได้ F12 เลือก Tab Console

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

  //logout
  function redirecLogOut() {
    //redirec Page ... http://localhost:3000/
    window.location.href = "http://localhost:3000/";
  }

  // go to Welcome 
  function redirecTables() {
    //redirec Page ... http://localhost:3000/Table
    window.location.href = "http://localhost:3000/Table";
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

        <StyledMenuItem button onClick={redirectToDisease}>
          <ListItemIcon>
            <SentimentVeryDissatisfiedRoundedIcon fontSize="default" />
          </ListItemIcon>
          <ListItemText primary="Add Disease" />
        </StyledMenuItem>

        <StyledMenuItem button onClick={redirectToSearchDisease}>
          <ListItemIcon>
            <SearchIcon fontSize="default" />
          </ListItemIcon>
          <ListItemText primary="Search Disease" />
        </StyledMenuItem>

        <StyledMenuItem button onClick={redirectToArea}>
          <ListItemIcon>
            <AddLocationRoundedIcon fontSize="default" />
          </ListItemIcon>
          <ListItemText primary="Add Area" />
        </StyledMenuItem>

        <StyledMenuItem button onClick={redirectToSearchArea}>
          <ListItemIcon>
            <SearchIcon fontSize="default" />
          </ListItemIcon>
          <ListItemText primary="Search Area" />
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
          name="redirecTable"
          size="large"
          variant="contained"
          color="secondary"
          disableElevation
          style={{ float: 'right' }}
          onClick={redirecTables}
        >
          แสดงข้อมูล
              </Button>

        <Container maxWidth="sm">

          <Grid container spacing={3}>

            <Grid item xs={10}>
              <h2 style={{ textAlign: 'center' }}> เพิ่มข้อมูลโรคติดต่อ </h2>
            </Grid>

            <Grid item xs={10}>
              <TextField
                required={true}
                disabled // ห้ามแก้ไข
                // id="name"
                name="name"
                type="string"
                label="รหัส"
                variant="outlined"
                fullWidth
                multiline
                value={ window.localStorage.getItem("username") || ""}
                onChange={handleChange}
              />
            </Grid>
{/* 

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel >รหัสพนักงาน</InputLabel>
                <Select
                  name="employee"
                  value={disease.Employee  || ''}
                  onChange={handleChange}
                  label="รหัสพนักงาน"
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
          </Grid> */}

          <Grid item xs={10}>
            <TextField
              required={true}
              error={!disease.DiseaseName && showInputError}
              id="name"
              name="name"
              type="string"
              label="ชื่อโรค"
              variant="outlined"
              fullWidth
              multiline
              value={disease.DiseaseName || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel >ระดับความรุนแรง</InputLabel>
              <Select
                name="severity"
                value={disease.Severity || ''}
                onChange={handleChange}
                label="ระดับความรุนแรง"
                fullWidth
              >
                {severitys.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.severityName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={10}>
            <TextField
              required={true}
              error={!disease.Symptom && showInputError}
              name="symptom"
              label="อาการ"
              variant="outlined"
              fullWidth
              multiline
              value={disease.Symptom || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required={true}
              error={!disease.Contagion && showInputError}
              name="contagion"
              label="การแพร่กระจาย"
              variant="outlined"
              fullWidth
              multiline
              value={disease.Contagion || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel >ประเภทโรคติดต่อ</InputLabel>
              <Select
                name="diseasetype"
                value={disease.Diseasetype || ''}
                onChange={handleChange}
                label="ประเภทโรคติดต่อ"
                fullWidth
              >
                {diseasetypes.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.diseaseTypeName}
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
              บันทึกข้อมูล
              </Button>
          </Grid>
          </Grid>
        </Container>
      </Content>
    </div >
  );
};

export default Disease;