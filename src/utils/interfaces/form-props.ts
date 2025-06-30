export type FormProps<V,  O = unknown> = {
  id?: string;
  defaultValues?: V;
  onSubmit: (value: V) => void;
  onDelete?: () => void;
  disable?: boolean;
} & O;