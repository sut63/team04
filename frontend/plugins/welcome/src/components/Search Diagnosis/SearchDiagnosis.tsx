import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { DefaultApi } from '../../api/apis';
import { EntDiagnosis } from '../../api/models/EntDiagnosis';
import Swal from 'sweetalert2'
import LocalHotelRoundedIcon from '@material-ui/icons/LocalHotelRounded';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Content} from '@backstage/core';
import {
    Menu,
    MenuProps,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    ListItemIcon,
    ListItemText,
    Grid,
    TextField,
    FormControl,
    MenuItem,
    Button,
    Link,
  } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(10),
      },
    headsearch: {
      width: 'auto',
      margin: '10px',
      color: '#FFFFFF',
      background: '#2196F3',
    },
    margin: {
      margin: theme.spacing(1),
    },
    margins: {
      margin: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
      },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    table: {
      minWidth: 500,
    },
    logoutButton: {
        marginLeft: 10,
        marginRight: 10,
        color: 'white'
      },


  }),
);

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
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});


export default function ComponentsTable() {

    //--------------------------
    ;

  const classes = useStyles();
  const api = new DefaultApi();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);

  //---------------------------
  const [checkpatient, setPatients] = useState(false);
  const [diagnosis, setDiagnosis] = useState(Array)

  //--------------------------
  const [patient, setPatient] = useState(String);
  const profile = { givenName: 'ระบบค้นหาการจัดเก็บการวินิจฉัย' };
  const alertMessage = (icon: any, title: any) => {
    Toast.fire({
      icon: icon,
      title: title,
    });
    setSearch(false);
  }

  useEffect(() => {
    const getDiagnosiss = async () => {
      const res = await api.listDiagnosis({ offset: 0 });
      setLoading(false);
      setDiagnosis(res);
    };
    getDiagnosiss();
  }, [loading]);

  const patienthandlehange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearch(false);
    setPatients(false);
    setPatient(event.target.value as string);

  };

  const cleardata = () => {
    setPatient("");
    setSearch(false);
    setPatients(false);
    setSearch(false);

  }
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const checkresearch = async () => {
    var check = false;
    diagnosis.map((item: any) => {
      if (patient != "") {
        if (item.edges?.patient?.patientName.includes(patient)){
          setPatients(true);
          alertMessage("success", "ค้นหาสำเร็จ");
          check = true;
        }
      }
    })
    if (!check) {
      alertMessage("error", "ไม่พบข้อมูล");
    }
    console.log(checkpatient)
    if (patient == "") {
      alertMessage("info", "แสดงการวินิจฉัย");
    }
  };
  
  function redirectToDiagnosis() {
    window.location.href = "http://localhost:3000/diagnosis"
}

function redirectToSearchDiagnosis() {
  window.location.href = "http://localhost:3000/searchdiagnosis"
}

  //Java 
  function redirecLogOut() {
    //redirec Page ... http://localhost:3000/
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

        <StyledMenuItem button onClick={redirectToDiagnosis}>
          <ListItemIcon>
            <LocalHotelRoundedIcon fontSize="default" />
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
        <Grid container item xs={12} justify="center">
          <Grid item xs={5}>
            <Paper>

              <Typography align="center" >
                <div style={{ background: 'linear-gradient(45deg, #CCCCCC 15%, #CCCCCC 120%)', height: 35 }}>
                  <h1 style={
                    {
                      //color: "#000000",
                      //borderRadius: 5,
                      //height: 18,
                      //padding: '0 30px',
                      fontSize: '20px',
                    }}>
                    ระบบค้นหาการจัดเก็บการวินิจฉัย
            </h1>
                </div>

                <div>
                  <FormControl
                    className={classes.margin}
                    variant="outlined"
                  >
                    <div className={classes.paper}><strong>กรุณากรอกชื่อผู้ป่วย</strong></div>
                    <TextField
                      id="patient"
                      value={patient}
                      onChange={patienthandlehange}
                      type="string"
                      size="small"

                      style={{ width: 250 }}
                    />
                  </FormControl>
                </div>
                <div></div>
                <Button
                  onClick={() => {
                    checkresearch();
                    setSearch(true);

                  }}
                  
                  className={classes.margins}
                  variant="contained"
                  style={{ background: "#5C9DC0", height: 40 }}>
                  <h3
                    style={
                      {
                        color: "#FFFFFF",
                        padding: '0 10px',

                      }
                    }>
                    Search
            </h3>
                </Button>
                <Button
                  onClick={() => {
                    cleardata();

                  }}
                  className={classes.margins}
                  variant="contained"
                  style={{ background: "#DD0000", height: 40 }}>
                  <h3
                    style={
                      {
                        color: "#FFFFFF",
                        padding: '0 20px',

                      }
                    }>
                    Delete
            </h3>
                </Button>
              </Typography>
            </Paper>
          </Grid>
        </Grid>


        <Grid container justify="center">
          <Grid item xs={12} md={10}>
            <Paper>
              {search ? (
                <div>
                  {  checkpatient ? (
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">ชื่อผู้เข้ารับการรักษา</TableCell>
                            <TableCell align="center">ชื่อโรคติดต่อ</TableCell>
                            <TableCell align="center">ระยะเวลาเฝ้าระวัง</TableCell>
                            <TableCell align="center">การวินิจฉัยโรค หรือ อาการที่แสดง </TableCell>
                            <TableCell align="center">การรักษา (เช่น แผนไทย)  </TableCell>
                            <TableCell align="center">วันที่ทำการวินิจฉัย</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {diagnosis.filter((filter: any) => filter.edges?.patient.patientName.includes(patient)).map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell align="center">{item.edges?.patient?.patientName}</TableCell>
                                <TableCell align="center">{item.edges?.disease?.diseaseName}</TableCell>
                                <TableCell align="center">{item.surveillancePeriod}</TableCell>
                                <TableCell align="center">{item.diagnosticMessages}</TableCell>
                                <TableCell align="center">{item.treatment}</TableCell>
                                <TableCell align="center">{item.diagnosisDate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                    : patient == "" ? (
                      <div>
                        <TableContainer component={Paper}>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                              <TableCell align="center">ชื่อผู้เข้ารับการรักษา</TableCell>
                              <TableCell align="center">ชื่อโรคติดต่อ</TableCell>
                              <TableCell align="center">ระยะเวลาเฝ้าระวัง</TableCell>
                              <TableCell align="center">การวินิจฉัยโรค หรือ อาการที่แสดง </TableCell>
                              <TableCell align="center">การรักษา (เช่น แผนไทย)  </TableCell>
                              <TableCell align="center">วันที่ทำการวินิจฉัย</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>

                              {diagnosis.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell align="center">{item.edges?.patient?.patient}</TableCell>
                                    <TableCell align="center">{item.edges?.disease?.diseaseName}</TableCell>
                                    <TableCell align="center">{item.surveillancePeriod}</TableCell>
                                    <TableCell align="center">{item.diagnosticMessages}</TableCell>
                                    <TableCell align="center">{item.treatment}</TableCell>
                                    <TableCell align="center">{item.diagnosisDate}</TableCell>
                                    </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                      </div>
                    ) : null}
                </div>
              ) : null}
            </Paper>
          </Grid>
        </Grid>
      </Content>
    </div>
    
  );


}