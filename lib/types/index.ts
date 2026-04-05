// AUTO-GENERATED TYPE RE-EXPORTS
// This file provides convenient type aliases from the generated OpenAPI types

// Re-export the full generated types
import type { components, paths, operations } from './generated-api';
export type { components, paths, operations };

// Convenient type aliases for API schemas
export type ProjectProperties = components['schemas']['ProjectProperties'];
export type ProjectCreate = components['schemas']['ProjectCreate'];
export type ProjectResponse = components['schemas']['ProjectResponse'];
export type ProjectUpdate = components['schemas']['ProjectUpdate'];

export type TaskCreate = components['schemas']['TaskCreate'];
export type TaskResponse = components['schemas']['TaskResponse'];

export type MilestoneCreate = components['schemas']['MilestoneCreate'];
export type MilestoneResponse = components['schemas']['MilestoneResponse'];
export type MilestoneUpdate = components['schemas']['MilestoneUpdate'];

export type UserCreate = components['schemas']['UserCreate'];
export type Token = components['schemas']['Token'];

export type AccessCodeCreate = components['schemas']['AccessCodeCreate'];
export type AccessCodeResponse = components['schemas']['AccessCodeResponse'];
export type AccessCodeVerify = components['schemas']['AccessCodeVerify'];

// UI-specific types that aren't in the API
export interface ProjectStats {
    scope?: number;
    completed?: number;
    progress?: number;
    target?: string;
}

// Helper types for common patterns
export type IntegrationSource = 'native' | 'jira' | 'linear' | 'github';
export type ProjectStatus = 'draft' | 'planning' | 'active' | 'completed' | 'archived' | 'backlog';
export type ProjectPriority = 'urgent' | 'high' | 'medium' | 'low' | 'none';

// Extended Project type with UI-specific fields
export interface Project extends ProjectResponse {
    // Add any UI-specific computed fields here if needed
}
