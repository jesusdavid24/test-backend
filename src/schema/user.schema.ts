import { z } from 'zod';

export const UserSchema = z.object({
  identificationTypeId: z.string({
    required_error: 'identification type is required',
  })
  .trim()
  .min(1),
  identificationNumber: z.string({
    required_error: 'identification number is required',
  })
  .trim()
  .min(6, 'identificationNumber cannot be empty')
  .max(10, 'identificationNumber cannot be empty'),
  firstName: z.string({
    required_error: 'firstName is required'
  })
  .trim()
  .min(1, 'firstName cannot be empty'),
  lastName: z.string({
    required_error: 'lastName is required'
  })
  .trim()
  .min(1, 'lastName cannot be empty'),
  password: z.string({
    required_error: 'password is required'
  })
  .trim()
  .min(6, 'must have at least 6 characters'),
  email: z.string({
    required_error: 'Email is required',
  })
  .trim()
  .min(1, 'Email cannot be empty')
  .email('Invalid email'),
  phone: z.string({
    required_error: 'phone is required'
  })
  .trim()
  .min(10, 'must have at least 10 characters'),
  role: z.enum(['ADMIN', 'EMPLOYEE'], {
    errorMap: (issue, ctx) => {
      return { message: 'Invalid role' };
    },
  })
}).strict();
