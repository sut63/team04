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
import { EntDepartment } from '../../api/models/EntDepartment';
import { EntEmployee } from '../../api';


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

function redirectToEmployee() {
    window.location.href = "http://localhost:3000/employee";
}

function redirectToSearchEmployee() {
    window.location.href = "http://localhost:3000/searchemployee";
}

export default function ComponentsTable() {
    const classes = useStyles();
    const api = new DefaultApi();
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [search, setSearch] = useState(false);
    const [checkdepartment, setCheckDepartment] = useState(false);
    const [employee, setEmployee] = useState(Array);
    const [department, setDepartment] = useState(String);
    const [chooseemployee, setChooseEmployee] = useState(Array);
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
        const getEmployees = async () => {
            const res = await api.listEmployee({ limit: undefined, offset: 0 });
            setLoading(false);
            setEmployee(res);
        };
        getEmployees();
    }, [loading]);

    const inputHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSearch(false);
        setCheckDepartment(false);
        setDepartment(event.target.value as string);
        if (event.target.value == "") {
            renewtable();
        }
    };

    const renewtable = async () => {
        const res = await api.listEmployee({ limit: undefined, offset: 0 });
        setLoading(false);
        setEmployee(res);
    }

    const checksearch = async () => {
        var check = false;
        var str = "asdfxzc";
        var temparr:any[] = [];
        str.slice()
        employee.map((item: any) => {
            if (department != "") {
                if ((item.edges?.department?.departmentName).includes(department)) {
                    setCheckDepartment(true);
                    check = true;
                    temparr.push(item);
                } 
            }
        })
        if (!check) {
            alertMessage("error", "ไม่พบข้อมูล");
        } else {
            employee.splice(0, employee.length);
            temparr.map((item: any) => {
                employee.push(item);
            })
            alertMessage("success", "ค้นหาสำเร็จ");
        }
        console.log(checkdepartment);
        if (department == "") {
            alertMessage("info", "กรุณากรอกชื่อแผนกเพื่อทำการค้นหา");
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
                <ContentHeader title="ข้อมูลเจ้าหน้าที่ทางการแพทย์">
                    <Button
                        size="large"
                        style={{ float: 'right', marginBottom: 'auto' }}
                        color="primary"
                        component={RouterLink}
                        to="/Employee"
                        variant="contained"
                    >
                        เพิ่มข้อมูลบุคลากร
             </Button>
                </ContentHeader>

                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <TextField
                            style={{ margin: 8, width: '30%' }}
                            placeholder="พิมพ์ชื่อแผนกที่ต้องการค้นหา"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={department}
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
                                    <TableCell align="center">รหัสพนักงาน</TableCell>
                                    <TableCell align="center">คำนำหน้าชื่อ</TableCell>
                                    <TableCell align="center">ชื่อ-นามสกุล</TableCell>
                                    <TableCell align="center">เบอร์โทรศัพท์</TableCell>
                                    <TableCell align="center">วัน/เดือน/ปีเกิด</TableCell>
                                    <TableCell align="center">แผนกที่รับผิดชอบ</TableCell>
                                    <TableCell align="center">สถานที่ทำงาน</TableCell>
                                    <TableCell align="center">อีเมล</TableCell>
                                    <TableCell align="center">รหัสผ่านชั่วคราว</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employee.map((item: any) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="center">{item.userId}</TableCell>
                                        <TableCell align="center">{item.edges?.nametitle?.title}</TableCell>
                                        <TableCell align="center">{item.employeeName}</TableCell>
                                        <TableCell align="center">{item.tel}</TableCell>
                                        <TableCell align="center">{item.birthdayDate}</TableCell>
                                        <TableCell align="center">{item.edges?.department?.departmentName}</TableCell>
                                        <TableCell align="center">{item.edges?.place?.placeName}</TableCell>
                                        <TableCell align="center">{item.email}</TableCell>
                                        <TableCell align="center">{item.password}</TableCell>
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