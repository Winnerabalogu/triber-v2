"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface MultiSelectCheckboxProps {
  options: readonly string[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
}

export default function MultiSelectCheckbox({ options, selectedValues, onChange }: MultiSelectCheckboxProps) {
  
  const handleCheckedChange = (checked: boolean | 'indeterminate', value: string) => {
    let newSelectedValues: string[];
    
    if (checked) {
      // Add the value to the array if it's not already there
      newSelectedValues = [...selectedValues, value];
    } else {
      // Remove the value from the array
      newSelectedValues = selectedValues.filter((item) => item !== value);
    }
    
    // Call the parent's onChange with the new array
    onChange(newSelectedValues);
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div key={option} className="flex items-start gap-3">
          <Checkbox
            id={`multiselect-${option}`}
            checked={selectedValues.includes(option)}
            onCheckedChange={(checked) => handleCheckedChange(checked, option)}
            className="mt-0.5"
          />
          <label
            htmlFor={`multiselect-${option}`}
            className="text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}