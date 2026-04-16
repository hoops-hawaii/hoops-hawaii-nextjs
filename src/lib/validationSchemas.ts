import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddCourtSchema = Yup.object({
  name: Yup.string().required(),
  address: Yup.string().required(),
  environment: Yup.string().required(),
  capacity: Yup.number().positive().required(),
  present: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['very_good', 'good', 'mid', 'bad','trash']).required(),
})
