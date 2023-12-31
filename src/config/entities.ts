import { User } from "../components/Nav/BoardSearch";

export interface Attachement {
  id: string;
  title: string;
  path: string;
  createdAt: string;
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
  cardId?: string;
  userId?: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  user: User;
}

export interface Card {
  id: string;
  title: string;
  listId: string;
  author: User;
  order: number;
  description?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
  comments?: Comment[];
  attachments?: Attachement[];
  labels?: Label[];
  checklists?: Task[];
}
