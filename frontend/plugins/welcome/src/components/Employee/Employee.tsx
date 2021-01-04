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
import { EntDepartment } from '../../api/models/EntDepartment';
import { EntNametitle } from '../../api/models/EntNametitle';
import { EntPlace } from '../../api/models/EntPlace';


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

interface Employee {
  birthdayDate: Date;
  email: string;
  employeeName: string;
  tel: string;
  userId: string;
  place: number;
  nametitle: number;
  department: number;
  password: string;
}

const Employee: FC<{}> = () => {
  const classes = useStyles();
  const http = new DefaultApi();

  const [employee, setEmployee] = React.useState<Partial<Employee>>({});
  const [departments, setDepartments] = React.useState<EntDepartment[]>([]);
  const [nametitles, setNametitles] = React.useState<EntNametitle[]>([]);
  const [places, setPlaces] = React.useState<EntPlace[]>([]);
  const [showInputError, setShowInputError] = React.useState(false); // for error input show

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
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const name = event.target.name as keyof typeof employee;
    const { value } = event.target;
    setEmployee({ ...employee, [name]: value });
  }

  function clear() {
    setEmployee({});
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
    let { userId, nametitle, employeeName, tel, email, birthdayDate, department, place, password } = employee;
    if (!userId || !nametitle || !employeeName || !tel || !email || !birthdayDate || !department || !place || !password) {
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
    console.log(employee);

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
            ระบบจัดการโรคติดต่อ
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
              <h2 style={{ textAlign: 'center' }}> เพิ่มข้อมูลบุคลากร </h2>
            </Grid>
            <Grid item xs={10}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  error={!employee.userId && showInputError}
                  name="userId"
                  label="รหัสพนักงาน"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={employee.userId || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel>คำนำหน้าชื่อ</InputLabel>
                <Select
                  error={!employee.nametitle && showInputError}
                  name="titlename"
                  label="คำนำหน้าชื่อ"
                  value={employee.nametitle || ''}
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
                  error={!employee.employeeName && showInputError}
                  name="name"
                  label="ชื่อ-นามสกุล"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={employee.employeeName || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  error={!employee.tel && showInputError}
                  name="tel"
                  label="เบอร์โทรศัพท์"
                  variant="outlined"
                  type="int"
                  size="medium"
                  value={employee.tel || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  variant="outlined"
                  required
                  error={!employee.birthdayDate && showInputError}
                  label="วัน/เดือน/ปีเกิด"
                  name="birthdayDate"
                  type="date"
                  value={employee.birthdayDate || ''}
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
                  error={!employee.department && showInputError}
                  name="department"
                  label="แผนกที่รับผิดชอบ"
                  value={employee.department || ''}
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
                  error={!employee.place && showInputError}
                  name="place"
                  label="สถานที่ทำงาน"
                  value={employee.place || ''}
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
                  error={!employee.email && showInputError}
                  name="email"
                  label="อีเมล"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={employee.email || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  error={!employee.password && showInputError}
                  name="password"
                  label="รหัสผ่าน"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={employee.password || ''}
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
