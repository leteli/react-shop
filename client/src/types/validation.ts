export type InvalidInputData = {
  isValid: false;
  message: string;
};

export type ValidInputData = {
  isValid: true;
  value: string;
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
