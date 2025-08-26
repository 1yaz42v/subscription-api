import { config } from "dotenv";

// Load environment variables based on NODE_ENV (default = development)
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, NODE_ENV, DB_URI } = process.env;
