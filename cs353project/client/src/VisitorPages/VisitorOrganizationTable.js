// this will be the restaurant selection page

import React, {Component} from "react";
import {Grid, Paper} from "@material-ui/core";
import {CardDemo} from "../CardDemo";
import {Sidebar} from "primereact/sidebar";
import {AppBar,Toolbar,IconButton,Typography,InputBase,fade,makeStyles} from "@material-ui/core";
import AppBarShort from "../AppBarShort";
import EventCard from "../EventCard";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default class  VisitorOrganizationTable extends Component
{

    constructor() {
        super();
        this.state = {
            suggestions: null,
            visibleLeft: false,
            postArray: [
                {title: "Event2",start:"Event2 start date",end:"Event end date",location:"event2 location",leftcap:"40"},
                {title: "Event3",start:"Event3 start date",end:"Event end date",location:"event3 location",leftcap:"205"},
                {title: "Event4",start:"Event4 start date",end:"Event end date",location:"event4 location",leftcap:"112"},
                {title: "Event5",start:"Event5 start date",end:"Event end date",location:"event5 location",leftcap:"220"},
                {title: "Event6",start:"Event6 start date",end:"Event end date",location:"event6 location",leftcap:"120"},
            ]
        };
        this.names = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo'];
    }
    suggest(event) {
        let results = this.names.filter((names) => {
            return names.toLowerCase().startsWith(event.query.toLowerCase());
        });

        this.setState({ suggestions: results });
    }
    render() {
        return (

            <div style = {{justifyContent: 'center'}}>
                <br/>
                <Grid container spacing = {3}>
                    {
                        this.state.postArray.map((post , index) =>
                            {
                                return(
                                    <Grid item xs = {3}>
                                        <EventCard  title = {post.title}
                                                    start={ post.start}
                                                    end={post.end}
                                                    location={post.location}
                                                    leftcap={post.leftcap}
                                                    leftModalButton="Accept"
                                                    rightModalButton="Decline"
                                                    down="Donate to This Organization"
                                                    image="/images/t-logo.jpg"
                                                    />
                                    </Grid>
                                )
                            }
                        )
                    }
                </Grid>
            </div>

        );
    }
}