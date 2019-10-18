import * as React from 'react';
import {Route, RouteProps, matchPath} from 'react-router-dom'
import { RouteChildrenProps, RouteComponentProps } from 'react-router';
import {CachePage} from "./CachePage";
import {Tools} from "../utils/tools";

export interface CacheRouteComponentProps extends RouteComponentProps{

}

export interface CacheRouteProps extends RouteProps{
    component?: React.ComponentType<CacheRouteComponentProps> | React.ComponentType<any>;
    render?: ((props: CacheRouteComponentProps) => React.ReactNode);
    children?: ((props: CacheRouteComponentProps) => React.ReactNode) | React.ReactNode;
    cache?: boolean; // 是否缓存，默认true
    local?: boolean; // 持久缓存，不清除
}

export class CacheRoute extends React.Component<CacheRouteProps>{
    static readonly displayName = 'CacheRoute';

    static defaultProps = {
        cache: true,
        local: false
    };

    render(){
        let {
            cache,
            local,
            children,
            component,
            render,
            ...options
        } = this.props;

        return <Route>
            {(routeProps: RouteChildrenProps) => {
                let path = routeProps.location.pathname,
                    match = matchPath(path, options);

                // 当不匹配且不缓存时返回null
                if(!match && !cache){
                    return null;
                }

                let props: CacheRouteComponentProps = Object.assign({}, routeProps);

                if (Array.isArray(children) && children.length === 0) {
                    children = null;
                }

                if(Tools.isFunction(children)){
                    children = children(props);
                }

                return <div style={{display: match ? '' : 'none'}}>
                    <CachePage>
                        {() => {
                            return children
                                ? children
                                : component
                                    ? React.createElement(component, props)
                                    : (render ? render(props) : null);
                        }}
                    </CachePage>
                </div>
            }}
        </Route>
    }
}