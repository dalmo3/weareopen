import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const ResultCard = props => {
  const classes = useStyles()
  const {
      // URL,
      // _id,
      // address,
      // "address line 2": address_line_2,
      title: name,
      // outcode,
      // postcode,
      // rating,
      title: type_of_food
    } = props.result

    return(
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="business" className={classes.avatar}>
              {name.slice(0,2)}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="action"
              onClick={e => props.handleClaim(e, props.result)}
            >
              <FavoriteIcon/>
            </IconButton>
          }
          title={name}
          subheader={type_of_food}
          />
      </Card>
    )

}

export default ResultCard