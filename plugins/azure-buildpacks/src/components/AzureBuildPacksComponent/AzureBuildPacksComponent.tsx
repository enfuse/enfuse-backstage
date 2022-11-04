import React from 'react';
import { Table, TableColumn, Progress } from '@backstage/core-components';
import Alert from '@material-ui/lab/Alert';
import useAsync from 'react-use/lib/useAsync';

import { useApi, configApiRef } from '@backstage/core-plugin-api';

const { AppPlatformManagementClient } = require("@azure/arm-appplatform");
const { InteractiveBrowserCredential } = require("@azure/identity");

import {getCompatibleLanguages} from '../../utils/buildpack-utils';

type SupportedBuildpacks = {
  buildpack: string;
  builder: string
  languages: string
}
type DenseTableProps = {
  // users: User[];
  supportedBuildpacks: SupportedBuildpacks[];
};

export const DenseTable = ({ supportedBuildpacks }: DenseTableProps) => {
  // const classes = useStyles();
  const columns: TableColumn[] = [
    { title: 'Buildpack', field: 'buildpack' },
    { title: 'Supported Languages', field: 'languages' },
    { title: 'Builder', field: 'builder' },
  ];
  const data = supportedBuildpacks.map(item => {
    return {
      buildpack: item.buildpack,
      builder: item.builder,
      languages: item.languages
    }
  });
  return (
    <Table
      title="Supported ASAE Buildpacks"
      options={{ search: true, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const AzureBuildPacksComponent = () => {
  const config = useApi(configApiRef);
  const resourceGroupName = config.getOptionalString('azureBuildpacks.resourceGroupName') ?? 'defaults'
  const serviceName = config.getOptionalString('azureBuildpacks.serviceName') ?? 'defaults';
  const buildServiceName = config.getOptionalString('azureBuildpacks.buildServiceName') ?? 'defaults';
  const builderName = config.getOptionalString('azureBuildpacks.builderName') ?? 'defaults'
  const subscriptionId = config.getOptionalString('azureBuildpacks.subscriptionId') ?? 'defaults';

  const credential = new InteractiveBrowserCredential({
    tenantId: config.getString('azureBuildpacks.credentials.tenantId'),
    clientId: config.getString('azureBuildpacks.credentials.clientId')
  });
  const client = new AppPlatformManagementClient(credential, subscriptionId);

  const { value, loading, error } = useAsync(async (): Promise<SupportedBuildpacks[]> => {
    const response = await client.buildServiceBuilder.get(    
        resourceGroupName,
        serviceName,
        buildServiceName,
        builderName)
      const buildpackGroups = response.properties.buildpackGroups.flat()
      const buildpacks = buildpackGroups.map((a: any) => (a.buildpacks.map((buildpack:any)=> {
        return {
          builder: builderName,
          buildpack:buildpack.id,
          languages: getCompatibleLanguages(buildpack.id)
        }
       } )))
      console.log(typeof buildpacks)
      return buildpacks.flat()
    
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return <DenseTable supportedBuildpacks={value || []} />;
};
