import React, {Component} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Paper, Select} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
    paper: {
        padding: 16
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button:{
        margin:15
    }
})

class DifficultyAndCategoryForm extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const {values, classes, handleChange} = this.props;
        const {difficulty, category} = values;

        return (
            <Paper className={classes.paper}>
                <Grid container
                      justify="center"
                      alignItems="center"
                      direction="column">
                    <Grid item xs>
                        <h1>Korak 1</h1>
                    </Grid>
                    <Grid item xs>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="difficulty-label-id">Težina</InputLabel>
                            <Select
                                labelId="difficulty-label-id"
                                id="difficulty"
                                value={difficulty}
                                onChange={handleChange('difficulty')}
                            >
                                <MenuItem value={1}>Easy</MenuItem>
                                <MenuItem value={2}>Medium</MenuItem>
                                <MenuItem value={3}>Hard</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <br/>
                    <Grid item xs>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="category-label-id">Kategorija</InputLabel>
                            <Select
                                labelId="category-label-id"
                                id="category"
                                value={category}
                                onChange={handleChange('category')}
                            >
                                <MenuItem value={"kulturni"}>Kulturni</MenuItem>
                                <MenuItem value={"historisjki"}>Historijski</MenuItem>
                                <MenuItem value={"priroda"}>Priroda</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <br/>
                    <Grid item xs>
                        <Button className={classes.button}
                                color="primary"
                                variant="contained"
                                onClick={this.continue}>
                            Nastavak
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(DifficultyAndCategoryForm);
