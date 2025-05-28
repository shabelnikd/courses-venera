import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import {
  School as SchoolIcon,
  Psychology as PsychologyIcon,
  EmojiEvents as EmojiEventsIcon,
  Language as LanguageIcon,
  Timer as TimerIcon,
  Group as GroupIcon,
  PlayCircle as PlayCircleIcon,
  Book as BookIcon,
} from '@mui/icons-material';

const features = [
  {
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    title: 'Интерактивные уроки',
    description: 'Изучайте через увлекательные интерактивные уроки с мгновенной обратной связью',
  },
  {
    icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
    title: 'Умная система',
    description: 'Адаптивное обучение, которое подстраивается под ваш уровень и темп обучения',
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    title: 'Отслеживание прогресса',
    description: 'Следите за своим прогрессом и получайте награды за достижения',
  },
];

const benefits = [
  {
    icon: <LanguageIcon sx={{ fontSize: 32 }} />,
    title: 'Практические задания',
    description: 'Выполняйте практические задания и получайте обратную связь',
  },
  {
    icon: <TimerIcon sx={{ fontSize: 32 }} />,
    title: 'Гибкий график',
    description: 'Занимайтесь в любое удобное время',
  },
  {
    icon: <GroupIcon sx={{ fontSize: 32 }} />,
    title: 'Сообщество',
    description: 'Присоединяйтесь к сообществу учащихся',
  },
];

const testimonials = [
  {
    name: 'Анна К.',
    role: 'Начинающий',
    avatar: 'A',
    text: 'Отличная платформа для обучения. Уроки очень структурированные и понятные.',
  },
  {
    name: 'Михаил П.',
    role: 'Средний уровень',
    avatar: 'M',
    text: 'Благодаря этой платформе я значительно улучшил свои навыки.',
  },
  {
    name: 'Елена С.',
    role: 'Продвинутый',
    avatar: 'E',
    text: 'Лучшая платформа для онлайн обучения, которую я когда-либо использовала.',
  },
];

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #2E7D32 0%, #0288D1 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          mb: 8,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/pattern.png")',
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Изучайте онлайн с удовольствием
              </Typography>
              <Typography
                variant="h5"
                paragraph
                sx={{
                  opacity: 0.9,
                  mb: 4,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                }}
              >
                Интерактивная платформа для эффективного онлайн обучения.
                Начните свой путь к новым знаниям уже сегодня!
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={RouterLink}
                  to="/lessons"
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<PlayCircleIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 12px rgba(2, 136, 209, 0.3)',
                  }}
                >
                  Начать обучение
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="outlined"
                  color="inherit"
                  size="large"
                  startIcon={<BookIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Зарегистрироваться
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                  alt="Online Learning"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 6, color: 'primary.main' }}
        >
          Почему выбирают нас
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 4,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 3,
                    p: 2,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, mb: 6, color: 'secondary.main' }}
          >
            Преимущества обучения
          </Typography>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      color: 'secondary.main',
                      mb: 2,
                      p: 2,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(2, 136, 209, 0.1)',
                      display: 'inline-flex',
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: '1.1rem',
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 6, color: 'primary.main' }}
        >
          Отзывы наших учеников
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 56,
                      height: 56,
                      mr: 2,
                    }}
                  >
                    {testimonial.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                  }}
                >
                  "{testimonial.text}"
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #0288D1 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 600, mb: 3 }}
          >
            Готовы начать обучение?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            Присоединяйтесь к тысячам учеников, которые уже обучаются с нами
          </Typography>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              boxShadow: '0 4px 12px rgba(2, 136, 209, 0.3)',
            }}
          >
            Начать бесплатно
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 