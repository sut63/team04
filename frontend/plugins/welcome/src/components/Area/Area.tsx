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
  ListItemIcon,
  ListItemText,
  Menu,
  MenuProps,
  MenuItem,
  Button
} from '@material-ui/core';
import { DefaultApi } from '../../api/apis';
import { EntDisease } from '../../api/models/EntDisease';
import { EntEmployee } from '../../api/models/EntEmployee';
import { EntLevel } from '../../api/models/EntLevel';
import { EntStatistic } from '../../api/models/EntStatistic';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AddLocationRoundedIcon from '@material-ui/icons/AddLocationRounded';
import SentimentVeryDissatisfiedRoundedIcon from '@material-ui/icons/SentimentVeryDissatisfiedRounded';


//css
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
  multilineColor: {
    color: 'red'
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

interface area {
  Employee: number;
  AreaName: string;
  AreaDistrict: string;
  AreaSubDistrict: string;
  Level: number;
  Statistic: number;
  Disease: number;

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [areaNameError, setAreaNameError] = React.useState('');
  const [areaDistrictError, setAreaDistrictError] = React.useState('');
  const [areaSubDistrictError, setAreaSubDistrictError] = React.useState('');
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    const res = await http.listDisease({ limit: undefined, offset: 0 });
    setDiseases(res);
  }

  const getEmployee = async () => {
    const res = await http.listEmployee({ limit: undefined, offset: 0 });
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
    event: React.ChangeEvent<{ name?: string; value: any }>,
  ) => {
    const name = event.target.name as keyof typeof Area;
    const { value } = event.target;
    const validateValue = value.toString()
    checkPattern(name, validateValue)
    setAreas({ ...areas, [name]: value });
  }
  // ฟังก์ชั่นสำหรับ validate จังหวัด
  const validateAreaName = (val: string) => {
    return val.match("^[ก-ฮ]");
  }

  // ฟังก์ชั่นสำหรับ validate อำเภอ
  const validateAreaDistrict = (val: string) => {
    return val.match("^[ก-ฮ]");
  }

  // ฟังก์ชั่นสำหรับ validate ตำบล
  const validateAreaSubDistrict = (val: string) => {
    return val.match("^[ก-ฮ]");
  }

  // สำหรับตรวจสอบรูปแบบข้อมูลที่กรอก ว่าเป็นไปตามที่กำหนดหรือไม่
  const checkPattern = (id: string, value: string) => {
    switch (id) {
      case 'AreaName':
        validateAreaName(value) ? setAreaNameError('') : setAreaNameError('ชื่อจังหวัดต้องเป็นตัวอักษร');
        return;
      case 'AreaDistrict':
        validateAreaDistrict(value) ? setAreaDistrictError('') : setAreaDistrictError('ชื่ออำเภอต้องเป็นตัวอักษร');
        return;
      case 'AreaSubDistrict':
        validateAreaSubDistrict(value) ? setAreaSubDistrictError('') : setAreaSubDistrictError('ชื่อตำบลต้องเป็นตัวอักษร')
        return;
      default:
        return;
    }
  }

  const alertMessage = (icon: any, title: any) => {
    Toast.fire({
      icon: icon,
      title: title,
    });
  }

  const checkCaseSaveError = (field: string) => {
    switch (field) {
      case 'AreaName':
        alertMessage("error", "ชื่อจังหวัดต้องเป็นตัวอักษร");
        return;
      case 'AreaDistrict':
        alertMessage("error", "ชื่ออำเภอต้องเป็นตัวอักษร");
        return;
      case 'AreaSubDistrict':
        alertMessage("error", "ชื่อตำบลต้องเป็นตัวอักษร");
        return;
      default:
        alertMessage("error", "บันทึกข้อมูลไม่สำเร็จ");
        return;
    }
  }
  function clear() {
    setAreas({});
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

    /* setShowInputError(true)
     let { areaName, areaDistrict, areaSubDistrict, level, statistic, disease } = areas;
     if (!areaName || !areaDistrict || !areaSubDistrict || !level || !statistic || !disease) {
       Toast.fire({
         icon: 'error',
         title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
       });
       return;
     }*/

    //เช็คแล้วเก็บค่าไว้ใน employee
    areas.Employee = employees.filter(emp => emp.userId === window.localStorage.getItem("username"))[0].id;

    const apiUrl = 'http://localhost:8080/api/v1/areas';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(areas),
    };

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data.save)
        console.log(requestOptions)
        if (data.status == true) {
          clear();
          Toast.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
          });
        } else {
          checkCaseSaveError(data.error.Name)
        }
      });
  };

  function redirecLogOut() {
    //redirec Page ... http://localhost:3000/
    window.location.href = "http://localhost:3000/";
  }
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
      <Container maxWidth="sm">
        <Grid container spacing={3}>

          <Grid item xs={10}>
            <h2 style={{ textAlign: 'center' }}> เพิ่มข้อมูลพื้นที่เสี่ยง </h2>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={9}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                error={areaNameError ? true : false}
                className={classes.formControl}
                name="AreaName"
                label="ชื่อจังหวัด"
                variant="outlined"
                helperText={areaNameError}
                value={areas.AreaName || ''}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={9}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                error={areaDistrictError ? true : false}
                className={classes.formControl}
                name="AreaDistrict"
                label="ชื่ออำเภอ"
                variant="outlined"
                helperText={areaDistrictError}
                value={areas.AreaDistrict || ''}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={9}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                error={areaSubDistrictError ? true : false}
                className={classes.formControl}
                name="AreaSubDistrict"
                label="ชื่อตำบล"
                variant="outlined"
                helperText={areaSubDistrictError}
                value={areas.AreaSubDistrict || ''}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={9}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>ระดับความเสี่ยง</InputLabel>
              <Select
                error={!areas.Level && showInputError}
                name="Level"
                value={areas.Level || ''}
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
                error={!areas.Statistic && showInputError}
                name="Statistic"
                value={areas.Statistic || ''}
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


          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>โรคติดต่อ</InputLabel>
              <Select
                error={!areas.Disease && showInputError}
                name="Disease"
                value={areas.Disease || ''}
                onChange={handleInputChange}
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
            <TextField
              required={true}
              disabled // ห้ามแก้ไข
              // id="name"
              name="Employee"
              type="string"
              label="รหัสผู้บันทึกข้อมูล"
              variant="outlined"
              color="primary"
              fullWidth
              multiline
              value={window.localStorage.getItem("username") || ""}
              onChange={handleInputChange}
            />
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
    </div>
  );
};

export default Area;
