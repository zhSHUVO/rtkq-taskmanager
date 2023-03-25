import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => "/tasks",
        }),
        getTask: builder.query({
            query: (id) => `/tasks/${id}`,
        }),
        addTask: builder.mutation({
            query: (data) => ({
                url: "/tasks",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: newTask } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getTasks",
                            undefined,
                            (draft) => {
                                draft.push(newTask);
                            }
                        )
                    );
                } catch {}
            },
        }),
        editTask: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: updatedTask } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getTasks",
                            undefined,
                            (draft) => {
                                const index = draft.findIndex(
                                    (task) => task.id === arg.id
                                );
                                draft[index] = updatedTask;
                            }
                        )
                    );
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getTask",
                            arg.id.toString(),
                            (draft) => {
                                return updatedTask;
                            }
                        )
                    );
                } catch {}
            },
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getTasks",
                        undefined,
                        (draft) => {
                            const index = draft.findIndex(
                                (task) => task.id === arg
                            );
                            draft.splice(index, 1);
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useAddTaskMutation,
    useEditTaskMutation,
    useDeleteTaskMutation,
} = tasksApi;
