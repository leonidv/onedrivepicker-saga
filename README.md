### Using OneDrive Picker in react application
Example of using OneDriver Picker 7.2 in react application.
[Redux-Saga](https://redux-saga.js.org/) is used for calling
OneDrive picker and load/save file.

It's written in TypeScript.

Application is simple (very simple) text editor which allows to:
* load the text file from OneDrive
* update the content of loaded file
* save new file to OneDrive 

### Execute
The project is based on [react-create-app](https://create-react-app.dev/)

To run it you should:

1. Register new application in Azure ([docs](https://docs.microsoft.com/en-gb/azure/active-directory/develop/quickstart-register-app)).
1. Copy application (client) ID and create ```.env``` next to ```package.json``` in project root with content:
    ```
        REACT_APP_ONEDRIVE_CLIENT_ID=<insert your client id here>
    ``` 
1. Add permissions ```Files.ReadWrite.All```, ```User.Read```  ([docs](https://docs.microsoft.com/en-gb/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-permissions-to-access-web-apis))
1. Add redirect URI ```http://localhost:3000``` ([docs](https://docs.microsoft.com/en-gb/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-redirect-uris-to-your-application))
1. Run ```npm start```. It's open your default browser with application

### Stack
    "typescript": "3.6.3"
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-redux": "7.1.1",    
    "redux": "4.0.4",
    "redux-actions": "2.6.5",
    "redux-saga": "1.1.1"       
###Documentation
* [OneDrive file picker for JavaScript v7.2 overview](https://docs.microsoft.com/en-gb/onedrive/developer/controls/file-pickers/js-v72/?view=odsp-graph-online)
* [Saga API](https://redux-saga.js.org/docs/api/)
   

 