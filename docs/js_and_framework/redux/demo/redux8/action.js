function increase(){
    return {
        type: 'INCREMENT'
    }
}

function decrement (){
    return {
        type: 'DECREMENT'
    }
}

export {
    increase,
    decrement
}