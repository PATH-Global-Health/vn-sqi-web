import { Card, CardContent, CardMedia, Container, CssBaseline, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { SurveyPayload } from 'models';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SurveyForm from '../components/SurveyForm';
import { sqiActions } from '../sqiSlice';

const theme = createTheme();
const apps = ['epic', 'ladders', 'healthy-market', 'c-his'];

export default function SurveyPage() {
  const history = useHistory();
  const error = useAppSelector((state) => state.sqi.error);

  const dispatch = useAppDispatch();
  const { app } = useParams<{ app: string }>();

  let initialValues: SurveyPayload = {
    surveyDate: new Date(),
    age: '',
    gender: '',
    province: '',
    district: '',
    question1: 0,
    question2: 0,
    question3: 0,
    facility: '',
    otherService: '',
    question4: 0,
    question5: 0,
    question6: 0,
    question7: [],
  } as SurveyPayload;

  useEffect(() => {
    if (!apps.includes(app)) {
      history.push('/notfound');
    }
  }, [app, history]);

  const handleSubmit = (formValues: SurveyPayload) => {
    dispatch(sqiActions.sendForm({ ...formValues, app: app }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" style={{ paddingTop: '10px', paddingBottom: '100px' }}>
        <Card>
          <CardMedia
            component="img"
            height="140"
            image="https://lh5.googleusercontent.com/MhJ1Qplziw-Z6toTuSVgpvavwbems9W1xgE1zliHQHrBO1Mm8lZ_jVYTwZEWMpgOnBjHs83K9eWwXTjUjDk65lJjGE8YMkZhDcfxrPbiQT3TbdghTTOV97WYlDemxv23Vw=w1200"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Bảng hỏi cảm nhận của khách hàng về dịch vụ
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Nhằm phục vụ bạn ngày một tốt hơn, chúng tôi muốn biết ý kiến riêng của bạn về những
              vấn đề liên quan đến việc cung cấp dịch vụ của các cơ sở (hoặc nhóm tiếp cận cộng
              đồng).
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Chúng tôi xin phép hỏi bạn vài câu hỏi. Mong bạn trả lời một cách thoải mái, theo cảm
              nhận của bạn.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bạn không phải lo ngại về các vấn đề riêng tư, vì chúng tôi không thu thập thông tin
              cá nhân.
            </Typography>
          </CardContent>
        </Card>
        <br />
        <SurveyForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Container>
    </ThemeProvider>
  );
}
