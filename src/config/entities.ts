export interface Attachement {
  id: string;
}

export interface Label {
  id: string;
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
