import * as React from 'react';
import { matchPath } from 'react-router-dom';
import { CacheManager } from './CacheManager';
import {CacheRouteProps} from "./CacheRoute";
import {RouteUpdater} from "./RouteUpdater";

export interface CacheSwitchProps {
    maxRoutes?: number; // 最大缓存路由数量
    when?: "forward" | "back" | "all" | "none"; // 什么时候缓存，forward路由前进时，back路由后退时，默认forward
}

export class CacheSwitch extends React.Component<CacheSwitchProps>{
    static defaultProps = {
        maxRoutes: -1,
        when: "forward"
    };

    protected cacheManager: CacheManager;
    protected prevPath: string;
    constructor(props: CacheSwitchProps) {
        super(props);
        this.cacheManager = new CacheManager(props.maxRoutes);
    }

    render(){
        let {
            when,
            maxRoutes,
            children
        } = this.props;

        let cacheManager = this.cacheManager;

        return <RouteUpdater>
            {({currentPath, history}) => {
                let action = history.action;
                if(this.prevPath && currentPath !== this.prevPath){
                    if (when === 'forward') {
                        // back操作是清除页面缓存
                        if (action === 'POP') {
                            cacheManager.delete(this.prevPath);
                        }
                    } else if (when === 'back') {
                        // 前进操作时清除页面缓存
                        if (action === 'PUSH' || action === "REPLACE") {
                            cacheManager.delete(this.prevPath);
                        }
                    }
                }

                return React.Children.map(children, (child, index) => {
                    if(!React.isValidElement(child)){
                        return null;
                    }
                    let props = child.props as CacheRouteProps,
                        match = matchPath(currentPath, props);

                    if(match){
                        this.prevPath = currentPath;
                        maxRoutes !== -1 && cacheManager.focus(currentPath);
                    }

                    let paths = props.path;
                    if(!Array.isArray(paths)){
                        paths = [paths || ''];
                    }
                    let key = paths.join(',') || index;

                    if(child.type["displayName"] === "CacheRoute"){
                        let cacheRoute = cacheManager.get(currentPath);

                        // 未匹配或者cacheRoute存在时直接返回；
                        if(!match || cacheRoute){
                            return cacheRoute;
                        }

                        cacheRoute = React.cloneElement(child, {
                            key,
                            ...props
                        });

                        // 判断是否开启缓存
                        if(props.cache !== false && when !== "none"){
                            paths.forEach((path) => {
                                cacheManager.add(path, cacheRoute, props.local);
                            });
                        }
                        return cacheRoute;
                    }else{
                        return match ? React.cloneElement(child, {
                            key,
                            ...props
                        }) : null;
                    }
                });
            }}
        </RouteUpdater>;
    }
}