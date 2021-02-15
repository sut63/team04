import React, { FC, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'; // alert
import { DefaultApi } from '../../api/apis';
import { EntEmployee } from '../../api/models/EntEmployee';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © SE Team04 | '}
      <Link color="inherit" href="https://github.com/sut63/team04">
        My Github
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '98vh',
  },
  image: {
    backgroundImage: 'url(https://i0.wp.com/www.korseries.com/wp-content/uploads/2017/09/romantic-doctor.jpg?fit=1352%2C806&ssl=1)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonStyle: {
    marginTop: 20
  },
}));

const Login: FC<{}> = () => {
  const classes = useStyles();
  const api = new DefaultApi();
  const [employees, setEmployees] = useState<EntEmployee[]>([]);
  const [userID, setUserID] = React.useState(String);
  const [password, setPassword] = React.useState(String);

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

  const userIDHandleChange = (event: any) => {
    setUserID(event.target.value as string);
  };

  const passwordHandleChange = (event: any) => {
    setPassword(event.target.value as string);
  };

  const getEmployee = async () => {
    const res: any = await api.listEmployee({ limit: 0, offset: 0 });
    setEmployees(res);
  };

  useEffect(() => {
    getEmployee();
  }, []);

  function SigninCheck() {
    var success = false;
    employees.map((item: any) => {
      if (item.userId == userID && item.password == password) {
        if (item.edges?.department.departmentName === "เจ้าหน้าที่เวชระเบียน") {
          success = true;
          Toast.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
          });
          setInterval(() => {
            window.location.href = "http://localhost:3000/employee";
          }, 700);
          window.localStorage.setItem("username", userID);
        } else if (item.edges?.department.departmentName === "เภสัชกร") {
          success = true;
          Toast.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
          });
          setInterval(() => {
            window.location.href = "http://localhost:3000/drug";
          }, 700);
          window.localStorage.setItem("username", userID);
        } else if (item.edges?.department.departmentName === "แพทย์") {
          success = true;
          Toast.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
          });
          setInterval(() => {
            window.location.href = "http://localhost:3000/diagnosis";
          }, 700);
          window.localStorage.setItem("username", userID);
        } else if (item.edges?.department.departmentName === "แพทย์ระบาดวิทยา") {
          success = true;
          Toast.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
          });
          setInterval(() => {
            window.location.href = "http://localhost:3000/disease";
          }, 700);
          window.localStorage.setItem("username", userID);
        } else if (item.edges?.department.departmentName === "พยาบาล") {
          success = true;
          Toast.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
          });
          setInterval(() => {
            window.location.href = "http://localhost:3000/patient";
          }, 700);
          window.localStorage.setItem("username", userID);
        }
      }else if (userID == "MR12345" && password == "12345mr") {
        success = true;
        Toast.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
        });
        window.location.href = "http://localhost:3000/employee";
      }
    });
    if(!success){
      Toast.fire({
        icon: 'error',
        title: 'รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง',
      });
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={userIDHandleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordHandleChange}
            />
            <Button
              fullWidth
              className={classes.buttonStyle}
              variant="contained"
              color="primary"
              onClick={SigninCheck}
            >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;