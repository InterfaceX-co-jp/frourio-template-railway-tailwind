// import { jwtConfig } from '$/config/jwt';
import type { FastifyReply, FastifyRequest } from 'fastify';

// interface JwtPayload {
//   id: string;
//   email: string;
//   scope: string[];
//   sub: string;
//   iat: number;
//   exp: number;
// }

export const authAdminMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    // const verified: JwtPayload = await req.jwtVerify();
    // if (!verified.scope.some((el) => jwtConfig.scope.admin.includes(el))) {
    //   throw new Error(
    //     `Required: ${jwtConfig.scope.admin}, but invalid scope given: ${verified.scope}`,
    //   );
    // }
  } catch (err) {
    console.error('JWT verify error', err);
    reply.send(err);
  }
};
