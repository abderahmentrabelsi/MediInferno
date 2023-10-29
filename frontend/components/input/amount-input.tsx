import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Input } from '@nextui-org/react';

interface AmountInputProps {
  amount: number;
  handleValueChange: Dispatch<SetStateAction<number>>;
  onValidationChange?: (isValid: boolean) => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  handleValueChange,
  onValidationChange
}) => {
  const [rawAmount, setRawAmount] = useState<string>(amount.toString());

  const validateAmount = (amount: string) => {
    const parsed = parseFloat(amount);
    return !isNaN(parsed) && parsed >= 0;
  };

  useEffect(() => {
    const isValid = validateAmount(rawAmount);
    if (isValid) {
      handleValueChange(parseFloat(rawAmount));
    }
    if (onValidationChange) {
      onValidationChange(isValid);
    }
  }, [rawAmount]);

  return (
    <Input
      value={rawAmount}
      onValueChange={setRawAmount}
      type="number"
      placeholder="Amount"
      id="amount"
      radius="sm"
      color={!validateAmount(rawAmount) ? 'danger' : undefined}
      errorMessage={!validateAmount(rawAmount) && 'Please enter a valid amount'}
      size="lg"
      validationState={validateAmount(rawAmount) ? 'valid' : 'invalid'}
      className="flex-grow w-full"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-medium">$</span>
        </div>
      }
    />
  );
};
