import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AiProviderFactory } from '../../src/application/ai/factories/ai-provider.factory';
import { GeminiAiProvider } from '../../src/application/ai/providers/gemini-ai.provider';
import { OpenAiProvider } from '../../src/application/ai/providers/openai-ai.provider';
import { MockAiProvider } from '../../src/application/ai/providers/mock-ai.provider';

describe('AiProviderFactory', () => {
  let factory: AiProviderFactory;
  let mockGemini: GeminiAiProvider;
  let mockOpenAi: OpenAiProvider;
  let mockMock: MockAiProvider;

  beforeEach(() => {
    mockGemini = {} as GeminiAiProvider;
    mockOpenAi = {} as OpenAiProvider;
    mockMock = {} as MockAiProvider;
    factory = new AiProviderFactory(mockGemini, mockOpenAi, mockMock);
  });

  afterEach(() => {
    delete process.env.AI_PROVIDER;
  });

  it('should return OpenAiProvider when env is openai', () => {
    process.env.AI_PROVIDER = 'openai';
    expect(factory.getProvider()).toBe(mockOpenAi);
  });

  it('should return GeminiAiProvider when env is gemini', () => {
    process.env.AI_PROVIDER = 'gemini';
    expect(factory.getProvider()).toBe(mockGemini);
  });

  it('should return MockAiProvider by default', () => {
    process.env.AI_PROVIDER = 'unknown';
    expect(factory.getProvider()).toBe(mockMock);
  });
});
