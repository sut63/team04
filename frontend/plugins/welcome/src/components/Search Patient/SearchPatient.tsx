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
    Link
  } from '@material-ui/core';

import { EntPatient } from '../../api/models/EntPatient';

import Swal from 'sweetalert2'
import { Content} from '@backstage/core';
import LocalHotelRoundedIcon from '@material-ui/icons/LocalHotelRounded';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';


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
  //toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  showCloseButton: true,

});


export default function ComponentsTable() {

    //--------------------------
    ;

  const classes = useStyles();
  const api = new DefaultApi();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);

  //---------------------------
  const [checkidcard, setIdcards] = useState(false);
  const [patient, setPatient] = useState<EntPatient[]>([])

  //--------------------------
  const [idcard, setIdcard] = useState(String);
  const profile = { givenName: 'ระบบค้นหาข้อมูลผู้ป่วย' };
  const alertMessage = (icon: any, title: any) => {
    Toast.fire({
      icon: icon,
      title: title,
    });
    setSearch(false);
  }

  useEffect(() => {
    const getPatients = async () => {
      const res = await api.listPatient({ offset: 0 });
      setLoading(false);
      setPatient(res);
    };
    getPatients();
  }, [loading]);

  const idcardhandlehange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearch(false);
    setIdcards(false);
    setIdcard(event.target.value as string);

  };

  const cleardata = () => {
    setIdcard("");
    setSearch(false);
    setIdcards(false);
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
    patient.map(item => {
      if (idcard != "") {
        if (item.idcard?.includes(idcard)) {
          setIdcards(true);
          alertMessage("success", "ค้นหาสำเร็จ");
          check = true;
        }
      }
    })
    if (!check) {
      alertMessage("error", "ไม่พบข้อมูล");
    }
    console.log(checkidcard)
    if (idcard == "") {
      alertMessage("info", "แสดงข้อมูลผู้ป่วย");
    }
  };
  
  function redirectToPatient() {
    window.location.href = "http://localhost:3000/patient"
}

function redirectToSearchPatient() {
  window.location.href = "http://localhost:3000/searchpatient"
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

        <StyledMenuItem button onClick={redirectToPatient}>
          <ListItemIcon>
            <LocalHotelRoundedIcon fontSize="default" />
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
                    ค้นหาข้อมูลผู้ป่วย
            </h1>
                </div>

                <div>
                  <FormControl
                    className={classes.margin}
                    variant="outlined"
                  >
                    <div className={classes.paper}><strong>กรุณากรอกเลขประจำตัวประชาชน</strong></div>
                    <TextField
                      id="idcard"
                      value={idcard}
                      onChange={idcardhandlehange}
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
                  {  checkidcard ? (
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

                          {patient.filter((filter: any) => filter.idcard.includes(idcard)).map((item: any) => (
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
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                    : idcard == "" ? (
                      <div>
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