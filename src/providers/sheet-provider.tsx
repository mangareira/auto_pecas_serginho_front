'use client';

import { EditAdminSheet } from '@/components/admin/edit-admin';
import { NewAdminSheet } from '@/components/admin/new-admin';
import { EditEmployeeSheet } from '@/components/employee/edit-employee';
import { NewEmployeeSheet } from '@/components/employee/new-employee';
import { EditHelperSheet } from '@/components/helper/edit-helper';
import { NewHelperSheet } from '@/components/helper/new-helper';
import { useMountedState } from 'react-use';


export const SheetProvider = () => {
  const isMonted = useMountedState();
  if (!isMonted) return null;
  return (
    <>
      <NewAdminSheet />
      <EditAdminSheet /> 
      <NewEmployeeSheet />
      <EditEmployeeSheet />
      <NewHelperSheet />
      <EditHelperSheet />
    </>
  );
};