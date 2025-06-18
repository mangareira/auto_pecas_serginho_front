export type AmountInputProps = {
  value: string | number;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disable?: boolean;
};