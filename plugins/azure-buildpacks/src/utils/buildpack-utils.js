
export const getCompatibleLanguages = (buildpack) => {

    switch(buildpack){
        case "tanzu-buildpacks/java-azure":
            return "JVM languages"
        case "tanzu-buildpacks/dotnet-core":
            return "C#, F#, Visual Basic"
        case "tanzu-buildpacks/go":
            return "Go"
        case "tanzu-buildpacks/nodejs":
            return "Node.js"
        case "tanzu-buildpacks/python":
            return "python"
        default:
            return null;
    }
}