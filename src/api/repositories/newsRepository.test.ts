import { dataSource } from '../../database/config';
import { Noticia } from '../../database/entities/news';
import NewsRepository from './newsRepository';

jest.mock('../../database/config', () => ({
  dataSource: {
    getRepository: jest.fn(),
  },
}));

describe('NewsRepository', () => {
  let newsRepository: any;
  let mockCreate: jest.Mock;
  let mockSave: jest.Mock;

  beforeEach(() => {
    mockCreate = jest.fn();
    mockSave = jest.fn();
    newsRepository = {
      create: mockCreate,
      save: mockSave,
    };
    (dataSource.getRepository as jest.Mock).mockReturnValue(newsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createNews', () => {
    it('Should create and save a news item', async () => {
      // Given
      const params = { titulo: 'Test News Title', descricao: 'Test News Description' };
      const createdNews = { ...params, id: 1 };
      mockCreate.mockReturnValue(createdNews);
      mockSave.mockResolvedValue(createdNews);

      // When
      const repository = new NewsRepository();
      const result = await repository.createNews(params);

      // Then
      expect(dataSource.getRepository).toHaveBeenCalledWith(Noticia);
      expect(mockCreate).toHaveBeenCalledWith(params);
      expect(mockSave).toHaveBeenCalledWith(createdNews);
      expect(result).toEqual(createdNews);
    });

    it('Should return undefined if saving fails', async () => {
      // Given
      const params = { titulo: 'Test News Title', descricao: 'Test News Description' };
      mockCreate.mockReturnValue(params);
      mockSave.mockRejectedValue(new Error('Save failed'));

      // When
      const repository = new NewsRepository();
      await expect(repository.createNews(params)).rejects.toThrow('Save failed');

      // Then
      expect(dataSource.getRepository).toHaveBeenCalledWith(Noticia);
      expect(mockCreate).toHaveBeenCalledWith(params);
      expect(mockSave).toHaveBeenCalledWith(params);
    });
  });
});
