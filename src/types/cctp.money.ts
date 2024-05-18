interface Fee {
  fixed: number;
  variable: number;
}

interface ChainData {
  name: string;
  fee: Fee;
  time: string;
}

interface Data {
  [key: string]: ChainData;
}

export interface CctpMoneyFees {
  data: Data;
}