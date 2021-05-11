// import React, {Component} from 'react';
// import {Paper, Toolbar} from "@material-ui/core";
// import {Sidebar} from "primereact/sidebar";
// import {Card} from "@material-ui/core";
// import AppBarShort from "./AppBarShort";
// import {Col, Container,Image,Row} from "react-bootstrap";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import makeStyles from "@material-ui/core/styles/makeStyles";
// import Box from "@material-ui/core/Box";
// import Typography from "@material-ui/core/Typography";
// import PropTypes from "prop-types";
// import {useTheme} from "@material-ui/core/styles";
// import SwipeableViews from "react-swipeable-views";
// import ListForCompany from "./ListForCompany";

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`full-width-tabpanel-${index}`}
//             aria-labelledby={`full-width-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }
// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };
// function a11yProps(index) {
//     return {
//         id: `full-width-tab-${index}`,
//         'aria-controls': `full-width-tabpanel-${index}`,
//     };
// }

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         backgroundColor: theme.palette.background.paper,
//     },
//     container: {
//         maxHeight: 440,
//     },
// }));

// function UserProfile() {
//     const classes = useStyles();
//     const [value, setValue] = React.useState(0);
//     const theme = useTheme();
//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };
//     const handleChangeIndex = (index) => {
//         setValue(index);
//     };
//         return(
//             <div>
//                 <AppBarShort title = "Profile"></AppBarShort>

//                 <Card style={{marginLeft: '1.7em',marginTop:'2em',marginBottom:'1em',width : '97%',height: '55%'}}>
//                  <div className = "p-grid">
//                      <div clasName = "p-col" style={{height: '100%',width:'20%',marginTop:'1.2em',marginLeft:'1.5em',marginRight:'1.2em'}}>
//                             <Image
//                                    width={150}
//                                    height={150}
//                                    alt="150x150" src="images/square.png" roundedCircle
//                                 style = {{marginTop: '0.8vh',marginBottom: '1em'}}/>
//                      </div >

//                             <div  clasName = "p-col" style={{width:'20%',marginTop:'1.2em'}}>
//                                 <h3>Selin Kırmacı</h3>
//                                 <br/>
//                                 <h6>Username: selinkirmaci</h6>
//                                  <h6>Email: selinkirmaci@gmail.com</h6>
//                                 </div>
//                      <div  clasName = "p-col" style={{marginLeft:'10em',width:'20%',marginTop:'1.2em'}}>

//                             <Card style={{height: '80%'}}>
//                                 <h4>Registered Events</h4>
//                                 <h3 style={{marginLeft:'43%',marginTop:'1em'}}>97</h3>
//                             </Card>
//                      </div>
//                  </div>
//                     <div >
//                         <Tabs
//                             value={value}
//                             onChange={handleChange}
//                             indicatorColor="primary"
//                             textColor="primary"
//                             centered
//                         >
//                             <Tab label="Registered Events">
//                             </Tab>
//                             <Tab label="Calendar" />
//                         </Tabs>

//                         <SwipeableViews
//                             axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//                             index={value}
//                             onChangeIndex={handleChangeIndex}
//                         >
//                             <TabPanel value={value} index={0} dir={theme.direction}>
//                                 <ListForCompany></ListForCompany>
//                             </TabPanel>
//                             <TabPanel value={value} index={1} dir={theme.direction}>
//                                 Calendar
//                             </TabPanel>

//                         </SwipeableViews>
//                     </div>
//                 </Card>


//             </div>
//         );
// }
// export default UserProfile;