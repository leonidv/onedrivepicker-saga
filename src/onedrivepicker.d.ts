import {DriveItem} from "@microsoft/microsoft-graph-types";

declare global {
    interface Window {
       OneDrive: IOneDrive
    }
}

export interface IOneDrive {
    open(params: OneDriveOpenProperties)

    save(params: OneDriveSaveProperties)
}


export interface OneDriveOptions extends OneDriveCommonCallbacks, OneDriveCommonCallbacks {

}

export interface OneDriveCommonCallbacks {
    /**
     * Called when the user finishes picking files and takes a response object that includes the collection of selected
     * files. This is required if openInNewWindow is true.
     * @param OneDriveResponse
     */
    success: (response: OneDriveResponse) => void,

    /**
     * Called if the user cancels the picker. This function takes no parameters.
     */
    cancel: () => void,

    /**
     * Called when an error occurred on the server or the user doesn't have permission to get a link to the chosen file.
     * This function takes one parameter, an error object.
     * @param error
     */
    error: (error: any) => void
}

export interface OneDriveCommonProperties {
    /**
     * The application ID generated by the app registration console for your integration.
     */
    clientId: string,

    action: string,


    /** The default value is true, which opens the OneDrive picking experience in a popup window.
     * false opens the OneDrive picking experience in the same window. */
    openInNewWindow?: boolean

    /**
     * The default value is true, which renders the "Switch account" UI on the hosted File Picker page.
     */
    accountSwitchEnabled?: boolean,

    advanced: OneDriveAdvancedProperties
}


export interface OneDriveOpenProperties extends OneDriveCommonProperties {


    /**
     * The action type being performed with the files selected. You can specify share to generate a sharable URL,
     * download to receive a short-lived URL that downloads the content of the files, or query to return identifiers
     * that can be used with the Microsoft Graph API or OneDrive API.
     *
     * download    Returns the file's id, name and a short-lived download URL for the selected files.
     *
     * share    Returns a read-only sharing URL for the selected files that can be shared with other users.
     *
     * query    Returns metadata only for the selected files. Use the API to perform additional actions on the files
     * accordingly.
     */
    action: "share" | "query" | "download",

    /**
     * The default value is false, which requires the user to select a single file only, or true to enable the user
     * to select multiple files.
     */
    multiSelect?: boolean,

    /**
     * The type of item that can be selected. The default value is files. You can specify folders to limit
     * selection to only folders or specify all which enables the selection of both files and folders.
     */
    viewType?: "files" | "folders" | "all"

}


export interface OneDriveAdvancedProperties {
    /**
     * A set of additional query parameters as specified by the OneDrive API that define how an item is returned.
     * This typically includes a select and/or expand value.
     */
    queryParameters?: string,

    /**
     * Change the parameters used to generate a link for the share action.
     */
    createLinkParameters?: OneDriveCreateLinkParameters,

    /**
     * A set of file types could be applied to display the specific types only. We support system type 'photo' and
     * 'folder', and custom types of any extension like '.docx'. One applicable filter setting is "folder,.png" which
     * each filter is separated by a ,.
     */
    filter?: string,

    /**
     * By default the picker uses the page it was launched from as the redirect uri for authentication.
     * This may not be desirable in all scenarios, so you can set a custom URL to use instead.
     * This URL must be registered on your app's registration portal as a redirect URL.
     * The target page must reference the OneDrive Picker SDK in the same fashion as the calling page.
     */
    redirectUri?: string,

    /**
     * Endpoint hint is used for SDK redirects the app to the right OAuth apiEndpoint based on which OneDrive API endpoints
     * the app wants talk to. OneDrive API endpoints includes OneDrive personal, OneDrive for Business or
     * SharePoint Online. The value of endpointHint could be api.onedrive.com for OneDrive personal,
     * the OneDrive for Business URL or a SharePoint document library URL,
     * ex. https://contoso-my.sharepoint.com/personal/foo_contoso_onmicrosoft_com/ or
     * https://contoso.sharepoint.com/shared%20documents/.
     *
     * It is not required if the app talks to Microsoft Graph API.
     */
    endpointHint?: string,


    /**
     * An accessToken granted access to OneDrive API endpoints for OneDrive personal, OneDrive for Business, or
     * SharePoint Online could be passed in skip the OAuth flow which gives you a faster experience.
     *
     * endpointHint is required if an accessToken is presented.
     */
    accessToken?: string,

    /**
     * If a user has previously logged into your application, you can provide a loginHint value which will
     * enable single sign-on.
     */
    loginHint?: string,

    /**
     * When talks to Microsoft Graph API and the loginHint specified, SDK also requires the app to tell the
     * logged in user is a consumer account (aka, Microsoft Account) or a business account.
     */
    isConsumerAccount?: boolean,

    /**
     * The SDK will automatically request the Files.Read.All scope for open flows, and Files.ReadWrite.All scope for
     * save flows. However, if you wish to request additional permissions, you can add additional scopes here.
     */
    scopes?: string,

    navigation?: OneDriveNavigationProperties

}

export interface OneDriveNavigationProperties {
    /**
     * If value set, navigation panel will not show up.
     */
    disable: boolean,

    /**
     * Set the document library rendered in OneDrive picker UI.
     */
    entryLocation: string,

    /**
     * Sources of files user can select on the navigation panel.
     */
    sourceTypes: string,
}

export interface OneDriveResponse {
    value: DriveItem[],
    readonly accessToken: string,
    readonly apiEndpoint: string
}

export interface OneDriveCreateLinkParameters {
    /**
     * The type of sharing link to create. Either view, edit, or embed.
     *
     * view    Creates a read-only link to the DriveItem.
     * edit    Creates a read-write link to the DriveItem.
     * embed    Creates an embeddable link to the DriveItem. This option is only available for files in OneDrive personal.
     */
    type: "view" | "edit" | "embed",

    /**
     * The following values are allowed for the scope parameter. If the scope parameter is not specified,
     * the default link type for the organization is created.
     *
     * anonymous    Anyone with the link has access, without needing to sign in. This may include people outside of
     *              your organization. Anonymous link support may be disabled by an administrator.
     *
     * organization    Anyone signed into your organization (tenant) can use the link to get access.
     *                  Only available in OneDrive for Business and SharePoint.
     */
    scope?: "anonymous" | "organization"
}

interface OneDriveSaveProperties extends OneDriveCommonProperties {
    action: "save" | "query",

    /**
     * The form input (type=file) element ID for the file to be uploaded.
     */
    sourceInputElementId?: string,

    /**
     *  An http, https, or data URI for the file to be uploaded.
     *
     *  OneDrive for Business and SharePoint only supports data URI values.
     */
    sourceUri?: string,

    /**
     * Required if the sourceUri parameter is a data URI.
     *
     * If not provided, the file name will be inferred from the name attribute of the input element.
     */
    fileName?: string,

    /**
     * An optional parameter passed in for situation when an uploading file has name conflict with file in the
     * destination folder. See the parameter definition for more detail.
     */
    nameConflictBehavior?: "fail" | "replace" | "rename",

    /**
     * Called at various points with a float between 0.0 and 100.0 to indicate the progress of the upload.
     * This is called at least once with 100.0.
     * @param number
     */
    progress: (percent: number) => void,
}

export interface OneDriveSaveOptions extends OneDriveSaveProperties, OneDriveCommonCallbacks {

}


declare module "onedrivepicker" {
    export = OneDrive
}

declare const OneDrive: IOneDrive