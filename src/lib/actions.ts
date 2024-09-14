'use server';

import bcrypt from 'bcryptjs';
import {AuthError} from 'next-auth';

import {LoginSchema, RegisterSchema} from '@/lib/schemas';

import {signIn, signOut} from './auth';
import prisma from './db';
import {DEFAULT_REDIRECT} from './routes';

export async function register(_, rawData: FormData) {
  const data = Object.fromEntries(
    rawData,
  ) as unknown as typeof RegisterSchema._type;
  const validationResult = await RegisterSchema.safeParseAsync(data);
  const errors = validationResult.error?.flatten().fieldErrors;
  if (!validationResult.success) {
    return {emailConflict: false, usernameConficlt: false, ...errors};
  }

  const exists = await prisma.user.findFirst({
    where: {OR: [{email: data.email}, {username: data.username}]},
  });
  if (exists) {
    return {
      emailConflict: exists.email === data.email,
      usernameConficlt: data.username === exists.username,
      ...errors,
    };
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(data.password, salt);

  await prisma.user.create({
    data: {username: data.username, email: data.email, password},
  });

  await signIn('credentials', {
    username: data.username,
    password: data.password,
  });
}

export async function login(_, rawData: FormData) {
  const data = Object.fromEntries(
    rawData,
  ) as unknown as typeof LoginSchema._type;
  const validationResult = await LoginSchema.safeParseAsync(data);
  if (!validationResult.success) {
    return {error: {message: 'Wrong credentials'}};
  }
  try {
    await signIn('credentials', {redirectTo: DEFAULT_REDIRECT, ...data});
  } catch (error) {
    if (error instanceof AuthError) {
      return {error: {message: 'Wrong credentials'}};
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}

export async function loginGoogle() {
  await signIn('google');
}
