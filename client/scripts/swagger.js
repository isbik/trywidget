const { generateApi } = require('swagger-typescript-api');
const path = require('path');

generateApi({
    name: 'generated.ts',
    output: path.resolve(process.cwd(), './src/api'),
    url: 'http://localhost:8000/swagger/?format=openapi',
    generateResponses: true,
    enumNamesAsValues: true,
    moduleNameFirstTag: true,
    generateUnionEnums: true,
    generateRouteTypes: false,
    generateClient: false,
});
