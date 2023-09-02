const fs = require('fs').promises
const path = require('path')
const appModulePath = path.resolve(__dirname, 'controllers')
const readMiddlewareFunctions = async () => {
  try {
    const folders = await fs.readdir(appModulePath) // read main folder of controller
    const folderData = {}
    for (const folder of folders) { // read each folder of controller
      const folderPath = path.resolve(appModulePath, folder)
      const files = await fs.readdir(folderPath) // folder files
      const fileData = {}
      for (const fileName of files) { // read each file
        const filePath = path.resolve(folderPath, fileName) // get path of each file for reading the code of file
        const data = await fs.readFile(filePath, 'utf8') // reading in process
        const lines = data.split('\n') // split with line from lines of code
        const middlewareNames = []
        for (let i = 0; i < lines.length; i++) { // iteration of each line
          const line = lines[i].trim()
          if (line.startsWith('router.')) { // line of code where the router exists
            const startIndex = line.indexOf('(') // starting point
            const endIndex = line.lastIndexOf(')') // ending point
            if (startIndex !== -1 && endIndex !== -1) { // actual condition
              const argumentsStr = line.substring(startIndex + 1, endIndex) // get the string of router
              const names = argumentsStr.split(',').map(name => name.trim()) // get the middleware name by spliting the string into array
              middlewareNames.push(...names.slice(1)) // pushing the middleware name in array with their respected module name and apiName. NOTE:- here slice is used to remove the endpoint name from the middleware list because router.method() contain first parameter as api name/endpoint name
            }
          }
        }
        fileData[fileName] = middlewareNames
      }
      folderData[folder] = fileData
    }
    // file name middlewares.json is been generated in root folder of this project
    fs.writeFile('middlewares.json', JSON.stringify(folderData, null, 2), 'utf8') // array of object with modules and apiname with its middleware are been appending into file one after another
  } catch (err) {
    console.error('Error reading files of middlewares :: ', err)
  }
}
readMiddlewareFunctions()
