import { FirmInterface } from 'interfaces/firm';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  name: string;
  description?: string;
  firm_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  firm?: FirmInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  firm_id?: string;
  user_id?: string;
}
