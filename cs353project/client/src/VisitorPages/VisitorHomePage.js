import React, {Component, useEffect} from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {useTheme} from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import {Link} from "react-router-dom";
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import SideBar from "./VisitorSideBar";
// import { DataGrid } from '@material-ui/data-grid';

import {Button} from "@material-ui/core";
import PlusIcon from  "@material-ui/icons/Add";

import VisitorSideBar from "./VisitorSideBar";
import VisitorTourTable from "./VisitorTourTable";
// import EducationalTable from "./EducationalTable";
import VisitorOrganizationTable from "./VisitorOrganizationTable";
// import VisitorEducationalTour from "./VisitorEducationalTour";
import { LocalDiningOutlined } from '@material-ui/icons';
import Axios from "axios";
// import JoinTourModal from "./JoinTourModal";
// import DonationModal from "./DonationModal";


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

function logout(){
};

function VisitorHomePage(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [tourType] = React.useState(0);
    const [choseEventOpen, setChoseEventClose] = React.useState(0);
    const [group,setGroup] = React.useState([]);
    const [con,setCon] = React.useState([]);
    const [userID,setUserID] = React.useState("");



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
        console.log("before");
        console.log(props.location.data[0].userID);
        console.log("after");
        setUserID(props.location.data[0].userID)

        const firstReq = Axios.get("http://localhost:3001/api/listGuideTour");
        const secondReq =Axios.get("http://localhost:3001/api/listConservationOrganizations");

        Axios.all([firstReq,secondReq]).then((response)=>{
            setGroup(response[0].data);
            setCon(response[1].data);
        });
    },[]);

    return(
        <div>
            <VisitorSideBar title = "Visitor"></VisitorSideBar>
            <div >

            <Link to="/login">
                <Button variant = "contained"
                            color = "primary"
                            style = {{float:"right",marginRight:"3em"}}
                            onClick = {logout()}
                            label="Logout"
                    ></Button>
            </Link>

            <Link to="/restaurant">
                <Button variant = "contained"
                        color = "primary"
                        style = {{float:"right",marginRight:"3em"}}
                        label="Restaurant"
                ></Button>
            </Link>

            <Link to="/giftshop">
                <Button variant = "contained"
                        color = "primary"
                        style = {{float:"right",marginRight:"3em"}}
                        label="Gift Shop"
                ></Button>
            </Link>

            <Link to="/visitorprofile">
                <Button variant = "contained"
                        color = "primary"
                        style = {{float:"right",marginRight:"3em"}}
                        label="Profile"
                ></Button>
            </Link>

            

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
                        {/* <Tab label="Educational Programs" /> */}
                        <Tab label="Conservational Organizations" />
                    </Tabs>

                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >

                        <TabPanel value={value} index={0} dir={theme.direction}>
                            {/* <h1>Group Tours</h1> */}
                            <VisitorTourTable userID = {userID} list={group}></VisitorTourTable>
                        </TabPanel>
                        {/* <TabPanel value={value} index={1} dir={theme.direction}>
                            <h1>Educational Programs</h1>
                            <EducationalTable></EducationalTable>

                        </TabPanel> */}
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            {/* <h1>Conservational Organizations</h1> */}
                            <VisitorOrganizationTable list={con}></VisitorOrganizationTable>
                        </TabPanel>
                    </SwipeableViews>
                </div>


        </div>
    );
}
export default VisitorHomePage;