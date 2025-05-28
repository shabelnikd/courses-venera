import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import api from '../api';

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await api.get(`lessons/${id}/`);
        setLesson(response.data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleNext = async () => {
    if (!lesson || !lesson.exercises[activeStep]) return;

    try {
      const response = await api.post(
        `exercises/${lesson.exercises[activeStep].id}/submit_answer/`,
        { answer }
      );

      setFeedback({
        isCorrect: response.data.is_correct,
        correctAnswer: response.data.correct_answer,
      });

      if (response.data.is_correct) {
        setScore(response.data.score);
      }

      if (response.data.completed) {
        setCompleted(true);
      }

      setTimeout(() => {
        setFeedback(null);
        setAnswer('');
        if (activeStep < lesson.exercises.length - 1) {
          setActiveStep((prevStep) => prevStep + 1);
        }
      }, 2000);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setAnswer('');
    setFeedback(null);
  };

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
        <CircularProgress />
      </Box>
    );
  }

  if (!lesson) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">Урок не найден</Alert>
      </Container>
    );
  }

  const currentExercise = lesson.exercises[activeStep];

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {lesson.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {lesson.description}
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {lesson.exercises.map((exercise, index) => (
            <Step key={index}>
              <StepLabel>Упражнение {index + 1}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {currentExercise.question}
          </Typography>

          {currentExercise.type === 'multiple_choice' ? (
            <FormControl component="fieldset">
              <FormLabel component="legend">Выберите правильный ответ:</FormLabel>
              <RadioGroup
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              >
                {currentExercise.options.map((option, index) => {
                  const value = Array.isArray(option) ? option.join(' — ') : option;
                  return (
                    <FormControlLabel
                      key={index}
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          ) : (
            <TextField
              fullWidth
              label="Ваш ответ"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              margin="normal"
            />
          )}

          {feedback && (
            <Alert
              severity={feedback.isCorrect ? 'success' : 'error'}
              sx={{ mt: 2 }}
            >
              {feedback.isCorrect
                ? 'Правильно!'
                : `Неправильно. Правильный ответ: ${feedback.correctAnswer}`}
            </Alert>
          )}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Назад
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!answer || feedback}
            >
              {activeStep === lesson.exercises.length - 1 ? 'Завершить' : 'Далее'}
            </Button>
          </Box>
        </Paper>

        {completed && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Поздравляем! Вы завершили урок. Ваш счет: {score}
          </Alert>
        )}

        <Button
          variant="outlined"
          onClick={() => navigate('/lessons')}
          sx={{ mt: 2 }}
        >
          Вернуться к списку уроков
        </Button>
      </Box>
    </Container>
  );
};

export default LessonDetail; 