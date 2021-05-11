// this will be the restaurant selection page

import React, {Component} from "react";
import {Grid, Paper} from "@material-ui/core";
import {CardDemo} from "../CardDemo";
import {Sidebar} from "primereact/sidebar";
import {AppBar,Toolbar,IconButton,Typography,InputBase,fade,makeStyles} from "@material-ui/core";
import AppBarShort from "../AppBarShort";
import EventCard from "../EventCard";
import Axios from "axios";
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

export default class  VisitorTourTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            suggestions: null,
            visibleLeft: false,
            postArray: [],
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
                        this.props.list.map((post , index) =>
                            {
                                return(
                                    <Grid item xs = {3}>
                                        <EventCard  title = {post.name}
                                                    time ={ post.time}
                                                    date={post.date}
                                                    location={post.location}
                                                    leftcap={post.capacity}
                                                    duration = {post.duration}
                                                    price={post.price}
                                                    userId = {this.props.userID}
                                                    leftModalButton="Accept"
                                                    rightModalButton="Decline"
                                                    down="Join Event"
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