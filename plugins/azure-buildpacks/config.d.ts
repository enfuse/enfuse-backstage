export interface Config {
  /**
   * @visibility frontend
   */
    azureBuildpacks?: {
        /**
         * Resource group ASAE cluster lives in
         * @visibility frontend
         */
        resourceGroupName?: string
        /**
         * ASAE service name
         * @visibility frontend
         */
        serviceName?: string
        /**
         * Build Service Name, defaults to 'default'
         * @visibility frontend
         */
        buildServiceName?: string
        /**
         * builderName to be fetched
         * @visibility frontend
         */
        builderName?: string
        /**
         * SubscriptionId the resource lives under
         * @visibility frontend
         */
        subscriptionId?: string
        /**
         * Credentials used to fetch information from resource.
         * @visibility frontend
         */
        credentials?: {
            /**
             * tenantId 
             * @visibility frontend
             */
            tenantId: string
            /**
             * clientId
             * @visibility frontend
             */
            clientId: string
        }
    }
}