import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/'
    }),
    endpoints: build => ({
        getUsers: build.query({
            query: () => '/users.json'
        }),
    })
})

export const { useGetUsersQuery } = api