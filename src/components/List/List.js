import React,{createRef} from "react"
import useStyles from './listStyle';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

export default function List({places,childClicked,loading}){
    const classes=useStyles();
    const [type,setType]=React.useState("");
    const [rating,setRating]=React.useState("");
    const [ref,setRef]=React.useState();   
    React.useEffect(()=>{
       const refs=Array.fill(places.length).map((_,i)=>ref[i] || createRef() )
       setRef(refs)
    },[places,ref])
    return(
        <div className={classes.container}>
            <Typography variant="h6">Food & Dining around you</Typography>
            {loading
            ?
            <div className={classes.loading}>
              <CircularProgress/>
            </div>
            :
            <>
            <FormControl  className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
           </FormControl>
           <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list} places={places}>
          {places?.map((place, i) => (
              <Grid  item xs={12} ref={ref[i]}>
                <PlaceDetails 
                 place={place} 
                 selected={Number(childClicked)===i}
                 refProp={ref[i]}
                />
              </Grid>
            ))}
          </Grid>
            
            </>
           }
           
        </div>
    )
}