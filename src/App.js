import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const App = () => {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");

  const handleSearch = (e) => {
    setSearchedCountry(e.target.value);
  };

  const filteredCountries = searchedCountry.toUpperCase();
  const countryToShow = countries.filter((country) => {
    return country.name.toUpperCase().indexOf(filteredCountries) > -1;
  });
  // console.log(searchedCountry);

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  console.log(countryToShow);
  return (
    <div className="App">
      <TextField
        id="standard-textarea"
        label="Search for a country"
        placeholder="Search"
        onChange={handleSearch}
        multiline
      />
      <div className="show-countries">
        {countryToShow.length >= 250 ? (
          <p>Please enter a country to know about...</p>
        ) : countryToShow.length >= 20 ? (
          <p>Too many matches, please specify another filter</p>
        ) : countryToShow.length === 1 ? (
          countryToShow.map((country) => {
            let populate = parseInt(country.population).toLocaleString();
            return (
              <div className="card">
                <Card>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={country.flag}
                      title="country flag"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h4">
                        {country.name}
                      </Typography>

                      <Typography
                        color="textSecondary"
                        variant="body2"
                        component="p"
                      >
                        Capital: {country.capital}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="body2"
                        component="p"
                      >
                        Population: {populate}
                      </Typography>
                      <Typography variant="body2" component="h4">
                        Languages:
                      </Typography>
                      {country.languages.map((lang) => {
                        return <li>{lang.name}</li>;
                      })}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            );
          })
        ) : (
          countryToShow.map((country) => {
            return searchedCountry.length ? (
              <div>
                <span
                  onClick={() => setSearchedCountry(country.name)}
                  key={country.name}
                >
                  {country.name}
                </span>
              </div>
            ) : (
              <div></div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default App;
