import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Images(props) {
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        setImageIndex(0);
    }, [props.fileUrls]);

    return (
        <div className="flex flex-col w-full h-full p-1 overflow-hidden">
            <div className="w-full max-h-[calc(100%-45px)] overflow-hidden">
                <img
                    src={`${process.env.REACT_APP_BASEURL}/${props.fileUrls[imageIndex]}`}
                    className="block object-contain h-full mx-auto "
                    alt=""
                />
            </div>
            <div className="flex items-center justify-center gap-3 mt-2 overflow-hidden min-h-[40px]">
                <button
                    className="px-2 py-1 text-white rounded bg-c3 active:scale-[0.95]"
                    onClick={(e) => {
                        e.preventDefault();
                        setImageIndex((old) => {
                            if (old == 0) {
                                return props.fileUrls.length - 1;
                            } else {
                                return old - 1;
                            }
                        });
                    }}
                >
                    Prev
                </button>
                {
                    <div>
                        {imageIndex + 1} / {props.fileUrls.length}
                    </div>
                }
                <button
                    className="px-2 py-1 text-white rounded bg-c3 active:scale-[0.95]"
                    onClick={(e) => {
                        e.preventDefault();
                        setImageIndex((old) => {
                            if (old == props.fileUrls.length - 1) {
                                return 0;
                            } else {
                                return old + 1;
                            }
                        });
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
