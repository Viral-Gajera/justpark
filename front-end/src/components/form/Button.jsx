import React from "react";

export default function Button(props) {
    return (
        <button
            className={`rounded block active:scale-[0.99] ${props.className}`}
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}
            style={{
                backgroundColor: props.disabled ? "#d1d5db" : "",
            }}
        >
            {props.children}
        </button>
    );
}
