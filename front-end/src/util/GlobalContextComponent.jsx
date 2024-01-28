import { useState, createContext } from "react";

const GlobalContext = createContext();

function GlobalContextComponent(props) {
    const [manageSpace, setManageSpace] = useState({});
    const [manageSpacePending, setManageSpacePending] = useState([]);
    const [rentSpace, setRentSpace] = useState({});

    return (
        <GlobalContext.Provider
            value={{
                manageSpace,
                setManageSpace,

                manageSpacePending,
                setManageSpacePending,

                rentSpace,
                setRentSpace,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalContextComponent };
