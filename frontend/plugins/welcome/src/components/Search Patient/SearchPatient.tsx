import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { DefaultApi } from '../../api/apis';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import {
  Content,
  ContentHeader,
} from '@backstage/core';
import Swal from 'sweetalert2';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ListItemText,
  Menu,
  MenuProps,
  ListItemIcon,
  MenuItem,
  TextField,
  Grid,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddLocationRoundedIcon from '@material-ui/icons/AddLocationRounded';
//import SentimentVeryDissatisfiedRoundedIcon from '@material-ui/icons/SentimentVeryDissatisfiedRounded';
//import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(10),
  },
  table: {
    minWidth: 650,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoutButton: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white'
  },
  formControl: {
    width: 400,
  },
  buttonSty: {
    marginLeft: 20,
    marginTop: 15,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
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

//Java 
function redirecLogOut() {
  //redirec Page ... http://localhost:3000/
  window.location.href = "http://localhost:3000/";
}

function redirectToPatient() {
  window.location.href = "http://localhost:3000/patient"
}

function redirectToSearchPatient() {
  window.location.href = "http://localhost:3000/searchpatient"
}



export default function ComponentsTable() {

  const classes = useStyles();
  const api = new DefaultApi();
  const [patient, setPatient] = useState(Array);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [search, setSearch] = useState(false);
  const [checkidcard, setCheckIdcard] = useState(false);
  const [idcard, setIdcard] = useState(String);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const alertMessage = (icon: any, title: any) => {
    Toast.fire({
      icon: icon,
      title: title,
    });
    setSearch(false);
  }

  useEffect(() => {
    const getPatient = async () => {
      const res = await api.listPatient({ limit: undefined, offset: 0 });
      setLoading(false);
      setPatient(res);
    };
    getPatient();
  }, [loading]);



  const inputHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearch(false);
    setCheckIdcard(false);
    setIdcard(event.target.value as string);
    if (event.target.value == "") {
      renewtable();
    }
  };

  const renewtable = async () => {
    const res = await api.listPatient({ limit: undefined, offset: 0 });
    setLoading(false);
    setPatient(res);
  }

  const checksearch = async () => {
    var check = false;
    patient.map((item: any) => {
      if (idcard != "") {
        if ((item.idcard).includes(idcard)) {
          setCheckIdcard(true);
          alertMessage("success", "ค้นหาสำเร็จ");
          check = true;
          patient.splice(0, patient.length);
          patient.push(item);
        }
      }
    })
    if (!check) {
      alertMessage("error", "ไม่มีข้อมูลผู้ป่วย กรุณากรอกใหม่อีกครั้ง");
    }
    console.log(checkidcard)
    if (idcard == "") {
      alertMessage("info", "แสดงข้อมูลผู้ป่วย");
    }
  };

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

            <StyledMenuItem button onClick={redirectToPatient}>
              <ListItemIcon>
                <AddLocationRoundedIcon fontSize="default" />
              </ListItemIcon>
              <ListItemText primary="Add Patient" />
            </StyledMenuItem>

            <StyledMenuItem button onClick={redirectToSearchPatient}>
              <ListItemIcon>
                <SearchIcon fontSize="default" />
              </ListItemIcon>
              <ListItemText primary="Search Patient" />
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
        <ContentHeader title="ข้อมูลผู้ป่วย">
          <Button
            size="large"
            style={{ float: 'right', marginBottom: 'auto' }}
            color="primary"
            component={RouterLink}
            to="/Patient"
            variant="contained"
          >
            เพิ่มข้อมูลผู้ป่วย
       </Button>
        </ContentHeader>

        <Grid container spacing={3}>
          <Grid item xs={10}>
            <TextField
              style={{ margin: 8, width: '30%' }}
              placeholder="กรอกเลขประจำตัวประชาชนผู้ป่วย"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={idcard}
              onChange={inputHandleChange}
              type="string"
            >
            </TextField>
            <Button
              name="searchData"
              size="large"
              variant="contained"
              color="primary"
              disableElevation
              className={classes.buttonSty}
              onClick={() => {
                checksearch();
                setSearch(true);
              }}
            > ค้นหา </Button>
          </Grid>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">เลขประจำตัวประชาชน</TableCell>
                  <TableCell align="center">ประเภทผู้ป่วย</TableCell>
                  <TableCell align="center">คำนำหน้าชื่อ</TableCell>
                  <TableCell align="center">ชื่อ-นามสกุล</TableCell>
                  <TableCell align="center">เพศ</TableCell>
                  <TableCell align="center">กรุ๊ปเลือด</TableCell>
                  <TableCell align="center">ที่อยู่</TableCell>
                  <TableCell align="center">โรคประจำตัว</TableCell>
                  <TableCell align="center">ประวัติแพ้ยา</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {patient.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell align="center">{item.idcard}</TableCell>
                    <TableCell align="center">{item.edges?.category?.categoryName}</TableCell>
                    <TableCell align="center">{item.edges?.nametitle?.title}</TableCell>
                    <TableCell align="center">{item.patientName}</TableCell>
                    <TableCell align="center">{item.edges?.gender?.genderName}</TableCell>
                    <TableCell align="center">{item.edges?.bloodtype?.bloodtypeName}</TableCell>
                    <TableCell align="center">{item.address}</TableCell>
                    <TableCell align="center">{item.congenital}</TableCell>
                    <TableCell align="center">{item.allergic}</TableCell>
                    <TableCell align="center">
                    
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Content>
    </div>
  );
}

