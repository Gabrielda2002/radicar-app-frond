//* Interfaces para los comentarios del módulo PQRSDF (contrato backend obs #101)

export interface IPqrsdfCommentAttachment {
  id: number;
  fileName: string;
  mimeType: string;
  fileSize: number;
  accessTokenUrl: string;
}

export interface IPqrsdfComment {
  id: number;
  author: string | null;
  position: string;
  comment: string;
  createdAt: string;
  attachment: IPqrsdfCommentAttachment | null;
}

export interface ICreatePqrsdfCommentInput {
  comment: string;
  file?: File | null;
}
