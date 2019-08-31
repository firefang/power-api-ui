import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import '@/core/lazy_lib/components_use'
import Viser from 'viser-vue'

// ext library
import PermissionHelper from '@/utils/helper/permission'
import './directives/action'

Vue.use(Viser)

Vue.use(VueStorage, config.storageOptions)
Vue.use(PermissionHelper)
