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

import { EntDrug } from '../../api/models/EntDrug';

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
  const [checkdrugname, setDrugNames] = useState(false);
  const [drug, setDrug] = useState<EntDrug[]>([])

  //--------------------------
  const [drugname, setDrugName] = useState(String);
  const profile = { givenName: 'ระบบค้นหาข้อมูลยาโรคติดต่อ' };
  const alertMessage = (icon: any, title: any) => {
    Toast.fire({
      icon: icon,
      title: title,
    });
    setSearch(false);
  }

  useEffect(() => {
    const getDrugs = async () => {
      const res = await api.listDrug({ offset: 0 });
      setLoading(false);
      setDrug(res);
    };
    getDrugs();
  }, [loading]);

  const drugnamehandlehange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearch(false);
    setDrugNames(false);
    setDrugName(event.target.value as string);

  };

  const cleardata = () => {
    setDrugName("");
    setSearch(false);
    setDrugNames(false);
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
    drug.map(item => {
      if (drugname != "") {
        if (item.drugName?.includes(drugname)) {
          setDrugNames(true);
          alertMessage("success", "ค้นหาสำเร็จ");
          check = true;
        }
      }
    })
    if (!check) {
      alertMessage("error", "ไม่พบข้อมูล");
    }
    console.log(checkdrugname)
    if (drugname == "") {
      alertMessage("info", "แสดงข้อมูลยา");
    }
  };
  
  function redirectToDrug() {
    window.location.href = "http://localhost:3000/drug"
}

function redirectToSearchDrug() {
  window.location.href = "http://localhost:3000/searchdrug"
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

        <StyledMenuItem button onClick={redirectToDrug}>
          <ListItemIcon>
            <LocalHotelRoundedIcon fontSize="default" />
          </ListItemIcon>
          <ListItemText primary="Add Drug" />
        </StyledMenuItem>

        <StyledMenuItem button onClick={redirectToSearchDrug}>
          <ListItemIcon>
            <SearchIcon fontSize="default" />
          </ListItemIcon>
          <ListItemText primary="Search Drug" />
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
                    ค้นหาข้อมูลยาโรคติดต่อ
            </h1>
                </div>

                <div>
                  <FormControl
                    className={classes.margin}
                    variant="outlined"
                  >
                    <div className={classes.paper}><strong>กรุณากรอกชื่อยา</strong></div>
                    <TextField
                      id="drugname"
                      value={drugname}
                      onChange={drugnamehandlehange}
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
                  {  checkdrugname ? (
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                          <TableCell align="center">ชื่อยา</TableCell>
                          <TableCell align="center">โรค</TableCell>
                          <TableCell align="center">ประเภทยา</TableCell>
                          <TableCell align="center">สรรพคุณ</TableCell>
                          <TableCell align="center">วิธีการใช้</TableCell>                    
                          <TableCell align="center">ผู้บันทึกข้อมูล</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>

                          {drug.filter((filter: any) => filter.drugName.includes(drugname)).map((item: any) => (
                            <TableRow key={item.id}>
                            <TableCell align="center">{item.drugName}</TableCell>
                            <TableCell align="center">{item.edges?.disease?.diseaseName}</TableCell>
                            <TableCell align="center">{item.edges?.drugtype?.drugTypeName}</TableCell>
                            <TableCell align="center">{item.property}</TableCell>
                            <TableCell align="center">{item.howto}</TableCell>
                            <TableCell align="center">{item.edges?.employee?.userId}</TableCell>
                                             
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                    : drugname == "" ? (
                      <div>
                        <TableContainer component={Paper}>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">ชื่อยา</TableCell>
                                <TableCell align="center">โรค</TableCell>
                                <TableCell align="center">ประเภทยา</TableCell>
                                <TableCell align="center">สรรพคุณ</TableCell>
                                <TableCell align="center">วิธีการใช้</TableCell>
                                <TableCell align="center">ผู้บันทึกข้อมูล</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>

                              {drug.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell align="center">{item.drugName}</TableCell>
                                    <TableCell align="center">{item.edges?.disease?.diseaseName}</TableCell>
                                    <TableCell align="center">{item.edges?.drugtype?.drugTypeName}</TableCell>
                                    <TableCell align="center">{item.property}</TableCell>
                                    <TableCell align="center">{item.howto}</TableCell>
                                    <TableCell align="center">{item.edges?.employee?.userId}</TableCell>
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