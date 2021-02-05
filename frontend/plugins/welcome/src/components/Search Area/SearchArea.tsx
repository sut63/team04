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
import SentimentVeryDissatisfiedRoundedIcon from '@material-ui/icons/SentimentVeryDissatisfiedRounded';



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
//
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

function redirectToArea() {
    window.location.href = "http://localhost:3000/area"
}

function redirectToSearchArea() {
    window.location.href = "http://localhost:3000/searcharea"
}

function redirectToDisease() {
    window.location.href = "http://localhost:3000/disease"
}

function redirectToSearchDisease() {
    window.location.href = "http://localhost:3000/searchdisease"
}


export default function ComponentsTable() {
    const classes = useStyles();
    const api = new DefaultApi();
    const [areas, setAreas] = useState(Array);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [search, setSearch] = useState(false);
    const [checkareaname, setCheckAreaname] = useState(false);
    const [areaname, setAreaname] = useState(String);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const getAreas = async () => {
            const res = await api.listArea({ limit: undefined, offset: 0 });
            setLoading(false);
            setAreas(res);
        };
        getAreas();
    }, [loading]);

    const deleteAreas = async (id: number) => {
        const res = await api.deleteArea({ id: id });
        setLoading(true);
        alertMessage("success", "ลบข้อมูลเรียบร้อยแล้ว");
    };

    const alertMessage = (icon: any, title: any) => {
        Toast.fire({
            icon: icon,
            title: title,
        });
        setSearch(false);
    }

    const inputHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSearch(false);
        setCheckAreaname(false);
        setAreaname(event.target.value as string);
        if (event.target.value == "" ){
            renewtable();
        }
    };

    const renewtable = async () => {
        const res = await api.listArea({ limit: undefined, offset: 0 });
        setLoading(false);
        setAreas(res);
    }

    const checksearch = async () => {
        var check = false;
        areas.map((item: any) => {
            if (areaname != "") {
                if ((item.areaName).includes(areaname)) {
                    setCheckAreaname(true);
                    alertMessage("success", "ค้นหาสำเร็จ");
                    check = true;
                    areas.splice(0, areas.length);
                    areas.push(item);
                }
            }
        })
        if (!check) {
            alertMessage("error", "ไม่พบข้อมูล");
        }
        console.log(checkareaname);
        if (areaname == "") {
            alertMessage("info", "กรุณากรอกชื่อจังหวัดเพื่อทำการค้นหา");
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


                        <StyledMenuItem button onClick={redirectToDisease}>
                            <ListItemIcon>
                                <SentimentVeryDissatisfiedRoundedIcon fontSize="default" />
                            </ListItemIcon>
                            <ListItemText primary="Add Disease" />
                        </StyledMenuItem>

                        <StyledMenuItem button onClick={redirectToSearchDisease}>
                            <ListItemIcon>
                                <SearchIcon fontSize="default" />
                            </ListItemIcon>
                            <ListItemText primary="Search Disease" />
                        </StyledMenuItem>

                        <StyledMenuItem button onClick={redirectToArea}>
                            <ListItemIcon>
                                <AddLocationRoundedIcon fontSize="default" />
                            </ListItemIcon>
                            <ListItemText primary="Add Area" />
                        </StyledMenuItem>

                        <StyledMenuItem button onClick={redirectToSearchArea}>
                            <ListItemIcon>
                                <SearchIcon fontSize="default" />
                            </ListItemIcon>
                            <ListItemText primary="Search Area" />
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
                <ContentHeader title="ข้อมูลพื้นที่เสี่ยง">
                <Button
                        size="large"
                        style={{ float: 'right', marginBottom: 'auto' }}
                        color="primary"
                        component={RouterLink}
                        to="/Area"
                        variant="contained"
                    >
                        เพิ่มข้อมูลพื้นที่เสี่ยง
             </Button>
                </ContentHeader>

                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <TextField
                            style={{ margin: 8, width: '30%' }}
                            placeholder="พิมพ์ชื่อจังหวัดที่ต้องการค้นหา"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={areaname}
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
                                <TableCell align="center">ชื่อจังหวัด</TableCell>
                                <TableCell align="center">ชื่ออำเภอ</TableCell>
                                <TableCell align="center">ชื่อตำบล</TableCell>
                                <TableCell align="center">ระดับความเสี่ยง</TableCell>
                                <TableCell align="center">สถิติผู้ป่วยที่ติดโรค</TableCell>
                                <TableCell align="center">โรคติดต่อ</TableCell>
                                <TableCell align="center">รหัสผู้บันทึกข้อมูล</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {areas.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell align="center">{item.areaName}</TableCell>
                                    <TableCell align="center">{item.areaDistrict}</TableCell>
                                    <TableCell align="center">{item.areaSubDistrict}</TableCell>
                                    <TableCell align="center">{item.edges?.level?.levelName}</TableCell>
                                    <TableCell align="center">{item.edges?.statistic?.statisticName}</TableCell>
                                    <TableCell align="center">{item.edges?.disease?.diseaseName}</TableCell>
                                    <TableCell align="center">{item.edges?.employee?.userId}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => {
                                                deleteAreas(item.id);
                                            }}
                                            style={{ marginLeft: 10 }}
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Delete
               </Button>
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