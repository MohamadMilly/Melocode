export const frequencyToNumber = {
  ONE: 1,
  TEN: 10,
  HUNDRED: 100,
  THOUSAND: 1000,
};

export function convertFrequency(
  input: keyof typeof frequencyToNumber | number,
): number | string | undefined {
  if (typeof input === "string") {
    return frequencyToNumber[input];
  }
  
  return Object.keys(frequencyToNumber).find(
    (key) => frequencyToNumber[key as keyof typeof frequencyToNumber] === input,
  );
}
