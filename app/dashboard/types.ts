type Task = {
  id: number;
  date: string;
  hours: number;
  status: string;
};

export type { Task };

export type Column = {
  key: keyof Task;
  label: string;
  hidden?: boolean;
};