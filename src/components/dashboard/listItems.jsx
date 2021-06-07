import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Redirect, Link} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList'
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {Divider} from '@material-ui/core';

export default function MainListItems(props) {
    const [component, setComponent] = React.useState('')
    return (
        <div>
            <ListItem button
                      selected={component === 'Pregled zadataka'}
                      onClick={() => {
                          setComponent('Pregled zadataka');
                          props.setTitle('Pregled zadataka');
                          props.restoreDefaults();

                      }}
                      component={Link}
                      to="/dashboard/quests">
                <ListItemIcon>
                    <ViewHeadlineIcon/>
                </ListItemIcon>
                <ListItemText primary="Pregled zadataka"/>
            </ListItem>
            <ListItem button
                      selected={component === 'Dodavanje zadatka'}
                      onClick={() => {
                          setComponent('Dodavanje zadatka');
                          props.setTitle('Dodavanje zadatka');
                          props.restoreDefaults();
                      }}
                      component={Link}
                      to="/dashboard/add-quest">
                <ListItemIcon>
                    <AddIcon/>
                </ListItemIcon>
                <ListItemText primary="Dodavanje zadatka"/>
            </ListItem>
            <ListItem button
                      selected={component === 'Statistika'}
                      onClick={() => {
                          setComponent('Statistika');
                          props.setTitle('Statistika');
                          props.restoreDefaults();
                      }}
                      component={Link}
                      to="/dashboard/statistics">
                <ListItemIcon>
                    <VisibilityIcon/>
                </ListItemIcon>
                <ListItemText primary="Statistika"/>
            </ListItem>
            <Divider/>
            <ListItem button selected={component === 'L'} onClick={() => {
                setComponent('L')
                props.signOut()
            }}>
                <ListItemIcon>
                    <ExitToAppIcon/>
                </ListItemIcon>
                <ListItemText primary="Odjava"/>
            </ListItem>
        </div>
    )
};
