export type InvalidInputData = {
  isValid: false;
  error: string;
};

export type ValidInputData = {
  isValid: true;
  value: string;
  error: '';
};

export type ValidatedForm = {
  [key: string]: ValidInputData | InvalidInputData;
};

export type InvalidForm = {
  [key: string]: InvalidInputData;
};

export type ValidForm = {
  [key: string]: ValidInputData;
}
