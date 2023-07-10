const mapping: Record<string, string> = {
  contents: 'content',
  firms: 'firm',
  'marketing-plans': 'marketing_plan',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
