import * as yup from 'yup';

export const contentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  firm_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
