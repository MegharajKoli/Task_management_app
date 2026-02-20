import commentServices from "../../services/commentServices";
import mongoose from "mongoose";

describe("commentServices", () => {
  let service: commentServices;

  // 🔹 mocks
  let mockRepo: any;
  let mockActivity: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRepo = {
      create: jest.fn(),
      findByTaskId: jest.fn(),
      delete: jest.fn(),
    };

    mockActivity = {
      commentAdded: jest.fn(),
    };

    service = new commentServices(mockRepo, mockActivity);
  });

  // =====================================================
  // ✅ createComment
  // =====================================================

  describe("createComment", () => {
    it("should create comment and log activity", async () => {
      const mockComment = { _id: "comment123" };
      mockRepo.create.mockResolvedValue(mockComment);

      const result = await service.createComment(
        "507f1f77bcf86cd799439011",
        "Test comment"
      );

      expect(mockRepo.create).toHaveBeenCalled();
      expect(mockActivity.commentAdded).toHaveBeenCalledWith(
        "507f1f77bcf86cd799439011"
      );
      expect(result).toBe(mockComment);
    });
  });

  // =====================================================
  // ✅ getCommentsByTaskId
  // =====================================================

  describe("getCommentsByTaskId", () => {
    it("should return comments for a task", async () => {
      const mockComments = [{ _id: "c1" }, { _id: "c2" }];
      mockRepo.findByTaskId.mockResolvedValue(mockComments);

      const taskId = "507f1f77bcf86cd799439011";

      const result = await service.getCommentsByTaskId(taskId);

      expect(mockRepo.findByTaskId).toHaveBeenCalledWith({
        task_id: expect.any(mongoose.Types.ObjectId),
      });
      expect(result).toBe(mockComments);
    });
  });

  // =====================================================
  // ✅ deleteCommentById
  // =====================================================

  describe("deleteCommentById", () => {
    it("should delete comment", async () => {
      mockRepo.delete.mockResolvedValue(true);

      const result = await service.deleteCommentById("comment123");

      expect(mockRepo.delete).toHaveBeenCalledWith("comment123");
      expect(result).toBe(true);
    });

    it("should return false if comment not found", async () => {
      mockRepo.delete.mockResolvedValue(false);

      const result = await service.deleteCommentById("bad-id");

      expect(result).toBe(false);
    });
  });
});