import React from 'react'
import {CssBaseline,Grid} from "@material-ui/core";
import Header from "./components/Header/Header.js";
import List from "./components/List/List";
import Map from "./components/Map/Map"
import {fetch_place_data} from "./hooks/api"

export default function App() {
  const [places,setPlaces]=React.useState([])
  const [coordinate,setCoordinate]=React.useState({})
  const [bounds,setBounds]=React.useState("");
  const [childClicked,setChildClicked]=React.useState(null);
  const [loading,setloading]=React.useState(true)
  const [type,setType]=React.useState("hotels");
  const [rating,setRating]=React.useState("");
  const [filteredPlaces,setFilteredPlaces]=React.useState([])
  const [autocomplete, setAutocomplete] = React.useState(null);


  React.useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      setCoordinate({lat:latitude, lng:longitude})
    })
  },[])
  React.useEffect(()=>{
    setloading(true)
    if(bounds){
      fetch_place_data(type,bounds.sw,bounds.ne)
      .then(data=>{
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([])
        setRating('');
        setloading(false)
      })
    }
  },[type,bounds])
  React.useEffect(()=>{
       const filteredArray=places.filter((place)=>place.rating>rating)
       setFilteredPlaces(filteredArray)
  },[rating,places])
  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinate({ lat, lng });
  };
  return (
        <CssBaseline>
        <Header
          onPlaceChanged={onPlaceChanged} 
          onLoad={onLoad}
        />
        <Grid container 
        spacing={3} 
        style={{width:"100%"}}>
             <Grid item xs={12} md={4}>
                 <List 
                 places={filteredPlaces.length ? filteredPlaces : places} 
                 childClicked={childClicked}
                 loading={loading}
                  type={type}
                  setType={setType}
                  rating={rating}
                  setRating={setRating}
                  />
             </Grid>
             <Grid item xs={12} md={8}>
                <Map
                  setCoordinate={setCoordinate}
                  setBounds={setBounds}
                  coordinate={coordinate}
                  places={filteredPlaces.length ? filteredPlaces : places} 
                  setChildClicked={setChildClicked}
                 />
             </Grid>
        </Grid>
        </CssBaseline>
  )
}
