import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  MONGO_URI: z.string().url(),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  process.exit(1);
}

export const settings = {
  port: Number(env.data.PORT),
  mongoUri: env.data.MONGO_URI,
  JWT_SECRET:env.data.JWT_SECRET
};