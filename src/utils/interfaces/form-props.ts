export type FormProps<V> = {
  id?: string;
  defaultValues?: V;
  onSubmit: (value: V) => void;
  onDelete?: () => void;
  disable?: boolean;
};