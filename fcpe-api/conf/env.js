const env = {
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/fcpe-fr',
  SECRET : "supersecrettoken"
};

module.exports = env;