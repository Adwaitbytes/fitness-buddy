import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!user) history.push('/');
    else {
      axios.get('http://localhost:5000/api/profile/matches', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then(res => setMatches(res.data));
    }
  }, [user, history]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put('http://localhost:5000/api/profile/me', { fitnessGoals: user.fitnessGoals }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setUser(res.data);
  };

  return (
    <Container>
      <Typography variant="h4">Profile</Typography>
      {user && (
        <>
          <TextField label="Username" value={user.username} disabled />
          <TextField label="Fitness Goals" value={user.fitnessGoals.join(', ')} onChange={(e) => setUser({ ...user, fitnessGoals: e.target.value.split(', ') })} />
          <Button onClick={handleUpdate} variant="contained">Update</Button>
          <Typography variant="h6">Matches</Typography>
          <List>
            {matches.map(match => (
              <ListItem key={match._id} button onClick={() => history.push(`/chat/${match._id}`)}>
                <ListItemText primary={match.username} secondary={match.fitnessGoals.join(', ')} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
}

export default Profile;