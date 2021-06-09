import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Divider from '@material-ui/core/Divider';

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
