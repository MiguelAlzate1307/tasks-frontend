export interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean | string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
