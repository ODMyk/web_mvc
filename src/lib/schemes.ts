import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(30),
    password: z.string().min(3).max(30),
    passwordConfirm: z.string(),
}).superRefine(({ passwordConfirm, password }, ctx) => {
    let digitFound = false;
    let charFound = false;
    for (const s of password) {
        const code = s.toLocaleLowerCase().charCodeAt(0);
        if (code >= 48 && code <= 57) {
            digitFound = true;
            continue;
        } else if (code >= 96 && code <= 132) {
            charFound = true;
            continue;
        }
        ctx.addIssue({
            code: "custom",
            message: "Password contained forbidden symbols",
            path: ['password']
          });
          break;
    }

    if (!digitFound) {
        ctx.addIssue({
            code: "custom",
            message: "Password did not contain a digit",
            path: ['password']
        });
    }

      if (!charFound) {
        ctx.addIssue({
          code: "custom",
          message: "Password did not contain a character",
          path: ['password']
        });
      }
    
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['passwordConfirm']
      });
    }
  });

export const LoginSchema = z.object({
    email: z.string(),
    password: z.string(),
})