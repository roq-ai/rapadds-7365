import { ContentInterface } from 'interfaces/content';
import { MarketingPlanInterface } from 'interfaces/marketing-plan';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FirmInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  content?: ContentInterface[];
  marketing_plan?: MarketingPlanInterface[];
  user?: UserInterface;
  _count?: {
    content?: number;
    marketing_plan?: number;
  };
}

export interface FirmGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
