import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

export default function Players() {
  const [APIData, setAPIData] = useState([]);
  const baseURL = "http://localhost:3001/players";

  useEffect(() => {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setAPIData(data))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {APIData.map((data) => (
        <Grid item md={4} key={data.id}>
          <Card>
            <CardMedia component="img" height="240" image={data.img} alt={data.name} />
            <CardContent>
              <Typography gutterBottom variant="h5">{data.name}</Typography>
              <Typography variant="body2" color="text.secondary">{data.club}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{data.nation}</Button>
              <Button size="small">Detail</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
