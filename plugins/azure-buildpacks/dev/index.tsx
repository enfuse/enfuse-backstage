import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { azureBuildpacksPlugin, AzureBuildpacksPage } from '../src/plugin';

createDevApp()
  .registerPlugin(azureBuildpacksPlugin)
  .addPage({
    element: <AzureBuildpacksPage />,
    title: 'Root Page',
    path: '/azure-buildpacks'
  })
  .render();
