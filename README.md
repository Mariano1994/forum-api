# Forum API

A robust and scalable forum API built with TypeScript, implementing Domain-Driven Design (DDD) principles and Clean Architecture patterns.

## 📋 Overview

This project is a backend API for a forum application that enables users to create questions, post answers, add comments, and interact with content. The architecture follows DDD principles with clear separation between domain entities, application use cases, and infrastructure concerns.

## ✨ Features

### Questions
- Create new questions with title, content, and attachments
- Edit existing questions
- Delete questions
- Get question by slug
- List recent questions
- Choose best answer for a question
- Auto-generate URL-friendly slugs from titles

### Answers
- Post answers to questions
- Edit existing answers
- Delete answers
- List answers for a specific question

### Comments
- Comment on questions
- Comment on answers
- List comments for questions
- List comments for answers
- Delete question comments
- Delete answer comments

## 🏗️ Architecture

The project follows **Clean Architecture** and **Domain-Driven Design** principles:

```
src/
├── core/                    # Core building blocks
│   ├── entities/           # Base entity classes
│   ├── repositories/       # Repository interfaces
│   ├── types/              # Common types
│   └── either.ts           # Functional error handling
│
├── domain/                  # Business logic layer
│   └── forum/
│       ├── enterprise/      # Domain entities
│       │   └── entities/   # Question, Answer, Comment, etc.
│       └── application/     # Application layer
│           ├── use-cases/  # Business use cases
│           └── repositories/ # Repository contracts
│
└── test/                    # Test utilities
    ├── factories/          # Test data factories
    └── repositories/       # In-memory repositories
```

### Key Design Patterns

- **Entity Pattern**: Core domain entities with rich business logic
- **Repository Pattern**: Abstract data access with interface-based contracts
- **Use Case Pattern**: Encapsulated business operations
- **Value Objects**: Immutable domain concepts (e.g., Slug)
- **Aggregate Root**: Consistency boundaries for related entities
- **Either Pattern**: Functional error handling without exceptions

### Architecture Flow

```mermaid
graph TB
    subgraph "Presentation Layer (Future)"
        API[API Controllers]
    end
    
    subgraph "Application Layer"
        UC1[Create Question]
        UC2[Answer Question]
        UC3[Comment on Question]
        UC4[Choose Best Answer]
        UC5[List Recent Questions]
        UC6[Edit/Delete Operations]
    end
    
    subgraph "Domain Layer"
        E1[Question Entity]
        E2[Answer Entity]
        E3[Comment Entity]
        E4[Student Entity]
        E5[Attachment Entity]
        VO[Slug Value Object]
    end
    
    subgraph "Infrastructure Layer (Future)"
        R1[Questions Repository]
        R2[Answers Repository]
        R3[Comments Repository]
        DB[(Database)]
    end
    
    API --> UC1 & UC2 & UC3 & UC4 & UC5 & UC6
    UC1 --> E1
    UC2 --> E2
    UC3 --> E3
    UC4 --> E1 & E2
    UC5 --> E1
    UC6 --> E1 & E2 & E3
    
    E1 --> VO
    E1 --> E5
    E2 --> E5
    
    UC1 & UC5 & UC6 --> R1
    UC2 & UC6 --> R2
    UC3 & UC6 --> R3
    
    R1 & R2 & R3 --> DB
    
    style API fill:#e1f5ff
    style UC1 fill:#fff4e1
    style UC2 fill:#fff4e1
    style UC3 fill:#fff4e1
    style UC4 fill:#fff4e1
    style UC5 fill:#fff4e1
    style UC6 fill:#fff4e1
    style E1 fill:#e8f5e9
    style E2 fill:#e8f5e9
    style E3 fill:#e8f5e9
    style E4 fill:#e8f5e9
    style E5 fill:#e8f5e9
    style VO fill:#f3e5f5
```

### Use Case Flow Example

```mermaid
sequenceDiagram
    participant Client
    participant UseCase as CreateQuestionUseCase
    participant Question as Question Entity
    participant Slug as Slug Value Object
    participant Repo as QuestionsRepository
    participant DB as Database
    
    Client->>UseCase: execute({ title, content, authorId })
    UseCase->>Slug: createFromText(title)
    Slug-->>UseCase: slug instance
    UseCase->>Question: create({ title, content, slug, authorId })
    Question-->>UseCase: question instance
    UseCase->>Repo: create(question)
    Repo->>DB: persist(question)
    DB-->>Repo: success
    Repo-->>UseCase: Right(question)
    UseCase-->>Client: Right({ question })
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

## 🛠️ Tech Stack

- **TypeScript**: Type-safe development
- **Vitest**: Fast unit testing framework
- **Day.js**: Lightweight date manipulation
- **Biome**: Fast linting and formatting
- **Faker.js**: Generate test data

## 📦 Project Structure

### Domain Model Relationships

```mermaid
erDiagram
    STUDENT ||--o{ QUESTION : creates
    STUDENT ||--o{ ANSWER : writes
    STUDENT ||--o{ QUESTION-COMMENT : posts
    STUDENT ||--o{ ANSWER-COMMENT : posts
    INSTRUCTOR ||--o{ QUESTION : creates
    INSTRUCTOR ||--o{ ANSWER : writes
    QUESTION ||--o{ ANSWER : has
    QUESTION ||--o{ QUESTION-COMMENT : receives
    QUESTION ||--o{ QUESTION-ATTACHMENT : includes
    QUESTION ||--|| SLUG : has
    QUESTION ||--o| ANSWER : "best answer"
    ANSWER ||--o{ ANSWER-COMMENT : receives
    ANSWER ||--o{ ANSWER-ATTACHMENT : includes
    QUESTION-ATTACHMENT }o--|| ATTACHMENT : references
    ANSWER-ATTACHMENT }o--|| ATTACHMENT : references
    
    STUDENT {
        string id
        string name
    }
    
    INSTRUCTOR {
        string id
        string name
    }
    
    QUESTION {
        string id
        string authorId
        string title
        string content
        slug slug
        string bestAnswerId
        date createdAt
        date updatedAt
    }
    
    ANSWER {
        string id
        string authorId
        string questionId
        string content
        date createdAt
        date updatedAt
    }
    
    QUESTION-COMMENT {
        string id
        string authorId
        string questionId
        string content
        date createdAt
    }
    
    ANSWER-COMMENT {
        string id
        string authorId
        string answerId
        string content
        date createdAt
    }
    
    ATTACHMENT {
        string id
        string title
        string url
    }
```

### Core Entities

- **Question**: Forum questions with title, content, slug, and attachments
- **Answer**: Responses to questions
- **QuestionComment**: Comments on questions
- **AnswerComment**: Comments on answers
- **Student**: Users who ask questions and post answers
- **Instructor**: Users with elevated privileges
- **Attachment**: File attachments for questions and answers

### Use Cases

All business operations are implemented as isolated use cases:

- `CreateQuestion`
- `EditQuestion`
- `DeleteQuestion`
- `GetQuestionBySlug`
- `ListRecentQuestions`
- `AnswerQuestion`
- `EditAnswer`
- `DeleteAnswer`
- `ChooseQuestionBestAnswer`
- `CommentOnQuestion`
- `CommentOnAnswer`
- `ListQuestionComments`
- `ListAnswerComments`
- `DeleteQuestionComment`
- `DeleteAnswerComment`

## 🧪 Testing

The project uses **Vitest** for testing with:

- In-memory repositories for isolated unit tests
- Factory functions for test data generation
- Comprehensive test coverage for all use cases

Example test structure:

```typescript
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repositories'
import { makeQuestion } from 'test/factories/make-question'
import { CreateQuestionUseCase } from './create-question'

describe('CreateQuestionUseCase', () => {
  it('should create a new question', async () => {
    const repository = new InMemoryQuestionsRepository()
    const useCase = new CreateQuestionUseCase(repository)
    
    const result = await useCase.execute({
      authorId: 'author-1',
      title: 'New Question',
      content: 'Question content'
    })
    
    expect(result.isRight()).toBe(true)
  })
})
```

## 🔧 Configuration

### TypeScript

The project uses modern TypeScript configuration with:
- ES2024 features
- Path aliases (`@/*` → `./src/*`)
- Strict type checking
- Node.js module resolution

### Path Aliases

Import from `src/` using the `@/` alias:

```typescript
import { Entity } from '@/core/entities/entity'
import { Question } from '@/domain/forum/enterprise/entities/question'
```

## 📝 Development Guidelines

### Domain-Driven Design

- Keep business logic in domain entities
- Use value objects for concepts without identity
- Implement use cases for application operations
- Define repository interfaces in the domain layer
- Maintain clear bounded contexts

### Code Quality

- Write tests for all use cases
- Follow SOLID principles
- Use TypeScript strict mode
- Maintain separation of concerns
- Document complex business rules

## 📄 License

ISC

## 👤 Author

Mariano

---

Built with ❤️ using TypeScript and Clean Architecture principles
