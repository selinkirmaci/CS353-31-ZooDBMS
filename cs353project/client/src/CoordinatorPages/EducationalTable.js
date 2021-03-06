import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import ListAltIcon from '@material-ui/icons/ListAlt';
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import AssignKeeperDialog from "./AssignKeeperDialog";
import Axios from 'axios';
import InviteVeterinarianDialogCoordinator from "./InviteVeterinarianDialogCoordinator";


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});
const useStyles2 = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
}));

export default function EducationalTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const classes2 = useStyles2();
    const [open2, setOpen2] = React.useState(false);
    const [value, setValue] = React.useState('Dione');
    const [eID,setEID] =  React.useState(0);
    const [veterinarians,setVeterinarians] = React.useState([]);

    const handleClose2 = (newValue) => {
        setOpen2(false);

        if (newValue) {
            setValue(newValue);
        }
    };

    const handleDelete = (eventID) => {
        var e = 'http://localhost:3001/api/deleteEducational/' + eventID;
        Axios.delete(e);
        window.location.reload();
    };

    const handleInvitation = (eventID) => {
        setEID(eventID);
        setOpen2(true);
    };

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/getVeterinarians", {
        }).then((response)=>{
            setVeterinarians(response.data);
        });
    });


    const columns = [
        {id:'eventID'},
        { id: 'name', label: 'Event Name', minWidth: 170 },
        { id: 'capacity', label: 'Capacity', minWidth: 170 },
        {
            id: 'date',
            label: 'Date',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'time',
            label: 'Time',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'location',
            label: 'Location',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'duration',
            label: 'Duration',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'speaker',
            label: 'Speaker',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'topic',
            label: 'Topic',
            minWidth: 170,
            align: 'right',
        },
        { id: 'invite', label: 'Invite Veterinarian', minWidth: 50 ,align: 'right',onClick : handleInvitation},
        { id: 'editEvent', label: 'Edit Event', minWidth: 50 ,align: 'right'},
        { id: 'deleteEvent', label: 'Delete Event', minWidth: 50 ,align: 'right',onClick : handleDelete},

    ];

    function createData(name, code, population, size) {
        const density = population / size;
        return { name, code, population, size, density };
    }


    const rows = [
        createData('India', 'IN', 1324171354, 3287263),
        createData('China', 'CN', 1403500365, 9596961),
        createData('Italy', 'IT', 60483973, 301340),
        createData('United States', 'US', 327167434, 9833520),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
    ];

    let iconMap = {
        "editEvent" : <CreateIcon/>,
        "deleteEvent": <DeleteIcon/>,
        "invite":<SendIcon/>,
    }

    function createIcon(key,onClick,name)
    {
        return(
            <IconButton onClick={() => onClick(name)}>
                {iconMap[key]}
            </IconButton>
        );
        console.log(name);
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <InviteVeterinarianDialogCoordinator
                classes={{
                    paper: classes2.paper,
                }}
                id="ringtone-menu"
                keepMounted
                open={open2}
                onClose={handleClose2}
                value={value}
                eventID = {eID}
                options = {veterinarians}
            />
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        let value = row[column.id];
                                        if(column.id === "editEvent" || column.id === "deleteEvent" || column.id === "invite" )
                                        {
                                            value = createIcon(column.id,column.onClick,row.eventID);
                                        }
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
