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

export interface Checklist {
  id: string;
}

export interface Comment {
  id: string;
}

export interface Card {
  id: string;
  title: string;
  listId: string;
  description?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
  comments?: Comment[];
  attachments?: Attachement[];
  labels?: Label[];
  checklists?: Checklist[];
}
