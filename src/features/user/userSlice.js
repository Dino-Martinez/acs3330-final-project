import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        platform: '',
        region: '',
        tag: '',
        stats: null
    },
    reducers: {
        getStats: (state, action) => {
            const {platform: _platform, region: _region, tag: _tag, stats: _stats} = action.payload
            state.platform = _platform
            state.region = _region
            state.tag = _tag
            state.stats = _stats
        }
    }
})

export const {getStats} = userSlice.actions 

export default userSlice.reducer