import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Grid, List, ListItem, ListItemText, LinearProgress } from '@mui/material';

const WeatherApp = () => {
    const [dataLoading, setDataLoading] = useState(false);
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [recent, setRecent] = useState(["Delhi", "Kanpur"]);

    const apiKey = process.env.REACT_APP_API_KEY;
    // console.log(apiKey);
    const fetchWeatherData = async () => {
        setDataLoading(true);
        // console.log(dataLoading);
        const response=await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
        )
        if(response.ok){
            const json=await response.json();
            console.log(json)
            if(json)
                setWeatherData(json);
        }
        if(!response.ok){
            console.error('Error fetching weather data:');
        }
        setDataLoading(false);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (cityName !== "")
            await fetchWeatherData();
    };
    // Function to handle click on recent search items
    const handleRecentClick = async(city) => {
        setCityName(city);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={4} style={{}}>
                <Grid item xs={12} sm={8} >
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '40px' }}>
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
                                    <Typography variant="h6" sx={{fontSize: '35px'}}>{weatherData.name}</Typography>
                                    <Typography variant="body1">
                                        Temperature: {weatherData.main.temp} °C
                                    </Typography>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={getWeatherImageUrl(weatherData.weather[0].main)}
                                            alt={weatherData.weather[0].description}
                                        />
                                    </Card>
                                    <Typography variant="body1">
                                        Feels Like: {weatherData.main.feels_like} °C
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">
                                        Humidity: {weatherData.main.humidity}%
                                    </Typography>
                                    <Typography variant="body1">
                                        Pressure: {weatherData.main.pressure} hPa
                                    </Typography>
                                    <Typography variant="body1">
                                        Max Temperature: {weatherData.main.temp_max} °C
                                    </Typography>
                                    <Typography variant="body1">
                                        Min Temperature: {weatherData.main.temp_min} °C
                                    </Typography>
                                    <Typography variant="body1">
                                        Weather: {weatherData.weather[0].description}
                                    </Typography>
                                    <Typography variant="body1">
                                        Wind Speed: {weatherData.wind.speed} m/s
                                    </Typography>
                                    <Typography variant="body1">
                                        Wind Gust: {weatherData.wind.gust} m/s
                                    </Typography>
                                    <Typography variant="body1">
                                        Wind Direction: {weatherData.wind.deg}°
                                    </Typography>
                                    <Typography variant="body1">
                                        Country: {weatherData.sys.country}
                                    </Typography>
                                    <Typography variant="body1">
                                        Visibility: {weatherData.visibility} meters
                                    </Typography>
                                    <Typography variant="body1">
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
                            <Typography variant="h6" sx={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>Recent Searches</Typography>
                            {recent.map((search, index) => (
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
