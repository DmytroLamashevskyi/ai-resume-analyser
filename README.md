# AI Resume Analyser

AI Resume Analyser is a small portfolio project for evaluating a resume against a target role and generating structured, actionable feedback.

> **Project status:** completed / no longer actively maintained. This repository is kept as an archived portfolio project and a snapshot of the implementation.

## What it does

The application lets a user:

- upload a resume as a PDF;
- provide a company name, target job title, and job description;
- generate an ATS-oriented resume assessment with AI;
- receive an overall score plus focused feedback for ATS compatibility, tone and style, content, structure, and skills;
- keep analysed resumes and revisit their results through the application.

## How it works

1. The user signs in through Puter.
2. A PDF resume is uploaded through Puter.js.
3. The PDF is converted to an image for preview while the original file is retained for analysis.
4. Job context and resume metadata are stored in Puter KV storage.
5. Puter AI analyses the resume against the target job description using a structured prompt.
6. The returned JSON feedback is stored and rendered as a scored resume review.

## Tech stack

- **React 19**
- **React Router 7**
- **TypeScript**
- **Tailwind CSS 4**
- **Vite 7**
- **Zustand** for client state
- **pdfjs-dist** for PDF processing
- **Puter.js** for authentication, file storage, KV storage, and AI capabilities
- **Docker** support for containerized builds

## Feedback model

The AI response is structured into several categories:

- Overall score
- ATS compatibility
- Tone & style
- Content
- Structure
- Skills

Each section contains a score and concrete improvement suggestions. When a job description is supplied, the analysis takes that role into account rather than evaluating the resume only in isolation.

## Local development

### Prerequisites

- Node.js 20+ recommended
- npm

### Install

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The application is available at `http://localhost:5173` by default.

### Type-check

```bash
npm run typecheck
```

### Production build

```bash
npm run build
npm start
```

## Docker

```bash
docker build -t ai-resume-analyser .
docker run -p 3000:3000 ai-resume-analyser
```

## Notes

This project depends on Puter.js and therefore requires the corresponding Puter services to be available. Resume files can contain sensitive personal information, so use test data when experimenting and review the storage/provider behavior before using real confidential documents.

## Why this repository is archived

The project reached its intended scope as an experiment in combining document processing, structured AI feedback, and a lightweight React application. I am keeping the source public as a portfolio snapshot, but active development has moved to newer projects.
