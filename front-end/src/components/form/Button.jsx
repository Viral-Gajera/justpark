import React from "react";

export default function Button(props) {
    return (
        <button
            className={`rounded block active:scale-[0.99] ${props.className}`}
            onClick={props.onClick}
            type={props.type}
        >
            {props.children}
        </button>
    );
}
