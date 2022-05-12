import { Route } from "react-router-dom";
import { CabinetFragmentType } from "src/pages/cabinet/fragments";
import fragments from "src/pages/cabinet/fragments";

export let rootPath = "/cabinet";

export function CabinetRoute(
    path: string,
    element: React.ReactNode
): React.ReactNode {
    rootPath = path;
    return (
        <Route path={path} element={element}>
            <Route
                index
                key="route-default-fragment"
                element={fragments["events"].element()}
            />
            {Object.keys(fragments).map((type: CabinetFragmentType) => {
                if (fragments[type].with !== undefined) {
                    return [
                        <Route
                            key={"route-with-" + type}
                            path={
                                fragments[type].path +
                                "/" +
                                fragments[type].with.params
                            }
                            element={fragments[type].with.element()}
                        />,
                        <Route
                            key={"route-" + type}
                            path={fragments[type].path}
                            element={fragments[type].element()}
                        />,
                    ];
                }
                return (
                    <Route
                        key={"route-" + type}
                        path={fragments[type].path}
                        element={fragments[type].element()}
                    />
                );
            })}
        </Route>
    );
}
