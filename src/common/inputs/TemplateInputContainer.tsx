import { Message } from "primereact/message";
import { Skeleton } from "primereact/skeleton";
import React, { FC, ReactNode } from "react";
import { ControlErrors, useControlContext } from "rectangular-forms";

interface ITemplateInputContainer {
    label?: string,
    children?: ReactNode,
    color?: string,
    loadStatus?: string
}

export const TemplateInputContainer: FC<ITemplateInputContainer> = (props) => {
    const { label, children, color } = props;
    const { validationErrors, status } = useControlContext();
    const loadStatus = props.loadStatus || "SUCCESS";
    return (
        <>
            <div style={{ color: color }}>
                <div>
                    <div
                        style={{
                            marginBottom: "1.4rem",
                            fontSize: "1.4rem",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <label style={{ color: validationErrors ? "red" : "black" }}>
                            <b>{label}</b>
                        </label>
                    </div>
                    {status === "SUCCESS" && loadStatus === "SUCCESS" && (
                        <div> {children}</div>
                    )}
                    {status === "PROCESSING" ||
                        (loadStatus === "PROCESSING" && (
                            <Skeleton height="5rem"></Skeleton>
                        ))}
                </div>
                <ControlErrors>
                    {(message) => {
                        return <Message severity="error" text={message}></Message>;
                    }}
                </ControlErrors>
            </div>
        </>
    );
};
