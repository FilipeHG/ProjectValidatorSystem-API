import { Injectable, Logger } from '@nestjs/common';
import { Projeto } from '../../../domain/entities/projeto.entity';
import { AiProviderException } from '../../../infrastructure/exceptions/infrastructure.exception';
import { AiProviderFactory } from '../factories/ai-provider.factory';
import { ProjectAnalysisPromptBuilder } from '../prompt-builder/project-analysis.prompt-builder';
import { AiAnalysisSchema } from '../schemas/ai-analysis.schema';
import { AiAnalysisResult } from '../dto/ai-analysis-result.dto';

@Injectable()
export class AiAnalysisService {
  private readonly logger = new Logger(AiAnalysisService.name);

  constructor(
    private readonly providerFactory: AiProviderFactory,
    private readonly promptBuilder: ProjectAnalysisPromptBuilder,
  ) {}

  async generateAnalysis(project: Projeto): Promise<AiAnalysisResult> {
    const prompt = this.promptBuilder.build(project);
    const provider = this.providerFactory.getProvider();
    
    try {
      const result = await provider.analyzeProject(prompt);
      
      const parsed = AiAnalysisSchema.safeParse(result);
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
