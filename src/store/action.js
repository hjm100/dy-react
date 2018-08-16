
export const pageGo = () => {
    return {
        type:'left'
    }
}
export const pageBack = () => {
    return {
        type:'right'
    }
}

export const Setuser = (key,val) => {
    return {
        type:"user",
        key:key,
        value:val
    }
}