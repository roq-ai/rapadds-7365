import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { marketingPlanValidationSchema } from 'validationSchema/marketing-plans';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.marketing_plan
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMarketingPlanById();
    case 'PUT':
      return updateMarketingPlanById();
    case 'DELETE':
      return deleteMarketingPlanById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMarketingPlanById() {
    const data = await prisma.marketing_plan.findFirst(convertQueryToPrismaUtil(req.query, 'marketing_plan'));
    return res.status(200).json(data);
  }

  async function updateMarketingPlanById() {
    await marketingPlanValidationSchema.validate(req.body);
    const data = await prisma.marketing_plan.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMarketingPlanById() {
    const data = await prisma.marketing_plan.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
