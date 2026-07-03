import { Projeto } from '../../domain/entities/projeto.entity';

export const PROJECT_REPOSITORY = 'PROJECT_REPOSITORY';

export interface IProjectRepository {
  create(projeto: Omit<Projeto, 'id' | 'dtCriacao' | 'dtAtualizacao'>): Promise<Projeto>;
  findAll(page?: number, limit?: number): Promise<{ data: Projeto[], total: number }>;
  findById(id: string): Promise<Projeto | null>;
  update(id: string, data: Partial<Projeto>): Promise<Projeto | null>;
  delete(id: string): Promise<void>;
}
