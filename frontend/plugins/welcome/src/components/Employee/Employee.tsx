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
import { EntDepartment } from '../../api/models/EntDepartment';
import { EntNametitle } from '../../api/models/EntNametitle';
import { EntPlace } from '../../api/models/EntPlace';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
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

interface Employee {
  BirthdayDate: Date;
  Email: string;
  EmployeeName: string;
  Tel: string;
  UserId: string;
  Place: number;
  Nametitle: number;
  Department: number;
  Password: string;
}

const Employee: FC<{}> = () => {
  const classes = useStyles();
  const http = new DefaultApi();

  const [employee, setEmployee] = React.useState<Partial<Employee>>({});
  const [departments, setDepartments] = React.useState<EntDepartment[]>([]);
  const [nametitles, setNametitles] = React.useState<EntNametitle[]>([]);
  const [places, setPlaces] = React.useState<EntPlace[]>([]);
  const [userIDError, setUserIDError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [telError, setTelError] = React.useState('');
  const [showInputError, setShowInputError] = React.useState(false); // for error input show

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const getNametitle = async () => {
    const res = await http.listNametitle({ limit: 10, offset: 0 });
    setNametitles(res);
  }

  const getDepartment = async () => {
    const res = await http.listDepartment({ limit: 5, offset: 0 });
    setDepartments(res);
  }

  const getPlace = async () => {
    const res = await http.listPlace({ limit: 5, offset: 0 });
    setPlaces(res);
  }

  // Lifecycle Hooks
  useEffect(() => {
    getNametitle();
    getDepartment();
    getPlace();
  }, []);


  const handleInputChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>) => {
    const name = event.target.name as keyof typeof employee;
    const { value } = event.target;
    const validateValue = value.toString()
    checkPattern(name, validateValue)
    setEmployee({ ...employee, [name]: value });
  }

  const validateUserID = (val: string) => {
    return val.match("[N,M,E,MR,P]\\d{5}");
  }

  const validateEmail = (val: string) => {
    return val.match("^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
  }

  const validateTel =(val: string) => {
    return val.length == 10 ? true : false;
  }

  const checkPattern  = (id: string, value: string) => {
    switch(id) {
      case 'UserId':
        validateUserID(value) ? setUserIDError('') : setUserIDError('รหัสพนักงานขึ้นต้นด้วย N,M,E,MR,P ตามด้วยตัวเลข 5 ตัว');
        return;
      case 'Tel':
        validateTel(value) ? setTelError('') : setTelError('หมายเลขโทรศัพท์จำนวน 10 หลัก');
        return;
      case 'Email':
        validateEmail(value) ? setEmailError('') : setEmailError('รูปแบบอีเมลไม่ถูกต้อง');
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
    switch(field) {
      case 'UserId':
        alertMessage("error","รหัสพนักงานขึ้นต้นด้วย N,M,E,MR,P ตามด้วยตัวเลข 5 ตัว");
        return;
      case 'Tel':
        alertMessage("error","หมายเลขโทรศัพท์จำนวน 10 หลัก");
        return;
      case 'Email':
        alertMessage("error","รูปแบบอีเมลไม่ถูกต้อง");
        return;
      default:
        alertMessage("error","บันทึกข้อมูลไม่สำเร็จ");
        return;
    }
  }

  function clear() {
    setEmployee({});
  /*  setShowInputError(false); */
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
    let { UserId, Nametitle, EmployeeName, Tel, Email, BirthdayDate, Department, Place, Password } = employee;
    if (!UserId || !Nametitle || !EmployeeName || !Tel || !Email || !BirthdayDate || !Department || !Place || !Password) {
      Toast.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    } 

    const apiUrl = 'http://localhost:8080/api/v1/employees';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    };

    fetch(apiUrl, requestOptions)
    .then(response => response.json())
    .then(data => {console.log(data.save)
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

  function redirectToEmployee() {
    window.location.href = "http://localhost:3000/employee";
}

function redirectToSearchEmployee() {
  window.location.href = "http://localhost:3000/searchemployee";
}

  function redirecLogOut() {
    // redirect Page ... http://localhost:3000/
    window.location.href = "http://localhost:3000/";
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

        <StyledMenuItem button onClick={redirectToEmployee}>
          <ListItemIcon>
            <GroupAddRoundedIcon fontSize="default" />
          </ListItemIcon>
          <ListItemText primary="Add Employee" />
        </StyledMenuItem>

        <StyledMenuItem button onClick={redirectToSearchEmployee}>
          <ListItemIcon>
            <SearchIcon fontSize="default" />
          </ListItemIcon>
          <ListItemText primary="Search Employee" />
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
          to="/SearchEmployee"
          variant="contained"
        >
          แสดงข้อมูล
             </Button>

        <Container maxWidth="sm">
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <h2 style={{ textAlign: 'center' }}> เพิ่มข้อมูลบุคลากร </h2>
            </Grid>
            <Grid item xs={10}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  error={userIDError ? true : false}
                  name="UserId"
                  label="รหัสพนักงาน"
                  variant="outlined"
                  type="string"
                  size="medium"
                  helperText={userIDError}
                  value={employee.UserId || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel>คำนำหน้าชื่อ</InputLabel>
                <Select
               //   error={!employee.nametitle && showInputError}
                  name="Nametitle"
                  label="คำนำหน้าชื่อ"
                  value={employee.Nametitle || ''}
                  onChange={handleInputChange}
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

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                //  error={!employee.employeeName && showInputError}
                  name="EmployeeName"
                  label="ชื่อ-นามสกุล"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={employee.EmployeeName || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  error={telError ? true : false}
                  name="Tel"
                  label="เบอร์โทรศัพท์"
                  inputProps={{ maxLength: 10 }}
                  helperText={telError}
                  variant="outlined"
                  type="int"
                  size="medium"
                  value={employee.Tel || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  variant="outlined"
                  required
               //   error={!employee.birthdayDate && showInputError}
                  label="วัน/เดือน/ปีเกิด"
                  name="BirthdayDate"
                  type="date"
                  value={employee.BirthdayDate || ''}
                  className={classes.textTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel>แผนกที่รับผิดชอบ</InputLabel>
                <Select
                  required
              //    error={!employee.department && showInputError}
                  name="Department"
                  label="แผนกที่รับผิดชอบ"
                  value={employee.Department || ''}
                  onChange={handleInputChange}
                >
                  {departments.map(item => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.departmentName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel>สถานที่ทำงาน</InputLabel>
                <Select
                  required
               //   error={!employee.place && showInputError}
                  name="Place"
                  label="สถานที่ทำงาน"
                  value={employee.Place || ''}
                  onChange={handleInputChange}
                >
                  {places.map(item => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.placeName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  error={emailError ? true : false}
                  helperText= {emailError}
                  name="Email"
                  label="อีเมล"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={employee.Email || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                //  error={!employee.password && showInputError}
                  name="Password"
                  label="รหัสผ่านชั่วคราว"
                  variant="outlined"
                  size="medium"
                  type="string"
                  value={employee.Password || ''}
                  onChange={handleInputChange}
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

export default Employee;
