import {IComment} from "../models/Comment"

export interface ICommentRepository {
  create(CommentData: Partial<IComment>): Promise<IComment>;
  delete(CommentId: string): Promise<boolean>;
  findAll(): Promise<IComment[]>;
}
