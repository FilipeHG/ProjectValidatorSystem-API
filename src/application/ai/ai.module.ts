import { Module } from '@nestjs/common';
import { ProjectAnalysisPromptBuilder } from './prompt-builder/project-analysis.prompt-builder';
import { MockAiProvider } from './providers/mock-ai.provider';
import { OpenAiProvider } from './providers/openai-ai.provider';
import { GeminiAiProvider } from './providers/gemini-ai.provider';
import { AiProviderFactory } from './factories/ai-provider.factory';
import { AiAnalysisService } from './services/ai-analysis.service';

@Module({
  providers: [
    ProjectAnalysisPromptBuilder,
    MockAiProvider,
    OpenAiProvider,
    GeminiAiProvider,
    AiProviderFactory,
    AiAnalysisService
  ],
  exports: [AiAnalysisService],
})
export class AiModule {}
