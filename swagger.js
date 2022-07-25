const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger.json';
const endPointFiles = ['./routes/user.js','./routes/admin.js','./routes/examiner.js','./routes/student.js']
swaggerAutogen(outputFile,endPointFiles)