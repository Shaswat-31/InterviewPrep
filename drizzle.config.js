/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://interview-data_owner:IKAVZ86kzXYR@ep-steep-breeze-a57deme8.us-east-2.aws.neon.tech/interview-data?sslmode=require'
    }
  };
  