import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

import {ASAE_BUILDPACKS_BUILDER_NAME_ANNOTATION} from './constants'
import { Entity } from '@backstage/catalog-model';

export const isAsaeBuildpacksBuilderNameAvailable = (entity : Entity) =>
   Boolean(entity.metadata.annotations?.[ASAE_BUILDPACKS_BUILDER_NAME_ANNOTATION])


export const azureBuildpacksPlugin = createPlugin({
  id: 'azure-buildpacks',
  routes: {
    root: rootRouteRef,
  },
});

export const AzureBuildpacksPage = azureBuildpacksPlugin.provide(
  createRoutableExtension({
    name: 'AzureBuildpacksPage',
    component: () =>
      import('./components/AzureBuildPacksComponent').then(m => m.AzureBuildPacksComponent),
    mountPoint: rootRouteRef,
  }),
);
