import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {

});

export default function IndividualTaskSummary(props) {

    const classes = useStyles();
    const {tasks, games} = props;

    function getAppearancesCount(id) {
        let count = 0;
        games.map((game, key) => {
            count += game.tasks.filter(task => task.id === id).length;
        })
        return count;
    }

    function getQuestAccomplishmentsCount(id) {
        let count = 0;
        games.map((game, key) => {
            count += game.tasks.filter(task => task.id === id && task.isCompleted).length;
        })
        return count;
    }

    const tableContent = tasks.map((task, key) => {
        const appearancesCount = getAppearancesCount(task.id);
        const questAccomplishmentsCount = getQuestAccomplishmentsCount(task.id);
        return (
            <TableRow>
                <TableCell component="th" scope="row">{task.title}</TableCell>
                <TableCell align="right">{appearancesCount}</TableCell>
                <TableCell align="right">{questAccomplishmentsCount}</TableCell>
                <TableCell
                    align="right">{appearancesCount !== 0 ? Math.round(100 * questAccomplishmentsCount / appearancesCount) : 0}%</TableCell>
            </TableRow>
        )
    })

    return (
        <React.Fragment>
            <TableContainer>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Naziv zadatka</TableCell>
                            <TableCell align="right">Ukupan broj pojavljivanja</TableCell>
                            <TableCell align="right">Ukupan broj izvrsavanja</TableCell>
                            <TableCell align="right">Postotak uspjesnosti</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableContent}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
