import { Repository } from '../repositories/protocol/repository';
import { CreateNewsError, CreateNewsService, DescriptionNotProvidedError, TitleNotProvidedError } from './createNews';

describe('CreateNewsService', () => {
  let createNewsService: CreateNewsService;
  let mockRepository: jest.Mocked<Repository>;

  beforeEach(() => {
    mockRepository = {
      createNews: jest.fn(),
      listAll: jest.fn(),
    } as jest.Mocked<Repository>;
    createNewsService = new CreateNewsService(mockRepository);
  });

  describe('When creating news with valid data', () => {
    it('should create and return the news successfully', async () => {
      // Given
      const validData = { titulo: 'Valid Title', descricao: 'Valid Description' };
      const createdNews = { ...validData, id: 1 };
      mockRepository.createNews.mockResolvedValue(createdNews);

      // When
      const response = await createNewsService.execute(validData);

      // Then
      expect(mockRepository.createNews).toHaveBeenCalledWith(validData);
      expect(response).toEqual({ isSuccess: true, data: { title: validData.titulo, description: validData.descricao } });
    });
  });

  describe('When creating news without a title', () => {
    it('should return an error indicating the title is required', async () => {
      // Given
      const invalidData = { titulo: '', descricao: 'Valid Description' };

      // When
      const response = await createNewsService.execute(invalidData);

      // Then
      expect(response).toEqual({ isSuccess: false, error: new TitleNotProvidedError() });
      expect(mockRepository.createNews).not.toHaveBeenCalled();
    });
  });

  describe('When creating news without a description', () => {
    it('should return an error indicating the description is required', async () => {
      // Given
      const invalidData = { titulo: 'Valid Title', descricao: '' };

      // When
      const response = await createNewsService.execute(invalidData);

      // Then
      expect(response).toEqual({ isSuccess: false, error: new DescriptionNotProvidedError() });
      expect(mockRepository.createNews).not.toHaveBeenCalled();
    });
  });

  describe('When the news repository fails to create news', () => {
    it('should return a CreateNewsError', async () => {
      const validData = { titulo: 'Valid Title', descricao: 'Valid Description' };

      mockRepository.createNews.mockResolvedValue(undefined);

      const response = await createNewsService.execute(validData);

      expect(mockRepository.createNews).toHaveBeenCalledWith(validData);
      expect(response).toEqual({ isSuccess: false, error: new CreateNewsError() });
    });
  });
});
