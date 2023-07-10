import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { firmValidationSchema } from 'validationSchema/firms';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFirms();
    case 'POST':
      return createFirm();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFirms() {
    const data = await prisma.firm
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'firm'));
    return res.status(200).json(data);
  }

  async function createFirm() {
    await firmValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.content?.length > 0) {
      const create_content = body.content;
      body.content = {
        create: create_content,
      };
    } else {
      delete body.content;
    }
    if (body?.marketing_plan?.length > 0) {
      const create_marketing_plan = body.marketing_plan;
      body.marketing_plan = {
        create: create_marketing_plan,
      };
    } else {
      delete body.marketing_plan;
    }
    const data = await prisma.firm.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
