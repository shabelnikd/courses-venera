import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  TextField,
  MenuItem,
  CircularProgress,
  Paper,
} from '@mui/material';
import api from '../api';

const levels = [
  { value: 'beginner', label: 'Начальный' },
  { value: 'intermediate', label: 'Средний' },
  { value: 'advanced', label: 'Продвинутый' },
];

const Lessons = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await api.get('lessons/');
        setLessons(response.data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(search.toLowerCase()) ||
      lesson.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = !level || lesson.level === level;
    return matchesSearch && matchesLevel;
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #2E7D32 0%, #0288D1 100%)',
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Уроки
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Выберите урок и начните обучение
          </Typography>
        </Paper>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Поиск уроков"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Уровень сложности"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            >
              <MenuItem value="">Все уровни</MenuItem>
              {levels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {filteredLessons.map((lesson) => (
            <Grid item xs={12} md={6} lg={4} key={lesson.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    {lesson.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, fontSize: '1rem' }}
                  >
                    {lesson.description}
                  </Typography>
                  <Chip
                    label={levels.find((l) => l.value === lesson.level)?.label}
                    color="primary"
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(46, 125, 50, 0.1)',
                      color: 'primary.main',
                      fontWeight: 500,
                    }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => navigate(`/lessons/${lesson.id}`)}
                    sx={{
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'rgba(2, 136, 209, 0.1)',
                      },
                    }}
                  >
                    Начать урок
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Lessons; 