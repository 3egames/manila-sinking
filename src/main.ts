const components:any[] = require('./components');

const ComponentLibrary = {
  install(Vue: any, options = {}) {
    for (const c in components) {
      const component = components[c]
      
      Vue.component(component.name, component)
    }
  }
}

export default ComponentLibrary

// auto-register the plugin in situations where a Vue instance exists in the window and a module system is not used.
// This is covered in the Vue Getting Started Guide and is an option when adopting Vue into an existing application that may not use a build system.
declare global { interface Window { Vue:any; } }
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibrary)
}