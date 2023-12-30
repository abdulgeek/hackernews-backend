import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';

describe('PostsService', () => {
  let service: PostsService;
  let mockPostModel;

  beforeEach(async () => {
    mockPostModel = {
      find: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: getModelToken('Post'), useValue: mockPostModel },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return an array of posts', async () => {
    await service.findAll({ page: 1, limit: 10 });
    expect(mockPostModel.find).toHaveBeenCalled();
    expect(mockPostModel.skip).toHaveBeenCalled();
    expect(mockPostModel.limit).toHaveBeenCalled();
    expect(mockPostModel.exec).toHaveBeenCalled();
  });
});
