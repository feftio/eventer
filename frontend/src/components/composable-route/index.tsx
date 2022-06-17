import React from "react";
import { Route } from "react-router-dom";

export interface FragmentObject {
    label: string;
    icon: React.ComponentType;
    element: React.ComponentType;
    path: string;
    default?: boolean;
    with?: {
        params: string;
        element: React.ComponentType;
    };
}

export type Fragments = Array<FragmentObject>;

export type RouteManager = {
    forEach: (
        callable: (fragment: FragmentObject) => React.ReactNode
    ) => React.ReactNode;
};

export const RouteManagerContext = React.createContext(null);

export const useRouteManager = (): RouteManager =>
    React.useContext(RouteManagerContext);

export const composeRoute = (options: {
    path: string;
    component: React.ComponentType;
    fragments: Array<FragmentObject>;
}): React.ReactNode => {
    const routes = [];
    const manager: RouteManager = {
        forEach(callable) {
            const elements: Array<React.ReactNode> = [];
            options.fragments.forEach((fragment) => {
                elements.push(callable(fragment));
            });
            return elements;
        },
    };
    const provide = (element) => (
        <RouteManagerContext.Provider value={manager}>
            {element}
        </RouteManagerContext.Provider>
    );
    options.fragments.forEach((fragment) => {
        if (fragment.with !== undefined)
            routes.push(
                <Route
                    key={"route-fragment-with-" + fragment.path}
                    path={fragment.path + "/" + fragment.with.params}
                    element={provide(<fragment.with.element />)}
                />
            );
        if (fragment.default === true) {
            routes.push(
                <Route
                    index
                    key={"route-fragment-defualt-" + fragment.path}
                    element={provide(<fragment.element />)}
                />
            );
        }
        routes.push(
            <Route
                key={"route-fragment-" + fragment.path}
                path={fragment.path}
                element={provide(<fragment.element />)}
            />
        );
    });
    return (
        <Route path={options.path} element={provide(<options.component />)}>
            {routes}
        </Route>
    );
};
