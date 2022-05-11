import { Route } from "react-router-dom";
import cabinetFragments, {
    CabinetFragmentObject,
    CabinetFragmentsType,
    CabinetFragmentType,
} from "src/pages/cabinet/fragments";

class CabinetManager {
    static rootPath: string = "/cabinet";
    private static fragments: CabinetFragmentsType = cabinetFragments;
    static forEach(
        callable: (
            fragmentType: string,
            fragmentObject: CabinetFragmentObject
        ) => React.ReactNode
    ) {
        const result = [];
        for (const [fragmentType, fragmentObject] of Object.entries(
            this.fragments
        )) {
            fragmentObject.fullPath = () =>
                this.rootPath + "/" + fragmentObject.path;
            result.push(callable(fragmentType, fragmentObject));
        }
        return result;
    }
    static get(fragmentType: CabinetFragmentType) {
        return this.fragments[fragmentType];
    }
    static route(path: string, element: React.ReactNode): React.ReactNode {
        this.rootPath = path;
        return (
            <Route path={this.rootPath} element={element}>
                <Route
                    key={"route-default-fragment"}
                    index
                    element={this.get("events").element()}
                />
                {Object.keys(this.fragments).map((fragmentType) => (
                    <Route
                        key={"route-" + fragmentType}
                        path={this.fragments[fragmentType].path}
                        element={this.fragments[fragmentType].element()}
                    />
                ))}
            </Route>
        );
    }
}

export default CabinetManager;
