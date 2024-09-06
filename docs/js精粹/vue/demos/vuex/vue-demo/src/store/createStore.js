let Vue;

class Store {
    constructor(options){
        // console.log(options, 'Store options')
        const {
            mutations,
            actions,
            modules,
            getters,
            state
        } = options;
        // 保证数据实现双向绑定
        this._vm = new Vue({
            data: {
                $$state: state
            }
        })
        this._mutations = mutations
        this._actions = actions
        const store = this
        const { dispatch, commit } = store
        this.commit = function bindcommit(type, payload, options){
            commit.call(store, type, payload, options)
        }
        this.dispatch = function binddispatch(type, payload){
            dispatch.call(store, type, payload)
        }
        if(getters){
            this.handlegetters(getters)
        }
    }
    get state(){
        // console.log(this._vm)
        return this._vm._data.$$state
    }
    dispatch(type, payload){
        const entry = this._actions[type]
        entry && entry(this, payload)
    }
    commit(type, payload, options){
        const entry = this._mutations[type]
        entry && entry(this.state, payload, options)
    }
    handlegetters(getters){
        this.getters = {}
        Object.keys(getters).forEach(getter =>{
            // console.log(getter, 'getters', this)
            Object.defineProperty(this.getters, getter, {
                get: () => getters[getter](this.state)
            })
        })
    }
}

function install (_Vue){
    Vue = _Vue;
    Vue.mixin({
        beforeCreate(){
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {
    Store,
    install
}