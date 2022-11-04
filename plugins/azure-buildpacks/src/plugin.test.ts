import { azureBuildpacksPlugin } from './plugin';

describe('azure-buildpacks', () => {
  it('should export plugin', () => {
    expect(azureBuildpacksPlugin).toBeDefined();
  });
});
