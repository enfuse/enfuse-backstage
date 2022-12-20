import { CatalogClient } from '@backstage/catalog-client';
import { createRouter } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { createBuiltinActions } from '@backstage/plugin-scaffolder-backend';
import { ScmIntegrations } from '@backstage/integration';
import { createTemplateAction } from '@backstage/plugin-scaffolder-backend';
import { testRequest } from './scaffolder/actions/github';

import type { PluginEnvironment } from '../types';
// import { triggerGithubWorkflow } from './scaffolder/actions/githubAction';
export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {

  const triggerGithubWorkflow = () => {
    return createTemplateAction<{ owner: string; repo: string }>({
      id: 'enfuse:trigger-github-workflow-test',
      schema: {
        input: {
          required: ['owner', 'repo'],
          type: 'object',
          properties: {
            owner: {
              type: 'string',
              title: 'Owner',
              description: 'The owner of the repo',
            },
            repo: {
              type: 'string',
              title: 'Repo',
              description: 'Repo to place contents ',
            },
          },
        },
      },
      async handler(ctx) {
          try {
              testRequest(ctx.input.owner,ctx.input.repo )
      }
      catch(e:any){
          console.log("Action error - ", e)
      }
    }});
  };

  const catalogClient = new CatalogClient({ discoveryApi: env.discovery });
  const integrations = ScmIntegrations.fromConfig(env.config);

  const builtInActions = createBuiltinActions({
    integrations,
    catalogClient,
    config: env.config,
    reader: env.reader,
  });
  const actions = [...builtInActions, triggerGithubWorkflow()];


  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    identity: env.identity,
    actions
  });
}
