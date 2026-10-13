import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'st18uf7g',
    dataset: 'production'
  },
  studioHost: 'marcomenghi',
  deployment: {
    appId: 'ygrws416ku7zkn2zmqyd9yi2',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: false,
  }
})
