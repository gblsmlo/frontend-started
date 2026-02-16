# Plano: Article-Post Feature

**Data:** 2026-02-16  
**Objetivo:** Validar estrutura de pastas e padrões do skill @.agent/skills/new-feature-structure/ e workflow @.agent/workflows/feature-lifecycle.md

---

## Phase 1: Planning & Scaffolding

### 1.1 Informações da Feature
- **Nome:** `article-post` (kebab-case)
- **Domínio:** Article (entidade principal)
- **Responsabilidade:** Visualização completa de um artigo/blog post no frontend

### 1.2 Estrutura de Pastas Esperada (Skill Validation)

Seguindo o skill `new-feature-structure`, a estrutura deve ser:

```
src/features/article-post/
├── components/          # Componentes React
├── hooks/              # React hooks customizados
├── api/                # Wrappers de API
├── services/           # Lógica de negócio (React-agnostic)
├── types/              # Interfaces TypeScript
├── utils/              # Funções utilitárias
├── tests/              # Testes unitários
└── index.ts            # Exportação da API pública
```

**Critérios de Validação:**
- [ ] Todas as pastas foram criadas
- [ ] Nomenclatura em kebab-case
- [ ] Estrutura segue Feature-Based Architecture (FBA)

---

## Phase 2: Core Logic (Business Layer)

### 2.1 Types (`types/article-post.types.ts`)

**Contrato de Dados:**
```typescript
interface ArticlePost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  coverImage?: string;
  readingTime: number; // em minutos
}

interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}
```

### 2.2 Service (`services/article-post.service.ts`)

**Métodos Esperados:**
- `fetchArticleBySlug(slug: string): Promise<ArticlePost>`
- `calculateReadingTime(content: string): number`
- `formatArticleContent(content: string): string`

**Regras do Skill:**
- [ ] Service deve ser React-agnostic
- [ ] Lógica de negócio isolada
- [ ] Tratamento de erros adequado

### 2.3 Testes (`tests/article-post.test.ts`)

**Cobertura Esperada:**
- [ ] Testes para service methods
- [ ] Mock de dados
- [ ] Testes de erro

---

## Phase 3: Integration (Hook & API)

### 3.1 API Wrapper (`api/article-post.api.ts`)

**Exportações:**
```typescript
export { fetchArticleBySlug } from '../services/article-post.service';
```

### 3.2 Hook (`hooks/use-article-post.hook.ts`)

**Interface:**
```typescript
interface UseArticlePostReturn {
  article: ArticlePost | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

function useArticlePost(slug: string): UseArticlePostReturn
```

---

## Phase 4: User Interface

### 4.1 Componente Principal (`components/article-viewer.component.tsx`)

**Props:**
```typescript
interface ArticleViewerProps {
  slug: string;
}
```

**Funcionalidades:**
- [ ] Exibir título, autor, data
- [ ] Renderizar conteúdo formatado
- [ ] Mostrar tempo de leitura
- [ ] Tags do artigo
- [ ] Estados de loading e erro

### 4.2 Componentes Auxiliares

- `ArticleHeader` - Título, autor, metadados
- `ArticleContent` - Renderização do conteúdo
- `ArticleFooter` - Tags, navegação

---

## Phase 5: Rota e Integração

### 5.1 Nova Rota

**Caminho:** `src/app/posts/[slug]/page.tsx`

**Responsabilidade:**
- Usar o componente ArticleViewer
- Passar o slug da URL
- Layout responsivo

### 5.2 Exportação Pública (`index.ts`)

**Deve exportar:**
- ArticleViewer component
- useArticlePost hook
- ArticlePostService
- ArticlePost types
- API methods

---

## Phase 6: Finalização e Validação

### 6.1 Checklist de Validação

**Estrutura (Skill):**
- [ ] Pastas criadas conforme especificação
- [ ] Arquivos com nomenclatura correta
- [ ] Index.ts centraliza exports
- [ ] Services são React-agnostic
- [ ] Não há UI complexa no service layer

**Qualidade (Workflow):**
- [ ] `pnpm lint` passa sem erros
- [ ] `pnpm build` compila com sucesso
- [ ] Tipos TypeScript válidos
- [ ] Path aliases usados corretamente

**Funcionalidade:**
- [ ] Rota /posts/[slug] acessível
- [ ] Artigo carrega corretamente
- [ ] Estados de loading funcionam
- [ ] Tratamento de erro implementado

### 6.2 Log de Erros

**Local:** `docs/logs/article-post-validation.md`

**Se encontrar erros, documentar:**
- Qual validação falhou
- O que foi esperado vs o que ocorreu
- Sugestão de correção

---

## Resumo de Validação

| Fase | Item | Status | Observações |
|------|------|--------|-------------|
| 1 | Estrutura de pastas | ⏳ | Aguardando criação |
| 1 | Nomenclatura kebab-case | ⏳ | Aguardando criação |
| 2 | Service React-agnostic | ⏳ | Aguardando implementação |
| 2 | Types definidos primeiro | ⏳ | Aguardando implementação |
| 3 | API wrapper | ⏳ | Aguardando implementação |
| 3 | Hook com estado | ⏳ | Aguardando implementação |
| 4 | Componente visual | ⏳ | Aguardando implementação |
| 5 | Rota criada | ⏳ | Aguardando implementação |
| 5 | Exports centralizados | ⏳ | Aguardando implementação |
| 6 | Lint passa | ⏳ | Aguardando validação |
| 6 | Build passa | ⏳ | Aguardando validação |

**Legenda:**
- ✅ Passou
- ❌ Falhou
- ⏳ Pendente
- ⚠️ Passou com ressalvas

---

## Próximos Passos

1. Executar criação da estrutura (Phase 1)
2. Implementar types e service (Phase 2)
3. Criar hook e API wrapper (Phase 3)
4. Desenvolver componentes (Phase 4)
5. Criar rota Next.js (Phase 5)
6. Validar e documentar erros (Phase 6)

**Nota:** Este plano serve como referência para validar se o skill e workflow estão sendo seguidos corretamente. Ao final, o arquivo `docs/logs/article-post-validation.md` deve conter o resultado da validação.
