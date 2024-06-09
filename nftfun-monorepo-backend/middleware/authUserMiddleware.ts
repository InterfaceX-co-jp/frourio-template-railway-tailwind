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

export const authDigUserMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    // const verified: JwtPayload = await req.jwtVerify();
    // if (!verified.scope.some((el) => jwtConfig.scope.user.dig.includes(el))) {
    //   throw new Error(`
    //   Required ${jwtConfig.scope.user.dig} invalid scope given: ${verified.scope}`);
    // }
  } catch (err) {
    console.error('JWT verify error', err);
    reply.send(err);
  }
};
