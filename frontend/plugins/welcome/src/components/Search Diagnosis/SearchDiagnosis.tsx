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
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
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
    Grid,
    TextField,
    InputBase,
    Select,
    FormControl,
    InputLabel,
    Container,
} from '@material-ui/core';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import SearchIcon from '@material-ui/icons/Search';
import { EntPatient } from '../../api/models/EntPatient';
import { EntDiagnosis } from '../../api';

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

function redirecLogOut() {
    // redire Page ... http://localhost:3000/
    window.location.href = "http://localhost:3000/";
}

function redirectToDiagnosis() {
  window.location.href = "http://localhost:3000/diagnosis"
}

function redirectToSearchDiagnosis() {
window.location.href = "http://localhost:3000/searchdiagnosis"
}

export default function ComponentsTable() {
    const classes = useStyles();
    const api = new DefaultApi();
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [search, setSearch] = useState(false);
    const [checkpatient, setCheckPatient] = useState(false);
    const [diagnosis, setDiagnosis] = useState(Array);
    const [patient, setPatient] = useState(String);
    const [choosediagnosis, setChooseDiagnosis] = useState(Array);

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
        const getDiagnosiss = async () => {
            const res = await api.listDiagnosis({ limit: undefined, offset: 0 });
            setLoading(false);
            setDiagnosis(res);
        };
        getDiagnosiss();
    }, [loading]);


    const inputHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSearch(false);
        setCheckPatient(false);
        setPatient(event.target.value as string);
        if (event.target.value == "" ){
            renewtable();
        }
    };

    const renewtable = async () => {
        const res = await api.listDiagnosis({ limit: undefined, offset: 0 });
        setLoading(false);
        setDiagnosis(res);
    }

    const checksearch = async () => {
        var check = false;
        var str = "asdfxzc";
        var temparr:any[] = [];
        str.slice()
        diagnosis.map((item: any) => {
            if (patient != "") {
                if ((item.edges?.patient?.patientName).includes(patient)) {
                    setCheckPatient(true);
                    check = true;
                    temparr.push(item);
                }
            }
        })
        if (!check) {
            alertMessage("error", "ไม่พบข้อมูล");
        } else {
            diagnosis.splice(0, diagnosis.length);
            temparr.map((item: any) => {
                diagnosis.push(item);
            })
            alertMessage("success", "ค้นหาสำเร็จ");
        }
        console.log(checkpatient);
        if (patient == "") {
            alertMessage("info", "กรุณากรอกผู้ป่วยเพื่อทำการค้นหา");
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
        <StyledMenuItem button onClick={redirectToDiagnosis}>
          <ListItemIcon>
            <LocalHospitalRoundedIcon fontSize="default" />
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
                <ContentHeader title="ข้อมูลการจัดเก็บการวินิจฉัย">
                    <Button
                        size="large"
                        style={{ float: 'right', marginBottom: 'auto' }}
                        color="primary"
                        component={RouterLink}
                        to="/Diagnosis"
                        variant="contained"
                    >
                        เพิ่มข้อมูลการจัดเก็บการวินิจฉัย
             </Button>
                </ContentHeader>

                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <TextField
                            style={{ margin: 8, width: '30%' }}
                            placeholder="พิมพ์ชื่อผู้ป่วยที่ต้องการค้นหา"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={patient}
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
                                                <TableCell align="center">ชื่อผู้เข้ารับการรักษา</TableCell>
                                                <TableCell align="center">ชื่อโรคติดต่อ</TableCell>
                                                <TableCell align="center">ระยะเวลาเฝ้าระวัง</TableCell>
                                                <TableCell align="center">การวินิจฉัยโรค หรือ อาการที่แสดง </TableCell>
                                                <TableCell align="center">การรักษา (เช่น แผนไทย)  </TableCell>
                                                <TableCell align="center">วันที่ทำการวินิจฉัย</TableCell>
                                                <TableCell align="center">แพทย์ผู้ทำการวินิจฉัย</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {diagnosis.map((item: any) => (
                                                    <TableRow key={item.id}>
                                                        <TableCell align="center">{item.edges?.patient?.patientName}</TableCell>
                                                        <TableCell align="center">{item.edges?.disease?.diseaseName}</TableCell>
                                                        <TableCell align="center">{item.surveillancePeriod}</TableCell>
                                                        <TableCell align="center">{item.diagnosticMessages}</TableCell>
                                                        <TableCell align="center">{item.treatment}</TableCell>
                                                        <TableCell align="center">{item.diagnosisDate}</TableCell>
                                                        <TableCell align="center">{item.edges?.employee?.employeeName}</TableCell>
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