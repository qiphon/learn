onmessage= ev => {
    console.log(ev, ev.data, this)
    postMessage('i am worker')
}