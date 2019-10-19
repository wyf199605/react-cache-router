import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface UpdaterChildProps extends RouteComponentProps{
    currentPath: string
}

interface UpdaterProps {
    children: (option: UpdaterChildProps) => React.ReactNode;
}

class Updater extends React.Component<UpdaterProps & RouteComponentProps> {
    protected prevPath: string;

    shouldComponentUpdate(nextProps: Readonly<RouteComponentProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        return nextProps.location.pathname !== this.prevPath;
    }

    render(){
        let {
            children,
            ...options
        } = this.props;
        this.prevPath = options.location.pathname;

        return typeof children === "function" ? children({
            currentPath: this.prevPath,
            ...options
        }) : null;
    }
}

export const RouteUpdater: React.ComponentType<UpdaterProps> = withRouter(Updater) as any;