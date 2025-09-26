import {configureStore, createSlice, type PayloadAction} from '@reduxjs/toolkit'

// Функции для работы с Session Storage
const SESSION_STORAGE_KEY = 'activeTags';

const saveActiveTagsToSessionStorage = (tags: string[]) => {
    try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(tags));
    } catch (error) {
        console.error('Ошибка при сохранении тегов в Session Storage:', error);
    }
};

const loadActiveTagsFromSessionStorage = (): string[] => {
    try {
        const savedTags = sessionStorage.getItem(SESSION_STORAGE_KEY);
        return savedTags ? JSON.parse(savedTags) : [];
    } catch (error) {
        console.error('Ошибка при загрузке тегов из Session Storage:', error);
        return [];
    }
};

export const filterSlice = createSlice({
    name: 'counter',
    initialState: {
        activeFilter: 'none',
        value: 0,
        activeTags: loadActiveTagsFromSessionStorage(),
    },
    reducers: {
        setActiveFilter: (state, action: PayloadAction<string>) => {
            state.activeFilter = action.payload
        },
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
        toggleSort: (state, action: PayloadAction<string>) => {
            const clickedField = action.payload
            
            if (state.activeFilter === clickedField) {
                state.value = (state.value + 1) % 3
                
                if (state.value === 0) {
                    state.activeFilter = 'none'
                }
            } else {
                state.activeFilter = clickedField
                state.value = 1
            }
        },
        resetSort: (state) => {
            state.activeFilter = 'none'
            state.value = 0
            state.activeTags = []
            saveActiveTagsToSessionStorage([])
        },
        toggleTag: (state, action: PayloadAction<string>) => {
            const tag = action.payload
            if (state.activeTags.includes(tag)) {
                state.activeTags = state.activeTags.filter(t => t !== tag)
            } else {
                    state.activeTags.push(tag)
            }
            saveActiveTagsToSessionStorage(state.activeTags)
        },
        clearTags: (state) => {
            state.activeTags = []
            saveActiveTagsToSessionStorage([])
        },
    },
})

const store = configureStore({
    reducer: {
        filter: filterSlice.reducer
    },
})

export const { setActiveFilter, setValue, toggleSort, resetSort, toggleTag, clearTags } = filterSlice.actions

export const filterReducer = filterSlice.reducer
export default store