import Comment, { IComment } from '../models/Comment';   
import { ICommentRepository } from '../domain/ICommentRepository';
import { BaseMongoRepository } from './BaseRepository';

export class CommentRepository extends BaseMongoRepository<IComment> implements ICommentRepository {

  constructor() {
    super(Comment);  
  }

    async findByTaskId(filter={}): Promise<IComment[]> {
    return Comment.find(filter);
  }
}