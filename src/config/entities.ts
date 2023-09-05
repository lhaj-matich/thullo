import { User } from "../components/BoardSearch";

export interface Attachement {
  id: string;
}

export interface Label {
  id: string;
  tag: string;
  color: string;
  cardId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  id: string;
  content: string;
  resolved: boolean;
  cardId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Comment {
  id: string;
}

export interface Card {
  id: string;
  title: string;
  listId: string;
  author: User;
  description?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
  comments?: Comment[];
  attachments?: Attachement[];
  labels?: Label[];
  checklists?: Task[];
}
