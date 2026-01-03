'use client';

import { useQuery } from '@apollo/client';
import { ME_QUERY } from '@/lib/graphql/operations';
import type { Employee } from '@/lib/graphql/types';

type MeResponse = { me: Employee | null };

export function useMe() {
  return useQuery<MeResponse>(ME_QUERY, {
    fetchPolicy: 'cache-and-network'
  });
}
