let Vue;
class Store {
  constructor(options) {
    this._s = new Vue({
      data: {
        // 只有data中的数据才是响应式
        state: options.state,
      },
    });
    // 得到 getters
    let getters = options.getters || {};
    this.getters = {};
    // console.log("this", this); // Store

    forEach(getters, (getter) => {
      Object.defineProperty(this.getters, getter, {
        get: () => {
          return getters[getter](this.state);
        },
      });
    });

    /**
     * mutations
     *
     */

    //  得到 mutations
    let mutations = options.mutations || {};
    this.mutations = {};
    // 挂载到 store 实例
    forEach(mutations, (mu) => {
      this.mutations[mu] = (p) => {
        mutations[mu](this.state, p);
      };
    });
    /**
     * actions
     */
    let actions = options.actions || {};
    this.actions = {};
    forEach(actions, (ac) => {
      this.actions[ac] = (p) => {
        actions[ac](this, p);
      };
    });
  }
  commit = function (type, payload) {
    this.mutations[type](payload);
  };
  dispatch = (type, payload) => {
    this.actions[type](payload);
  };
  get state() {
    return this._s.state;
  }
}
const install = (_Vue) => {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    },
  });
};

export default {
  Store,
  install,
};
function forEach(getters, cb) {
  return Object.keys(getters).forEach(cb);
}
