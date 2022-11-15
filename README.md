## I. Server
   1. `npm init -y`
   2. `npm i prisma nodemon -D`
   3. `npm i @prisma/client`
   4. `npx prisma init`
      - `set NODE_TLS_REJECT_UNAUTHORIZED=0` 

        for ignore SSL certificate if that needed

      ```bash
      $ npx prisma init

      ✔ Your Prisma schema was created at prisma/schema.prisma
        You can now open it in your favorite editor.

      Next steps:
      1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
      2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
      3. Run prisma db pull to turn your database schema into a Prisma schema.
      4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

      More information in our documentation:
      https://pris.ly/d/getting-started
      ```

  5. Add DB URL to `.env` file
  6. Edit `prisma/schema.prisma` file, add models
  7. `npx prisma migrate dev` (create DB & sql file, repeat after any changes in prisma schema)
  8. To add the mock data
     1. Create `seed.js` file
     2. Add to `package.json`
        ```json
        "prisma": {
          "seed": "node prisma/seed.js"
        }
        ```
     3. And add `"type": "module"` for use import into `seed.js` file
     4. `npx prisma db seed`
      
            DB seeding also by `prisma migrate db` & `prisma migrate reset`

  9. Add next packages:
     1.  `fastify` - web-server (the analog of express)
     2.  `dotenv` - read `.env` file
     3.  `@fastify/cookie` - parse and set cookie headers (for authorization)
     4.  `@fastify/cors` - enables the use of CORS
     5.  `@fastify/sensible` - adds some useful decorators such as HTTP errors and assertions
 10.  Create `server.js` file
 11.  `npm i body-parser`

============================================

  1.   Try express instead of fastify
       1.   add packages: `express cors cookie-parser express-validator bcryptjs jsonwebtoken uuid`
  2.   





## II. Client
