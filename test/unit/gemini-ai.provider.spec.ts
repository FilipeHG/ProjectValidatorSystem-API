import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeminiAiProvider } from '../../src/application/ai/providers/gemini-ai.provider';
import { AiProviderException } from '../../src/infrastructure/exceptions/infrastructure.exception';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

vi.mock('@google/generative-ai');

describe('GeminiAiProvider', () => {
  let provider: GeminiAiProvider;
  let mockConfig: ConfigService;
  let mockGenerateContent: any;

  beforeEach(() => {
    mockConfig = {
      get: vi.fn().mockImplementation((key) => {
        if (key === 'GEMINI_API_KEY') return 'test-key';
        return null;
      })
    } as any;

    mockGenerateContent = vi.fn();
    (GoogleGenerativeAI as any).mockImplementation(function() {
      return {
        getGenerativeModel: () => ({
          generateContent: mockGenerateContent
        })
      };
    });

    provider = new GeminiAiProvider(mockConfig);
  });

  it('should parse content correctly', async () => {
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => JSON.stringify({
          resumoDoProjeto: 'Resumo G',
          pontosDeAtencao: ['Ponto G'],
          recomendacaoExecutiva: 'Recomendação G'
        })
      }
    });

    const result = await provider.analyzeProject('prompt');
    expect(result.resumoDoProjeto).toBe('Resumo G');
  });

  it('should map 429 error to AiProviderException', async () => {
    mockGenerateContent.mockRejectedValue({ status: 429, message: 'Quota Exceeded' });

    await expect(provider.analyzeProject('prompt'))
      .rejects.toThrowError(new AiProviderException('AI Quota Exceeded'));
  });

  it('should map unknown errors', async () => {
    mockGenerateContent.mockRejectedValue(new Error('Unknown error'));

    await expect(provider.analyzeProject('prompt'))
      .rejects.toThrowError(new AiProviderException('AI request failed: Unknown error'));
  });

  it('should throw Error if GEMINI_API_KEY is not configured', () => {
    mockConfig.get = vi.fn().mockReturnValue(null);
    expect(() => new GeminiAiProvider(mockConfig)).toThrowError('GEMINI_API_KEY is not configured');
  });
});
