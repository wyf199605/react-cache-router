interface CacheMap {
    [path: string]: any;
}

export class CacheManager {
    private cache: CacheMap = {};
    private localCache: CacheMap = {};
    private cacheKeys: string[] = [];
    private maxCache: number;
    constructor(maxCache: number = -1){
        this.maxCache = maxCache;
    }

    add(path: string, data: any, local: boolean = false): void{
        if(local){
            this.localCache[path] = data;
            return ;
        }

        let {
            cacheKeys,
            maxCache,
            cache
        } = this;

        if(!(path in cache)){
            cacheKeys.push(path);
        }

        cache[path] = data;

        if(maxCache !== -1 && cacheKeys.length > maxCache){
            let deleteKey = cacheKeys.shift();
            delete cache[deleteKey];
        }
    }

    get(path: string){
        let localData = this.localCache[path];
        return localData ? localData : this.cache[path];
    }

    delete(path: string){
        delete this.cache[path];
        this.cacheKeys = this.cacheKeys.filter((key) => key === path);
    }

    clear(clearLocalCache: boolean = false){
        this.cacheKeys = [];
        this.cache = {};
        clearLocalCache && (this.localCache = {})
    }

    focus(path: string){
        if(!this.cache[path]){
            return ;
        }

        let keys = this.cacheKeys.filter((key) => path !== key);
        keys.push(path);
        this.cacheKeys = keys;
    }
}