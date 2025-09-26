import {Provider} from "react-redux";
import React from "react";
import store from "./shared/state-manager/store.tsx";


export function CoolProvider({children}: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}