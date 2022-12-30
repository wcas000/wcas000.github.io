import React, { useState } from 'react';
import axios from "axios";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system';

export default function App() {

	const [word, setWord] = useState("");
	const [movies, setMovies] = useState([])

	var options = {
		"url": `https://api.kkbox.com/v1.1/search?q=${word}&type=track&territory=TW`,
		"method": "GET",
		"timeout": 0,
		"headers": {
			"Authorization": "Bearer 5dXqfIpEBC7ZMWClKx81Pw=="
		},
	};

	const getMovies = async () => {
		await axios.request(options).then(function (response) {
			setMovies(response.data.tracks.data)
		}).catch(function (error) {
			console.error(error);
		});
	}

	const UpdateWord = (e) => {
		setWord(e.target.value);
	}

	return (
		<div>
			<input onChange={UpdateWord} type="text" />
			<br />
			<Button onClick={getMovies}>Search</Button>
			<br />
			<br />
			<Box sx={{ width: '100%' }}>
				<Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 4, md: 6 }}>
					{movies?.map((item) => (
						<Grid key={item.id} item xs={6}>
							<Card sx={{ maxWidth: item.album.images[0].width }}>
								<CardMedia
									sx={{ height: item.album.images[0].height }}
									image={item.album.images[0].url}
									title={item.album.name}
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										Singer: {item.name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Release Date: {item.album.release_date}
									</Typography>
								</CardContent>
								<CardActions>
									<Button href={item.album.url}>
										KKBOX LINK
									</Button>
								</CardActions>
							</Card>
							<audio controls>
								<source src={item.url}></source>
							</audio>
						</Grid>
					))}
				</Grid>
			</Box>
		</div>
	);
}
