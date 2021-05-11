import React, {Component} from "react";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Sidebar} from "primereact/sidebar";
import {Card} from "primereact/card";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import MenuIcon from "@material-ui/icons/Menu";
import {AutoComplete} from "primereact/autocomplete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default class AppBarShort extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            suggestions: null,
            visibleLeft: false,
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
        return(
            <div className={"root"}>
                <AppBar position="static" style={{backgroundImage: 'linear-gradient(to right,#8C4FB7,#3834DE)'}}>
                    <Toolbar>
                        <Sidebar style={{backgroundColor : '#3f27cd'}} visible={this.state.visibleLeft} baseZIndex={1000000} onHide={() => this.setState({visibleLeft: false})}>
                            <Card style={ {width: '100%',height: '10em',backgroundColor: '#3f27cd'}}>
                                <h4 style={{justifyContent:'center',marginLeft:'20%',marginTop : '10%',color : 'white'}}>User Name Here</h4>
                            </Card>
                            <Link to={"/profile"}>
                                <Button style={{marginTop:'30%',marginBottom: '3em',width:'100%',backgroundColor : '#3f27cd'}} label = "Profile"></Button>
                            </Link>
                            <Link to={"/homepage"}>
                                 <Button style={{width:'100%',backgroundColor : '#3f27cd'}} label = "Events"></Button>
                            </Link>
                        </Sidebar>
                        <IconButton
                            edge="start"
                            className={"menuButton"}
                            color="inherit"
                            aria-label="open drawer" onClick={(e) => this.setState({visibleLeft:true})}  style={{marginRight:'.25em'}}>
                            <MenuIcon />
                        </IconButton>
                        <Typography className={"title"} variant="h6" noWrap>
                            {this.props.title}
                        </Typography>
                        <AutoComplete  size={130} placeholder="Search..." style={{marginLeft:'3em'}} value={this.state.names} onChange={(e) => this.setState({names: e.value})}
                                       suggestions={this.state.suggestions} completeMethod={this.suggest.bind(this)} />
                        <IconButton style={{marginLeft:'.5em'}} className="icon-circle-">
                            <AccountCircleIcon></AccountCircleIcon>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
                );
    }
}