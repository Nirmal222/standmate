import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApi } from './baseApi'
import type { MilestoneResponse, MilestoneCreate, MilestoneUpdate } from '@/lib/types'

export const milestonesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Query to get all milestones for a project
        getProjectMilestones: builder.query<MilestoneResponse[], number>({
            query: (projectId) => `/api/v1/projects/${projectId}/milestones`,
            providesTags: (result, error, projectId) =>
                result
                    ? [
                          ...result.map(({ milestone_id }) => ({ type: 'Milestones' as const, id: milestone_id })),
                          { type: 'ProjectMilestones', id: projectId },
                      ]
                    : [{ type: 'ProjectMilestones', id: projectId }],
        }),

        // Mutation to create a new milestone
        createMilestone: builder.mutation<MilestoneResponse, { projectId: number; milestone: MilestoneCreate }>({
            query: ({ projectId, milestone }) => ({
                url: `/api/v1/projects/${projectId}/milestones`,
                method: 'POST',
                body: milestone,
            }),
            invalidatesTags: (result, error, { projectId }) => [{ type: 'ProjectMilestones', id: projectId }],
        }),

        // Mutation to update an existing milestone
        updateMilestone: builder.mutation<MilestoneResponse, { milestoneId: number; updates: MilestoneUpdate }>({
            query: ({ milestoneId, updates }) => ({
                url: `/api/v1/milestones/${milestoneId}`,
                method: 'PUT',
                body: updates,
            }),
            invalidatesTags: (result, error, { milestoneId }) => [
                { type: 'Milestones', id: milestoneId },
                // Also invalidate the project's milestones list if we know the project_id.
                // It's returned in the result so we can use it.
                ...(result ? [{ type: 'ProjectMilestones' as const, id: result.project_id }] : []),
            ],
        }),

        // Mutation to delete a milestone
        deleteMilestone: builder.mutation<void, { milestoneId: number; projectId: number }>({
            query: ({ milestoneId }) => ({
                url: `/api/v1/milestones/${milestoneId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { milestoneId, projectId }) => [
                { type: 'Milestones', id: milestoneId },
                { type: 'ProjectMilestones', id: projectId },
            ],
        }),
    }),
    overrideExisting: false,
})

// Export hooks for usage in functional components
export const {
    useGetProjectMilestonesQuery,
    useCreateMilestoneMutation,
    useUpdateMilestoneMutation,
    useDeleteMilestoneMutation,
} = milestonesApi
