import { useEffect } from 'react';
import { watchPendingLeads } from '@/lib/leads';

const PendingLeadsSync = () => {
  useEffect(() => watchPendingLeads(), []);
  return null;
};

export default PendingLeadsSync;
