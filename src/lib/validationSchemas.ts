import { Role } from '@prisma/client';
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

export const EditProfileSchema = Yup.object({
  role: Yup.mixed<Role>().oneOf(['USER', 'ADMIN']).required(),
  id: Yup.number().required(),
  password: Yup.string().required(),
  username: Yup.string().required(),
  bio: Yup.string().nullable().defined(),
  pfp: Yup.string().url().nullable().defined(),
  homeCourtId: Yup.number().nullable().defined(),
  skill: Yup.string().oneOf(['trash', 'beginner', 'mid', 'pro', 'goated']).required(),
  teamId: Yup.number().nullable().defined(),
})