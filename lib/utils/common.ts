export const isMobileNumber = (value: string): boolean => {
  const mobileNumberPattern = /^09\d{9}$/;
  return mobileNumberPattern.test(value);
};

interface Fullname {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
};

export const formatFullName = (name: Fullname): string => {
  return [
    name.firstName,
    name.middleName,
    name.lastName,
    name.suffix
  ]
    .filter(Boolean)
    .join(' ');
};

interface Address {
  otherAddress?: string;
  addressL2Name?: string;
  addressL1Name?: string;
  addressL0Name?: string;
};

export const formatFullAddress = (address: Address): string => {
  return [
    address.otherAddress,
    address.addressL2Name,
    address.addressL1Name,
    address.addressL0Name
  ]
    .filter(Boolean)
    .join(' ');
};