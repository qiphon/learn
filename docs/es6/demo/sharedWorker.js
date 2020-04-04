onmessage = ev => {
    let sharedM = ev.data
    // let Int32Array = sharedM.Int32Array
    console.log(  Atomics.load(sharedM, 6) )
    console.log(  Atomics.add(sharedM,0, 6) )
    Atomics.store(sharedM, 20, 777)
    postMessage('change')
    // console.log(Int32Array, sharedM)
}