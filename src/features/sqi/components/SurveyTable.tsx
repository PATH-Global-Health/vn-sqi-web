import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import location from 'api/locations.json';
import { SurveyPayload } from 'models';
import * as React from 'react';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface ISurveyTableProps {
  data?: SurveyPayload[];
  onRemove?: (survey: SurveyPayload) => void;
  onExportExcel?: () => void;
}

export function SurveyTable({ data, onRemove, onExportExcel }: ISurveyTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyPayload>();

  const getProvince = (code: string) => {
    const province = location.find((s) => s.value === code);
    if (province) {
      return province.label;
    }
    return code;
  };

  const getDistrict = (provinceCode: string, code: string) => {
    const province = location.find((s) => s.value === provinceCode);
    if (province) {
      const district = province.districts.find((s) => s.value === code);
      if (district) {
        return district.label;
      }
    }
    return code;
  };

  const getGender = (code: number | string) => {
    if (code && 0 <= code && code < 4) {
      let index = Number.parseInt(code.toString());
      return ['', 'Nam', 'Nữ', 'Không muốn trả lời'][index];
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (survey: SurveyPayload) => {
    setSelectedSurvey(survey);
    setOpen(true);
  };

  const handleRemoveConfirm = (survey: SurveyPayload) => {
    onRemove?.(survey);
    setOpen(false);
  };

  return (
    <>
      <Toolbar>
        <Grid container direction="row" justifyContent="flex-end" alignItems="center">
          <Grid item>
            <Tooltip title="Export Excel">
              <IconButton
                color="primary"
                onClick={() => {
                  onExportExcel?.();
                }}
              >
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tỉnh/thành</TableCell>
              <TableCell>Quận/huyện</TableCell>
              <TableCell>Cơ sở</TableCell>
              <TableCell>Hệ thống</TableCell>
              <TableCell>Ngày</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Tuổi</TableCell>
              <TableCell>Câu 1</TableCell>
              <TableCell>Câu 2</TableCell>
              <TableCell>Câu 3</TableCell>
              <TableCell>Câu 4</TableCell>
              <TableCell>Câu 5</TableCell>
              <TableCell>Câu 6</TableCell>
              <TableCell>Câu 7</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.map((item: SurveyPayload) => (
                <TableRow key={item.id}>
                  <TableCell>{getProvince(item.province)}</TableCell>
                  <TableCell>{getDistrict(item.province, item.district)}</TableCell>
                  <TableCell>{item.facilityName}</TableCell>
                  <TableCell>{item.app}</TableCell>
                  <TableCell>{item.surveyDate?.toISOString().split('T')[0]}</TableCell>
                  <TableCell>{getGender(item.gender)}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.question1}</TableCell>
                  <TableCell>{item.question2}</TableCell>
                  <TableCell>{item.question3}</TableCell>
                  <TableCell>{item.question4}</TableCell>
                  <TableCell>{item.question5}</TableCell>
                  <TableCell>{item.question6}</TableCell>
                  <TableCell>[{item.question7.join(', ')}]</TableCell>
                  <TableCell align="right">
                    <Button size="small" color="error" onClick={() => handleRemoveClick(item)}>
                      <DeleteOutlineIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xóa bản phỏng vấn</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Đồng ý xóa?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Hủy
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedSurvey as SurveyPayload)}
            color="error"
            variant="contained"
            autoFocus
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
