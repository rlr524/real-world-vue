import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "nprogress/nprogress.css";
import Vuelidate from "vuelidate";
import DateFilter from "@/filters/date";

Vue.filter("date", DateFilter);

Vue.use(Vuelidate);

// // example of a global mixin - use with caution as every component will contain it
// Vue.mixin({
//   mounted() {
//     console.log("I am mixed into every component.");
//   }
// });

// import BaseIcon from "@/components/BaseIcon.vue";

// globally register a component; two args, the name you want to use and the import reference from above...will usually be the same but don't have to be
// Vue.component("BaseIcon", BaseIcon);

// automatic global registration of any component beginning with "Base"
// 1. the relative path of the components folder
// 2. whether or not to look in subfolders
// 3. the regular expression used to match base component filenames

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(function(fileName) {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // eslint-disable-next-line
  render: (h) => h(App)
}).$mount("#app");
