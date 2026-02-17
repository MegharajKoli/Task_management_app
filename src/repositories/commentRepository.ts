
import { Model } from 'mongoose';
import Comment, { IComment } from '../models/Comment';   

export interface ICommentRepository {
  create(CommentData: Partial<IComment>): Promise<IComment>;
  delete(CommentId: string): Promise<boolean>;
  findAll(): Promise<IComment[]>;
}

export class CommentRepository implements ICommentRepository {
  private  CommentModel: Model<IComment>;

  constructor() {
    this.CommentModel = Comment;   
  }

  async create(CommentData: Partial<IComment>): Promise<IComment> {
    const Comment = new this.CommentModel(CommentData);
    return Comment.save();
  }
  async delete(CommentId: string): Promise<boolean> {
  const result = await this.CommentModel.findByIdAndDelete(CommentId).exec();
  return !!result;  
}

  async findAll(filter={}): Promise<IComment[]> {
    return Comment.find(filter);
  }
}