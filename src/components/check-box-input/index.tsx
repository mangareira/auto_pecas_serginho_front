import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

interface CheckBoxInputProps<TFieldValues extends FieldValues> 
  extends React.ComponentProps<'input'> {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  typeServiceOptions: { label: string; value: string }[];
  disable?: boolean;
}

export function CheckBoxInput<I extends FieldValues>({ field, typeServiceOptions, disable }: CheckBoxInputProps<I>) {
  return (
    <div className="flex flex-col gap-2">
      {typeServiceOptions.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={`service-${option.value}`}
            checked={field.value?.includes(option.value)}
            onCheckedChange={(checked) => {
              if (checked) {
                field.onChange([...field.value, option.value])
              } else {
                field.onChange(
                  field.value?.filter((value: string) => value !== option.value)
                )
              }
            }}
            disabled={disable}
          />
          <Label htmlFor={`service-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </div>
  )
}