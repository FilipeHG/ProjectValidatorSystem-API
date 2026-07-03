import { Projeto } from '../../../domain/entities/projeto.entity';
import { AiAnalysisResult } from '../dto/ai-analysis-result.dto';

export interface AiProvider {
  analyzeProject(prompt: string): Promise<AiAnalysisResult>;
}
