import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Grid, List, ListItem, ListItemText, LinearProgress, CardMedia } from '@mui/material';
import { useSaveSearch } from '../hooks/useSaveSearch';
import { useSelector } from 'react-redux';

const WeatherApp = () => {
    const [dataLoading, setDataLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState("");

    const user = useSelector((state) => state.users.user);
    const person = useSelector((state) => state.persons.person);
    const apiKey = process.env.REACT_APP_API_KEY;

    const { saveSearch,  saveError } = useSaveSearch();

    const fetchWeatherData = async (city) => {
        setDataLoading(true);
        // console.log(dataLoading);
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        )
        if (response.ok) {
            const json = await response.json();
            // console.log(json)
            if (json){
                setWeatherData(json);
                if(city!=="" && !saveError){
                    await saveSearch(user.email, city.toUpperCase());
                }
            }    
        }
        if (!response.ok) {
            console.error('Error fetching weather data:');
        }
        setDataLoading(false);
    };

    useEffect(() => {
        if (person.searches.length > 0) {
                setCityName(person.searches[0])
                fetchWeatherData(person.searches[0]);
        }
    }, []);


    const handleSearch = async (e) => {
        e.preventDefault();
        if (cityName !== "")
            await fetchWeatherData(cityName);
    };
    // Function to handle click on recent search items
    const handleRecentClick = async (city) => {
        setCityName(city);
        if (city !== "")
            await fetchWeatherData(city);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={4} style={{}}>
                <Grid item xs={12} sm={8} >
                    <Paper elevation={3} style={{ padding: '30px 20px', marginTop: '40px' }}>
                        <form onSubmit={handleSearch}>
                            <TextField
                                fullWidth
                                label="Location"
                                value={cityName}
                                onChange={(e) => setCityName(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                style={{ marginTop: '10px' }}
                            >
                                Find details
                            </Button>
                            {dataLoading && <LinearProgress color='primary' />}
                        </form>
                        {weatherData && (
                            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" sx={{ fontSize: '40px', fontFamily: 'Ubuntu, sans-serif' }}>{weatherData.name}</Typography>
                                    <Typography variant="body1" sx={{ fontSize: '25px', fontFamily: 'Ubuntu, sans-serif' }} >
                                        {weatherData.main.temp} °C
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold' }}>
                                        Feels Like: {weatherData.main.feels_like} °C
                                    </Typography>
                                    <Grid item xs={8} >
                                        <CardMedia
                                            component="img"

                                            image={`images/${weatherData.weather[0].icon}.png`}
                                            alt={weatherData.weather[0].description}
                                            style={{ maxWidth: "150px" }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold' }}>
                                        Humidity: {weatherData.main.humidity}%
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold' }}>
                                        Pressure: {weatherData.main.pressure} hPa
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold' }}>
                                        Max Temperature: {weatherData.main.temp_max} °C
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold' }}>
                                        Min Temperature: {weatherData.main.temp_min} °C
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold' }}>
                                        Weather: {weatherData.weather[0].description}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold' }}>
                                        Wind Speed: {weatherData.wind.speed} m/s
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold' }}>
                                        Wind Gust: {weatherData.wind.gust} m/s
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold' }}>
                                        Wind Direction: {weatherData.wind.deg}°
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold' }}>
                                        Country: {weatherData.sys.country}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold' }}>
                                        Visibility: {weatherData.visibility} meters
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold' }}>
                                        Cloudiness: {weatherData.clouds.all}%
                                    </Typography>
                                </Grid >
                            </Grid>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={2} style={{ padding: '5px 20px', marginTop: '40px' }}>
                        <List style={{ marginTop: '20px' }}>
                            <Typography variant="h6" sx={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>ALL SEARCHES</Typography>
                            {(person.searches).map((search, index) => (
                                <ListItem
                                    key={index}
                                    component="button"
                                    onClick={() => handleRecentClick(search)}
                                    style={{ cursor: 'pointer', margin: '10px 0' }}
                                >
                                    <ListItemText primary={search} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid></Grid>

        </Container>
    );
};

export default WeatherApp;
