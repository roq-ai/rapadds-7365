import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { marketingPlanValidationSchema } from 'validationSchema/marketing-plans';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getMarketingPlans();
    case 'POST':
      return createMarketingPlan();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMarketingPlans() {
    const data = await prisma.marketing_plan
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'marketing_plan'));
    return res.status(200).json(data);
  }

  async function createMarketingPlan() {
    await marketingPlanValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.marketing_plan.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
