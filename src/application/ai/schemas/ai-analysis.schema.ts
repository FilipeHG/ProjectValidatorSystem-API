import { z } from 'zod';

export const AiAnalysisSchema = z.object({
  resumoDoProjeto: z.string(),
  pontosDeAtencao: z.array(z.string()),
  recomendacaoExecutiva: z.string()
});
