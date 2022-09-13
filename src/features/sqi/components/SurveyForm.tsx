import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import location from 'api/locations.json';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  AutocompleteField,
  InputField,
  RadioGroupField,
  SelectField,
  SelectOption,
} from 'components/FormFields';
import { CheckboxesField } from 'components/FormFields/CheckboxesGroupField';
import DateField from 'components/FormFields/DateField';
import { siteActions } from 'features/site/siteSlice';
import { SurveyPayload } from 'models';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface SurveyFormProps {
  initialValues?: SurveyPayload;
  onSubmit?: (formValues: SurveyPayload) => void;
}

const schema = yup.object().shape({
  surveyDate: yup
    .date()
    .typeError('Vui lòng chọn ngày phỏng vấn')
    .required('Vui lòng chọn ngày phỏng vấn'),
  age: yup
    .number()
    .typeError('Vui lòng điền tuổi trong khoảng từ 13 đến 99')
    .required('Vui lòng điền tuổi')
    .min(13, 'Vui lòng điền tuổi trong khoảng từ 13 đến 99')
    .max(99, 'Vui lòng điền tuổi trong khoảng từ 13 đến 99'),
  gender: yup
    .number()
    .typeError('Vui lòng chọn giới tính')
    .required('Vui lòng chọn giới tính')
    .min(1, 'Vui lòng chọn giới tính')
    .max(3, 'Vui lòng chọn giới tính'),
  province: yup.string().required('Vui lòng chọn tỉnh/thành'),
  district: yup.string().required('Vui lòng chọn quận/huyện'),
  facility: yup.string().required('Vui lòng điền tên cơ sở'),
  question7: yup
    .array()
    .test(
      'acceptedValue',
      'Xin bạn xem lại: câu trả lời 4 đang không phù hợp với các câu 1, 2 hoặc 3',
      (val) => {
        if (val?.includes(4) && val.length > 1) {
          return false;
        }
        return true;
      }
    ),
});

const implementedProvince = ['79', '72', '75', '82'];

export default function SurveyForm({ initialValues, onSubmit }: SurveyFormProps) {
  const dispatch = useAppDispatch();
  const sites = useAppSelector((state) => state.site.data);
  const error = useAppSelector((state) => state.sqi.error);
  const [isRestart, setIsRestart] = useState(true);
  const isLoading = useAppSelector((state) => state.sqi.loading);
  const [canBeEnd, setCanBeEnd] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SurveyPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const handleFormSubmit = async (formValues: SurveyPayload) => {
    setIsRestart(false);
    onSubmit?.(formValues);
  };

  useEffect(() => {
    if (!error && error?.length === 0) {
      reset();
    }
  }, [error, reset]);

  useEffect(() => {
    if (isLoading) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isLoading]);

  const watchAllFields = watch();

  //check can be end
  useEffect(() => {
    const form = watchAllFields;
    let cbe = false;
    if (form.question3 == 2) {
      cbe = true;
    } else {
      if (form.question4 == 3 || form.question4 == 4) {
        cbe = true;
      } else {
        if (form.question6 == 2) {
          cbe = true;
        } else {
          if (form.question7.length > 0) {
            cbe = true;
          }
        }
      }
    }
    setCanBeEnd(cbe);
  }, [watchAllFields]);

  useEffect(() => {
    dispatch(siteActions.getSuccess([]));
    setValue('district', '');
  }, [watchAllFields.province]);

  useEffect(() => {
    dispatch(
      siteActions.get({
        province_code: watchAllFields.province,
        district_code: watchAllFields.district,
        category: 'site',
      })
    );
    setValue('facility', '');
  }, [watchAllFields.district]);

  useEffect(() => {
    if (sites && sites.length > 0) {
      const facility = sites.find((s) => s.code === watchAllFields.facility);
      if (facility) {
        setValue('facilityName', facility.name);
      } else {
        setValue('facilityName', facility);
      }
    }
  }, [watchAllFields.facility]);

  const provinces = location
    .filter((s) => implementedProvince.includes(s.value))
    .map((s) => {
      return {
        label: s.label,
        value: s.value,
      };
    });

  const districts = watchAllFields.province
    ? (location
        .find((s) => s.value == watchAllFields.province)
        ?.districts.map((s) => {
          return {
            label: s.label,
            value: s.value,
          };
        }) as SelectOption[])
    : ([{ label: '', value: '' }] as SelectOption[]);

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isRestart && (
        <Box>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Thông tin phỏng vấn
                    </Typography>
                    <DateField name="surveyDate" label="Ngày phỏng vấn *" control={control} />
                    <SelectField
                      name="gender"
                      control={control}
                      label="Giới tính của bạn là *"
                      options={[
                        {
                          label: 'Nam',
                          value: 1,
                        },
                        {
                          label: 'Nữ',
                          value: 2,
                        },
                        {
                          label: 'Không muốn trả lời',
                          value: 3,
                        },
                      ]}
                    />
                    <InputField
                      name="age"
                      label="Bạn khoảng bao nhiêu tuổi *"
                      control={control}
                      type="number"
                    />
                    <br />
                    <br />
                    <AutocompleteField
                      name="province"
                      control={control}
                      label="Hôm nay, bạn dùng dịch vụ tại tỉnh/thành: *"
                      options={provinces}
                    />
                    <br />
                    {watchAllFields.province && (
                      <AutocompleteField
                        name="district"
                        control={control}
                        label="Huyện (quận): *"
                        options={districts}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Bảng phỏng vấn
                    </Typography>
                    <br />
                    <RadioGroupField
                      name="question1"
                      control={control}
                      label="Câu 1. Bạn nhận xét như thế nào về cách đối xử của nhân viên/tiếp cận viên với bạn hôm nay?"
                      options={[
                        {
                          label: '1. Thân thiện, cởi mở',
                          value: 1,
                        },
                        {
                          label: '2. Cáu gắt, khó chịu',
                          value: 2,
                        },
                        {
                          label: '3. Kỳ thị, xa lánh',
                          value: 3,
                        },
                        {
                          label:
                            '4. Có lời nói (hoặc hành vi, cử chỉ, thái độ) thiếu tôn trọng, kinh thường, hoặc xúc phạm tôi',
                          value: 4,
                        },
                      ]}
                    />

                    {watchAllFields.question1 != 0 && (
                      <>
                        <br />
                        <RadioGroupField
                          name="question2"
                          control={control}
                          label="Câu 2. Trong 30 ngày vừa qua, bạn có bị cơ sở (hoặc nhân viên nhóm tiếp cận cộng đồng) từ chối cung cấp dịch vụ với lý do không chính đáng, hoặc không giải thích rõ lý do không?"
                          options={[
                            {
                              label: 'Có',
                              value: 1,
                            },
                            {
                              label: 'Không',
                              value: 2,
                            },
                          ]}
                        />
                      </>
                    )}
                    <br />
                    {watchAllFields.question2 != 0 && (
                      <>
                        <RadioGroupField
                          name="question3"
                          control={control}
                          label="Câu 3. Hôm nay, bạn đã nhận dịch vụ nào dưới đây?"
                          options={[
                            {
                              label: '1. Xét nghiệm HIV',
                              value: 1,
                            },
                            {
                              label: '2. PrEP',
                              value: 2,
                            },
                            {
                              label: '3. ARV',
                              value: 3,
                            },
                            {
                              label: '4. Tư vấn',
                              value: 4,
                            },
                            {
                              label: '5. Khác',
                              value: 5,
                            },
                          ]}
                        />
                        {watchAllFields.question3 == 5 && (
                          <InputField
                            name="otherService"
                            control={control}
                            label="Dịch vụ khác bạn đã nhận là gì?"
                          />
                        )}
                        {!sites ||
                          (sites?.length == 0 && (
                            <InputField
                              name="facility"
                              control={control}
                              label="Câu 3.1. Tên cơ sở cung cấp dịch vụ là gì? *"
                            />
                          ))}
                        {sites && sites.length > 0 && (
                          <AutocompleteField
                            name="facility"
                            control={control}
                            label="Câu 3.1. Tên cơ sở cung cấp dịch vụ là gì?"
                            options={
                              sites
                                ? sites.map((s) => {
                                    return { value: s.code, label: s.name };
                                  })
                                : []
                            }
                            otherOptions={[{ value: 'Other', label: 'Khác' }]}
                          />
                        )}
                      </>
                    )}
                    {watchAllFields.question3 != 0 &&
                      watchAllFields.question3 != 2 &&
                      watchAllFields.question3 != 3 && (
                        <>
                          <br />
                          <RadioGroupField
                            name="question4"
                            control={control}
                            label="Câu 4. Xin bạn vui lòng cho biết tình trạng nhiễm HIV của bạn?"
                            options={[
                              {
                                label: '1. Có phản ứng',
                                value: 1,
                              },
                              {
                                label: '2. Dương tính',
                                value: 2,
                              },
                              {
                                label: '3. Âm tính',
                                value: 3,
                              },
                              {
                                label: '4. Không biết/không muốn trả lời',
                                value: 4,
                              },
                            ]}
                          />
                        </>
                      )}
                    <br />
                    {(watchAllFields.question4 == 2 || watchAllFields.question3 == 3) && (
                      <>
                        <RadioGroupField
                          name="question5"
                          control={control}
                          label="Câu 5. Trong lần xét nghiệm tải lượng virus (XN TLVR) gần đây nhất, bạn có được phòng khám cho biết kết quả không?"
                          options={[
                            {
                              label: 'Có',
                              value: 1,
                            },
                            {
                              label: 'Không',
                              value: 2,
                            },
                            {
                              label: '3. Tôi mới làm XN TLVR và chưa có kết quả',
                              value: 3,
                            },
                            {
                              label: '4. Tôi không biết, hoặc tôi chưa được làm XN TLVR bao giờ',
                              value: 4,
                            },
                          ]}
                        />
                        <br />
                      </>
                    )}

                    {(watchAllFields.question5 != 0 || watchAllFields.question4 == 1) && (
                      <RadioGroupField
                        name="question6"
                        control={control}
                        label="Câu 6. Bạn đã từng tham gia dịch vụ tư vấn, xét nghiệm cho bạn tình, hoặc bạn chích chưa? (DV TV, XN BT/BC)?"
                        options={[
                          {
                            label: '1. Đã',
                            value: 1,
                          },
                          {
                            label: '2. Chưa',
                            value: 2,
                          },
                        ]}
                      />
                    )}
                    <br />
                    {watchAllFields.question6 == 1 && (
                      <CheckboxesField
                        label="Câu 7. Trong 30 ngày qua, bạn tình, hoặc bạn chích của bạn đã từng có hành vi nào dưới đây với bạn, do bạn tham gia DV TV, XN BT/BC? (Hãy chọn TẤT CẢ các câu trả lời mà bạn thấy phù hợp)"
                        name="question7"
                        control={control}
                        options={[
                          {
                            label: '1. Đấm/đá/tát hoặc làm đau bạn',
                            value: 1,
                          },
                          {
                            label:
                              '2. Đe dọa/làm hại/làm nhục hoặc kiểm soát các hành động của bạn',
                            value: 2,
                          },
                          {
                            label: '3. Ép bạn quan hệ tình dục mà bạn không mong muốn',
                            value: 3,
                          },
                          {
                            label: '4. Không có các hành vi trên',
                            value: 4,
                          },
                        ]}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <br />
            <Box mt={3}>
              {!isLoading && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !canBeEnd}
                  fullWidth
                >
                  Hoàn tất
                </Button>
              )}
              {isLoading && <CircularProgress size={30} />}
            </Box>
          </form>
        </Box>
      )}
      {!isRestart && (
        <Box>
          <Card variant="outlined">
            <CardContent>
              {error && <Alert severity="error">{error}</Alert>}
              {!error && error?.length === 0 && (
                <Alert severity="success">
                  Xin cảm ơn bạn đã trả lời các câu hỏi của chúng tôi!
                </Alert>
              )}
            </CardContent>
          </Card>
          <br />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              setIsRestart(true);
            }}
          >
            Làm khảo sát lại
          </Button>
        </Box>
      )}
    </>
  );
}
