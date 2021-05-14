import React, {Component, useEffect} from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {useTheme} from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SideBar from "./CoordinatorSideBar";
import { DataGrid } from '@material-ui/data-grid';

import {Button} from "@material-ui/core";
import PlusIcon from  "@material-ui/icons/Add";

import CoordinatorSideBar from "./CoordinatorSideBar";
import TourTable from "./TourTable";
import EducationalTable from "./EducationalTable";
import OrganizationTable from "./OrganizationTable";
import ChoseEventTypeModal from "./ChoseEventTypeModal";
import Axios from 'axios';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        maxHeight: 440,
    },
    table: {
        minWidth: 650,
    },
}));


function CoordinatorHomepage() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [tourType] = React.useState(0);
    const [choseEventOpen, setChoseEventClose] = React.useState(0);
    const [rows,setRows] = React.useState([]);
    const [edurow,setEdurow] = React.useState([]);
    const [conrow,setConrow] = React.useState([]);


    const theme = useTheme();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const handleChoseEventOpen = () => {
        setChoseEventClose(true);
    };
    const handleChoseEventClose = () => {
        setChoseEventClose(false);
    };

    useEffect(()=>{
        const firstReq = Axios.get("http://localhost:3001/api/listGuideTour");
        const secondReq =Axios.get("http://localhost:3001/api/listEducationalPrograms");
        const thirdReq =Axios.get("http://localhost:3001/api/listConservationOrganizations");

        Axios.all([firstReq,secondReq,thirdReq]).then((response)=>{
            setRows(response[0].data);
            setEdurow(response[1].data);
            setConrow(response[2].data);
        });
    },[]);

    return(
        <div>

            <CoordinatorSideBar title = "HomePage"></CoordinatorSideBar>
            <div >

            <Button variant = "contained"
                    color = "primary"
                    style = {{float:"right",marginRight:"3em"}}
                    startIcon={ <PlusIcon/> }
                    onClick={handleChoseEventOpen}
            >Add Event</Button>
                <ChoseEventTypeModal open = {choseEventOpen}
                                     handleClose = {handleChoseEventClose}
                                        ></ChoseEventTypeModal>

                </div >

                <div >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Group Tours">
                        </Tab>
                        <Tab label="Educational Programs" />
                        <Tab label="Conservational Organizations" />
                    </Tabs>

                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >

                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <h1>Group Tours</h1>
                            <TourTable rows={rows}></TourTable>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <h1>Educational Programs</h1>
                            <EducationalTable rows ={edurow}></EducationalTable>

                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <h1>Conservational Organizations</h1>
                            <OrganizationTable rows={conrow}></OrganizationTable>
                        </TabPanel>

                    </SwipeableViews>
                </div>


        </div>
    );
}
export default CoordinatorHomepage;