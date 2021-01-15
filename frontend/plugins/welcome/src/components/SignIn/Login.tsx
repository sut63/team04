import React, { FC, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'; // alert


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © KOB4k | '}
      <Link color="inherit" href="https://github.com/KOB4k/SA-63_G7.git">
        Your Github
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
}));

interface Login {
  username: string;
  password: string;

}

const Login: FC<{}> = () => {
  const classes = useStyles();

  const [login, setLogin] = React.useState<Partial<Login>>({});

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


  function redirecLogin() {

    if ((login.username == "MR12345" && login.password == "12345mr")
    ) {

      Toast.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
      });

      window.location.href = "http://localhost:3000/Disease";
      console.log("LOGIN TO DISEASE");

      window.localStorage.setItem("usernameRole","Epidemiolgist") // local
      window.localStorage.setItem("username","MR12345") // local 

    }

    else if ((login.username == "N12345" && login.password == "12345n")
    ) {

      Toast.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
      });
      
      //redirec Page ... http://localhost:3000/Table
      window.location.href = "http://localhost:3000/Disease";
      console.log("LOGIN TO DISEASE");
      
      window.localStorage.setItem("usernameRole","Nurse") // local
      window.localStorage.setItem("username","N12345") // local
    }

    else if ((login.username == "M12345" && login.password == "12345m")
    ) {

      Toast.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
      });
      
      //redirec Page ... http://localhost:3000/Table
      window.location.href = "http://localhost:3000/Disease";
      console.log("LOGIN TO DISEASE");
      
      window.localStorage.setItem("usernameRole","Medical") // local
      window.localStorage.setItem("username","M12345") // local
    }

    else if ((login.username == "E12345" && login.password == "12345e")
    ) {

      Toast.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
      });
      
      //redirec Page ... http://localhost:3000/Table
      window.location.href = "http://localhost:3000/Disease";
      console.log("LOGIN TO DISEASE");
      
      window.localStorage.setItem("usernameRole","Epidemiolgist") // local
      window.localStorage.setItem("username","E12345") // local
    }
      else if ((login.username == "P12345" && login.password == "12345p")
    ) {

      Toast.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
      });
      
      //redirec Page ... http://localhost:3000/Table
      window.location.href = "http://localhost:3000/Disease";
      console.log("LOGIN TO DISEASE");
      
      window.localStorage.setItem("usernameRole","Pharmacist") // local
      window.localStorage.setItem("username","P12345") // local

    } else {
      Toast.fire({
        icon: 'error',
        title: 'username หรือ password ไม่ถูกต้อง',
      });
    }

  }

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const name = event.target.name as keyof typeof login;
    const { value } = event.target;
    setLogin({ ...login, [name]: value });
    console.log(login);
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
              value={login.username || ""}
              onChange={handleChange}

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
              value={login.password || ""}
              onChange={handleChange}

            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={redirecLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
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