import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface DebouncedInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value: string;
  onChange: (value: string) => void;
  delay?: number;
}

export const DebouncedInput = ({
  value,
  onChange,
  delay = 500,
  ...props
}: DebouncedInputProps) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(internalValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [internalValue, delay, onChange]);

  return (
    <Input
      {...props}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
    />
  );
};
