'use client';

import { EditAdminSheet } from '@/components/admin/edit-admin';
import { NewAdminSheet } from '@/components/admin/new-admin';
import { useMountedState } from 'react-use';


export const SheetProvider = () => {
  const isMonted = useMountedState();
  if (!isMonted) return null;
  return (
    <>
      <NewAdminSheet />
      <EditAdminSheet /> 
    </>
  );
};