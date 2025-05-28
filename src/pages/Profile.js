import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  LinearProgress,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import api from '../api';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResponse, progressResponse] = await Promise.all([
          api.get('auth/user/'),
          api.get('progress/'),
        ]);

        setUserData(userResponse.data);
        setProgress(progressResponse.data);
      } catch (error) {
        setError('Ошибка при загрузке данных профиля');
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  if (error) {
    return (
      <Container maxWidth="md">
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Container>
    );
  }

  const completedLessons = progress.filter((p) => p.completed).length;
  const totalScore = progress.reduce((sum, p) => sum + p.score, 0);
  const averageScore = completedLessons > 0
    ? Math.round(totalScore / completedLessons)
    : 0;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
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
            Профиль пользователя
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Ваш прогресс и достижения
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {/* User Info */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Личная информация
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Имя: {userData?.first_name} {userData?.last_name}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Email: {userData?.email}
                </Typography>
                <Typography variant="subtitle1">
                  Имя пользователя: {userData?.username}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Statistics */}
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Статистика
              </Typography>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      backgroundColor: 'rgba(46, 125, 50, 0.1)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography color="primary.main" gutterBottom sx={{ fontWeight: 500 }}>
                        Завершено уроков
                      </Typography>
                      <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        {completedLessons}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      backgroundColor: 'rgba(2, 136, 209, 0.1)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography color="secondary.main" gutterBottom sx={{ fontWeight: 500 }}>
                        Общий счет
                      </Typography>
                      <Typography variant="h4" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                        {totalScore}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      backgroundColor: 'rgba(46, 125, 50, 0.1)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography color="primary.main" gutterBottom sx={{ fontWeight: 500 }}>
                        Средний балл
                      </Typography>
                      <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        {averageScore}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Progress */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Прогресс обучения
              </Typography>
              <Box sx={{ mt: 2 }}>
                {progress.map((item) => (
                  <Box key={item.id} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {item.lesson.title}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'primary.main' }}>
                        Счет: {item.score}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={item.completed ? 100 : (item.score / 100) * 100}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'rgba(46, 125, 50, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: item.completed ? 'primary.main' : 'secondary.main',
                        },
                      }}
                    />
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile; 