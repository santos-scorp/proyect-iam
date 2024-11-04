import {Tooltip} from "bootstrap";

// Use "mounted" hook
export default {
    mounted(el, binding) {
        let tooltip = new Tooltip(el, {
            placement: binding.arg || 'top',
            title: binding.value
        });
    }
}