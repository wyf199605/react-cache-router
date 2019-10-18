import * as React from "react";

interface Props {
    children: () => React.ReactNode;
}

export class CachePage extends React.Component<Props> {
    shouldComponentUpdate(): boolean {
        return false;
    }

    render(){
        let children = this.props.children;
        return typeof children === "function" && children();
    }
}