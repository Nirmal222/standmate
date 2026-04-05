import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApi } from './baseApi'
import type { TaskResponse, TaskCreate } from '@/lib/types'

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Query to get all tasks for a project
        getProjectTasks: builder.query<TaskResponse[], number>({
            query: (projectId) => `/api/v1/projects/${projectId}/tasks`,
            providesTags: (result, error, projectId) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
                          { type: 'ProjectTasks', id: projectId },
                      ]
                    : [{ type: 'ProjectTasks', id: projectId }],
        }),

        // Mutation to create a new task
        createTask: builder.mutation<TaskResponse, { projectId: number; task: TaskCreate }>({
            query: ({ projectId, task }) => ({
                url: `/api/v1/projects/${projectId}/tasks`,
                method: 'POST',
                body: task,
            }),
            invalidatesTags: (result, error, { projectId }) => [{ type: 'ProjectTasks', id: projectId }],
        }),

        // Mutation to update an existing task
        updateTask: builder.mutation<TaskResponse, { taskId: number; updates: any }>({
            query: ({ taskId, updates }) => ({
                url: `/api/v1/tasks/${taskId}`,
                method: 'PUT',
                body: updates,
            }),
            invalidatesTags: (result, error, { taskId }) => [
                { type: 'Tasks', id: taskId },
                ...(result ? [{ type: 'ProjectTasks' as const, id: result.project_id }] : []),
            ],
        }),

        // Mutation to delete a task
        deleteTask: builder.mutation<void, { taskId: number; projectId: number }>({
            query: ({ taskId }) => ({
                url: `/api/v1/tasks/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { taskId, projectId }) => [
                { type: 'Tasks', id: taskId },
                { type: 'ProjectTasks', id: projectId },
            ],
        }),
    }),
    overrideExisting: false,
})

// Export hooks for usage in functional components
export const {
    useGetProjectTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = tasksApi
