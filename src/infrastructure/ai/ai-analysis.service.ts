import { Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import { AiClient } from './ai.client';
import { ProjectAnalysisPromptBuilder } from './project-analysis.prompt-builder';
import { Projeto } from '../../domain/entities/projeto.entity';
import { AiProviderException } from '../exceptions/infrastructure.exception';

export const aiResponseSchema = z.object({
  resumoDoProjeto: z.string(),
  pontosDeAtencao: z.array(z.string()),
  recomendacaoExecutiva: z.string(),
});

export type AiAnalysisResponse = z.infer<typeof aiResponseSchema>;

@Injectable()
export class AiAnalysisService {
  private readonly logger = new Logger(AiAnalysisService.name);

  constructor(
    private readonly aiClient: AiClient,
    private readonly promptBuilder: ProjectAnalysisPromptBuilder,
  ) {}

  async generateAnalysis(project: Projeto): Promise<AiAnalysisResponse> {
    const prompt = this.promptBuilder.build(project);
    
    try {
      const rawResponse = await this.aiClient.generateStructuredResponse(prompt, null);
      
      const parsed = aiResponseSchema.safeParse(rawResponse);
      if (!parsed.success) {
        throw new AiProviderException(`Invalid AI response structure: ${parsed.error.message}`);
      }
      
      return parsed.data;
    } catch (error) {
      this.logger.error(`AI Analysis failed for project ${project.id}`, error instanceof Error ? error.stack : String(error));
      throw error;
    }
  }
}
