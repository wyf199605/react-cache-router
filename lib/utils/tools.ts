
export const Tools = {
    isFunction(fun: any): fun is Function{
        return typeof fun === "function";
    }
};