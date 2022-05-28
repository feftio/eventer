import React from "react";

const useEffectIfReady = (fn, deps = [], isReady = true) => {
    const readyWasToggled = React.useRef(isReady);
    const getDep = () => {
        if (readyWasToggled.current) {
            return 1;
        }
        if (isReady) {
            readyWasToggled.current = true;
        }
        return 0;
    };

    React.useEffect(() => {
        if (!isReady) {
            return;
        }
        return fn();
    }, [...deps, fn, getDep()]);
};

export default useEffectIfReady;
