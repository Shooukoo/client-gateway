/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  PRODUCT_SERVICE_HOST:string;
  PRODUCT_SERVICE_PORT:number;
}

// TODO: Validar mediante un esquema
const envSchema = joi
  .object({
    PORT: joi.number().required(),
    //DATABASE_URL: joi.string().required(),
    PRODUCT_SERVICE_HOST: joi.string().required(),
    PRODUCT_SERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

const envVars: EnvVars = value;

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
  port: envVars.PORT,
  //databaseUrl: envVars.DATABASE_URL,
  PRODUCT_SERVICE_HOST : envVars.PRODUCT_SERVICE_HOST,
  PRODUCT_SERVICE_PORT : envVars.PRODUCT_SERVICE_PORT,
};
