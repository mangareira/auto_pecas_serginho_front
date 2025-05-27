import { AdminFormValues } from "../schemas/new-admin-dto";

export type AdminFormProps = {
  id?: string;
  defaultValues?: AdminFormValues;
  onSubmit: (value: AdminFormValues) => void;
  onDelete?: () => void;
  disable?: boolean;
};