import { Card, CardContent, Grid, Typography } from "@material-ui/core"
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
    card: {
        display: 'flex'
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});
const QuestSummary = (props) =>{
    const classes = useStyles()
    const { quest } = props;
    return (
        <Grid item xs={12}>
            <CardActionArea component={Link} to={`quest/${quest.id}`}>
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {quest.title.en_us} / {quest.title.sr_bih}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {quest.title.sr_bih}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Otvori za detalje...
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </CardActionArea>
        </Grid>
    )
}
export default QuestSummary;
