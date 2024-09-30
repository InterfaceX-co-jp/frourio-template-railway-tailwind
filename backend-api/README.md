## Techs

- [fastify for API server](https://fastify.dev/)
- [frourio for type generation](https://frourio.com/docs)
- [Prisma for ORM/migration](https://www.prisma.io/)
- [Vitest for test](https://vitest.dev/)
- [npm-run-all for managing multiple npm-scripts](https://www.npmjs.com/package/npm-run-all)

## Commands

See package.json

```bash
# Run local server
npm run dev

# Generate types
npm run generate

# Local migration
npm run migrate:dev

# Run local seeder
npm run seed:dev

# Run production seeder which runs default when npm run dev
npm run seed
npm run seed:production

# Run typecheck
npm run typecheck

# Run test
npm run test
```
