import { Module } from '@nestjs/common';
import { AiClient } from './ai.client';
import { ProjectAnalysisPromptBuilder } from './project-analysis.prompt-builder';
import { AiAnalysisService } from './ai-analysis.service';

@Module({
  providers: [AiClient, ProjectAnalysisPromptBuilder, AiAnalysisService],
  exports: [AiAnalysisService],
})
export class AiModule {}
