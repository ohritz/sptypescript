﻿
declare class CalloutActionOptions {
    /** Text for the action link */
    text: string;
    tooltip: string;
    disabledTooltip: string;
    /** Callback that is executed when the action link is clicked.
        @param event Standard javascript event object
        @param action The action object */
    onClickCallback: (event: Event, action: CalloutAction) => any;
    /** Callback which returns if the action link is enabled */
    isEnabledCallback: (action: CalloutAction) => bool;
    /** Callback which returns if the action link is visible */
    isVisibleCallback: (action: CalloutAction) => bool;
    /** Submenu entries for the action. If defined, the action link click will popup the specified menu. */
    menuEntries: CalloutActionMenuEntry[];
}

/** Defines a callout action menu entry */
declare class CalloutActionMenuEntry {
    /** Creates a callout action menu entry
        @param text Text to be displayed as the menu item text
        @param onClickCallback Callback that will be fired when the item is clicked
        @param wzISrc Url of the icon
        @param wzIAlt Alternative text for the icon image
        @param wzISeq Sequence for the menu item
        @param wzDesc Description of the menu item */
    constructor(
        text: string,
        onClickCallback: (actionMenuEntry: CalloutActionMenuEntry, actionMenuEntryIndex: number) => void,
        wzISrc: string,
        wzIAlt: string,
        wzISeq: number,
        wzDesc: string);
}


declare class CalloutActionMenu {
    constructor(actionsId);
    addAction(action: CalloutAction);
    getActions(): CalloutAction[];
    render(): void;
    refreshActions(): void;
    calculateActionWidth(): void;
}


declare class CalloutAction {
    constructor(options: CalloutActionOptions);
    getText(): string;
    getToolTop(): string;
    getDisabledToolTip(): string;
    getOnClickCallback(): (event, action: CalloutAction) => any;
    getIsDisabledCallback(): (action: CalloutAction) => bool;
    getIsVisibleCallback(): (action: CalloutAction) => bool;
    getIsMenu(): bool;
    getMenuEntries(): CalloutActionMenuEntry[];
    render(): void;
    isEnabled(): bool;
    isVisible(): bool;
    set (options: CalloutActionOptions): void;
}

declare class Callout {
    /** Sets options for the callout. Not all options can be changed for the callout after its creation. */
    set (options: CalloutOptions);
    /** Adds event handler to the callout.
        @param eventName one of the following: "opened", "opening", "closing", "closed" */
    addEventCallback(eventName: string, callback: (callout: Callout) => void);
    /** Returns the launch point element of the callout. */
    getLaunchPoint(): HTMLElement;
    /** Returns the ID of the callout. */
    getID(): string;
    /** Returns the title of the callout. */
    getTitle(): string;
    /** Returns the contents of the callout. */
    getContent(): string;
    /** Returns the content element of the callout. */
    getContentElement(): HTMLElement;
    /** Returns the bounding element defined for the callout during its creation. */
    getBoundingBox(): HTMLElement;
    /** Returns the content width defined for the callout during its creation. */
    getContentWidth(): number;
    /** Returns the object that represents open behaivor defined for the callout during its creation. */
    getOpenOptions(): CalloutOpenOptions;
    /** Returns the beak orientation defined for the callout during its creation. */
    getBeakOrientation(): string;
    /** Returns the position algorithm function defined for the callout during its creation. */
    getPositionAlgorithm(): any;
    /** Specifies wherever callout is in "Opened" state */
    isOpen(): bool;
    /** Specifies wherever callout is in "Opening" state */
    isOpening(): bool;
    /** Specifies wherever callout is in "Opened" or "Opening" state */
    isOpenOrOpening(): bool;
    /** Specifies wherever callout is in "Closing" state */
    isClosing(): bool;
    /** Specifies wherever callout is in "Closed" state */
    isClosed(): bool;
    /** Returns the callout actions menu */
    getActionMenu(): CalloutActionMenu;
    /** Adds a link to the actions panel in the bottom part of the callout window */
    addAction(action: CalloutAction);
    /** Re-renders the actions menu. Call after the actions menu is changed. */
    refreshActions(): void;
    /** Display the callout. Animation can be used only for IE9+ */
    open(useAnimation: bool);
    /** Hide the callout. Animation can be used only for IE9+ */
    close(useAnimation: bool);
    /** Display if hidden, hide if shown. */
    toggle(): void;
    /** Do not call this directly. Instead, use CalloutManager.remove */
    destroy(): void;
}

declare class CalloutOpenOptions {
    /** HTML event name, e.g. "click" */
    event: string;
    /** Callout will be closed on blur */
    closeCalloutOnBlur: bool;
    /** Close button will be shown within the callout window */
    showCloseButton: bool;
}

declare class CalloutOptions {
    /** Some unique id for the callout. */
    ID: string;
    /** Element on that the callout is shown. */
    launchPoint: HTMLElement;
    /** One of the following: "topBottom" (default) or "leftRight". */
    beakOrientation: string;
    /** String (HTML allowed) that represents contents of the callout window. */
    content: string;
    /** Title for the callout */
    title: string;
    /** HTML element that represents contents of the callout window. */
    contentElement: HTMLElement;
    /** If defined, callout will be inscribed into the bounding element. */
    boundingBox: HTMLElement;
    /** Content element's width in pixels. By default = 350. */
    contentWidth: number;
    /** Defines opening behavior */
    openOptions: CalloutOpenOptions;
    /** Fires after the callout is rendered but before it is positioned and shown */
    onOpeningCallback: (callout: Callout) => void;
    /** Fires right after the callout is shown */
    onOpenedCallback: (callout: Callout) => void;
    /** Fires right before the callout is closed */
    onClosingCallback: (callout: Callout) => void;
    /** Fires right after the callout is closed */
    onClosedCallback: (callout: Callout) => void;
    /** Sets the position of the callout during its opening phase. For an example of a position algorithm function, please explore defaultPositionAlgorithm function from the callout.debug.js file */
    positionAlgorithm: (callout: Callout) => void;
}


declare class CalloutManager {
    /** Creates a new callout */
    static createNew(options: CalloutOptions): Callout;
    /** Checks if callout with specified ID already exists. If it doesn't, creates it, otherwise returns the existing one. */
    static createNewIfNecessary(options: CalloutOptions): Callout;
    /** Detaches callout from the launch point and destroys it. */
    static remove(callout: Callout);
    /** Searches for a callout associated with the specified launch point. Throws error if not found. */
    static getFromLaunchPoint(launchPoint: HTMLElement): Callout;
    /** Searches for a callout associated with the specified launch point. Returns null if not found. */
    static getFromLaunchPointIfExists(launchPoint: HTMLElement): Callout;
    /** Gets the first launch point within the specified ancestor element, and returns true if the associated with it callout is opened or opening.
        If the launch point is not found or the callout is hidden, returns false. */
    static containsOneCalloutOpen(ancestor: HTMLElement): bool;
    /** Finds the closest launch point based on the specified descendant element, and returns callout associated with the launch point. */
    static getFromCalloutDescendant(descendant: HTMLElement): Callout;
    /** Perform some action for each callout on the page. */
    static forEach(callback: (callout: Callout) => void);
    /** Closes all callouts on the page */
    static closeAll(): bool;
    /** Returns true if at least one of the defined on page callouts is opened. */
    static isAtLeastOneCalloutOpen(): bool;
    /** Returns true if at least one of the defined on page callouts is opened or opening. */
    static isAtLeastOneCalloutOn(): bool;
}

function SPFormControl_AppendValidationErrorMessage(nodeId:string, errorResult): void;

declare module SPClientTemplates {

    export enum FileSystemObjectType {
        Invalid = -1,
        File = 0,
        Folder = 1,
        Web = 2
    }
    export enum ChoiceFormatType {
        Dropdown = 0,
        Radio = 1
    }

    export enum ClientControlMode {
        Invalid = 0,
        DisplayForm = 1,
        EditForm = 2,
        NewForm = 3,
        View = 4
    }

    export enum RichTextMode {
        Compatible = 0,
        FullHtml = 1,
        HtmlAsXml = 2,
        ThemeHtml = 3
    }
    export enum UrlFormatType {
        Hyperlink = 0,
        Image = 1
    };

    export enum DateTimeDisplayFormat {
        DateOnly = 0,
        DateTime = 1,
        TimeOnly = 2
    };

    export enum DateTimeCalendarType {
        None = 0,
        Gregorian = 1,
        Japan = 3,
        Taiwan = 4,
        Korea = 5,
        Hijri = 6,
        Thai = 7,
        Hebrew = 8,
        GregorianMEFrench = 9,
        GregorianArabic = 10,
        GregorianXLITEnglish = 11,
        GregorianXLITFrench = 12,
        KoreaJapanLunar = 14,
        ChineseLunar = 15,
        SakaEra = 16,
        UmAlQura = 23
    };
    export enum UserSelectionMode {
        PeopleOnly = 0,
        PeopleAndGroups = 1
    }

    /** Represents schema for a Choice field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_Choice extends FieldSchema_InForm {
        /** List of choices for this field. */
        Choices: string[];
        /** Display format for the choice field */
        FormatType: ChoiceFormatType;
    }
    /** Represents schema for a Lookup field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_Lookup extends FieldSchema_InForm {
        /** Specifies if the field allows multiple values */
        AllowMultipleValues: bool;
        /** Returns base url for a list display form, e.g. "http://portal/web/_layouts/15/listform.aspx?PageType=4"
            You must add "ListId" (Guid of the list) and "ID" (integer Id of the item) parameters in order to use this Url */
        BaseDisplayFormUrl: string;
        /** Indicates if the field is a dependent lookup */
        DependentLookup: bool;
        /** Indicates wherever the lookup list is throttled (contains more items than value of the "List Throttle Limit" setting). */
        Throttled: bool;
        /** Returns string representation of a number that represents the current value for the "List Throttle Limit" web application setting.
            Only appears if Throttled property is true, i.e. the target lookup list is throttled. */
        MaxQueryResult: string;
        /** List of choices for this field.
            For a lookup field, contains array of possible values pulled from the target lookup list. */
        Choices: string[];
        /** Number of choices. Appears only for Lookup field. */
        ChoiceCount: number;
    }
    /** Represents schema for a DateTime field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_DateTime extends FieldSchema_InForm {
        /** Type of calendar to use */
        CalendarType: DateTimeCalendarType;
        /** Display format for DateTime field. */
        DisplayFormat: DateTimeDisplayFormat;
        /** Indicates wherever current user regional settings specify to display week numbers in day or week views of a calendar.
            Only appears for DateTime fields. */
        ShowWeekNumber: bool;
        TimeSeparator: string;
        TimeZoneDifference: string;
        FirstDayOfWeek: number;
        FirstWeekOfYear: number;
        HijriAdjustment: number;
        WorkWeek: string;
        LocaleId: string;
        LanguageId: string;
        MinJDay: number;
        MaxJDay: number;
        HoursMode24: bool;
        HoursOptions: string[];
    }
    /** Represents schema for a DateTime field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_Geolocation extends FieldSchema_InForm {
        BingMapsKey: string;
        IsBingMapBlockedInCurrentRegion: bool;
    }
    /** Represents schema for a Choice field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_MultiChoice extends FieldSchema_InForm {
        /** List of choices for this field. */
        MultiChoices: string[];
        /** Indicates wherever fill-in choice is allowed */
        FillInChoice: bool;
    }
    /** Represents schema for a Choice field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_MultiLineText extends FieldSchema_InForm {
        /** Specifies whether rich text formatting can be used in the field */
        RichText: bool;
        /** Changes are appended to the existing text. */
        AppendOnly: bool;
        /** Rich text mode for the field */
        RichTextMode: RichTextMode;
        /** Number of lines configured to display */
        NumberOfLines: number;
        /** A boolean value that specifies whether hyperlinks can be used in this fields. */
        AllowHyperlink: bool;
        /** WebPartAdderId for the ScriptEditorWebPart */
        ScriptEditorAdderId: string;
    }
    /** Represents schema for a Number field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_Number extends FieldSchema_InForm {
        ShowAsPercentage: bool;
    }
    /** Represents schema for a Number field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_Text extends FieldSchema_InForm {
        MaxLength: number;
    }
    /** Represents schema for a Number field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_Url extends FieldSchema_InForm {
        DisplayFormat: UrlFormatType;
    }
    /** Represents schema for a Number field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_User extends FieldSchema_InForm {
        Presence: bool;
        WithPicture: bool;
        DefaultRender: bool;
        WithPictureDetail: bool;
        /** Server relative Url for ~site/_layouts/listform.aspx */
        ListFormUrl: string;
        /** Server relative Url for ~site/_layouts/userdisp.aspx */
        UserDisplayUrl: string;
        EntitySeparator: string;
        PictureOnly: bool;
        PictureSize: string;
    }
    /** Represents field schema in Grid mode and on list forms.
        Consider casting objects of this type to more specific field types, e.g. FieldSchemaInForm_Lookup */
    export interface FieldSchema_InForm {
        /** Specifies if the field can be edited while list view is in the Grid mode */
        AllowGridEditing: bool;
        /** Description for this field. */
        Description: string;
        /** Direction of the reading order for the field. */
        Direction: string;
        /** String representation of the field type, e.g. "Lookup". Same as SPField.TypeAsString */
        FieldType: string;
        /** Indicates whether the field is hidden */
        Hidden: bool;
        /** Guid of the field */
        Id: string;
        /** Specifies Input Method Editor (IME) mode bias to use for the field.
            The IME enables conversion of keystrokes between languages when one writing system has more characters than can be encoded for the given keyboard. */
        IMEMode: any;
        /** Internal name of the field */
        Name: string;
        /** Specifies if the field is read only */
        ReadOnlyField: bool;
        /** Specifies wherever field requires values */
        Required: bool;
        RestrictedMode: bool;
        /** Title of the field */
        Title: string;
        /** For OOTB fields, returns the type of field. For "UserMulti" returns "User", for "LookupMulti" returns "Lookup".
            For custom field types, returns base type of the field. */
        Type: string;
        /** If SPFarm.Local.UseMinWidthForHtmlPicker is true, UseMinWidth will be set to true. Undefined in other cases. */
        UseMinWidth: bool;
    }
    export interface ListSchema_InForm {
        Field: FieldSchema_InForm[];
    }
    export interface ListData_InForm {
        Items: Item[];
    }
    export interface RenderContext_FieldInForm extends RenderContext_Form {
        CurrentGroupIdx: number;
        CurrentGroup: Group;
        CurrentItems: Item[];
        CurrentFieldSchema: FieldSchema_InForm;
        CurrentFieldValue: any;
    }
    export interface RenderContext_Form extends RenderContext {
        FieldControlsModes: { [fieldInternalName: string]: ClientControlMode; };
        FormContext: any;
        FormUniqueId: string;
        ListData: ListData_InForm;
        ListSchema: ListSchema_InForm;
    }

    export interface FieldSchema_InView_LookupField extends FieldSchema_InView {
        /** Either "TRUE" or "FALSE" */
        AllowMultipleValues: string;
        /** Target lookup list display form URL, including PageType and List attributes. */
        DispFormUrl: string;
        /** Either "TRUE" or "FALSE" */
        HasPrefix: string;
    }
    export interface FieldSchema_InView_UserField extends FieldSchema_InView {
        /** Either "TRUE" or "FALSE" */
        AllowMultipleValues: string;
        /** Either "TRUE" or "FALSE" */
        ImnHeader: string;
        /** Either "TRUE" or "FALSE" */
        HasPrefix: string;
        /** Either "1" or "0" */
        HasUserLink: string;
        /** Either "1" or "0" */
        DefaultRender: string;
    }
    /** Represents field schema in a list view. */
    export interface FieldSchema_InView {
        /** Either "TRUE" or "FALSE" */
        AllowGridEditing: string;
        /** Either "TRUE" or "FALSE" */
        CalloutMenu: string;
        ClassInfo: string; // e.g. "Menu"
        css: string;
        DisplayName: string;
        /** Either "TRUE" or "FALSE" */
        Explicit: string;
        fieldRenderer: any;
        FieldTitle: string;
        /** Represents SPField.TypeAsString, e.g. "Computed", "UserMulti", etc. */
        FieldType: string;
        /** Indicates whether the field can be filtered. Either "TRUE" or "FALSE" */
        Filterable: string;
        /** Set to "TRUE" for fields that comply to the following Xpath query:
            ViewFields/FieldRef[@Explicit='TRUE'] | Query/GroupBy/FieldRef[not(@Name=ViewFields/FieldRef/@Name)] */
        GroupField: string;
        /** Either "TRUE" or "FALSE" */
        GridActiveAndReadOnly: string;
        /** Guid of the field */
        ID: string;
        /** Specifies if the field contains list item menu.
            Corresponds to ViewFields/FieldRef/@ListItemMenu attribute. Either "TRUE" or "FALSE" and might be missing. */
        listItemMenu: string;
        Name: string;
        RealFieldName: string;
        /** Either "TRUE" or "FALSE" */
        ReadOnly: string;
        ResultType: string;
        /** Indicates whether the field can be sorted. Either "TRUE" or "FALSE" */
        Sortable: string;
        Type: string;
    }
    export interface ListSchema_InView {
        /** Key-value object that represents all aggregations defined for the view.
            Key specifies the field internal name, and value specifies the type of the aggregation. */
        Aggregate: { [name: string]: string; };
        /** Either "TRUE" or false (for grouping) */
        Collapse: string;
        /** Specifies whether to open items in a client application ("1") or in browser ("0"). */
        DefaultItemOpen: string;
        Direction: string;
        /** Either "0" or "1" */
        EffectivePresenceEnabled: string;
        /** If in grid mode (context.inGridMode == true), cast to FieldSchema_InForm[], otherwise cast to FieldSchema_InView[] */
        Field: any[];
        FieldSortParam: string;
        Filter: any;
        /** Either "0" or "1" */
        ForceCheckout: string;
        /** Internal name for the first group by field, if any */
        group1: string;
        /** Internal name for the second group by field, if any */
        group2: string;
        /** "1" if the view contains "Title" field, otherwise not defined. */
        HasTitle: string;
        HttpVDir: string;
        /** Either "0" or "1" */
        InplaceSearchEnabled: string;
        /** Either "0" or "1" */
        IsDocLib: string;
        /** e.g. "1033" */
        LCID: string;
        /** Either "0" or "1" */
        ListRight_AddListItems: string;
        NoListItem: string;
        NoListItemHowTo: string;
        /** Server-relative path to the current page */
        PagePath: string;
        /** Internal name of the field inside which the hierarchy buttons are displayed */
        ParentHierarchyDisplayField: string;
        PresenceAlt: string;
        /** Represents SPList.RootFolder.Properties. Exists only if SPList.FetchPropertyBagForListView property is set to true. */
        PropertyBag: { [key: string]: string; };
        /** Either "True" or "False" */
        RenderSaveAsNewViewButton: string;
        /** Either "True" or "False" */
        RenderViewSelectorPivotMenu: string;
        /** Either "True" or "False" */
        RenderViewSelectorPivotMenuAsync: string;
        /** Query string parameters that specify GUID of the current view and the current root folder */
        RootFolderParam: string;
        SelectedID: string; // number
        ShowWebPart: string;
        /** Either "1" or undefined. */
        StrikeThroughOnCompletedEnabled: string;
        /** Either "0" or "1" */
        TabularView: string;
        Toolbar: string;
        UIVersion: string; // number
        Userid: string; // number
        UserVanilla: any;
        /** Server relative path to "/_layouts/userdisp.aspx" in the current web */
        UserDispUrl: string;
        /** Either "1" or "" */
        UseParentHierarchy: string;
        /** Guid of the view */
        View: string;
        /** JSON string */
        ViewSelectorPivotMenuOptions: string;
        /** Query string parameters that specify current root folder (RootFolder) and folder content type id (FolderCTID) */
        ViewSelector_ViewParameters: string;
    }
    export interface ListData_InView {
        FilterLink: string;
        FilterFields: string;
        FirstRow: number;
        /** Either "0" or "1" */
        ForceNoHierarchy: string;
        HierarchyHasIndention: string;
        /** Link to the previous page (not defined if not available) */
        PrevHref: string;
        /** Link to the next page  (not defined if not available) */
        NextHref: string;
        SortField: string;
        SortDir: string;
        LastRow: number;
        Row: Item[];
    }
    export interface RenderContext_GroupInView extends RenderContext_InView {
        CurrentGroupIdx: number;
        CurrentGroup: Group;
        CurrentItems: Item[];
    }
    export interface RenderContext_InView extends RenderContext {
        AllowCreateFolder: bool;
        AllowGridMode: bool;
        BasePermissions: { [PermissionName: string]: bool; }; // SP.BasePermissions?
        bInitialRender: bool;
        CanShareLinkForNewDocument: bool;
        CascadeDeleteWarningMessage: string;
        clvp: HTMLElement; // not in View
        ContentTypesEnabled: bool;
        ctxId: number;
        ctxType: any; // not in View
        CurrentUserId: number;
        CurrentUserIsSiteAdmin: bool;
        dictSel: any;
        /** Absolute path for the list display form */
        displayFormUrl: string;
        /** Absolute path for the list edit form */
        editFormUrl: string;
        EnableMinorVersions: bool;
        ExternalDataList: bool;
        enteringGridMode: bool;
        existingServerFilterHash: any;
        HasRelatedCascadeLists: number;
        heroId: string; // e.g. "idHomePageNewItem"
        HttpPath: string;
        HttpRoot: string;
        imagesPath: string;
        inGridFullRender: any; // not in View
        inGridMode: bool;
        IsAppWeb: bool;
        IsClientRendering: bool;
        isForceCheckout: bool;
        isModerated: bool;
        isPortalTemplate: any;
        isWebEditorPreview: number;
        isVersions: number;
        isXslView: bool;
        LastRowIndexSelected: any; // not in View
        LastSelectableRowIdx: any;
        LastSelectedItemId: any; // not in View
        leavingGridMode: bool;
        listBaseType: number;
        ListData: ListData_InView;
        ListDataJSONItemsKey: string; // ="Row"
        /** Guid of the list */
        listName: string;
        ListSchema: ListSchema_InView;
        listTemplate: string;
        ListTitle: string;
        listUrlDir: string;
        loadingAsyncData: bool;
        ModerationStatus: number;
        NavigateForFormsPages: bool;
        /** Absolute path for the list new form */
        newFormUrl: string;
        NewWOPIDocumentEnabled: any;
        NewWOPIDocumentUrl: any;
        noGroupCollapse: bool;
        OfficialFileName: string;
        OfficialFileNames: string;
        overrideDeleteConfirmation: string; // not in View
        overrideFilterQstring: string; // not in View
        PortalUrl: string;
        queryString: any;
        recursiveView: bool;
        /** either 1 or 0 */
        RecycleBinEnabled: number;
        RegionalSettingsTimeZoneBias: string;
        rootFolder: string;
        rootFolderForDisplay: any;
        RowFocusTimerID: any;
        SelectAllCbx: any;
        SendToLocationName: string;
        SendToLocationUrl: string;
        serverUrl: any;
        SiteTitle: string;
        StateInitDone: bool;
        TableCbxFocusHandler: any;
        TableMouseOverHandler: any;
        TotalListItems: any;
        verEnabled: number;
        /** Guid of the view. */
        view: string;
        viewTitle: string;
        WorkflowAssociated: bool;
        wpq: string;
        WriteSecurity: string;
    }
    export interface RenderContext_ItemInView extends RenderContext_InView {
        CurrentItem: Item;
        CurrentItemIdx: number;
    }
    export interface RenderContext_FieldInView extends RenderContext_ItemInView {
        /** If in grid mode (context.inGridMode == true), cast to FieldSchema_InForm, otherwise cast to FieldSchema_InView */
        CurrentFieldSchema: any;
        CurrentFieldValue: any;
        FieldControlsModes: { [fieldInternalName: string]: ClientControlMode; };
        FormContext: any;
        FormUniqueId: string;
    }

    export interface Item {
        [fieldInternalName: string]: any;
    }
    export interface Group {
        Items: Item[];
    }

    export interface RenderContext {
        BaseViewID: number;
        ControlMode: ClientControlMode;
        CurrentCultureName: string;
        CurrentLanguage: number;
        CurrentSelectedItems: any;
        CurrentUICultureName: string;
        ListTemplateType: number;
        OnPostRender: any;
        OnPreRender: any;
        onRefreshFailed: any;
        RenderBody: (renderContext: RenderContext) => string;
        RenderFieldByName: (renderContext: RenderContext) => string;
        RenderFields: (renderContext: RenderContext) => string;
        RenderFooter: (renderContext: RenderContext) => string;
        RenderGroups: (renderContext: RenderContext) => string;
        RenderHeader: (renderContext: RenderContext) => string;
        RenderItems: (renderContext: RenderContext) => string;
        RenderView: (renderContext: RenderContext) => string;
        SiteClientTag: string;
        Templates: TemplateOverrides;
    }

    export interface SingleTemplateCallback {
        /** Must return null in order to fall back to a more common template or to a system default template */
        (renderContext: RenderContext_InView): string;
    }
    export interface GroupCallback {
        /** Must return null in order to fall back to a more common template or to a system default template */
        (renderContext: RenderContext_GroupInView): string;
    }
    export interface ItemCallback {
        /** Must return null in order to fall back to a more common template or to a system default template */
        (renderContext: RenderContext_ItemInView): string;
    }
    export interface FieldInFormCallback {
        /** Must return null in order to fall back to a more common template or to a system default template */
        (renderContext: RenderContext_FieldInForm): string;
    }
    export interface FieldInViewCallback {
        /** Must return null in order to fall back to a more common template or to a system default template */
        (renderContext: RenderContext_FieldInView): string;
    }

    export interface FieldTemplateOverrides {
        /** Defines templates for rendering the field on a display form. */
        DisplayForm?: FieldInFormCallback;
        /** Defines templates for rendering the field on an edit form. */
        EditForm?: FieldInFormCallback;
        /** Defines templates for rendering the field on a new form. */
        NewForm?: FieldInFormCallback;
        /** Defines templates for rendering the field on a list view. */
        View?: FieldInViewCallback;
    }

    export interface FieldTemplateMap {
        [fieldInternalName: string]: FieldTemplateOverrides;
    }

    export interface TemplateOverrides {
        View?: (renderContext: any) => string; // TODO: determine appropriate context type and purpose of this template
        Body?: (renderContext: any) => string; // TODO: determine appropriate context type and purpose of this template 
        /** Defines templates for rendering groups (aggregations). */
        Group?: GroupCallback;
        /** Defines templates for list items rendering. */
        Item?: ItemCallback;
        /** Defines template for rendering list view header.
			Can be either string or SingleTemplateCallback */
        Header?: SingleTemplateCallback;
        /** Defines template for rendering list view footer.
			Can be either string or SingleTemplateCallback */
        Footer?: SingleTemplateCallback;
        /** Defines templates for fields rendering. The field is specified by it's internal name. */
        Fields: FieldTemplateMap;
    }
    export interface TemplateOverridesOptions {
        /** Template overrides */
        Templates?: TemplateOverrides;

        /** �allbacks called before rendering starts. Can be function (ctx: RenderContext) => void or array of functions.*/
        OnPreRender?: any;

        /** �allbacks called after rendered html inserted into DOM. Can be function (ctx: RenderContext) => void or array of functions.*/
        OnPostRender?: any;

        /** View style (SPView.StyleID) for which the templates should be applied. 
            If not defined, the templates will be applied only to default view style. */
        ViewStyle?: number;
        /** List template type (SPList.BaseTemplate) for which the template should be applied. 
            If not defined, the templates will be applied to all lists. */
        ListTemplateType?: number;
        /** Base view ID (SPView.BaseViewID) for which the template should be applied.
            If not defined, the templates will be applied to all views. */
        BaseViewID?: number;
    }
    export class TemplateManager {
        static RegisterTemplateOverrides(renderCtx: TemplateOverridesOptions): void;
    }

    export interface ClientUserValue {
        lookupId: number;
        lookupValue: string;
        displayStr: string;
        email: string;
        sip: string;
        title: string;
        picture: string;
        department: string;
        jobTitle: string;
    }
    export interface ClientLookupValue {
        LookupId: number;
        LookupValue: string;
    }
    export interface ClientUrlValue {
        URL: string;
        Description: string;
    }
    export class Utility {
        static ComputeRegisterTypeInfo(renderCtx: TemplateOverridesOptions): any;
        static ControlModeToString(mode: SPClientTemplates.ClientControlMode): string;
        static FileSystemObjectTypeToString(fileSystemObjectType: SPClientTemplates.FileSystemObjectType): string;
        static ChoiceFormatTypeToString(fileSystemObjectType: SPClientTemplates.ChoiceFormatType): string;
        static RichTextModeToString(fileSystemObjectType: SPClientTemplates.RichTextMode): string;
        static IsValidControlMode(mode: number): bool;
        /** Removes leading and trailing spaces */
        static Trim(str: string): string;
        /** Creates SP.ClientContext based on the specified Web URL. If the SP.Runtime.js script is not loaded, returns null */
        static InitContext(webUrl: string): SP.ClientContext;
        static GetControlOptions(control: HTMLElement): any;
        static TryParseInitialUserValue(userStr: string): ClientUserValue[];
        /** Tries to resolve user names from string. Pushes either ClientUserValue (if resolved successfully) or original string (if not) to the resulting array. */
        static TryParseUserControlValue(userStr: string, separator: string): any[];
        static GetPropertiesFromPageContextInfo(context: RenderContext): void;
        /** Replaces tokens "~site/", "~sitecollection/", "~sitecollectionmasterpagegallery", "{lcid}", "{locale}" and "{siteclienttag}" with appropriate context values */
        static ReplaceUrlTokens(tokenUrl: string): string;
        static ParseLookupValue(valueStr: string): ClientLookupValue;
        static ParseMultiLookupValues(valueStr: string): ClientLookupValue[];
        /** Represents lookup values array in some strange format */
        static BuildLookupValuesAsString(choiceArray: ClientLookupValue[], isMultiLookup: bool, setGroupDesc: bool): string;
        static ParseURLValue(value: string): ClientUrlValue;
        static GetFormContextForCurrentField(context: RenderContext_Form): any; // returns ClientFormContext from clientforms.js
    }

}

declare function GenerateIID(renderCtx: SPClientTemplates.RenderContext_ItemInView): string;
declare function GenerateIIDForListItem(renderCtx: SPClientTemplates.RenderContext_InView, listItem: SPClientTemplates.Item): string;



declare module Sys {
    export class EventArgs {
        static Empty: Sys.EventArgs;
    }
    export class StringBuilder {
        /** Appends a string to the string builder */
        append(s: string): void;
        /** Appends a line to the string builder */
        appendLine(s: string): void;
        /** Clears the contents of the string builder */
        clear(): void;
        /** Indicates wherever the string builder is empty */
        isEmpty(): bool;
        /** Gets the contents of the string builder as a string */
        toString(): string;
    }
    export class Component {
        get_id(): string;
        static create(type: Component, properties?: any, events?: any, references?: any, element?: Node);
        initialize(): void;
        updated(): void;
    }
    declare module UI {
        export class Control { }
        export class DomEvent {
            static addHandler(element: HTMLElement, eventName: string, handler: (e: Event) => void );
            static removeHandler(element: HTMLElement, eventName: string, handler: (e: Event) => void );
        }
    }
    declare module Net {
        export class WebRequest { }
        export class WebRequestExecutor { }
    }
    declare interface IDisposable {
        dispose(): void;
    }

}

declare var $get: { (id: string): HTMLElement; };
declare var $addHandler: { (element: HTMLElement, eventName: string, handler: (e: Event) => void ): void; };
declare var $removeHandler: { (element: HTMLElement, eventName: string, handler: (e: Event) => void ): void; };


declare interface IEnumerator {
    get_current(): any;
    moveNext(): bool;
    reset(): void;
}

declare interface IEnumerable {
    getEnumerator(): IEnumerator;
}

declare module SP {
    export class ScriptUtility {
        static isNullOrEmptyString(str: string): bool;
        static isNullOrUndefined(obj: any): bool;
        static isUndefined(obj: any): bool;
        static truncateToInt(n: number): number;
    }
    export class Guid {
        constructor(guidText: string);
        static get_empty(): SP.Guid;
        static newGuid(): SP.Guid;
        static isValid(uuid: string): bool;
        toString(): string;
        toString(format: string): string;
        equals(uuid: SP.Guid): bool;
        toSerialized(): string;
    }
    /** Specifies permissions that are used to define user roles. Represents SPBasePermissions class. */
    export enum PermissionKind {
        /** Has no permissions on the Web site. Not available through the user interface. */
        emptyMask,
        /** View items in lists, documents in document libraries, and view Web discussion comments. */
        viewListItems,
        /** Add items to lists, add documents to document libraries, and add Web discussion comments. */
        addListItems,
        /** Edit items in lists, edit documents in document libraries, edit Web discussion comments in documents, and customize Web Part Pages in document libraries. */
        editListItems,
        /** Delete items from a list, documents from a document library, and Web discussion comments in documents. */
        deleteListItems,
        /** Approve a minor version of a list item or document. */
        approveItems,
        /** View the source of documents with server-side file handlers. */
        openItems,
        /** View past versions of a list item or document. */
        viewVersions,
        /** Delete past versions of a list item or document. */
        deleteVersions,
        /** Discard or check in a document which is checked out to another user. */
        cancelCheckout,
        /** Create, change, and delete personal views of lists. */
        managePersonalViews,
        /** Create and delete lists, add or remove columns in a list, and add or remove public views of a list. */
        manageLists,
        /** View forms, views, and application pages, and enumerate lists. */
        viewFormPages,
        /** Make content of a list or document library retrieveable for anonymous users through SharePoint search. The list permissions in the site do not change.  */
        anonymousSearchAccessList,
        /** Allow users to open a Web site, list, or folder to access items inside that container. */
        open,
        /** View pages in a Web site. */
        viewPages,
        /** Add, change, or delete HTML pages or Web Part Pages, and edit the Web site using a SharePoint Foundation?compatible editor. */
        addAndCustomizePages,
        /** Apply a theme or borders to the entire Web site. */
        applyThemeAndBorder,
        /** Apply a style sheet (.css file) to the Web site. */
        applyStyleSheets,
        /** View reports on Web site usage. */
        viewUsageData,
        /** Create a Web site using Self-Service Site Creation. */
        createSSCSite,
        /** Create subsites such as team sites, Meeting Workspace sites, and Document Workspace sites.  */
        manageSubwebs,
        /** Create a group of users that can be used anywhere within the site collection. */
        createGroups,
        /** Create and change permission levels on the Web site and assign permissions to users and groups. */
        managePermissions,
        /** Enumerate files and folders in a Web site using Microsoft Office SharePoint Designer 2007 and WebDAV interfaces. */
        browseDirectories,
        /** View information about users of the Web site. */
        browseUserInfo,
        /** Add or remove personal Web Parts on a Web Part Page. */
        addDelPrivateWebParts,
        /** Update Web Parts to display personalized information. */
        updatePersonalWebParts,
        /** Grant the ability to perform all administration tasks for the Web site as well as manage content. Activate, deactivate, or edit properties of Web site scoped Features through the object model or through the user interface (UI). When granted on the root Web site of a site collection, activate, deactivate, or edit properties of site collection scoped Features through the object model. To browse to the Site Collection Features page and activate or deactivate site collection scoped Features through the UI, you must be a site collection administrator. */
        manageWeb,
        /** Content of lists and document libraries in the Web site will be retrieveable for anonymous users through SharePoint search if the list or document library has AnonymousSearchAccessList set.  */
        anonymousSearchAccessWebLists,
        /** Use features that launch client applications; otherwise, users must work on documents locally and upload changes.  */
        useClientIntegration,
        /** Use SOAP, WebDAV, or Microsoft Office SharePoint Designer 2007 interfaces to access the Web site. */
        useRemoteAPIs,
        /** Manage alerts for all users of the Web site. */
        manageAlerts,
        /** Create e-mail alerts. */
        createAlerts,
        /** Allows a user to change his or her user information, such as adding a picture. */
        editMyUserInfo,
        /** Enumerate permissions on the Web site, list, folder, document, or list item. */
        enumeratePermissions,
        /** Has all permissions on the Web site. Not available through the user interface. */
        fullMask,
    }

    export class BaseCollection implements IEnumerable {
        getEnumerator(): IEnumerator;
        get_count(): number;
        itemAtIndex(index: number): any;
        constructor();
    }
    export interface IFromJson {
        fromJson(initValue: any): void;
        customFromJson(initValue: any): bool;
    }
    export class Base64EncodedByteArray {
        constructor();
        constructor(base64Str: string);
        get_length(): number;
        toBase64String(): string;
        append(b: any): void;
        getByteAt(index: number): any;
        setByteAt(index: number, b: any): void;
    }
    export class ConditionalScopeBase {
        startScope(): any;
        startIfTrue(): any;
        startIfFalse(): any;
        get_testResult(): bool;
        fromJson(initValue: any): void;
        customFromJson(initValue: any): bool;
    }
    export class ClientObjectPropertyConditionalScope extends SP.ConditionalScopeBase {
        constructor(clientObject: SP.ClientObject, propertyName: string, comparisonOperator: string, valueToCompare: any);
        constructor(clientObject: SP.ClientObject, propertyName: string, comparisonOperator: string, valueToCompare: any, allowAllActions: bool);
    }
    export class ClientResult {
        get_value(): any;
        setValue(value: any): void;
        constructor();
    }
    export class BooleanResult {
        get_value(): bool;
        constructor();
    }
    export class CharResult {
        get_value(): any;
        constructor();
    }
    export class IntResult {
        get_value(): number;
        constructor();
    }
    export class DoubleResult {
        get_value(): number;
        constructor();
    }
    export class StringResult {
        get_value(): string;
        constructor();
    }
    export class DateTimeResult {
        get_value(): Date;
        constructor();
    }
    export class GuidResult {
        get_value(): SP.Guid;
        constructor();
    }
    export class JsonObjectResult {
        get_value(): any;
        constructor();
    }
    export class ClientDictionaryResultHandler {
        constructor(dict: SP.ClientResult);
    }
    export class ClientUtility {
        static urlPathEncodeForXmlHttpRequest(url: string): string;
        static getOrCreateObjectPathForConstructor(context: SP.ClientRuntimeContext, typeId: string, args: any[]): SP.ObjectPath;
    }
    export class XElement {
        get_name(): string;
        set_name(value: string): void;
        get_attributes(): any;
        set_attributes(value: any): void;
        get_children(): any;
        set_children(value: any): void;
        constructor();
    }
    export class ClientXElement {
        get_element(): SP.XElement;
        set_element(value: SP.XElement): void;
        constructor();
    }
    export class ClientXDocument {
        get_root(): SP.XElement;
        set_root(value: SP.XElement): void;
        constructor();
    }
    export class DataConvert {
        static writePropertiesToXml(writer: SP.XmlWriter, obj: any, propNames: string[], serializationContext: SP.SerializationContext): void;
        static populateDictionaryFromObject(dict: any, parentNode: any): void;
        static fixupTypes(context: SP.ClientRuntimeContext, dict: any): void;
        static populateArray(context: SP.ClientRuntimeContext, dest: any, jsonArrayFromServer: any): void;
        static fixupType(context: SP.ClientRuntimeContext, obj: any): any;
        static writeDictionaryToXml(writer: SP.XmlWriter, dict: any, topLevelElementTagName: string, keys: any, serializationContext: SP.SerializationContext): void;
        static writeValueToXmlElement(writer: SP.XmlWriter, objValue: any, serializationContext: SP.SerializationContext): void;
        static invokeSetProperty(obj: any, propName: string, propValue: any): void;
        static invokeGetProperty(obj: any, propName: string): any;
        static specifyDateTimeKind(datetime: Date, kind: SP.DateTimeKind): void;
        static getDateTimeKind(datetime: Date): SP.DateTimeKind;
        static createUnspecifiedDateTime(year: number, month: number, day: number, hour: number, minute: number, second: number, milliseconds: number): Date;
        static createUtcDateTime(milliseconds: number): Date;
        static createLocalDateTime(milliseconds: number): Date;
    }
    export interface IWebRequestExecutorFactory {
        createWebRequestExecutor(): Sys.Net.WebRequestExecutor;
    }
    export class PageRequestFailedEventArgs extends Sys.EventArgs {
        get_executor(): Sys.Net.WebRequestExecutor;
        get_errorMessage(): string;
        get_isErrorPage(): bool;
    }
    export class PageRequestSucceededEventArgs extends Sys.EventArgs {
        get_executor(): Sys.Net.WebRequestExecutor;
    }
    export class PageRequest {
        get_request(): Sys.Net.WebRequest;
        get_url(): string;
        set_url(value: string): void;
        get_expectedContentType(): string;
        set_expectedContentType(value: string): void;
        post(body: string): void;
        get (): void;
        static doPost(url: string, body: string, expectedContentType: string, succeededHandler: (sender: any, args: SP.PageRequestSucceededEventArgs) => void , failedHandler: (sender: any, args: SP.PageRequestFailedEventArgs) => void ): void;
        static doGet(url: string, expectedContentType: string, succeededHandler: (sender: any, args: SP.PageRequestSucceededEventArgs) => void , failedHandler: (sender: any, args: SP.PageRequestFailedEventArgs) => void ): void;
        add_succeeded(value: (sender: any, args: SP.PageRequestSucceededEventArgs) => void ): void;
        remove_succeeded(value: (sender: any, args: SP.PageRequestSucceededEventArgs) => void ): void;
        add_failed(value: (sender: any, args: SP.PageRequestFailedEventArgs) => void ): void;
        remove_failed(value: (sender: any, args: SP.PageRequestFailedEventArgs) => void ): void;
        constructor();
    }
    export class ResResources {
        static getString(resourceId: string, args: any[]): string;
    }
    /** Defines a writer that provides a set of methods to append text in XML format. Use the static SP.XmlWriter.create(sb) Method to create an SP.XmlWriter object with the Sys.StringBuilder object you pass in. */
    export class XmlWriter {
        /** Creates a new instance of the XmlWriter class with the specified string builder. */
        static create(sb: Sys.StringBuilder): SP.XmlWriter;
        /** Appends a start element tag with the specified name in XML format to the object?s string builder. */
        writeStartElement(tagName: string): void;
        /** Appends an element with the specified tag name and value in XML format to the string builder. */
        writeElementString(tagName: string, value: string): void;
        /** Appends an end element tag in XML format to the object?s string builder. This method appends the end element tag ?/>? if the start element tag is not closed; otherwise, it appends a full end element tag ?</tagName>? to the string builder. */
        writeEndElement(): void;
        /** Appends an attribute with the specified name and value in XML format to the object?s string builder. */
        writeAttributeString(localName: string, value: string): void;
        /** This method only appends the name of the attribute. You can append the value of the attribute by calling the SP.XmlWriter.writeString(value) Method, and close the attribute by calling the SP.XmlWriter.writeEndAttribute() Method. */
        writeStartAttribute(localName: string): void;
        /** Appends an end of an attribute in XML format to the object?s string builder. */
        writeEndAttribute(): void;
        /** Appends the specified value for an element tag or attribute to the object?s string builder. */
        writeString(value: string): void;
        /** Appends the specified text to the object?s string builder. */
        writeRaw(xml: string): void;
        /** This member is reserved for internal use and is not intended to be used directly from your code. */
        close(): void;
    }

    export class ClientConstants {
        AddExpandoFieldTypeSuffix: string;
        Actions: string;
        ApplicationName: string;
        Body: string;
        CatchScope: string;
        ChildItemQuery: string;
        ChildItems: string;
        ConditionalScope: string;
        Constructor: string;
        Context: string;
        ErrorInfo: string;
        ErrorMessage: string;
        ErrorStackTrace: string;
        ErrorCode: string;
        ErrorTypeName: string;
        ErrorValue: string;
        ErrorDetails: string;
        ErrorTraceCorrelationId: string;
        ExceptionHandlingScope: string;
        ExceptionHandlingScopeSimple: string;
        QueryableExpression: string;
        FinallyScope: string;
        HasException: string;
        Id: string;
        Identity: string;
        IfFalseScope: string;
        IfTrueScope: string;
        IsNull: string;
        LibraryVersion: string;
        TraceCorrelationId: string;
        Count: string;
        Method: string;
        Methods: string;
        Name: string;
        Object: string;
        ObjectPathId: string;
        ObjectPath: string;
        ObjectPaths: string;
        ObjectType: string;
        ObjectIdentity: string;
        ObjectIdentityQuery: string;
        ObjectVersion: string;
        Parameter: string;
        Parameters: string;
        ParentId: string;
        Processed: string;
        Property: string;
        Properties: string;
        Query: string;
        QueryResult: string;
        Request: string;
        Results: string;
        ScalarProperty: string;
        SchemaVersion: string;
        ScopeId: string;
        SelectAll: string;
        SelectAllProperties: string;
        SetProperty: string;
        SetStaticProperty: string;
        StaticMethod: string;
        StaticProperty: string;
        SuffixChar: string;
        SuffixByte: string;
        SuffixInt16: string;
        SuffixUInt16: string;
        SuffixInt32: string;
        SuffixUInt32: string;
        SuffixInt64: string;
        SuffixUInt64: string;
        SuffixSingle: string;
        SuffixDouble: string;
        SuffixDecimal: string;
        SuffixTimeSpan: string;
        SuffixArray: string;
        Test: string;
        TryScope: string;
        Type: string;
        TypeId: string;
        Update: string;
        Version: string;
        XmlElementName: string;
        XmlElementAttributes: string;
        XmlElementChildren: string;
        XmlNamespace: string;
        FieldValuesMethodName: string;
        RequestTokenHeader: string;
        FormDigestHeader: string;
        useWebLanguageHeader: string;
        useWebLanguageHeaderValue: string;
        ClientTagHeader: string;
        TraceCorrelationIdRequestHeader: string;
        TraceCorrelationIdResponseHeader: string;
        greaterThan: string;
        lessThan: string;
        equal: string;
        notEqual: string;
        greaterThanOrEqual: string;
        lessThanOrEqual: string;
        andAlso: string;
        orElse: string;
        not: string;
        expressionParameter: string;
        expressionProperty: string;
        expressionStaticProperty: string;
        expressionMethod: string;
        expressionStaticMethod: string;
        expressionConstant: string;
        expressionConvert: string;
        expressionTypeIs: string;
        ofType: string;
        take: string;
        where: string;
        orderBy: string;
        orderByDescending: string;
        thenBy: string;
        thenByDescending: string;
        queryableObject: string;
        ServiceFileName: string;
        ServiceMethodName: string;
        fluidApplicationInitParamUrl: string;
        fluidApplicationInitParamViaUrl: string;
        fluidApplicationInitParamRequestToken: string;
        fluidApplicationInitParamFormDigestTimeoutSeconds: string;
        fluidApplicationInitParamFormDigest: string;

    }
    export class ClientSchemaVersions {
        version14: string;
        version15: string;
        currentVersion: string;
    }
    export class ClientErrorCodes {
        genericError: number;
        accessDenied: number;
        docAlreadyExists: number;
        versionConflict: number;
        listItemDeleted: number;
        invalidFieldValue: number;
        notSupported: number;
        redirect: number;
        notSupportedRequestVersion: number;
        fieldValueFailedValidation: number;
        itemValueFailedValidation: number;
    }
    export class ClientAction {
        get_id(): number;
        get_path(): SP.ObjectPath;
        get_name(): string;
    }
    export class ClientActionSetProperty extends SP.ClientAction {
        constructor(obj: SP.ClientObject, propName: string, propValue: any);
    }
    export class ClientActionSetStaticProperty extends SP.ClientAction {
        constructor(context: SP.ClientRuntimeContext, typeId: string, propName: string, propValue: any);
    }
    export class ClientActionInvokeMethod extends SP.ClientAction {
        constructor(obj: SP.ClientObject, methodName: string, parameters: any[]);
    }
    export class ClientActionInvokeStaticMethod extends SP.ClientAction {
        constructor(context: SP.ClientRuntimeContext, typeId: string, methodName: string, parameters: any[]);
    }
    export class ClientObject {
        get_context(): SP.ClientRuntimeContext;
        get_path(): SP.ObjectPath;
        get_objectVersion(): string;
        set_objectVersion(value: string): void;
        fromJson(initValue: any): void;
        customFromJson(initValue: any): bool;
        retrieve(): void;
        refreshLoad(): void;
        retrieve(propertyNames: string[]): void;
        isPropertyAvailable(propertyName: string): bool;
        isObjectPropertyInstantiated(propertyName: string): bool;
        get_serverObjectIsNull(): bool;
        get_typedObject(): SP.ClientObject;
    }
    export class ClientObjectData {
        get_properties(): any;
        get_clientObjectProperties(): any;
        get_methodReturnObjects(): any;
        constructor();
    }
    /** Provides a base class for a collection of objects on a remote client. */
    export class ClientObjectCollection extends SP.ClientObject implements IEnumerable {
        get_areItemsAvailable(): bool;
        /** Gets the data for all of the items in the collection. */
        retrieveItems(): SP.ClientObjectPrototype;
        /** Returns an enumerator that iterates through the collection. */
        getEnumerator(): IEnumerator;
        /** Returns number of items in the collection. */
        get_count(): number;
        fromJson(obj: any): void;
    }
    export class ClientObjectList extends SP.ClientObjectCollection {
        constructor(context: SP.ClientRuntimeContext, objectPath: SP.ObjectPath, childItemType: any);
        fromJson(initValue: any): void;
        customFromJson(initValue: any): bool;
    }
    export class ClientObjectPrototype {
        retrieve(): void;
        retrieve(propertyNames: string[]): void;
        retrieveObject(propertyName: string): SP.ClientObjectPrototype;
        retrieveCollectionObject(propertyName: string): SP.ClientObjectCollectionPrototype;
    }
    export class ClientObjectCollectionPrototype extends SP.ClientObjectPrototype {
        retrieveItems(): SP.ClientObjectPrototype;
    }
    export enum ClientRequestStatus {
        active,
        inProgress,
        completedSuccess,
        completedException,
    }
    export class WebRequestEventArgs extends Sys.EventArgs {
        constructor(webRequest: Sys.Net.WebRequest);
        get_webRequest(): Sys.Net.WebRequest;
    }
    export class ClientRequest {
        static get_nextSequenceId(): number;
        get_webRequest(): Sys.Net.WebRequest;
        add_requestSucceeded(value: (sender: any, args: SP.ClientRequestSucceededEventArgs) => void ): void;
        remove_requestSucceeded(value: (sender: any, args: SP.ClientRequestSucceededEventArgs) => void ): void;
        add_requestFailed(value: (sender: any, args: SP.ClientRequestFailedEventArgs) => void ): void;
        remove_requestFailed(value: (sender: any, args: SP.ClientRequestFailedEventArgs) => void ): void;
        get_navigateWhenServerRedirect(): bool;
        set_navigateWhenServerRedirect(value: bool): void;
    }
    export class ClientRequestEventArgs extends Sys.EventArgs {
        get_request(): SP.ClientRequest;
    }
    export class ClientRequestFailedEventArgs extends SP.ClientRequestEventArgs {
        constructor(request: SP.ClientRequest, message: string, stackTrace: string, errorCode: number, errorValue: string, errorTypeName: string, errorDetails: any);
        constructor(request: SP.ClientRequest, message: string, stackTrace: string, errorCode: number, errorValue: string, errorTypeName: string, errorDetails: any, errorTraceCorrelationId: string);
        get_message(): string;
        get_stackTrace(): string;
        get_errorCode(): number;
        get_errorValue(): string;
        get_errorTypeName(): string;
        get_errorDetails(): any;
        get_errorTraceCorrelationId(): string;
    }
    export class ClientRequestSucceededEventArgs extends SP.ClientRequestEventArgs {
    }
    export class ClientRuntimeContext implements Sys.IDisposable {
        constructor(serverRelativeUrlOrFullUrl: string);
        get_url(): string;
        get_viaUrl(): string;
        set_viaUrl(value: string): void;
        get_formDigestHandlingEnabled(): bool;
        set_formDigestHandlingEnabled(value: bool): void;
        get_applicationName(): string;
        set_applicationName(value: string): void;
        get_clientTag(): string;
        set_clientTag(value: string): void;
        get_webRequestExecutorFactory(): SP.IWebRequestExecutorFactory;
        set_webRequestExecutorFactory(value: SP.IWebRequestExecutorFactory): void;
        get_pendingRequest(): SP.ClientRequest;
        get_hasPendingRequest(): bool;
        add_executingWebRequest(value: (sender: any, args: SP.WebRequestEventArgs) => void ): void;
        remove_executingWebRequest(value: (sender: any, args: SP.WebRequestEventArgs) => void ): void;
        add_requestSucceeded(value: (sender: any, args: SP.ClientRequestSucceededEventArgs) => void ): void;
        remove_requestSucceeded(value: (sender: any, args: SP.ClientRequestSucceededEventArgs) => void ): void;
        add_requestFailed(value: (sender: any, args: SP.ClientRequestFailedEventArgs) => void ): void;
        remove_requestFailed(value: (sender: any, args: SP.ClientRequestFailedEventArgs) => void ): void;
        add_beginningRequest(value: (sender: any, args: SP.ClientRequestEventArgs) => void ): void;
        remove_beginningRequest(value: (sender: any, args: SP.ClientRequestEventArgs) => void ): void;
        get_requestTimeout(): number;
        set_requestTimeout(value: number): void;
        executeQueryAsync(succeededCallback: (sender: any, args: SP.ClientRequestSucceededEventArgs) => void , failedCallback: (sender: any, args: SP.ClientRequestFailedEventArgs) => void ): void;
        executeQueryAsync(succeededCallback: (sender: any, args: SP.ClientRequestSucceededEventArgs) => void ): void;
        executeQueryAsync(): void;
        get_staticObjects(): any;
        castTo(obj: SP.ClientObject, type: any): SP.ClientObject;
        addQuery(query: SP.ClientAction): void;
        addQueryIdAndResultObject(id: number, obj: any): void;
        parseObjectFromJsonString(json: string): any;
        parseObjectFromJsonString(json: string, skipTypeFixup: bool): any;
        load(clientObject: SP.ClientObject): void;
        loadQuery(clientObjectCollection: SP.ClientObjectCollection, exp: string): any;
        load(clientObject: SP.ClientObject, ...exps: string[]): void;
        loadQuery(clientObjectCollection: SP.ClientObjectCollection): any;
        get_serverSchemaVersion(): string;
        get_serverLibraryVersion(): string;
        get_traceCorrelationId(): string;
        set_traceCorrelationId(value: string): void;
        dispose(): void;
    }
    export class SimpleDataTable {
        get_rows(): any[];
        constructor();
    }
    export class ClientValueObject {
        fromJson(obj: any): void;
        customFromJson(obj: any): bool;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        customWriteToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): bool;
        get_typeId(): string;
    }
    export class ClientValueObjectCollection extends SP.ClientValueObject implements IEnumerable {
        get_count(): number;
        getEnumerator(): IEnumerator;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
    }
    export class ExceptionHandlingScope {
        constructor(context: SP.ClientRuntimeContext);
        startScope(): any;
        startTry(): any;
        startCatch(): any;
        startFinally(): any;
        get_processed(): bool;
        get_hasException(): bool;
        get_errorMessage(): string;
        get_serverStackTrace(): string;
        get_serverErrorCode(): number;
        get_serverErrorValue(): string;
        get_serverErrorTypeName(): string;
        get_serverErrorDetails(): any;
    }
    export class ObjectIdentityQuery extends SP.ClientAction {
        constructor(objectPath: SP.ObjectPath);
    }
    export class ObjectPath {
        setPendingReplace(): void;
    }
    export class ObjectPathProperty extends SP.ObjectPath {
        constructor(context: SP.ClientRuntimeContext, parent: SP.ObjectPath, propertyName: string);
    }
    export class ObjectPathStaticProperty extends SP.ObjectPath {
        constructor(context: SP.ClientRuntimeContext, typeId: string, propertyName: string);
    }
    export class ObjectPathMethod extends SP.ObjectPath {
        constructor(context: SP.ClientRuntimeContext, parent: SP.ObjectPath, methodName: string, parameters: any[]);
    }
    export class ObjectPathStaticMethod extends SP.ObjectPath {
        constructor(context: SP.ClientRuntimeContext, typeId: string, methodName: string, parameters: any[]);
    }
    export class ObjectPathConstructor extends SP.ObjectPath {
        constructor(context: SP.ClientRuntimeContext, typeId: string, parameters: any[]);
    }
    export class SerializationContext {
        addClientObject(obj: SP.ClientObject): void;
        addObjectPath(path: SP.ObjectPath): void;
    }
    export class ResourceStrings {
        argumentExceptionMessage: string;
        argumentNullExceptionMessage: string;
        cC_AppIconAlt: string;
        cC_AppWebUrlNotSet: string;
        cC_ArrowImageAlt: string;
        cC_BackToSite: string;
        cC_ErrorGettingThemeInfo: string;
        cC_HelpLinkToolTip: string;
        cC_HostSiteUrlNotSet: string;
        cC_InvalidArgument: string;
        cC_InvalidJSON: string;
        cC_InvalidOperation: string;
        cC_PlaceHolderElementNotFound: string;
        cC_RequiredScriptNotLoaded: string;
        cC_SendFeedback: string;
        cC_SettingsLinkToolTip: string;
        cC_TimeoutGettingThemeInfo: string;
        cC_Welcome: string;
        cannotFindContextWebServerRelativeUrl: string;
        collectionHasNotBeenInitialized: string;
        collectionModified: string;
        invalidUsageOfConditionalScope: string;
        invalidUsageOfConditionalScopeNowAllowedAction: string;
        invalidUsageOfExceptionHandlingScope: string;
        namedPropertyHasNotBeenInitialized: string;
        namedServerObjectIsNull: string;
        noObjectPathAssociatedWithObject: string;
        notSameClientContext: string;
        notSupportedQueryExpressionWithExpressionDetail: string;
        objectNameIdentity: string;
        objectNameMethod: string;
        objectNameProperty: string;
        objectNameType: string;
        propertyHasNotBeenInitialized: string;
        rE_BrowserBinaryDataNotSupported: string;
        rE_BrowserNotSupported: string;
        rE_CannotAccessSite: string;
        rE_CannotAccessSiteCancelled: string;
        rE_CannotAccessSiteOpenWindowFailed: string;
        rE_DismissOpenWindowMessageLinkText: string;
        rE_DomainDoesNotMatch: string;
        rE_FixitHelpMessage: string;
        rE_InvalidArgumentOrField: string;
        rE_InvalidOperation: string;
        rE_NoTrustedOrigins: string;
        rE_OpenWindowButtonText: string;
        rE_OpenWindowMessage: string;
        rE_RequestAbortedOrTimedout: string;
        rE_RequestUnexpectedResponse: string;
        rE_RequestUnexpectedResponseWithContentTypeAndStatus: string;
        requestAbortedOrTimedOut: string;
        requestEmptyQueryName: string;
        requestHasBeenExecuted: string;
        requestUnexpectedResponse: string;
        requestUnexpectedResponseWithContentTypeAndStatus: string;
        requestUnexpectedResponseWithStatus: string;
        requestUnknownResponse: string;
        serverObjectIsNull: string;
        unknownError: string;
        unknownResponseData: string;
    }
    export class RuntimeRes {
        cC_PlaceHolderElementNotFound: string;
        rE_CannotAccessSiteOpenWindowFailed: string;
        noObjectPathAssociatedWithObject: string;
        cC_TimeoutGettingThemeInfo: string;
        unknownResponseData: string;
        requestUnexpectedResponseWithStatus: string;
        objectNameProperty: string;
        requestUnknownResponse: string;
        rE_RequestUnexpectedResponseWithContentTypeAndStatus: string;
        rE_BrowserNotSupported: string;
        argumentExceptionMessage: string;
        namedServerObjectIsNull: string;
        objectNameType: string;
        requestUnexpectedResponseWithContentTypeAndStatus: string;
        cC_InvalidJSON: string;
        invalidUsageOfExceptionHandlingScope: string;
        serverObjectIsNull: string;
        cC_AppWebUrlNotSet: string;
        rE_OpenWindowMessage: string;
        argumentNullExceptionMessage: string;
        cC_HelpLinkToolTip: string;
        propertyHasNotBeenInitialized: string;
        rE_RequestAbortedOrTimedout: string;
        invalidUsageOfConditionalScope: string;
        cC_ErrorGettingThemeInfo: string;
        rE_DismissOpenWindowMessageLinkText: string;
        rE_CannotAccessSiteCancelled: string;
        objectNameIdentity: string;
        cC_HostSiteUrlNotSet: string;
        rE_FixitHelpMessage: string;
        notSupportedQueryExpressionWithExpressionDetail: string;
        rE_RequestUnexpectedResponse: string;
        rE_DomainDoesNotMatch: string;
        cC_BackToSite: string;
        rE_NoTrustedOrigins: string;
        rE_InvalidOperation: string;
        collectionModified: string;
        cC_Welcome: string;
        cC_AppIconAlt: string;
        cC_SendFeedback: string;
        cC_ArrowImageAlt: string;
        cC_InvalidOperation: string;
        requestAbortedOrTimedOut: string;
        invalidUsageOfConditionalScopeNowAllowedAction: string;
        cannotFindContextWebServerRelativeUrl: string;
        rE_OpenWindowButtonText: string;
        unknownError: string;
        cC_InvalidArgument: string;
        rE_InvalidArgumentOrField: string;
        cC_SettingsLinkToolTip: string;
        requestEmptyQueryName: string;
        cC_RequiredScriptNotLoaded: string;
        rE_CannotAccessSite: string;
        notSameClientContext: string;
        requestUnexpectedResponse: string;
        rE_BrowserBinaryDataNotSupported: string;
        collectionHasNotBeenInitialized: string;
        namedPropertyHasNotBeenInitialized: string;
        requestHasBeenExecuted: string;
        objectNameMethod: string;
    }
    export class ParseJSONUtil {
        static parseObjectFromJsonString(json: string): any;
        static validateJson(text: string): bool;
    }
    export enum DateTimeKind {
        unspecified,
        utc,
        local,
    }
    export class OfficeVersion {
        majorBuildVersion: number;
        previousMajorBuildVersion: number;
        majorVersion: string;
        previousVersion: string;
        majorVersionDotZero: string;
        previousVersionDotZero: string;
        assemblyVersion: string;
        wssMajorVersion: string;
    }
    export class ClientContext extends SP.ClientRuntimeContext {
        constructor(serverRelativeUrlOrFullUrl: string);
        static get_current(): SP.ClientContext;
        constructor();
        get_web(): SP.Web;
        get_site(): SP.Site;
        get_serverVersion(): string;
    }
    export enum ULSTraceLevel {
        verbose,
    }
    /** Provides a Unified Logging Service (ULS) that monitors log messages. */
    export class ULS {
        /** Gets a value that indicates whether the Unified Logging Service (ULS) is enabled. */
        static get_enabled(): bool;
        /** Sets a value that indicates whether the Unified Logging Service (ULS) is enabled. */
        static set_enabled(value: bool): void;
        /** Logs the specified debug message.
            This method logs the message with a time stamp. If any log messages are pending, this method also logs them. If the message cannot be logged, the message is added to the list of pending log messages. */
        static log(debugMessage: string): void;
        /** Increases the indentation for subsequent log messages. */
        static increaseIndent(): void;
        /** Decreases the indentation for subsequent log messages. */
        static decreaseIndent(): void;
        /** Traces when the function was entered. */
        static traceApiEnter(functionName: string, args: any[]): void;
        /** Traces when the function was entered. */
        static traceApiEnter(functionName: string): void;
        /** Traces when the function has finished. */
        static traceApiLeave(): void;
    }
    export class AccessRequests {
        static changeRequestStatus(context: SP.ClientRuntimeContext, itemId: number, newStatus: number, convStr: string, permType: string, permissionLevel: number): void;
        static changeRequestStatusBulk(context: SP.ClientRuntimeContext, requestIds: number[], newStatus: number): void;
    }
    export enum AddFieldOptions {
        defaultValue,
        addToDefaultContentType,
        addToNoContentType,
        addToAllContentTypes,
        addFieldInternalNameHint,
        addFieldToDefaultView,
        addFieldCheckDisplayName,
    }
    export class AlternateUrl extends SP.ClientObject {
        get_uri(): string;
        get_urlZone(): SP.UrlZone;
    }
    export class App extends SP.ClientObject {
        get_assetId(): string;
        get_contentMarket(): string;
        get_versionString(): string;
    }
    export class AppCatalog {
        static getAppInstances(context: SP.ClientRuntimeContext, web: SP.Web): SP.ClientObjectList;
        static getDeveloperSiteAppInstancesByIds(context: SP.ClientRuntimeContext, site: SP.Site, appInstanceIds: SP.Guid[]): SP.ClientObjectList;
        static isAppSideloadingEnabled(context: SP.ClientRuntimeContext): SP.BooleanResult;
    }
    export class AppContextSite extends SP.ClientObject {
        constructor(context: SP.ClientRuntimeContext, siteUrl: string);
        get_site(): SP.Site;
        get_web(): SP.Web;
        static newObject(context: SP.ClientRuntimeContext, siteUrl: string): SP.AppContextSite;
    }
    export class AppInstance extends SP.ClientObject {
        get_appPrincipalId(): string;
        get_appWebFullUrl(): string;
        get_id(): SP.Guid;
        get_inError(): bool;
        get_startPage(): string;
        get_remoteAppUrl(): string;
        get_settingsPageUrl(): string;
        get_siteId(): SP.Guid;
        get_status(): SP.AppInstanceStatus;
        get_title(): string;
        get_webId(): SP.Guid;
        getErrorDetails(): SP.ClientObjectList;
        uninstall(): SP.GuidResult;
        upgrade(appPackageStream: any[]): void;
        cancelAllJobs(): SP.BooleanResult;
        install(): SP.GuidResult;
        getPreviousAppVersion(): SP.App;
        retryAllJobs(): void;
    }
    export class AppInstanceErrorDetails extends SP.ClientObject {
        get_correlationId(): SP.Guid;
        set_correlationId(value: SP.Guid): void;
        get_errorDetail(): string;
        get_errorType(): SP.AppInstanceErrorType;
        set_errorType(value: SP.AppInstanceErrorType): void;
        get_errorTypeName(): string;
        get_exceptionMessage(): string;
        get_source(): SP.AppInstanceErrorSource;
        set_source(value: SP.AppInstanceErrorSource): void;
        get_sourceName(): string;
    }
    export enum AppInstanceErrorSource {
        common,
        appWeb,
        parentWeb,
        remoteWebSite,
        database,
        officeExtension,
        eventCallouts,
        finalization,
    }
    export enum AppInstanceErrorType {
        transient,
        configuration,
        app,
    }
    export enum AppInstanceStatus {
        invalidStatus,
        installing,
        canceling,
        uninstalling,
        installed,
        upgrading,
        initialized,
        upgradeCanceling,
        disabling,
        disabled,
    }
    export class AppLicense extends SP.ClientValueObject {
        get_rawXMLLicenseToken(): string;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class AppLicenseCollection extends SP.ClientValueObjectCollection {
        add(item: SP.AppLicense): void;
        get_item(index: number): SP.AppLicense;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export enum AppLicenseType {
        perpetualMultiUser,
        perpetualAllUsers,
        trialMultiUser,
        trialAllUsers,
    }
    export class Attachment extends SP.ClientObject {
        get_fileName(): string;
        get_serverRelativeUrl(): string;
        deleteObject(): void;
    }
    export class AttachmentCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.Attachment;
        get_item(index: number): SP.Attachment;
        getByFileName(fileName: string): SP.Attachment;
    }
    export class AttachmentCreationInformation extends SP.ClientValueObject {
        get_contentStream(): any[];
        set_contentStream(value: any[]): void;
        get_fileName(): string;
        set_fileName(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class BasePermissions extends SP.ClientValueObject {
        set (perm: SP.PermissionKind): void;
        clear(perm: SP.PermissionKind): void;
        clearAll(): void;
        has(perm: SP.PermissionKind): bool;
        equals(perm: SP.BasePermissions): bool;
        hasPermissions(high: number, low: number): bool;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    /** Specifies the base type for a list. */
    export enum BaseType {
        none,
        genericList,
        documentLibrary,
        unused,
        discussionBoard,
        survey,
        issue,
    }
    export enum BrowserFileHandling {
        permissive,
        strict,
    }
    export enum CalendarType {
        none,
        gregorian,
        japan,
        taiwan,
        korea,
        hijri,
        thai,
        hebrew,
        gregorianMEFrench,
        gregorianArabic,
        gregorianXLITEnglish,
        gregorianXLITFrench,
        koreaJapanLunar,
        chineseLunar,
        sakaEra,
        umAlQura,
    }
    /** Specifies a Collaborative Application Markup Language (CAML) query on a list. */
    export class CamlQuery extends SP.ClientValueObject {
        constructor();
        /** This method creates a Collaborative Application Markup Language (CAML) string 
            that can be used to recursively get all of the items in a list, including 
            the items in the subfolders. */
        static createAllItemsQuery(): SP.CamlQuery;
        /** This method creates a Collaborative Application Markup Language (CAML) string 
            that can be used to recursively get all of the folders in a list, including 
            the subfolders. */
        static createAllFoldersQuery(): SP.CamlQuery;
        /** Returns true if the query returns dates in Coordinated Universal Time (UTC) format. */
        get_datesInUtc(): bool;
        /** Sets a value that indicates whether the query returns dates in Coordinated Universal Time (UTC) format. */
        set_datesInUtc(value: bool): void;
        /** Server relative URL of a list folder from which results will be returned. */
        get_folderServerRelativeUrl(): string;
        /** Sets a value that specifies the server relative URL of a list folder from which results will be returned. */
        set_folderServerRelativeUrl(value: string): void;
        get_listItemCollectionPosition(): SP.ListItemCollectionPosition;
        /** Sets a value that specifies the information required to get the next page of data for the list view. */
        set_listItemCollectionPosition(value: SP.ListItemCollectionPosition): void;
        /** Gets value that specifies the XML schema that defines the list view. */
        get_viewXml(): string;
        /** Sets value that specifies the XML schema that defines the list view. It must be null, empty, or an XML fragment that conforms to the ViewDefinition type.  */
        set_viewXml(value: string): void;
        /** This member is reserved for internal use and is not intended to be used directly from your code. */
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
    }
    export class Change extends SP.ClientObject {
        get_changeToken(): SP.ChangeToken;
        get_changeType(): SP.ChangeType;
        get_siteId(): SP.Guid;
        get_time(): Date;
    }
    export class ChangeAlert extends SP.Change {
        get_alertId(): SP.Guid;
        get_webId(): SP.Guid;
    }
    export class ChangeCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.Change;
        get_item(index: number): SP.Change;
    }
    export class ChangeContentType extends SP.Change {
        get_contentTypeId(): SP.ContentTypeId;
        get_webId(): SP.Guid;
    }
    export class ChangeField extends SP.Change {
        get_fieldId(): SP.Guid;
        get_webId(): SP.Guid;
    }
    export class ChangeFile extends SP.Change {
        get_uniqueId(): SP.Guid;
        get_webId(): SP.Guid;
    }
    export class ChangeFolder extends SP.Change {
        get_uniqueId(): SP.Guid;
        get_webId(): SP.Guid;
    }
    export class ChangeGroup extends SP.Change {
        get_groupId(): number;
    }
    export class ChangeItem extends SP.Change {
        get_itemId(): number;
        get_listId(): SP.Guid;
        get_webId(): SP.Guid;
    }
    export class ChangeList extends SP.Change {
        get_listId(): SP.Guid;
        get_webId(): SP.Guid;
    }
    export class ChangeLogItemQuery extends SP.ClientValueObject {
        get_changeToken(): string;
        set_changeToken(value: string): void;
        get_contains(): string;
        set_contains(value: string): void;
        get_query(): string;
        set_query(value: string): void;
        get_queryOptions(): string;
        set_queryOptions(value: string): void;
        get_rowLimit(): string;
        set_rowLimit(value: string): void;
        get_viewFields(): string;
        set_viewFields(value: string): void;
        get_viewName(): string;
        set_viewName(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class ChangeQuery extends SP.ClientValueObject {
        constructor();
        constructor(allChangeObjectTypes: bool, allChangeTypes: bool);
        get_add(): bool;
        set_add(value: bool): void;
        get_alert(): bool;
        set_alert(value: bool): void;
        get_changeTokenEnd(): SP.ChangeToken;
        set_changeTokenEnd(value: SP.ChangeToken): void;
        get_changeTokenStart(): SP.ChangeToken;
        set_changeTokenStart(value: SP.ChangeToken): void;
        get_contentType(): bool;
        set_contentType(value: bool): void;
        get_deleteObject(): bool;
        set_deleteObject(value: bool): void;
        get_field(): bool;
        set_field(value: bool): void;
        get_file(): bool;
        set_file(value: bool): void;
        get_folder(): bool;
        set_folder(value: bool): void;
        get_group(): bool;
        set_group(value: bool): void;
        get_groupMembershipAdd(): bool;
        set_groupMembershipAdd(value: bool): void;
        get_groupMembershipDelete(): bool;
        set_groupMembershipDelete(value: bool): void;
        get_item(): bool;
        set_item(value: bool): void;
        get_list(): bool;
        set_list(value: bool): void;
        get_move(): bool;
        set_move(value: bool): void;
        get_navigation(): bool;
        set_navigation(value: bool): void;
        get_rename(): bool;
        set_rename(value: bool): void;
        get_restore(): bool;
        set_restore(value: bool): void;
        get_roleAssignmentAdd(): bool;
        set_roleAssignmentAdd(value: bool): void;
        get_roleAssignmentDelete(): bool;
        set_roleAssignmentDelete(value: bool): void;
        get_roleDefinitionAdd(): bool;
        set_roleDefinitionAdd(value: bool): void;
        get_roleDefinitionDelete(): bool;
        set_roleDefinitionDelete(value: bool): void;
        get_roleDefinitionUpdate(): bool;
        set_roleDefinitionUpdate(value: bool): void;
        get_securityPolicy(): bool;
        set_securityPolicy(value: bool): void;
        get_site(): bool;
        set_site(value: bool): void;
        get_systemUpdate(): bool;
        set_systemUpdate(value: bool): void;
        get_update(): bool;
        set_update(value: bool): void;
        get_user(): bool;
        set_user(value: bool): void;
        get_view(): bool;
        set_view(value: bool): void;
        get_web(): bool;
        set_web(value: bool): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
    }
    export class ChangeSite extends SP.Change {
    }
    export class ChangeToken extends SP.ClientValueObject {
        get_stringValue(): string;
        set_stringValue(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export enum ChangeType {
        noChange,
        add,
        update,
        deleteObject,
        rename,
        moveAway,
        moveInto,
        restore,
        roleAdd,
        roleDelete,
        roleUpdate,
        assignmentAdd,
        assignmentDelete,
        memberAdd,
        memberDelete,
        systemUpdate,
        navigation,
        scopeAdd,
        scopeDelete,
        listContentTypeAdd,
        listContentTypeDelete,
    }
    export class ChangeUser extends SP.Change {
        get_activate(): bool;
        get_userId(): number;
    }
    export class ChangeView extends SP.Change {
        get_viewId(): SP.Guid;
        get_listId(): SP.Guid;
        get_webId(): SP.Guid;
    }
    export class ChangeWeb extends SP.Change {
        get_webId(): SP.Guid;
    }
    export enum CheckinType {
        minorCheckIn,
        majorCheckIn,
        overwriteCheckIn,
    }
    export enum CheckOutType {
        online,
        offline,
        none,
    }
    export enum ChoiceFormatType {
        dropdown,
        radioButtons,
    }
    export class CompatibilityRange extends SP.ClientObject {
    }
    export class ContentType extends SP.ClientObject {
        get_description(): string;
        set_description(value: string): void;
        get_displayFormTemplateName(): string;
        set_displayFormTemplateName(value: string): void;
        get_displayFormUrl(): string;
        set_displayFormUrl(value: string): void;
        get_documentTemplate(): string;
        set_documentTemplate(value: string): void;
        get_documentTemplateUrl(): string;
        get_editFormTemplateName(): string;
        set_editFormTemplateName(value: string): void;
        get_editFormUrl(): string;
        set_editFormUrl(value: string): void;
        get_fieldLinks(): SP.FieldLinkCollection;
        get_fields(): SP.FieldCollection;
        get_group(): string;
        set_group(value: string): void;
        get_hidden(): bool;
        set_hidden(value: bool): void;
        get_id(): SP.ContentTypeId;
        get_jSLink(): string;
        set_jSLink(value: string): void;
        get_name(): string;
        set_name(value: string): void;
        get_newFormTemplateName(): string;
        set_newFormTemplateName(value: string): void;
        get_newFormUrl(): string;
        set_newFormUrl(value: string): void;
        get_parent(): SP.ContentType;
        get_readOnly(): bool;
        set_readOnly(value: bool): void;
        get_schemaXml(): string;
        get_schemaXmlWithResourceTokens(): string;
        set_schemaXmlWithResourceTokens(value: string): void;
        get_scope(): string;
        get_sealed(): bool;
        set_sealed(value: bool): void;
        get_stringId(): string;
        get_workflowAssociations(): SP.Workflow.WorkflowAssociationCollection;
        update(updateChildren: bool): void;
        deleteObject(): void;
    }
    export class ContentTypeCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.ContentType;
        get_item(index: number): SP.ContentType;
        getById(contentTypeId: string): SP.ContentType;
        addExistingContentType(contentType: SP.ContentType): SP.ContentType;
        add(parameters: SP.ContentTypeCreationInformation): SP.ContentType;
    }
    export class ContentTypeCreationInformation extends SP.ClientValueObject {
        get_description(): string;
        set_description(value: string): void;
        get_group(): string;
        set_group(value: string): void;
        get_name(): string;
        set_name(value: string): void;
        get_parentContentType(): SP.ContentType;
        set_parentContentType(value: SP.ContentType): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class ContentTypeId extends SP.ClientValueObject {
        toString(): string;
        get_stringValue(): string;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export enum CustomizedPageStatus {
        none,
        uncustomized,
        customized,
    }
    export enum DateTimeFieldFormatType {
        dateOnly,
        dateTime,
    }
    export enum DateTimeFieldFriendlyFormatType {
        unspecified,
        disabled,
        relative,
    }
    export enum DraftVisibilityType {
        reader,
        author,
        approver,
    }
    export class EventReceiverDefinition extends SP.ClientObject {
        get_receiverAssembly(): string;
        get_receiverClass(): string;
        get_receiverId(): SP.Guid;
        get_receiverName(): string;
        get_sequenceNumber(): number;
        get_synchronization(): SP.EventReceiverSynchronization;
        get_eventType(): SP.EventReceiverType;
        get_receiverUrl(): string;
        update(): void;
        deleteObject(): void;
    }
    export class EventReceiverDefinitionCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.EventReceiverDefinition;
        get_item(index: number): SP.EventReceiverDefinition;
        getById(eventReceiverId: SP.Guid): SP.EventReceiverDefinition;
        add(eventReceiverCreationInformation: SP.EventReceiverDefinitionCreationInformation): SP.EventReceiverDefinition;
    }
    export class EventReceiverDefinitionCreationInformation extends SP.ClientValueObject {
        get_receiverAssembly(): string;
        set_receiverAssembly(value: string): void;
        get_receiverClass(): string;
        set_receiverClass(value: string): void;
        get_receiverName(): string;
        set_receiverName(value: string): void;
        get_sequenceNumber(): number;
        set_sequenceNumber(value: number): void;
        get_synchronization(): SP.EventReceiverSynchronization;
        set_synchronization(value: SP.EventReceiverSynchronization): void;
        get_eventType(): SP.EventReceiverType;
        set_eventType(value: SP.EventReceiverType): void;
        get_receiverUrl(): string;
        set_receiverUrl(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export enum EventReceiverSynchronization {
        defaultSynchronization,
        synchronous,
        asynchronous,
    }
    export enum EventReceiverType {
        invalidReceiver,
        itemAdding,
        itemUpdating,
        itemDeleting,
        itemCheckingIn,
        itemCheckingOut,
        itemUncheckingOut,
        itemAttachmentAdding,
        itemAttachmentDeleting,
        itemFileMoving,
        itemVersionDeleting,
        fieldAdding,
        fieldUpdating,
        fieldDeleting,
        listAdding,
        listDeleting,
        siteDeleting,
        webDeleting,
        webMoving,
        webAdding,
        groupAdding,
        groupUpdating,
        groupDeleting,
        groupUserAdding,
        groupUserDeleting,
        roleDefinitionAdding,
        roleDefinitionUpdating,
        roleDefinitionDeleting,
        roleAssignmentAdding,
        roleAssignmentDeleting,
        inheritanceBreaking,
        inheritanceResetting,
        workflowStarting,
        itemAdded,
        itemUpdated,
        itemDeleted,
        itemCheckedIn,
        itemCheckedOut,
        itemUncheckedOut,
        itemAttachmentAdded,
        itemAttachmentDeleted,
        itemFileMoved,
        itemFileConverted,
        itemVersionDeleted,
        fieldAdded,
        fieldUpdated,
        fieldDeleted,
        listAdded,
        listDeleted,
        siteDeleted,
        webDeleted,
        webMoved,
        webProvisioned,
        groupAdded,
        groupUpdated,
        groupDeleted,
        groupUserAdded,
        groupUserDeleted,
        roleDefinitionAdded,
        roleDefinitionUpdated,
        roleDefinitionDeleted,
        roleAssignmentAdded,
        roleAssignmentDeleted,
        inheritanceBroken,
        inheritanceReset,
        workflowStarted,
        workflowPostponed,
        workflowCompleted,
        entityInstanceAdded,
        entityInstanceUpdated,
        entityInstanceDeleted,
        appInstalled,
        appUpgraded,
        appUninstalling,
        emailReceived,
        contextEvent,
    }
    export class Feature extends SP.ClientObject {
        get_definitionId(): SP.Guid;
    }
    export class FeatureCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.Feature;
        get_item(index: number): SP.Feature;
        getById(featureId: SP.Guid): SP.Feature;
        add(featureId: SP.Guid, force: bool, featdefScope: SP.FeatureDefinitionScope): SP.Feature;
        remove(featureId: SP.Guid, force: bool): void;
    }
    export enum FeatureDefinitionScope {
        none,
        farm,
        site,
        web,
    }
    export class Field extends SP.ClientObject {
        get_canBeDeleted(): bool;
        get_defaultValue(): string;
        set_defaultValue(value: string): void;
        get_description(): string;
        set_description(value: string): void;
        get_direction(): string;
        set_direction(value: string): void;
        get_enforceUniqueValues(): bool;
        set_enforceUniqueValues(value: bool): void;
        get_entityPropertyName(): string;
        get_filterable(): bool;
        get_fromBaseType(): bool;
        get_group(): string;
        set_group(value: string): void;
        get_hidden(): bool;
        set_hidden(value: bool): void;
        get_id(): SP.Guid;
        get_indexed(): bool;
        set_indexed(value: bool): void;
        get_internalName(): string;
        get_jSLink(): string;
        set_jSLink(value: string): void;
        get_readOnlyField(): bool;
        set_readOnlyField(value: bool): void;
        get_required(): bool;
        set_required(value: bool): void;
        get_schemaXml(): string;
        set_schemaXml(value: string): void;
        get_schemaXmlWithResourceTokens(): string;
        get_scope(): string;
        get_sealed(): bool;
        get_sortable(): bool;
        get_staticName(): string;
        set_staticName(value: string): void;
        get_title(): string;
        set_title(value: string): void;
        get_fieldTypeKind(): SP.FieldType;
        set_fieldTypeKind(value: SP.FieldType): void;
        get_typeAsString(): string;
        set_typeAsString(value: string): void;
        get_typeDisplayName(): string;
        get_typeShortDescription(): string;
        get_validationFormula(): string;
        set_validationFormula(value: string): void;
        get_validationMessage(): string;
        set_validationMessage(value: string): void;
        validateSetValue(item: SP.ListItem, value: string): void;
        updateAndPushChanges(pushChangesToLists: bool): void;
        update(): void;
        deleteObject(): void;
        setShowInDisplayForm(value: bool): void;
        setShowInEditForm(value: bool): void;
        setShowInNewForm(value: bool): void;
    }
    export class FieldCalculated extends SP.Field {
        get_dateFormat(): SP.DateTimeFieldFormatType;
        set_dateFormat(value: SP.DateTimeFieldFormatType): void;
        get_formula(): string;
        set_formula(value: string): void;
        get_outputType(): SP.FieldType;
        set_outputType(value: SP.FieldType): void;
    }
    export class FieldCalculatedErrorValue extends SP.ClientValueObject {
        get_errorMessage(): string;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class FieldMultiChoice extends SP.Field {
        get_fillInChoice(): bool;
        set_fillInChoice(value: bool): void;
        get_mappings(): string;
        get_choices(): string[];
        set_choices(value: string[]): void;
    }
    export class FieldChoice extends SP.FieldMultiChoice {
        get_editFormat(): SP.ChoiceFormatType;
        set_editFormat(value: SP.ChoiceFormatType): void;
    }
    export class FieldCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.Field;
        get_item(index: number): SP.Field;
        get_schemaXml(): string;
        getByTitle(title: string): SP.Field;
        getById(id: SP.Guid): SP.Field;
        add(field: SP.Field): SP.Field;
        addDependentLookup(displayName: string, primaryLookupField: SP.Field, lookupField: string): SP.Field;
        addFieldAsXml(schemaXml: string, addToDefaultView: bool, options: SP.AddFieldOptions): SP.Field;
        getByInternalNameOrTitle(strName: string): SP.Field;
    }
    export class FieldComputed extends SP.Field {
        get_enableLookup(): bool;
        set_enableLookup(value: bool): void;
    }
    export class FieldNumber extends SP.Field {
        get_maximumValue(): number;
        set_maximumValue(value: number): void;
        get_minimumValue(): number;
        set_minimumValue(value: number): void;
    }
    export class FieldCurrency extends SP.FieldNumber {
        get_currencyLocaleId(): number;
        set_currencyLocaleId(value: number): void;
    }
    export class FieldDateTime extends SP.Field {
        get_dateTimeCalendarType(): SP.CalendarType;
        set_dateTimeCalendarType(value: SP.CalendarType): void;
        get_displayFormat(): SP.DateTimeFieldFormatType;
        set_displayFormat(value: SP.DateTimeFieldFormatType): void;
        get_friendlyDisplayFormat(): SP.DateTimeFieldFriendlyFormatType;
        set_friendlyDisplayFormat(value: SP.DateTimeFieldFriendlyFormatType): void;
    }
    export class FieldGeolocation extends SP.Field {
    }
    export class FieldGeolocationValue extends SP.ClientValueObject {
        get_altitude(): number;
        set_altitude(value: number): void;
        get_latitude(): number;
        set_latitude(value: number): void;
        get_longitude(): number;
        set_longitude(value: number): void;
        get_measure(): number;
        set_measure(value: number): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class FieldGuid extends SP.Field {
    }
    export class FieldLink extends SP.ClientObject {
        get_hidden(): bool;
        set_hidden(value: bool): void;
        get_id(): SP.Guid;
        get_name(): string;
        get_required(): bool;
        set_required(value: bool): void;
        deleteObject(): void;
    }
    export class FieldLinkCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.FieldLink;
        get_item(index: number): SP.FieldLink;
        getById(id: SP.Guid): SP.FieldLink;
        add(parameters: SP.FieldLinkCreationInformation): SP.FieldLink;
        reorder(internalNames: string[]): void;
    }
    export class FieldLinkCreationInformation extends SP.ClientValueObject {
        get_field(): SP.Field;
        set_field(value: SP.Field): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class FieldLookup extends SP.Field {
        get_allowMultipleValues(): bool;
        set_allowMultipleValues(value: bool): void;
        get_isRelationship(): bool;
        set_isRelationship(value: bool): void;
        get_lookupField(): string;
        set_lookupField(value: string): void;
        get_lookupList(): string;
        set_lookupList(value: string): void;
        get_lookupWebId(): SP.Guid;
        set_lookupWebId(value: SP.Guid): void;
        get_primaryFieldId(): string;
        set_primaryFieldId(value: string): void;
        get_relationshipDeleteBehavior(): SP.RelationshipDeleteBehaviorType;
        set_relationshipDeleteBehavior(value: SP.RelationshipDeleteBehaviorType): void;
    }
    export class FieldLookupValue extends SP.ClientValueObject {
        get_lookupId(): number;
        set_lookupId(value: number): void;
        get_lookupValue(): string;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class FieldMultiLineText extends SP.Field {
        get_allowHyperlink(): bool;
        set_allowHyperlink(value: bool): void;
        get_appendOnly(): bool;
        set_appendOnly(value: bool): void;
        get_numberOfLines(): number;
        set_numberOfLines(value: number): void;
        get_restrictedMode(): bool;
        set_restrictedMode(value: bool): void;
        get_richText(): bool;
        set_richText(value: bool): void;
        get_wikiLinking(): bool;
    }
    export class FieldRatingScale extends SP.FieldMultiChoice {
        get_gridEndNumber(): number;
        set_gridEndNumber(value: number): void;
        get_gridNAOptionText(): string;
        set_gridNAOptionText(value: string): void;
        get_gridStartNumber(): number;
        set_gridStartNumber(value: number): void;
        get_gridTextRangeAverage(): string;
        set_gridTextRangeAverage(value: string): void;
        get_gridTextRangeHigh(): string;
        set_gridTextRangeHigh(value: string): void;
        get_gridTextRangeLow(): string;
        set_gridTextRangeLow(value: string): void;
        get_rangeCount(): number;
    }
    export class FieldRatingScaleQuestionAnswer extends SP.ClientValueObject {
        get_answer(): number;
        set_answer(value: number): void;
        get_question(): string;
        set_question(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class FieldStringValues extends SP.ClientObject {
        get_fieldValues(): any;
        get_item(fieldName: string): string;
        refreshLoad(): void;
    }
    export class FieldText extends SP.Field {
        get_maxLength(): number;
        set_maxLength(value: number): void;
    }
    export enum FieldType {
        invalid,
        integer,
        text,
        note,
        dateTime,
        counter,
        choice,
        lookup,
        boolean,
        number,
        currency,
        uRL,
        computed,
        threading,
        guid,
        multiChoice,
        gridChoice,
        calculated,
        file,
        attachments,
        user,
        recurrence,
        crossProjectLink,
        modStat,
        error,
        contentTypeId,
        pageSeparator,
        threadIndex,
        workflowStatus,
        allDayEvent,
        workflowEventType,
        geolocation,
        outcomeChoice,
        maxItems,
    }
    export class FieldUrl extends SP.Field {
        get_displayFormat(): SP.UrlFieldFormatType;
        set_displayFormat(value: SP.UrlFieldFormatType): void;
    }
    export class FieldUrlValue extends SP.ClientValueObject {
        get_description(): string;
        set_description(value: string): void;
        get_url(): string;
        set_url(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class FieldUser extends SP.FieldLookup {
        get_allowDisplay(): bool;
        set_allowDisplay(value: bool): void;
        get_presence(): bool;
        set_presence(value: bool): void;
        get_selectionGroup(): number;
        set_selectionGroup(value: number): void;
        get_selectionMode(): SP.FieldUserSelectionMode;
        set_selectionMode(value: SP.FieldUserSelectionMode): void;
    }
    export enum FieldUserSelectionMode {
        peopleOnly,
        peopleAndGroups,
    }
    export class FieldUserValue extends SP.FieldLookupValue {
        static fromUser(userName: string): SP.FieldUserValue;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    /** Represents a file in a SharePoint Web site that can be a Web Part Page, an item in a document library, or a file in a folder. */
    export class File extends SP.ClientObject {
        get_author(): SP.User;
        /** Returns the user who has checked out the file. */
        get_checkedOutByUser(): SP.User;
        /** Returns the comment that was specified when the document was checked into the document library. */
        get_checkInComment(): string;
        /** The type of checkout that exists on the document. */
        get_checkOutType(): SP.CheckOutType;
        get_contentTag(): string;
        /** Gets the customization(ghost) status of the SPFile. */
        get_customizedPageStatus(): SP.CustomizedPageStatus;
        /** Gets the ETag of the file  */
        get_eTag(): string;
        /** Specifies whether the file exists  */
        get_exists(): bool;
        get_length(): number;
        get_level(): SP.FileLevel;
        /** Specifies the SPListItem corresponding to this file if this file belongs to a doclib. Values for all fields are returned also. */
        get_listItemAllFields(): SP.ListItem;
        /** Returns the user that owns the current lock on the file. MUST return null if there is no lock. */
        get_lockedByUser(): SP.User;
        /** Specifies the major version of the file. */
        get_majorVersion(): number;
        /** Specifies the minor version of the file. */
        get_minorVersion(): number;
        get_modifiedBy(): SP.User;
        get_name(): string;
        get_serverRelativeUrl(): string;
        /** Specifies when the file was created. */
        get_timeCreated(): Date;
        /** Specifies when the file was created. */
        get_timeLastModified(): Date;
        get_title(): string;
        /** Specifies the implementation-specific version identifier of the file. */
        get_uIVersion(): number;
        /** Specifies the implementation-specific version identifier of the file. */
        get_uIVersionLabel(): string;
        /** Returns a collection of file version objects that represent the versions of the file. */
        get_versions(): SP.FileVersionCollection;
        /** Reverts an existing online or offline checkout for the file. */
        undoCheckOut(): void;
        checkIn(comment: string, checkInType: SP.CheckinType): void;
        publish(comment: string): void;
        /** Removes the file from content approval with the specified comment. */
        unPublish(comment: string): void;
        /** Approves the file submitted for content approval with the specified comment.  */
        approve(comment: string): void;
        /** Denies the file submitted for content approval. */
        deny(comment: string): void;
        static getContentVerFromTag(context: SP.ClientRuntimeContext, contentTag: string): SP.IntResult;
        getLimitedWebPartManager(scope: SP.WebParts.PersonalizationScope): SP.WebParts.LimitedWebPartManager;
        moveTo(newUrl: string, flags: SP.MoveOperations): void;
        copyTo(strNewUrl: string, bOverWrite: bool): void;
        saveBinary(parameters: SP.FileSaveBinaryInformation): void;
        deleteObject(): void;
        /** Moves the file to the recycle bin. MUST return the identifier of the new Recycle Bin item */
        recycle(): SP.GuidResult;
        checkOut(): void;
    }
    export class FileCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.File;
        get_item(index: number): SP.File;
        getByUrl(url: string): SP.File;
        add(parameters: SP.FileCreationInformation): SP.File;
        addTemplateFile(urlOfFile: string, templateFileType: SP.TemplateFileType): SP.File;
    }
    export class FileCreationInformation extends SP.ClientValueObject {
        get_content(): SP.Base64EncodedByteArray;
        set_content(value: SP.Base64EncodedByteArray): void;
        get_overwrite(): bool;
        set_overwrite(value: bool): void;
        get_url(): string;
        set_url(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export enum FileLevel {
        published,
        draft,
        checkout,
    }
    export class FileSaveBinaryInformation extends SP.ClientValueObject {
        get_checkRequiredFields(): bool;
        set_checkRequiredFields(value: bool): void;
        get_content(): SP.Base64EncodedByteArray;
        set_content(value: SP.Base64EncodedByteArray): void;
        get_eTag(): string;
        set_eTag(value: string): void;
        get_fieldValues(): any;
        set_fieldValues(value: any): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export enum FileSystemObjectType {
        invalid,
        file,
        folder,
        web,
    }
    export class FileVersion extends SP.ClientObject {
        get_checkInComment(): string;
        get_created(): Date;
        get_createdBy(): SP.User;
        get_iD(): number;
        get_isCurrentVersion(): bool;
        get_size(): number;
        get_url(): string;
        get_versionLabel(): string;
        deleteObject(): void;
    }
    export class FileVersionCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.FileVersion;
        get_item(index: number): SP.FileVersion;
        getById(versionid: number): SP.FileVersion;
        deleteByID(vid: number): void;
        deleteByLabel(versionlabel: string): void;
        deleteAll(): void;
        restoreByLabel(versionlabel: string): void;
    }
    export class Folder extends SP.ClientObject {
        get_contentTypeOrder(): SP.ContentTypeId[];
        get_files(): SP.FileCollection;
        get_listItemAllFields(): SP.ListItem;
        get_itemCount(): number;
        get_name(): string;
        get_parentFolder(): SP.Folder;
        get_properties(): SP.PropertyValues;
        get_serverRelativeUrl(): string;
        get_folders(): SP.FolderCollection;
        get_uniqueContentTypeOrder(): SP.ContentTypeId[];
        set_uniqueContentTypeOrder(value: SP.ContentTypeId[]): void;
        get_welcomePage(): string;
        set_welcomePage(value: string): void;
        update(): void;
        deleteObject(): void;
        recycle(): SP.GuidResult;
    }
    export class FolderCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.Folder;
        get_item(index: number): SP.Folder;
        getByUrl(url: string): SP.Folder;
        add(url: string): SP.Folder;
    }
    export class Form extends SP.ClientObject {
        get_id(): SP.Guid;
        get_serverRelativeUrl(): string;
        get_formType(): SP.PageType;
    }
    export class FormCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.Form;
        get_item(index: number): SP.Form;
        getByPageType(formType: SP.PageType): SP.Form;
        getById(id: SP.Guid): SP.Form;
    }
    export class Principal extends SP.ClientObject {
        get_id(): number;
        get_isHiddenInUI(): bool;
        get_loginName(): string;
        get_title(): string;
        set_title(value: string): void;
        get_principalType(): SP.Utilities.PrincipalType;
    }
    export class Group extends SP.Principal {
        get_allowMembersEditMembership(): bool;
        set_allowMembersEditMembership(value: bool): void;
        get_allowRequestToJoinLeave(): bool;
        set_allowRequestToJoinLeave(value: bool): void;
        get_autoAcceptRequestToJoinLeave(): bool;
        set_autoAcceptRequestToJoinLeave(value: bool): void;
        get_canCurrentUserEditMembership(): bool;
        get_canCurrentUserManageGroup(): bool;
        get_canCurrentUserViewMembership(): bool;
        get_description(): string;
        set_description(value: string): void;
        get_onlyAllowMembersViewMembership(): bool;
        set_onlyAllowMembersViewMembership(value: bool): void;
        get_owner(): SP.Principal;
        set_owner(value: SP.Principal): void;
        get_ownerTitle(): string;
        get_requestToJoinLeaveEmailSetting(): string;
        set_requestToJoinLeaveEmailSetting(value: string): void;
        get_users(): SP.UserCollection;
        update(): void;
    }
    export class GroupCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.Group;
        get_item(index: number): SP.Group;
        getByName(name: string): SP.Group;
        getById(id: number): SP.Group;
        add(parameters: SP.GroupCreationInformation): SP.Group;
        removeByLoginName(loginName: string): void;
        removeById(id: number): void;
        remove(group: SP.Group): void;
    }
    export class GroupCreationInformation extends SP.ClientValueObject {
        get_description(): string;
        set_description(value: string): void;
        get_title(): string;
        set_title(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class InformationRightsManagementSettings extends SP.ClientObject {
        get_allowPrint(): bool;
        set_allowPrint(value: bool): void;
        get_allowScript(): bool;
        set_allowScript(value: bool): void;
        get_allowWriteCopy(): bool;
        set_allowWriteCopy(value: bool): void;
        get_disableDocumentBrowserView(): bool;
        set_disableDocumentBrowserView(value: bool): void;
        get_documentAccessExpireDays(): number;
        set_documentAccessExpireDays(value: number): void;
        get_documentLibraryProtectionExpireDate(): Date;
        set_documentLibraryProtectionExpireDate(value: Date): void;
        get_enableDocumentAccessExpire(): bool;
        set_enableDocumentAccessExpire(value: bool): void;
        get_enableDocumentBrowserPublishingView(): bool;
        set_enableDocumentBrowserPublishingView(value: bool): void;
        get_enableGroupProtection(): bool;
        set_enableGroupProtection(value: bool): void;
        get_enableLicenseCacheExpire(): bool;
        set_enableLicenseCacheExpire(value: bool): void;
        get_groupName(): string;
        set_groupName(value: string): void;
        get_licenseCacheExpireDays(): number;
        set_licenseCacheExpireDays(value: number): void;
        get_policyDescription(): string;
        set_policyDescription(value: string): void;
        get_policyTitle(): string;
        set_policyTitle(value: string): void;
        reset(): void;
        update(): void;
    }
    export class Language extends SP.ClientValueObject {
        get_displayName(): string;
        get_languageTag(): string;
        get_lcid(): number;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class SecurableObject extends SP.ClientObject {
        get_firstUniqueAncestorSecurableObject(): SP.SecurableObject;
        get_hasUniqueRoleAssignments(): bool;
        get_roleAssignments(): SP.RoleAssignmentCollection;
        resetRoleInheritance(): void;
        breakRoleInheritance(copyRoleAssignments: bool, clearSubscopes: bool): void;
    }
    /** Represents display mode for a control or form */
    export enum ControlMode {
        invalid = 0,
        displayMode = 1,
        editMode = 2,
        newMode = 3
    }
    /** Represents a list on a SharePoint Web site. */
    export class List extends SP.SecurableObject {
        /** Gets item by id. */
        getItemById(id: number): SP.ListItem;
        /** Gets a value that specifies whether the list supports content types. */
        get_allowContentTypes(): bool;
        /** Gets the list definition type on which the list is based. For lists based on OOTB list definitions, return value corresponds the SP.ListTemplateType enumeration. */
        get_baseTemplate(): number;
        /** Gets base type for the list. */
        get_baseType(): SP.BaseType;
        /** Gets a value that specifies the override of the web application�s BrowserFileHandling property at the list level. */
        get_browserFileHandling(): SP.BrowserFileHandling;
        /** Gets the content types that are associated with the list. */
        get_contentTypes(): SP.ContentTypeCollection;
        /** Gets a value that specifies whether content types are enabled for the list. */
        get_contentTypesEnabled(): bool;
        /** Sets a value that specifies whether content types are enabled for the list. */
        set_contentTypesEnabled(value: bool): void;
        /** Gets a value that specifies when the list was created. */
        get_created(): Date;
        /** Gets the data source associated with the list, or null if the list is not a virtual list. */
        get_dataSource(): SP.ListDataSource;
        /** Gets a value that specifies the default workflow identifier for content approval on the list. */
        get_defaultContentApprovalWorkflowId(): SP.Guid;
        /** Sets a value that specifies the default workflow identifier for content approval on the list. */
        set_defaultContentApprovalWorkflowId(value: SP.Guid): void;
        /** Gets a value that specifies the location of the default display form for the list. */
        get_defaultDisplayFormUrl(): string;
        /** Sets a value that specifies the location of the default display form for the list. */
        set_defaultDisplayFormUrl(value: string): void;
        /** Gets a value that specifies the URL of the edit form to use for list items in the list. */
        get_defaultEditFormUrl(): string;
        /** Sets a value that specifies the URL of the edit form to use for list items in the list. */
        set_defaultEditFormUrl(value: string): void;
        /** Gets a value that specifies the location of the default new form for the list. */
        get_defaultNewFormUrl(): string;
        /** Sets a value that specifies the location of the default new form for the list. */
        set_defaultNewFormUrl(value: string): void;
        /** Gets default view for the list. */
        get_defaultView(): SP.View;
        /** Get URL of the default view for the list. */
        get_defaultViewUrl(): string;
        /** Gets a value that specifies the description of the list. */
        get_description(): string;
        /** Sets a value that specifies the description of the list. */
        set_description(value: string): void;
        /** Gets a value that specifies the reading order of the list. */
        get_direction(): string;
        /** Sets a value that specifies the reading order of the list. */
        set_direction(value: string): void;
        /** Gets a value that specifies the server-relative URL of the document template for the list */
        get_documentTemplateUrl(): string;
        /** Sets a value that specifies the server-relative URL of the document template for the list */
        set_documentTemplateUrl(value: string): void;
        /** Gets a value that specifies the minimum permission required to view minor versions and drafts within the list. */
        get_draftVersionVisibility(): SP.DraftVisibilityType;
        /** Sets a value that specifies the minimum permission required to view minor versions and drafts within the list. */
        set_draftVersionVisibility(value: SP.DraftVisibilityType): void;
        /** Gets a value that specifies the effective permissions on the list that are assigned to the current user. */
        get_effectiveBasePermissions(): SP.BasePermissions;
        /** Gets the effective base permissions for the current user, as they should be displayed in UI. This will only differ from EffectiveBasePermissions if ReadOnlyUI is set to true, and in all cases will be a subset of EffectiveBasePermissions. To put it another way, EffectiveBasePermissionsForUI will always be as or more restrictive than EffectiveBasePermissions. */
        get_effectiveBasePermissionsForUI(): SP.BasePermissions;
        /** Gets a value that specifies whether list item attachments are enabled for the list. */
        get_enableAttachments(): bool;
        /** Sets a value that specifies whether list item attachments are enabled for the list. */
        set_enableAttachments(value: bool): void;
        /** Gets a value that specifies whether new list folders can be added to the list. */
        get_enableFolderCreation(): bool;
        /** Sets a value that specifies whether new list folders can be added to the list. */
        set_enableFolderCreation(value: bool): void;
        /** Gets a value that specifies whether minor versions are enabled for the list. */
        get_enableMinorVersions(): bool;
        /** Sets a value that specifies whether minor versions are enabled for the list. */
        set_enableMinorVersions(value: bool): void;
        /** Gets a value that specifies whether content approval is enabled for the list. */
        get_enableModeration(): bool;
        /** Sets a value that specifies whether content approval is enabled for the list */
        set_enableModeration(value: bool): void;
        /** Gets a value that specifies whether historical versions of list items and documents can be created in the list */
        get_enableVersioning(): bool;
        /** Sets a value that specifies whether historical versions of list items and documents can be created in the list */
        set_enableVersioning(value: bool): void;
        /** The entity type name. */
        get_entityTypeName(): string;
        /** Gets collection of event receiver objects associated with the list. */
        get_eventReceivers(): SP.EventReceiverDefinitionCollection;
        /** Gets a value that specifies the collection of all fields in the list. */
        get_fields(): SP.FieldCollection;
        /** Gets a value that indicates whether forced checkout is enabled for the document library. */
        get_forceCheckout(): bool;
        /** Sets a value that indicates whether forced checkout is enabled for the document library */
        set_forceCheckout(value: bool): void;
        /** Gets collections of forms associated with the list. */
        get_forms(): SP.FormCollection;
        /** Returns true if this is external list. */
        get_hasExternalDataSource(): bool;
        /** Gets wherever the list is hidden */
        get_hidden(): bool;
        /** Sets if the list is hidden from "All site contents" or not. */
        set_hidden(value: bool): void;
        /** Gets id of the list */
        get_id(): SP.Guid;
        /** Gets a value that specifies the URI for the icon of the list */
        get_imageUrl(): string;
        /** Sets a value that specifies the URI for the icon of the list */
        set_imageUrl(value: string): void;
        /** Settings of document library Information Rights Management (IRM)  */
        get_informationRightsManagementSettings(): SP.InformationRightsManagementSettings;
        /** Gets a value that specifies whether Information Rights Management (IRM) is enabled for the list.  */
        get_irmEnabled(): bool;
        /** Sets a value that specifies whether Information Rights Management (IRM) is enabled for the list.  */
        set_irmEnabled(value: bool): void;
        /** Gets a value that specifies whether Information Rights Management (IRM) expiration is enabled for the list.  */
        get_irmExpire(): bool;
        /** Sets a value that specifies whether Information Rights Management (IRM) expiration is enabled for the list.  */
        set_irmExpire(value: bool): void;
        /** Gets a value that specifies whether Information Rights Management (IRM) rejection is enabled for the list.  */
        get_irmReject(): bool;
        /** Sets a value that specifies whether Information Rights Management (IRM) rejection is enabled for the list.  */
        set_irmReject(value: bool): void;
        /** Indicates whether this list should be treated as a top level navigation object or not.  */
        get_isApplicationList(): bool;
        /** Sets a value that indicates whether this list should be treated as a top level navigation object or not.  */
        set_isApplicationList(value: bool): void;
        /** Gets a value that specifies whether the list is a gallery. */
        get_isCatalog(): bool;
        /** Gets a value that indicates whether the document library is a private list with restricted permissions, such as for Solutions.  */
        get_isPrivate(): bool;
        /** Gets a value that indicates whether the list is designated as a default asset location for images or other files which the users upload to their wiki pages. */
        get_isSiteAssetsLibrary(): bool;
        /** Gets a value that specifies the number of list items in the list */
        get_itemCount(): number;
        /** Gets a value that specifies the last time a list item was deleted from the list. */
        get_lastItemDeletedDate(): Date;
        /** Gets a value that specifies the last time a list item, field, or property of the list was modified. */
        get_lastItemModifiedDate(): Date;
        /** Sets a value that specifies the last time the list was modified. */
        set_lastItemModifiedDate(value: Date): void;
        /** The entity type full name of the list item in the list. */
        get_listItemEntityTypeFullName(): string;
        /** Gets a value that indicates whether the list in a Meeting Workspace site contains data for multiple meeting instances within the site */
        get_multipleDataList(): bool;
        /** Sets a value that indicates whether the list in a Meeting Workspace site contains data for multiple meeting instances within the site */
        set_multipleDataList(value: bool): void;
        /** Gets a value that specifies that the crawler must not crawl the list */
        get_noCrawl(): bool;
        /** Sets a value that specifies that the crawler must not crawl the list */
        set_noCrawl(value: bool): void;
        /** Gets a value that specifies whether the list appears on the Quick Launch of the site */
        get_onQuickLaunch(): bool;
        /** Sets a value that specifies whether the list appears on the Quick Launch of the site */
        set_onQuickLaunch(value: bool): void;
        /** Gets a value that specifies the site that contains the list. */
        get_parentWeb(): SP.Web;
        /** Gets a value that specifies the server-relative URL of the site that contains the list. */
        get_parentWebUrl(): string;
        /** Gets the root folder that contains the files in the list and any related files. */
        get_rootFolder(): SP.Folder;
        /** Gets a value that specifies the list schema of the list. */
        get_schemaXml(): string;
        /** Gets a value that indicates whether folders can be created within the list. */
        get_serverTemplateCanCreateFolders(): bool;
        /** Gets a value that specifies the feature identifier of the feature that contains the list schema for the list. */
        get_templateFeatureId(): SP.Guid;
        /** Gets the list title. You can determine list URL from it's root folder URL. */
        get_title(): string;
        /** Sets the list title. To change list URL you should change name of the root folder. */
        set_title(value: string): void;
        /** Gets collection of custom actions associated with the list. */
        get_userCustomActions(): SP.UserCustomActionCollection;
        /** Gets a value that specifies the data validation criteria for a list item. */
        get_validationFormula(): string;
        /** Sets a value that specifies the data validation criteria for a list item. */
        set_validationFormula(value: string): void;
        /** Gets a value that specifies the error message returned when data validation fails for a list item. */
        get_validationMessage(): string;
        /** Sets a value that specifies the error message returned when data validation fails for a list item. */
        set_validationMessage(value: string): void;
        /** Returns collection of views added to the list */
        get_views(): SP.ViewCollection;
        /** Gets the collection of workflow association objects that represents all the workflows that are associated with the list. */
        get_workflowAssociations(): SP.Workflow.WorkflowAssociationCollection;
        /** Returns the collection of changes from the change log that have occurred within the list, based on the specified query. */
        getChanges(query: SP.ChangeQuery): SP.ChangeCollection;
        /** Returns array of items describing changes since time specified in the query */
        getListItemChangesSinceToken(query: SP.ChangeLogItemQuery): any[];
        /** Gets the effective permissions that a specified user has on the list. */
        getUserEffectivePermissions(userName: string): SP.BasePermissions;
        /** First tries to find if the view already exists. Overwrite it if yes, add a new view if no. Then extract all the adhoc filter/sort info from the URL and build and update the view's xml Returns the url of the new/overwritten view.
            @param oldName The name of the view the user did the adhoc filter on (is currently on).
            @param newName The desired name the user typed
            @param privateView Boolean true when the user wants make a new view that's personal
            @param uri Url that keeps all the adhoc filter/sort inforatmion */
        saveAsNewView(oldName: string, newName: string, privateView: bool, uri: string): SP.StringResult;
        /** Returns a collection of lookup fields that use this list as a data source and that have FieldLookup.IsRelationship set to true. */
        getRelatedFields(): SP.RelatedFieldCollection;
        /** This member is reserved for internal use and is not intended to be used directly from your code. */
        getRelatedFieldsExtendedData(): SP.RelatedFieldExtendedDataCollection;
        /** Returns json string which contains all information necessary for rendering the specified list form for the specified itemId. Mode is SP.ControlMode */
        renderListFormData(itemId: number, formId: string, mode: SP.ControlMode): SP.StringResult;
        /** Returns the data for the specified query view. */
        renderListData(viewXml: string): SP.StringResult;
        /** This member is reserved for internal use and is not intended to be used directly from your code. */
        reserveListItemId(): SP.IntResult;
        /** Updates the database with changes that are made to the list object. */
        update(): void;
        /** Returns the list view with the specified view identifier. */
        getView(viewGuid: SP.Guid): SP.View;
        /** Deletes the list. */
        deleteObject(): void;
        /** Sends the list to the site recycle bin. */
        recycle(): SP.GuidResult;
        /** Returns collection of list items based on the specified CAML query. */
        getItems(query: SP.CamlQuery): SP.ListItemCollection;
        /** Creates a new list item in the list. */
        addItem(parameters: SP.ListItemCreationInformation): SP.ListItem;
    }
    /** Represents a collection of SP.List objects */
    export class ListCollection extends SP.ClientObjectCollection {
        /** Gets the list at the specified index in the collection. */
        itemAt(index: number): SP.List;
        /** Gets the list at the specified index in the collection. */
        get_item(index: number): SP.List;
        /** Returns the list with the specified title from the collection. */
        getByTitle(title: string): SP.List;
        /** Returns the list with the specified list identifier. */
        getById(id: SP.Guid): SP.List;
        /** Creates a new list or a document library. */
        add(parameters: SP.ListCreationInformation): SP.List;
        /** Gets a list that is the default location for wiki pages. */
        ensureSitePagesLibrary(): SP.List;
        /** Gets a list that is the default asset location for images or other files, which the users upload to their wiki pages. */
        ensureSiteAssetsLibrary(): SP.List;
    }
    export class ListCreationInformation extends SP.ClientValueObject {
        get_customSchemaXml(): string;
        set_customSchemaXml(value: string): void;
        get_dataSourceProperties(): any;
        set_dataSourceProperties(value: any): void;
        get_description(): string;
        set_description(value: string): void;
        get_documentTemplateType(): number;
        set_documentTemplateType(value: number): void;
        get_quickLaunchOption(): SP.QuickLaunchOptions;
        set_quickLaunchOption(value: SP.QuickLaunchOptions): void;
        get_templateFeatureId(): SP.Guid;
        set_templateFeatureId(value: SP.Guid): void;
        get_templateType(): number;
        set_templateType(value: number): void;
        get_title(): string;
        set_title(value: string): void;
        get_url(): string;
        set_url(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class ListDataSource extends SP.ClientValueObject {
        get_properties(): any;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class ListDataValidationExceptionValue extends SP.ClientValueObject {
        get_fieldFailures(): SP.ListDataValidationFailure[];
        get_itemFailure(): SP.ListDataValidationFailure;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class ListDataValidationFailure extends SP.ClientValueObject {
        get_displayName(): string;
        get_message(): string;
        get_name(): string;
        get_reason(): SP.ListDataValidationFailureReason;
        get_validationType(): SP.ListDataValidationType;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export enum ListDataValidationFailureReason {
        dataFailure,
        formulaError,
    }
    export enum ListDataValidationType {
        userFormulaField,
        userFormulaItem,
        requiredField,
        choiceField,
        minMaxField,
        textField,
    } 
    /** Represents an item or row in a list. */
    export class ListItem extends SP.SecurableObject {
        get_fieldValues(): any;
        /** Gets the specified field value for the list item. Field value is returned as string, but it can be casted to a specific field value type, e.g. SP.LookupFieldValue, etc. */
        get_item(fieldInternalName: string): any;
        /** Sets the specified field value for the list item. Consider using parseAndSetFieldValue instead. */
        set_item(fieldInternalName: string, value: any): void;
        /** Gets collection of objects that represent attachments for the list item. */
        get_attachmentFiles(): SP.AttachmentCollection;
        /** Gets the content type of the item. */
        get_contentType(): SP.ContentType;
        /** Gets a value that specifies the display name of the list item.
            This property is not available by default when you return list items. Trying to call this method returns a PropertyOrFieldNotInitializedException if you try to access one of these properties. To access this property, use the Include method as part of the query string. */
        get_displayName(): string;
        /** Gets a value that specifies the effective permissions on the list item that are assigned to the current user.
            This property is not available by default when you return list items. Trying to call this method returns a PropertyOrFieldNotInitializedException if you try to access one of these properties. To access this property, use the Include method as part of the query string. */
        get_effectiveBasePermissions(): SP.BasePermissions;
        /** Gets the effective base permissions for the current user, as they should be displayed in UI.
            This will only differ from EffectiveBasePermissions if ReadOnlyUI is set to true on the item's parent list, and in all cases will be a subset of EffectiveBasePermissions. To put it another way, EffectiveBasePermissionsForUI will always be as or more restrictive than EffectiveBasePermissions.
            This property is not available by default when you return list items. Trying to call this method returns a PropertyOrFieldNotInitializedException if you try to access one of these properties. To access this property, use the Include method as part of the query string.  */
        get_effectiveBasePermissionsForUI(): SP.BasePermissions;
        get_fieldValuesAsHtml(): SP.FieldStringValues;
        get_fieldValuesAsText(): SP.FieldStringValues;
        get_fieldValuesForEdit(): SP.FieldStringValues;
        /** Gets the file that is represented by the item from a document library. Only for document libraries. */
        get_file(): SP.File;
        /** Gets or sets the file system object type for the item (file, folder or invalid). */
        get_fileSystemObjectType(): SP.FileSystemObjectType;
        /** Gets the parent folder for the list item */
        get_folder(): SP.Folder;
        /** Gets id of the item */
        get_id(): number;
        /** Get the list in which the item resides. */
        get_parentList(): SP.List;
        refreshLoad(): void;
        getWOPIFrameUrl(action: SP.Utilities.SPWOPIFrameAction): SP.StringResult;
        /** Commits changed properties of the list item. The actual update is performed during context.executeQueryAsync method call. */
        update(): void;
        /** Deletes the list item */
        deleteObject(): void;
        /** Moves the list item to the Recycle Bin and returns the identifier of the new Recycle Bin item. */
        recycle(): SP.GuidResult;
        /** Gets effective permissions for the specified user. */
        getUserEffectivePermissions(userName: string): SP.BasePermissions;
        /** Sets the value of the field for the list item based on an implementation specific transformation of the value. */
        parseAndSetFieldValue(fieldInternalName: string, value: string): void;
        /** Validates form values specified for the list item. Errors are returned through hasException and errorMessage properties of the ListItemFormUpdateValue objects */
        validateUpdateListItem(formValues: SP.ListItemFormUpdateValue[], bNewDocumentUpdate: bool): SP.ListItemFormUpdateValue[];
    }
    export class ListItemCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.ListItem;
        get_item(index: number): SP.ListItem;
        getById(id: number): SP.ListItem;
        getById(id: string): SP.ListItem;
        get_listItemCollectionPosition(): SP.ListItemCollectionPosition;
    }
    export class ListItemCollectionPosition extends SP.ClientValueObject {
        get_pagingInfo(): string;
        set_pagingInfo(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    /** Specifies the properties of the new list item. */
    export class ListItemCreationInformation extends SP.ClientValueObject {
        get_folderUrl(): string;
        /** Sets a value that specifies the folder for the new list item. */
        set_folderUrl(value: string): void;
        get_leafName(): string;
        /** Sets a value that specifies the name of the new list item. It must be the name of the file if the parent list of the list item is a document library. */
        set_leafName(value: string): void;
        get_underlyingObjectType(): SP.FileSystemObjectType;
        /** Sets a value that specifies whether the new list item is a file or a folder. */
        set_underlyingObjectType(value: SP.FileSystemObjectType): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class ListItemEntityCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.ListItem;
        get_item(index: number): SP.ListItem;
    }
    export class ListItemFormUpdateValue extends SP.ClientValueObject {
        get_errorMessage(): string;
        set_errorMessage(value: string): void;
        get_fieldName(): string;
        set_fieldName(value: string): void;
        get_fieldValue(): string;
        set_fieldValue(value: string): void;
        get_hasException(): bool;
        set_hasException(value: bool): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class ListTemplate extends SP.ClientObject {
        get_allowsFolderCreation(): bool;
        get_baseType(): SP.BaseType;
        get_description(): string;
        get_featureId(): SP.Guid;
        get_hidden(): bool;
        get_imageUrl(): string;
        get_internalName(): string;
        get_isCustomTemplate(): bool;
        get_name(): string;
        get_onQuickLaunch(): bool;
        get_listTemplateTypeKind(): number;
        get_unique(): bool;
    }
    export class ListTemplateCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.ListTemplate;
        get_item(index: number): SP.ListTemplate;
        getByName(name: string): SP.ListTemplate;
    }
    export enum ListTemplateType {
        invalidType,
        noListTemplate,
        genericList,
        documentLibrary,
        survey,
        links,
        announcements,
        contacts,
        events,
        tasks,
        discussionBoard,
        pictureLibrary,
        dataSources,
        webTemplateCatalog,
        userInformation,
        webPartCatalog,
        listTemplateCatalog,
        xMLForm,
        masterPageCatalog,
        noCodeWorkflows,
        workflowProcess,
        webPageLibrary,
        customGrid,
        solutionCatalog,
        noCodePublic,
        themeCatalog,
        designCatalog,
        appDataCatalog,
        dataConnectionLibrary,
        workflowHistory,
        ganttTasks,
        helpLibrary,
        accessRequest,
        tasksWithTimelineAndHierarchy,
        maintenanceLogs,
        meetings,
        agenda,
        meetingUser,
        decision,
        meetingObjective,
        textBox,
        thingsToBring,
        homePageLibrary,
        posts,
        comments,
        categories,
        facility,
        whereabouts,
        callTrack,
        circulation,
        timecard,
        holidays,
        iMEDic,
        externalList,
        mySiteDocumentLibrary,
        issueTracking,
        adminTasks,
        healthRules,
        healthReports,
        developerSiteDraftApps,
    }
    export enum MoveOperations {
        none,
        overwrite,
        allowBrokenThickets,
        bypassApprovePermission,
    }
    export class Navigation extends SP.ClientObject {
        get_quickLaunch(): SP.NavigationNodeCollection;
        get_topNavigationBar(): SP.NavigationNodeCollection;
        get_useShared(): bool;
        set_useShared(value: bool): void;
        getNodeById(id: number): SP.NavigationNode;
    }
    export class NavigationNode extends SP.ClientObject {
        get_children(): SP.NavigationNodeCollection;
        get_id(): number;
        get_isDocLib(): bool;
        get_isExternal(): bool;
        get_isVisible(): bool;
        set_isVisible(value: bool): void;
        get_title(): string;
        set_title(value: string): void;
        get_url(): string;
        set_url(value: string): void;
        update(): void;
        deleteObject(): void;
    }
    export class NavigationNodeCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.NavigationNode;
        get_item(index: number): SP.NavigationNode;
        add(parameters: SP.NavigationNodeCreationInformation): SP.NavigationNode;
    }
    export class NavigationNodeCreationInformation extends SP.ClientValueObject {
        get_asLastNode(): bool;
        set_asLastNode(value: bool): void;
        get_isExternal(): bool;
        set_isExternal(value: bool): void;
        get_previousNode(): SP.NavigationNode;
        set_previousNode(value: SP.NavigationNode): void;
        get_title(): string;
        set_title(value: string): void;
        get_url(): string;
        set_url(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class ObjectSharingInformation extends SP.ClientObject {
        get_anonymousEditLink(): string;
        get_anonymousViewLink(): string;
        get_canManagePermissions(): bool;
        get_hasPendingAccessRequests(): bool;
        get_hasPermissionLevels(): bool;
        get_isSharedWithCurrentUser(): bool;
        get_isSharedWithGuest(): bool;
        get_isSharedWithMany(): bool;
        get_isSharedWithSecurityGroup(): bool;
        get_pendingAccessRequestsLink(): string;
        getSharedWithUsers(): SP.ClientObjectList;
        static getListItemSharingInformation(context: SP.ClientRuntimeContext, listID: SP.Guid, itemID: number, excludeCurrentUser: bool, excludeSiteAdmin: bool, excludeSecurityGroups: bool, retrieveAnonymousLinks: bool, retrieveUserInfoDetails: bool, checkForAccessRequests: bool): SP.ObjectSharingInformation;
        static getWebSharingInformation(context: SP.ClientRuntimeContext, excludeCurrentUser: bool, excludeSiteAdmin: bool, excludeSecurityGroups: bool, retrieveAnonymousLinks: bool, retrieveUserInfoDetails: bool, checkForAccessRequests: bool): SP.ObjectSharingInformation;
        static getObjectSharingInformation(context: SP.ClientRuntimeContext, securableObject: SP.SecurableObject, excludeCurrentUser: bool, excludeSiteAdmin: bool, excludeSecurityGroups: bool, retrieveAnonymousLinks: bool, retrieveUserInfoDetails: bool, checkForAccessRequests: bool, retrievePermissionLevels: bool): SP.ObjectSharingInformation;
    }
    export class ObjectSharingInformationUser extends SP.ClientObject {
        get_customRoleNames(): string;
        get_department(): string;
        get_email(): string;
        get_hasEditPermission(): bool;
        get_hasViewPermission(): bool;
        get_id(): number;
        get_isSiteAdmin(): bool;
        get_jobTitle(): string;
        get_loginName(): string;
        get_name(): string;
        get_picture(): string;
        get_principal(): SP.Principal;
        get_sipAddress(): string;
        get_user(): SP.User;
    }
    export enum OpenWebOptions {
        none,
        initNavigationCache,
    }
    export enum PageType {
        invalid,
        defaultView,
        normalView,
        dialogView,
        view,
        displayForm,
        displayFormDialog,
        editForm,
        editFormDialog,
        newForm,
        newFormDialog,
        solutionForm,
        pAGE_MAXITEMS,
    }
    export class PropertyValues extends SP.ClientObject {
        get_fieldValues(): any;
        get_item(fieldName: string): any;
        set_item(fieldName: string, value: any): void;
        refreshLoad(): void;
    }
    export class PushNotificationSubscriber extends SP.ClientObject {
        get_customArgs(): string;
        set_customArgs(value: string): void;
        get_deviceAppInstanceId(): SP.Guid;
        get_lastModifiedTimeStamp(): Date;
        get_registrationTimeStamp(): Date;
        get_serviceToken(): string;
        set_serviceToken(value: string): void;
        get_subscriberType(): string;
        set_subscriberType(value: string): void;
        get_user(): SP.User;
        update(): void;
    }
    export class PushNotificationSubscriberCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.PushNotificationSubscriber;
        get_item(index: number): SP.PushNotificationSubscriber;
        getByStoreId(id: string): SP.PushNotificationSubscriber;
    }
    export enum QuickLaunchOptions {
        off,
        on,
        defaultValue,
    }
    export class RecycleBinItem extends SP.ClientObject {
        get_author(): SP.User;
        get_deletedBy(): SP.User;
        get_deletedDate(): Date;
        get_dirName(): string;
        get_id(): SP.Guid;
        get_itemState(): SP.RecycleBinItemState;
        get_itemType(): SP.RecycleBinItemType;
        get_leafName(): string;
        get_size(): number;
        get_title(): string;
        deleteObject(): void;
        restore(): void;
    }
    export class RecycleBinItemCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.RecycleBinItem;
        get_item(index: number): SP.RecycleBinItem;
        getById(id: SP.Guid): SP.RecycleBinItem;
        deleteAll(): void;
        restoreAll(): void;
    }
    export enum RecycleBinItemState {
        none,
        firstStageRecycleBin,
        secondStageRecycleBin,
    }
    export enum RecycleBinItemType {
        none,
        file,
        fileVersion,
        listItem,
        list,
        folder,
        folderWithLists,
        attachment,
        listItemVersion,
        cascadeParent,
        web,
    }
    export class RegionalSettings extends SP.ClientObject {
        get_adjustHijriDays(): number;
        get_alternateCalendarType(): number;
        get_aM(): string;
        get_calendarType(): number;
        get_collation(): number;
        get_collationLCID(): number;
        get_dateFormat(): number;
        get_dateSeparator(): string;
        get_decimalSeparator(): string;
        get_digitGrouping(): string;
        get_firstDayOfWeek(): number;
        get_firstWeekOfYear(): number;
        get_isEastAsia(): bool;
        get_isRightToLeft(): bool;
        get_isUIRightToLeft(): bool;
        get_listSeparator(): string;
        get_localeId(): number;
        get_negativeSign(): string;
        get_negNumberMode(): number;
        get_pM(): string;
        get_positiveSign(): string;
        get_showWeeks(): bool;
        get_thousandSeparator(): string;
        get_time24(): bool;
        get_timeMarkerPosition(): number;
        get_timeSeparator(): string;
        get_timeZone(): SP.TimeZone;
        get_timeZones(): SP.TimeZoneCollection;
        get_workDayEndHour(): number;
        get_workDays(): number;
        get_workDayStartHour(): number;
    }
    export class RelatedField extends SP.ClientObject {
        get_fieldId(): SP.Guid;
        get_listId(): SP.Guid;
        get_lookupList(): SP.List;
        get_relationshipDeleteBehavior(): SP.RelationshipDeleteBehaviorType;
        get_webId(): SP.Guid;
    }
    export class RelatedFieldCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.RelatedField;
        get_item(index: number): SP.RelatedField;
    }
    export class RelatedFieldExtendedData extends SP.ClientObject {
        get_fieldId(): SP.Guid;
        get_listId(): SP.Guid;
        get_listImageUrl(): string;
        get_resolvedListTitle(): string;
        get_toolTipDescription(): string;
        get_webId(): SP.Guid;
    }
    export class RelatedFieldExtendedDataCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.RelatedFieldExtendedData;
        get_item(index: number): SP.RelatedFieldExtendedData;
    }
    export class RelatedItem extends SP.ClientValueObject {
        get_iconUrl(): string;
        set_iconUrl(value: string): void;
        get_itemId(): number;
        set_itemId(value: number): void;
        get_listId(): string;
        set_listId(value: string): void;
        get_title(): string;
        set_title(value: string): void;
        get_url(): string;
        set_url(value: string): void;
        get_webId(): string;
        set_webId(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class RelatedItemManager extends SP.ClientObject {
        static getRelatedItems(context: SP.ClientRuntimeContext, SourceListName: string, SourceItemID: number): SP.RelatedItem[];
        static getPageOneRelatedItems(context: SP.ClientRuntimeContext, SourceListName: string, SourceItemID: number): SP.RelatedItem[];
        static addSingleLink(context: SP.ClientRuntimeContext, SourceListName: string, SourceItemID: number, SourceWebUrl: string, TargetListName: string, TargetItemID: number, TargetWebUrl: string, TryAddReverseLink: bool): void;
        static addSingleLinkToUrl(context: SP.ClientRuntimeContext, SourceListName: string, SourceItemID: number, TargetItemUrl: string, TryAddReverseLink: bool): void;
        static addSingleLinkFromUrl(context: SP.ClientRuntimeContext, SourceItemUrl: string, TargetListName: string, TargetItemID: number, TryAddReverseLink: bool): void;
        static deleteSingleLink(context: SP.ClientRuntimeContext, SourceListName: string, SourceItemID: number, SourceWebUrl: string, TargetListName: string, TargetItemID: number, TargetWebUrl: string, TryDeleteReverseLink: bool): void;
    }
    export enum RelationshipDeleteBehaviorType {
        none,
        cascade,
        restrict,
    }
    export class RequestVariable extends SP.ClientObject {
        constructor(context: SP.ClientRuntimeContext);
        get_value(): string;
        static newObject(context: SP.ClientRuntimeContext): SP.RequestVariable;
        append(value: string): void;
        set (value: string): void;
    }
    export class RoleAssignment extends SP.ClientObject {
        get_member(): SP.Principal;
        get_principalId(): number;
        get_roleDefinitionBindings(): SP.RoleDefinitionBindingCollection;
        importRoleDefinitionBindings(roleDefinitionBindings: SP.RoleDefinitionBindingCollection): void;
        update(): void;
        deleteObject(): void;
    }
    export class RoleAssignmentCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.RoleAssignment;
        get_item(index: number): SP.RoleAssignment;
        get_groups(): SP.GroupCollection;
        getByPrincipal(principalToFind: SP.Principal): SP.RoleAssignment;
        getByPrincipalId(principalId: number): SP.RoleAssignment;
        add(principal: SP.Principal, roleBindings: SP.RoleDefinitionBindingCollection): SP.RoleAssignment;
    }
    export class RoleDefinition extends SP.ClientObject {
        get_basePermissions(): SP.BasePermissions;
        set_basePermissions(value: SP.BasePermissions): void;
        get_description(): string;
        set_description(value: string): void;
        get_hidden(): bool;
        get_id(): number;
        get_name(): string;
        set_name(value: string): void;
        get_order(): number;
        set_order(value: number): void;
        get_roleTypeKind(): SP.RoleType;
        update(): void;
        deleteObject(): void;
    }
    export class RoleDefinitionBindingCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.RoleDefinition;
        get_item(index: number): SP.RoleDefinition;
        constructor(context: SP.ClientRuntimeContext);
        static newObject(context: SP.ClientRuntimeContext): SP.RoleDefinitionBindingCollection;
        add(roleDefinition: SP.RoleDefinition): void;
        remove(roleDefinition: SP.RoleDefinition): void;
        removeAll(): void;
    }
    export class RoleDefinitionCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.RoleDefinition;
        get_item(index: number): SP.RoleDefinition;
        getByName(name: string): SP.RoleDefinition;
        add(parameters: SP.RoleDefinitionCreationInformation): SP.RoleDefinition;
        getById(id: number): SP.RoleDefinition;
        getByType(roleType: SP.RoleType): SP.RoleDefinition;
    }
    export class RoleDefinitionCreationInformation extends SP.ClientValueObject {
        get_basePermissions(): SP.BasePermissions;
        set_basePermissions(value: SP.BasePermissions): void;
        get_description(): string;
        set_description(value: string): void;
        get_name(): string;
        set_name(value: string): void;
        get_order(): number;
        set_order(value: number): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export enum RoleType {
        none,
        guest,
        reader,
        contributor,
        webDesigner,
        administrator,
        editor,
    }
    export class ServerSettings {
        static getAlternateUrls(context: SP.ClientRuntimeContext): SP.ClientObjectList;
        static getGlobalInstalledLanguages(context: SP.ClientRuntimeContext, compatibilityLevel: number): SP.Language[];
    }
    export class Site extends SP.ClientObject {
        get_allowDesigner(): bool;
        set_allowDesigner(value: bool): void;
        get_allowMasterPageEditing(): bool;
        set_allowMasterPageEditing(value: bool): void;
        get_allowRevertFromTemplate(): bool;
        set_allowRevertFromTemplate(value: bool): void;
        get_allowSelfServiceUpgrade(): bool;
        set_allowSelfServiceUpgrade(value: bool): void;
        get_allowSelfServiceUpgradeEvaluation(): bool;
        set_allowSelfServiceUpgradeEvaluation(value: bool): void;
        get_canUpgrade(): bool;
        get_compatibilityLevel(): number;
        get_eventReceivers(): SP.EventReceiverDefinitionCollection;
        get_features(): SP.FeatureCollection;
        get_id(): SP.Guid;
        get_lockIssue(): string;
        get_maxItemsPerThrottledOperation(): number;
        get_owner(): SP.User;
        set_owner(value: SP.User): void;
        get_primaryUri(): string;
        get_readOnly(): bool;
        get_recycleBin(): SP.RecycleBinItemCollection;
        get_rootWeb(): SP.Web;
        get_serverRelativeUrl(): string;
        get_shareByLinkEnabled(): bool;
        get_showUrlStructure(): bool;
        set_showUrlStructure(value: bool): void;
        get_uIVersionConfigurationEnabled(): bool;
        set_uIVersionConfigurationEnabled(value: bool): void;
        get_upgradeInfo(): SP.UpgradeInfo;
        get_upgradeReminderDate(): Date;
        get_upgrading(): bool;
        get_url(): string;
        get_usage(): SP.UsageInfo;
        get_userCustomActions(): SP.UserCustomActionCollection;
        updateClientObjectModelUseRemoteAPIsPermissionSetting(requireUseRemoteAPIs: bool): void;
        needsUpgradeByType(versionUpgrade: bool, recursive: bool): SP.BooleanResult;
        runHealthCheck(ruleId: SP.Guid, bRepair: bool, bRunAlways: bool): SP.SiteHealth.SiteHealthSummary;
        createPreviewSPSite(upgrade: bool, sendemail: bool): void;
        runUpgradeSiteSession(versionUpgrade: bool, queueOnly: bool, sendEmail: bool): void;
        getChanges(query: SP.ChangeQuery): SP.ChangeCollection;
        openWeb(strUrl: string): SP.Web;
        openWebById(gWebId: SP.Guid): SP.Web;
        getWebTemplates(LCID: number, overrideCompatLevel: number): SP.WebTemplateCollection;
        getCustomListTemplates(web: SP.Web): SP.ListTemplateCollection;
        getCatalog(typeCatalog: number): SP.List;
        extendUpgradeReminderDate(): void;
        invalidate(): void;
    }
    export class SiteUrl extends SP.ClientObject {
    }
    export class SubwebQuery extends SP.ClientValueObject {
        get_configurationFilter(): number;
        set_configurationFilter(value: number): void;
        get_webTemplateFilter(): number;
        set_webTemplateFilter(value: number): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export enum TemplateFileType {
        standardPage,
        wikiPage,
        formPage,
    }
    export class ThemeInfo extends SP.ClientObject {
        get_accessibleDescription(): string;
        get_themeBackgroundImageUri(): string;
        getThemeShadeByName(name: string): SP.StringResult;
        getThemeFontByName(name: string, lcid: number): SP.StringResult;
    }
    export class TimeZone extends SP.ClientObject {
        get_description(): string;
        get_id(): number;
        get_information(): SP.TimeZoneInformation;
        localTimeToUTC(date: Date): SP.DateTimeResult;
        uTCToLocalTime(date: Date): SP.DateTimeResult;
    }
    export class TimeZoneCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.TimeZone;
        get_item(index: number): SP.TimeZone;
        getById(id: number): SP.TimeZone;
    }
    export class TimeZoneInformation extends SP.ClientValueObject {
        get_bias(): number;
        get_daylightBias(): number;
        get_standardBias(): number;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class UpgradeInfo extends SP.ClientValueObject {
        get_errorFile(): string;
        get_errors(): number;
        get_lastUpdated(): Date;
        get_logFile(): string;
        get_requestDate(): Date;
        get_retryCount(): number;
        get_startTime(): Date;
        get_status(): SP.UpgradeStatus;
        get_upgradeType(): SP.UpgradeType;
        get_warnings(): number;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export enum UpgradeStatus {
        none,
        inProgress,
        failed,
        completed,
    }
    export enum UpgradeType {
        buildUpgrade,
        versionUpgrade,
    }
    export enum UrlFieldFormatType {
        hyperlink,
        image,
    }
    export enum UrlZone {
        defaultZone,
        intranet,
        internet,
        custom,
        extranet,
    }
    export class UsageInfo extends SP.ClientValueObject {
        get_bandwidth(): number;
        get_discussionStorage(): number;
        get_hits(): number;
        get_storage(): number;
        get_storagePercentageUsed(): number;
        get_visits(): number;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class User extends SP.Principal {
        get_email(): string;
        set_email(value: string): void;
        get_groups(): SP.GroupCollection;
        get_isSiteAdmin(): bool;
        set_isSiteAdmin(value: bool): void;
        get_userId(): SP.UserIdInfo;
        update(): void;
    }
    export class UserCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.User;
        get_item(index: number): SP.User;
        getByLoginName(loginName: string): SP.User;
        getById(id: number): SP.User;
        getByEmail(emailAddress: string): SP.User;
        removeByLoginName(loginName: string): void;
        removeById(id: number): void;
        remove(user: SP.User): void;
        add(parameters: SP.UserCreationInformation): SP.User;
        addUser(user: SP.User): SP.User;
    }
    export class UserCreationInformation extends SP.ClientValueObject {
        get_email(): string;
        set_email(value: string): void;
        get_loginName(): string;
        set_loginName(value: string): void;
        get_title(): string;
        set_title(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class UserCustomAction extends SP.ClientObject {
        get_commandUIExtension(): string;
        set_commandUIExtension(value: string): void;
        get_description(): string;
        set_description(value: string): void;
        get_group(): string;
        set_group(value: string): void;
        get_id(): SP.Guid;
        get_imageUrl(): string;
        set_imageUrl(value: string): void;
        get_location(): string;
        set_location(value: string): void;
        get_name(): string;
        set_name(value: string): void;
        get_registrationId(): string;
        set_registrationId(value: string): void;
        get_registrationType(): SP.UserCustomActionRegistrationType;
        set_registrationType(value: SP.UserCustomActionRegistrationType): void;
        get_rights(): SP.BasePermissions;
        set_rights(value: SP.BasePermissions): void;
        get_scope(): SP.UserCustomActionScope;
        get_scriptBlock(): string;
        set_scriptBlock(value: string): void;
        get_scriptSrc(): string;
        set_scriptSrc(value: string): void;
        get_sequence(): number;
        set_sequence(value: number): void;
        get_title(): string;
        set_title(value: string): void;
        get_url(): string;
        set_url(value: string): void;
        get_versionOfUserCustomAction(): string;
        update(): void;
        deleteObject(): void;
    }
    export class UserCustomActionCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.UserCustomAction;
        get_item(index: number): SP.UserCustomAction;
        getById(id: SP.Guid): SP.UserCustomAction;
        clear(): void;
        add(): SP.UserCustomAction;
    }
    export enum UserCustomActionRegistrationType {
        none,
        list,
        contentType,
        progId,
        fileType,
    }
    export enum UserCustomActionScope {
        unknown,
        site,
        web,
        list,
    }
    export class UserIdInfo extends SP.ClientValueObject {
        get_nameId(): string;
        get_nameIdIssuer(): string;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class View extends SP.ClientObject {
        get_aggregations(): string;
        set_aggregations(value: string): void;
        get_aggregationsStatus(): string;
        set_aggregationsStatus(value: string): void;
        get_baseViewId(): string;
        get_contentTypeId(): SP.ContentTypeId;
        set_contentTypeId(value: SP.ContentTypeId): void;
        get_defaultView(): bool;
        set_defaultView(value: bool): void;
        get_defaultViewForContentType(): bool;
        set_defaultViewForContentType(value: bool): void;
        get_editorModified(): bool;
        set_editorModified(value: bool): void;
        get_formats(): string;
        set_formats(value: string): void;
        get_hidden(): bool;
        set_hidden(value: bool): void;
        get_htmlSchemaXml(): string;
        get_id(): SP.Guid;
        get_imageUrl(): string;
        get_includeRootFolder(): bool;
        set_includeRootFolder(value: bool): void;
        get_viewJoins(): string;
        set_viewJoins(value: string): void;
        get_jSLink(): string;
        set_jSLink(value: string): void;
        get_listViewXml(): string;
        set_listViewXml(value: string): void;
        get_method(): string;
        set_method(value: string): void;
        get_mobileDefaultView(): bool;
        set_mobileDefaultView(value: bool): void;
        get_mobileView(): bool;
        set_mobileView(value: bool): void;
        get_moderationType(): string;
        get_orderedView(): bool;
        get_paged(): bool;
        set_paged(value: bool): void;
        get_personalView(): bool;
        get_viewProjectedFields(): string;
        set_viewProjectedFields(value: string): void;
        get_viewQuery(): string;
        set_viewQuery(value: string): void;
        get_readOnlyView(): bool;
        get_requiresClientIntegration(): bool;
        get_rowLimit(): number;
        set_rowLimit(value: number): void;
        get_scope(): SP.ViewScope;
        set_scope(value: SP.ViewScope): void;
        get_serverRelativeUrl(): string;
        get_styleId(): string;
        get_threaded(): bool;
        get_title(): string;
        set_title(value: string): void;
        get_toolbar(): string;
        set_toolbar(value: string): void;
        get_toolbarTemplateName(): string;
        get_viewType(): string;
        get_viewData(): string;
        set_viewData(value: string): void;
        get_viewFields(): SP.ViewFieldCollection;
        deleteObject(): void;
        renderAsHtml(): SP.StringResult;
        update(): void;
    }
    export class ViewCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.View;
        get_item(index: number): SP.View;
        getByTitle(strTitle: string): SP.View;
        getById(guidId: SP.Guid): SP.View;
        add(parameters: SP.ViewCreationInformation): SP.View;
    }
    export class ViewCreationInformation extends SP.ClientValueObject {
        get_paged(): bool;
        set_paged(value: bool): void;
        get_personalView(): bool;
        set_personalView(value: bool): void;
        get_query(): string;
        set_query(value: string): void;
        get_rowLimit(): number;
        set_rowLimit(value: number): void;
        get_setAsDefaultView(): bool;
        set_setAsDefaultView(value: bool): void;
        get_title(): string;
        set_title(value: string): void;
        get_viewFields(): string[];
        set_viewFields(value: string[]): void;
        get_viewTypeKind(): SP.ViewType;
        set_viewTypeKind(value: SP.ViewType): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class ViewFieldCollection extends SP.ClientObjectCollection {
        itemAt(index: number): string;
        get_item(index: number): string;
        get_schemaXml(): string;
        moveFieldTo(field: string, index: number): void;
        add(strField: string): void;
        remove(strField: string): void;
        removeAll(): void;
    }
    export enum ViewScope {
        defaultValue,
        recursive,
        recursiveAll,
        filesOnly,
    }
    export enum ViewType {
        none,
        html,
        grid,
        calendar,
        recurrence,
        chart,
        gantt,
    }
    export class Web extends SP.SecurableObject {
        get_allowDesignerForCurrentUser(): bool;
        get_allowMasterPageEditingForCurrentUser(): bool;
        get_allowRevertFromTemplateForCurrentUser(): bool;
        get_allowRssFeeds(): bool;
        get_allProperties(): SP.PropertyValues;
        get_appInstanceId(): SP.Guid;
        get_associatedMemberGroup(): SP.Group;
        set_associatedMemberGroup(value: SP.Group): void;
        get_associatedOwnerGroup(): SP.Group;
        set_associatedOwnerGroup(value: SP.Group): void;
        get_associatedVisitorGroup(): SP.Group;
        set_associatedVisitorGroup(value: SP.Group): void;
        get_availableContentTypes(): SP.ContentTypeCollection;
        get_availableFields(): SP.FieldCollection;
        get_configuration(): number;
        get_contentTypes(): SP.ContentTypeCollection;
        get_created(): Date;
        get_currentUser(): SP.User;
        get_customMasterUrl(): string;
        set_customMasterUrl(value: string): void;
        get_description(): string;
        set_description(value: string): void;
        get_documentLibraryCalloutOfficeWebAppPreviewersDisabled(): bool;
        get_effectiveBasePermissions(): SP.BasePermissions;
        get_enableMinimalDownload(): bool;
        set_enableMinimalDownload(value: bool): void;
        get_eventReceivers(): SP.EventReceiverDefinitionCollection;
        get_features(): SP.FeatureCollection;
        get_fields(): SP.FieldCollection;
        get_folders(): SP.FolderCollection;
        get_id(): SP.Guid;
        get_language(): number;
        get_lastItemModifiedDate(): Date;
        get_lists(): SP.ListCollection;
        get_listTemplates(): SP.ListTemplateCollection;
        get_masterUrl(): string;
        set_masterUrl(value: string): void;
        get_navigation(): SP.Navigation;
        get_parentWeb(): SP.WebInformation;
        get_pushNotificationSubscribers(): SP.PushNotificationSubscriberCollection;
        get_quickLaunchEnabled(): bool;
        set_quickLaunchEnabled(value: bool): void;
        get_recycleBin(): SP.RecycleBinItemCollection;
        get_recycleBinEnabled(): bool;
        get_regionalSettings(): SP.RegionalSettings;
        get_roleDefinitions(): SP.RoleDefinitionCollection;
        get_rootFolder(): SP.Folder;
        get_saveSiteAsTemplateEnabled(): bool;
        set_saveSiteAsTemplateEnabled(value: bool): void;
        get_serverRelativeUrl(): string;
        set_serverRelativeUrl(value: string): void;
        get_showUrlStructureForCurrentUser(): bool;
        get_siteGroups(): SP.GroupCollection;
        get_siteUserInfoList(): SP.List;
        get_siteUsers(): SP.UserCollection;
        get_supportedUILanguageIds(): number[];
        get_syndicationEnabled(): bool;
        set_syndicationEnabled(value: bool): void;
        get_themeInfo(): SP.ThemeInfo;
        get_title(): string;
        set_title(value: string): void;
        get_treeViewEnabled(): bool;
        set_treeViewEnabled(value: bool): void;
        get_uIVersion(): number;
        set_uIVersion(value: number): void;
        get_uIVersionConfigurationEnabled(): bool;
        set_uIVersionConfigurationEnabled(value: bool): void;
        get_url(): string;
        get_userCustomActions(): SP.UserCustomActionCollection;
        get_webs(): SP.WebCollection;
        get_webTemplate(): string;
        get_workflowAssociations(): SP.Workflow.WorkflowAssociationCollection;
        get_workflowTemplates(): SP.Workflow.WorkflowTemplateCollection;
        doesUserHavePermissions(permissionMask: SP.BasePermissions): SP.BooleanResult;
        getUserEffectivePermissions(userName: string): SP.BasePermissions;
        mapToIcon(fileName: string, progId: string, size: SP.Utilities.IconSize): SP.StringResult;
        registerPushNotificationSubscriber(deviceAppInstanceId: SP.Guid, serviceToken: string): SP.PushNotificationSubscriber;
        unregisterPushNotificationSubscriber(deviceAppInstanceId: SP.Guid): void;
        getPushNotificationSubscribersByArgs(customArgs: string): SP.PushNotificationSubscriberCollection;
        getPushNotificationSubscribersByUser(userName: string): SP.PushNotificationSubscriberCollection;
        doesPushNotificationSubscriberExist(deviceAppInstanceId: SP.Guid): SP.BooleanResult;
        getPushNotificationSubscriber(deviceAppInstanceId: SP.Guid): SP.PushNotificationSubscriber;
        getUserById(userId: number): SP.User;
        getAvailableWebTemplates(lcid: number, doIncludeCrossLanguage: bool): SP.WebTemplateCollection;
        getCatalog(typeCatalog: number): SP.List;
        getChanges(query: SP.ChangeQuery): SP.ChangeCollection;
        applyWebTemplate(webTemplate: string): void;
        deleteObject(): void;
        update(): void;
        getFileByServerRelativeUrl(serverRelativeUrl: string): SP.File;
        getFolderByServerRelativeUrl(serverRelativeUrl: string): SP.Folder;
        getEntity(namespace: string, name: string): SP.BusinessData.Entity;
        getAppBdcCatalogForAppInstance(appInstanceId: SP.Guid): SP.BusinessData.AppBdcCatalog;
        getAppBdcCatalog(): SP.BusinessData.AppBdcCatalog;
        getSubwebsForCurrentUser(query: SP.SubwebQuery): SP.WebCollection;
        getAppInstanceById(appInstanceId: SP.Guid): SP.AppInstance;
        getAppInstancesByProductId(productId: SP.Guid): SP.ClientObjectList;
        loadAndInstallAppInSpecifiedLocale(appPackageStream: any[], installationLocaleLCID: number): SP.AppInstance;
        loadApp(appPackageStream: any[], installationLocaleLCID: number): SP.AppInstance;
        loadAndInstallApp(appPackageStream: any[]): SP.AppInstance;
        ensureUser(logonName: string): SP.User;
        applyTheme(colorPaletteUrl: string, fontSchemeUrl: string, backgroundImageUrl: string, shareGenerated: bool): void;
    }
    export class WebCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.Web;
        get_item(index: number): SP.Web;
        add(parameters: SP.WebCreationInformation): SP.Web;
    }
    export class WebCreationInformation extends SP.ClientValueObject {
        get_description(): string;
        set_description(value: string): void;
        get_language(): number;
        set_language(value: number): void;
        get_title(): string;
        set_title(value: string): void;
        get_url(): string;
        set_url(value: string): void;
        get_useSamePermissionsAsParentSite(): bool;
        set_useSamePermissionsAsParentSite(value: bool): void;
        get_webTemplate(): string;
        set_webTemplate(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class WebInformation extends SP.ClientObject {
        get_configuration(): number;
        get_created(): Date;
        get_description(): string;
        get_id(): SP.Guid;
        get_language(): number;
        get_lastItemModifiedDate(): Date;
        get_serverRelativeUrl(): string;
        get_title(): string;
        get_webTemplate(): string;
        get_webTemplateId(): number;
    }
    export class WebProxy {
        static invoke(context: SP.ClientRuntimeContext, requestInfo: SP.WebRequestInfo): SP.WebResponseInfo;
    }
    export class WebRequestInfo extends SP.ClientValueObject {
        get_body(): string;
        set_body(value: string): void;
        get_headers(): any;
        set_headers(value: any): void;
        get_method(): string;
        set_method(value: string): void;
        get_url(): string;
        set_url(value: string): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class WebResponseInfo extends SP.ClientValueObject {
        get_body(): string;
        set_body(value: string): void;
        get_headers(): any;
        set_headers(value: any): void;
        get_statusCode(): number;
        set_statusCode(value: number): void;
        get_typeId(): string;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        constructor();
    }
    export class WebTemplate extends SP.ClientObject {
        get_description(): string;
        get_displayCategory(): string;
        get_id(): number;
        get_imageUrl(): string;
        get_isHidden(): bool;
        get_isRootWebOnly(): bool;
        get_isSubWebOnly(): bool;
        get_lcid(): number;
        get_name(): string;
        get_title(): string;
    }
    export class WebTemplateCollection extends SP.ClientObjectCollection {
        itemAt(index: number): SP.WebTemplate;
        get_item(index: number): SP.WebTemplate;
        getByName(name: string): SP.WebTemplate;
    }

    export module Application {
        export module UI {
            export interface DefaultFormsInformationRequestor {
                onDefaultFormsInformationRetrieveSuccess(defaultForms: SP.Application.UI.DefaultFormsInformation): void;
                onDefaultFormsInformationRetrieveFailure(): void;
            }
            export class FormsInfo {
                ContentTypeName: string;
                NewFormUrl: string;
                DisplayFormUrl: string;
                EditFormUrl: string;
                constructor();
            }
            export class DefaultFormsInformation {
                DefaultForms: SP.Application.UI.FormsInfo;
                OtherForms: any;
                constructor();
            }
            export class DefaultFormsMenuBuilder {
                static getDefaultFormsInformation(requestor: SP.Application.UI.DefaultFormsInformationRequestor, listId: SP.Guid): void;
            }
            export class ViewSelectorMenuOptions {
                showRepairView: bool;
                showMergeView: bool;
                showEditView: bool;
                showCreateView: bool;
                showApproverView: bool;
                listId: string;
                viewId: string;
                viewParameters: string;
                constructor();
            }
            export interface ViewInformationRequestor {
                onViewInformationReturned(viewGroups: SP.Application.UI.ViewSelectorGroups): void;
            }
            export class ViewSelectorGroups {
                ModeratedViews: any;
                PublicViews: any;
                PersonalViews: any;
                OtherViews: any;
                DefaultView: SP.Application.UI.ViewSelectorMenuItem;
                ViewCreation: any;
                constructor();
            }
            export class ViewSelectorMenuItem {
                Text: string;
                ActionScriptText: string;
                NavigateUrl: string;
                ImageSourceUrl: string;
                Description: string;
                Id: string;
                Sequence: number;
                ItemType: string;
                GroupId: number;
                constructor();
            }
            export class ViewSelectorSubMenu {
                Text: string;
                ImageSourceUrl: string;
                SubMenuItems: any;
                constructor();
            }
            export class ViewSelectorMenuBuilder {
                static get_filterMenuItemsCallback(): (menuItems: any) => any;
                static set_filterMenuItemsCallback(value: (menuItems: any) => any): void;
                static showMenu(elem: HTMLElement, options: SP.Application.UI.ViewSelectorMenuOptions): void;
                static getViewInformation(requestor: SP.Application.UI.ViewInformationRequestor, options: SP.Application.UI.ViewSelectorMenuOptions): void;
            }
            export class MoreColorsPicker extends Sys.UI.Control {
                constructor(e: HTMLElement);
                initialize(): void;
                dispose(): void;
                get_colorValue(): string;
                set_colorValue(value: string): void;
            }
            export class MoreColorsPage extends Sys.UI.Control {
                constructor(e: HTMLElement);
                initialize(): void;
                dispose(): void;
                get_moreColorsPicker(): SP.Application.UI.MoreColorsPicker;
                set_moreColorsPicker(value: SP.Application.UI.MoreColorsPicker): void;
            }
            export class ThemeWebPage extends Sys.UI.Control {
                add_themeDisplayUpdated(value: (sender: any, e: Sys.EventArgs) => void ): void;
                remove_themeDisplayUpdated(value: (sender: any, e: Sys.EventArgs) => void ): void;
                constructor(e: HTMLElement);
                initialize(): void;
                dispose(): void;
                onThemeSelectionChanged(evt: Sys.UI.DomEvent): void;
                updateThemeDisplay(): void;
                get_thmxThemes(): any;
                set_thmxThemes(value: any): void;
            }
            export class WikiPageNameInPlaceEditor {
                constructor(ownerDoc: any, displayElemId: string, editElemId: string, editTextBoxId: string);
                editingPageCallback(): void;
                savingPageCallback(): void;
            }
        }
    }


    export module Analytics {
        export class AnalyticsUsageEntry extends SP.ClientObject {
            static logAnalyticsEvent(context: SP.ClientRuntimeContext, eventTypeId: number, itemId: string): void;
            static logAnalyticsEvent2(context: SP.ClientRuntimeContext, eventTypeId: number, itemId: string, rollupScopeId: SP.Guid, siteId: SP.Guid, userId: string): void;
            static logAnalyticsAppEvent(context: SP.ClientRuntimeContext, appEventTypeId: SP.Guid, itemId: string): void;
            static logAnalyticsAppEvent2(context: SP.ClientRuntimeContext, appEventTypeId: SP.Guid, itemId: string, rollupScopeId: SP.Guid, siteId: SP.Guid, userId: string): void;
        }
        export enum EventTypeId {
            none,
            first,
            view,
            recommendationView,
            recommendationClick,
            last,
        }
    }

    export module SiteHealth {
        export class SiteHealthResult extends SP.ClientValueObject {
            get_messageAsText(): string;
            get_ruleHelpLink(): string;
            get_ruleId(): SP.Guid;
            get_ruleIsRepairable(): bool;
            get_ruleName(): string;
            get_status(): SP.SiteHealth.SiteHealthStatusType;
            set_status(value: SP.SiteHealth.SiteHealthStatusType): void;
            get_timeStamp(): Date;
            set_timeStamp(value: Date): void;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
        export enum SiteHealthStatusType {
            passed,
            failedWarning,
            failedError,
        }
        export class SiteHealthSummary extends SP.ClientObject {
            get_failedErrorCount(): number;
            get_failedWarningCount(): number;
            get_passedCount(): number;
            get_results(): SP.SiteHealth.SiteHealthResult[];
        }
    }

}




declare module SP {
    export module BusinessData {
        export class AppBdcCatalog extends SP.ClientObject {
            getEntity(namespace: string, name: string): SP.BusinessData.Entity;
            getLobSystemProperty(lobSystemName: string, propertyName: string): SP.StringResult;
            setLobSystemProperty(lobSystemName: string, propertyName: string, propertyValue: string): void;
            getLobSystemInstanceProperty(lobSystemName: string, lobSystemInstanceName: string, propertyName: string): SP.StringResult;
            setLobSystemInstanceProperty(lobSystemName: string, lobSystemInstanceName: string, propertyName: string, propertyValue: string): void;
            getConnectionId(lobSystemName: string, lobSystemInstanceName: string): SP.StringResult;
            setConnectionId(lobSystemName: string, lobSystemInstanceName: string, connectionId: string): void;
            getPermissibleConnections(): string[];
        }
        export class Entity extends SP.ClientObject {
            get_estimatedInstanceCount(): number;
            get_name(): string;
            get_namespace(): string;
            getIdentifiers(): SP.BusinessData.Collections.EntityIdentifierCollection;
            getIdentifierCount(): SP.IntResult;
            getLobSystem(): SP.BusinessData.LobSystem;
            getCreatorView(methodInstanceName: string): SP.BusinessData.EntityView;
            getUpdaterView(updaterName: string): SP.BusinessData.EntityView;
            getFinderView(methodInstanceName: string): SP.BusinessData.EntityView;
            getSpecificFinderView(specificFinderName: string): SP.BusinessData.EntityView;
            getDefaultSpecificFinderView(): SP.BusinessData.EntityView;
            findSpecificDefault(identity: SP.BusinessData.Runtime.EntityIdentity, lobSystemInstance: SP.BusinessData.LobSystemInstance): SP.BusinessData.Runtime.EntityInstance;
            findSpecific(identity: SP.BusinessData.Runtime.EntityIdentity, specificFinderName: string, lobSystemInstance: SP.BusinessData.LobSystemInstance): SP.BusinessData.Runtime.EntityInstance;
            findSpecificDefaultByBdcId(bdcIdentity: string, lobSystemInstance: SP.BusinessData.LobSystemInstance): SP.BusinessData.Runtime.EntityInstance;
            findSpecificByBdcId(bdcIdentity: string, specificFinderName: string, lobSystemInstance: SP.BusinessData.LobSystemInstance): SP.BusinessData.Runtime.EntityInstance;
            findFiltered(filterList: SP.BusinessData.Collections.FilterCollection, nameOfFinder: string, lobSystemInstance: SP.BusinessData.LobSystemInstance): SP.BusinessData.Collections.EntityInstanceCollection;
            findAssociated(entityInstance: SP.BusinessData.Runtime.EntityInstance, associationName: string, filterList: SP.BusinessData.Collections.FilterCollection, lobSystemInstance: SP.BusinessData.LobSystemInstance): SP.BusinessData.Collections.EntityInstanceCollection;
            getFilters(methodInstanceName: string): SP.BusinessData.Collections.FilterCollection;
            execute(methodInstanceName: string, lobSystemInstance: SP.BusinessData.LobSystemInstance, inputParams: any[]): SP.BusinessData.MethodExecutionResult;
            getAssociationView(associationName: string): SP.BusinessData.EntityView;
            create(fieldValues: SP.BusinessData.Runtime.EntityFieldValueDictionary, lobSystemInstance: SP.BusinessData.LobSystemInstance): SP.BusinessData.Runtime.EntityIdentity;
            subscribe(eventType: SP.BusinessData.Runtime.EntityEventType, notificationCallback: SP.BusinessData.Runtime.NotificationCallback, onBehalfOfUser: string, subscriberName: string, lobSystemInstance: SP.BusinessData.LobSystemInstance): SP.BusinessData.Runtime.Subscription;
            unsubscribe(subscription: SP.BusinessData.Runtime.Subscription, onBehalfOfUser: string, unsubscriberName: string, lobSystemInstance: SP.BusinessData.LobSystemInstance): void;
        }
        export class EntityField extends SP.ClientObject {
            get_containsLocalizedDisplayName(): bool;
            get_defaultDisplayName(): string;
            get_localizedDisplayName(): string;
            get_name(): string;
        }
        export class EntityIdentifier extends SP.ClientObject {
            get_identifierType(): string;
            get_name(): string;
            getDefaultDisplayName(): SP.StringResult;
            containsLocalizedDisplayName(): SP.BooleanResult;
            getLocalizedDisplayName(): SP.StringResult;
        }
        export class EntityView extends SP.ClientObject {
            get_fields(): SP.BusinessData.Collections.EntityFieldCollection;
            get_name(): string;
            get_relatedSpecificFinderName(): string;
            getDefaultValues(): SP.BusinessData.Runtime.EntityFieldValueDictionary;
            getXmlSchema(): SP.StringResult;
            getTypeDescriptor(fieldDotNotation: string): SP.BusinessData.TypeDescriptor;
            getType(fieldDotNotation: string): SP.StringResult;
        }
        export class Filter extends SP.ClientObject {
            get_defaultDisplayName(): string;
            get_filterField(): string;
            get_filterType(): string;
            get_localizedDisplayName(): string;
            get_name(): string;
            get_valueCount(): number;
        }
        export class LobSystem extends SP.ClientObject {
            get_name(): string;
            getLobSystemInstances(): SP.BusinessData.Collections.LobSystemInstanceCollection;
        }
        export class LobSystemInstance extends SP.ClientObject {
            get_name(): string;
        }
        export class MethodExecutionResult extends SP.ClientObject {
            get_returnParameterCollection(): SP.BusinessData.ReturnParameterCollection;
        }
        export class ReturnParameterCollection extends SP.ClientObjectCollection {
            itemAt(index: number): SP.BusinessData.Runtime.EntityFieldValueDictionary;
            get_item(index: number): SP.BusinessData.Runtime.EntityFieldValueDictionary;
        }
        export class TypeDescriptor extends SP.ClientObject {
            get_containsReadOnly(): bool;
            get_isCollection(): bool;
            get_isReadOnly(): bool;
            get_name(): string;
            get_typeName(): string;
            containsLocalizedDisplayName(): SP.BooleanResult;
            getLocalizedDisplayName(): SP.StringResult;
            getDefaultDisplayName(): SP.StringResult;
            isRoot(): SP.BooleanResult;
            isLeaf(): SP.BooleanResult;
            getChildTypeDescriptors(): SP.BusinessData.Collections.TypeDescriptorCollection;
            getParentTypeDescriptor(): SP.BusinessData.TypeDescriptor;
        }
        export module Collections {
            export class EntityFieldCollection extends SP.ClientObjectCollection {
                itemAt(index: number): SP.BusinessData.EntityField;
                get_item(index: number): SP.BusinessData.EntityField;
            }
            export class EntityIdentifierCollection extends SP.ClientObjectCollection {
                itemAt(index: number): SP.BusinessData.EntityIdentifier;
                get_item(index: number): SP.BusinessData.EntityIdentifier;
            }
            export class EntityInstanceCollection extends SP.ClientObjectCollection {
                itemAt(index: number): SP.BusinessData.Runtime.EntityInstance;
                get_item(index: number): SP.BusinessData.Runtime.EntityInstance;
            }
            export class FilterCollection extends SP.ClientObjectCollection {
                itemAt(index: number): SP.BusinessData.Filter;
                get_item(index: number): SP.BusinessData.Filter;
                setFilterValue(inputFilterName: string, valueIndex: number, value: any): void;
            }
            export class LobSystemInstanceCollection extends SP.ClientObjectCollection {
                itemAt(index: number): SP.BusinessData.LobSystemInstance;
                get_item(index: number): SP.BusinessData.LobSystemInstance;
            }
            export class TypeDescriptorCollection extends SP.ClientObjectCollection {
                itemAt(index: number): SP.BusinessData.TypeDescriptor;
                get_item(index: number): SP.BusinessData.TypeDescriptor;
            }
        }

        export module Infrastructure {
            export class ExternalSubscriptionStore extends SP.ClientObject {
                constructor(context: SP.ClientRuntimeContext, web: SP.Web);
                static newObject(context: SP.ClientRuntimeContext, web: SP.Web): SP.BusinessData.Infrastructure.ExternalSubscriptionStore;
                indexStore(): void;
            }
        }

        export module Runtime {
            export enum EntityEventType {
                none,
                itemAdded,
                itemUpdated,
                itemDeleted,
            }
            export class EntityFieldValueDictionary extends SP.ClientObject {
                get_fieldValues(): any;
                get_item(fieldName: string): any;
                set_item(fieldName: string, value: any): void;
                refreshLoad(): void;
                fromXml(xml: string): void;
                toXml(): SP.StringResult;
                createInstance(fieldInstanceDotNotation: string, fieldDotNotation: string): void;
                createCollectionInstance(fieldDotNotation: string, size: number): void;
                getCollectionSize(fieldDotNotation: string): SP.IntResult;
            }
            export class EntityIdentity extends SP.ClientObject {
                get_fieldValues(): any;
                get_item(fieldName: string): any;
                constructor(context: SP.ClientRuntimeContext, identifierValues: any[]);
                get_identifierCount(): number;
                static newObject(context: SP.ClientRuntimeContext, identifierValues: any[]): SP.BusinessData.Runtime.EntityIdentity;
                refreshLoad(): void;
            }
            export class EntityInstance extends SP.ClientObject {
                get_fieldValues(): any;
                get_item(fieldName: string): any;
                set_item(fieldName: string, value: any): void;
                refreshLoad(): void;
                createInstance(fieldInstanceDotNotation: string, fieldDotNotation: string): void;
                createCollectionInstance(fieldDotNotation: string, size: number): void;
                getIdentity(): SP.BusinessData.Runtime.EntityIdentity;
                deleteObject(): void;
                update(): void;
                fromXml(xml: string): void;
                toXml(): SP.StringResult;
            }
            export class NotificationCallback extends SP.ClientObject {
                constructor(context: SP.ClientRuntimeContext, notificationEndpoint: string);
                get_notificationContext(): string;
                set_notificationContext(value: string): void;
                get_notificationEndpoint(): string;
                get_notificationForwarderType(): string;
                set_notificationForwarderType(value: string): void;
                static newObject(context: SP.ClientRuntimeContext, notificationEndpoint: string): SP.BusinessData.Runtime.NotificationCallback;
            }
            export class Subscription extends SP.ClientObject {
                constructor(context: SP.ClientRuntimeContext, id: any, hash: string);
                get_hash(): string;
                get_iD(): any;
                static newObject(context: SP.ClientRuntimeContext, id: any, hash: string): SP.BusinessData.Runtime.Subscription;
            }
        }
    }
}
declare module SP {
    export class SOD {
        static execute(fileName: string, functionName: string, args?: any[]): void;
        static executeFunc(fileName: string, functionName: string, fn: () => void): void;
        static executeOrDelayUntilEventNotified(func: () => void, eventName: string): bool;
        static executeOrDelayUntilScriptLoaded(func: () => void, depScriptFileName: string): bool;
        static notifyScriptLoadedAndExecuteWaitingJobs(scriptFileName: string): void;
        static notifyEventAndExecuteWaitingJobs(eventName: string): void;
        static registerSod(fileName: string, url: string): void;
        static registerSodDep(fileName: string, dependentFileName: string): void;
    }
}

/** Register function to rerun on partial update in MDS-enabled site.*/
declare function RegisterModuleInit(scriptFileName: string, initFunc: () => void ): void;

/** Provides access to url and query string parts.*/
declare class JSRequest {
    /** Query string parts.*/
    static QueryString: { [parameter: string]: string; };

    /** initializes class.*/
    static EnsureSetup(): void;

    /** Current file name (after last '/' in url).*/
    static FileName: string;

    /** Current file path (before last '/' in url).*/
    static PathName: string;
}

declare class _spPageContextInfo {
    static alertsEnabled: bool; //true
    static allowSilverlightPrompt: string; //"True"
    static clientServerTimeDelta: number; //-182
    static crossDomainPhotosEnabled: bool; //true
    static currentCultureName: string; //"ru-RU"
    static currentLanguage: number; //1049
    static currentUICultureName: string; //"ru-RU"
    static layoutsUrl: string;  //"_layouts/15"
    static pageListId: string;  //"{06ee6d96-f27f-4160-b6bb-c18f187b18a7}"
    static pagePersonalizationScope: string; //1
    static serverRequestPath: string; //"/SPTypeScript/Lists/ConditionalFormattingTasksList/AllItems.aspx"
    static siteAbsoluteUrl: string; // "https://gandjustas-7b20d3715e8ed4.sharepoint.com"
    static siteClientTag: string; //"0$$15.0.4454.1021"
    static siteServerRelativeUrl: string; // "/"
    static systemUserKey: string; //"i:0h.f|membership|10033fff84e7cb2b@live.com"
    static tenantAppVersion: string; //"0"
    static userId: number; //12
    static webAbsoluteUrl: string; //"https://gandjustas-7b20d3715e8ed4.sharepoint.com/SPTypeScript"
    static webLanguage: number; //1049
    static webLogoUrl: string; //"/_layouts/15/images/siteIcon.png?rev=23"
    static webPermMasks: { High: number; Low: number; };
    static webServerRelativeUrl: string; //"/SPTypeScript"
    static webTemplate: string; //"17"
    static webTitle: string; //"SPTypeScript"
    static webUIVersion: number; //15
}

declare function STSHtmlEncode(value: string): string;

declare function AddEvtHandler(element: HTMLElement, event:string, func: EventListener): void;

/** Gets query string parameter */
declare function GetUrlKeyValue(key: string): string;

declare module SP {
    export module Sharing {
        export class DocumentSharingManager {
            static getRoleDefinition(context: SP.ClientRuntimeContext, role: SP.Sharing.Role): SP.RoleDefinition;
            static isDocumentSharingEnabled(context: SP.ClientRuntimeContext, list: SP.List): SP.BooleanResult;
            static updateDocumentSharingInfo(context: SP.ClientRuntimeContext, resourceAddress: string, userRoleAssignments: SP.Sharing.UserRoleAssignment[], validateExistingPermissions: bool, additiveMode: bool, sendServerManagedNotification: bool, customMessage: string, includeAnonymousLinksInNotification: bool): SP.Sharing.UserSharingResult[];
        }
        export enum Role {
            none,
            view,
            edit,
            owner,
        }
        export class UserRoleAssignment extends SP.ClientValueObject {
            get_role(): SP.Sharing.Role;
            set_role(value: SP.Sharing.Role): void;
            get_userId(): string;
            set_userId(value: string): void;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
        export class UserSharingResult extends SP.ClientValueObject {
            get_allowedRoles(): SP.Sharing.Role[];
            get_currentRole(): SP.Sharing.Role;
            get_isUserKnown(): bool;
            get_message(): string;
            get_status(): bool;
            get_user(): string;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
    }

}

declare module SP {

    export module Social {
        /** Identifies an actor as a user, document, site, or tag. */
        export enum SocialActorType {
            user = 0,
            document = 1,
            site = 2,
            tag = 3
        }
        /** Specifies one or more actor types in a query to the server. */
        export enum SocialActorTypes {
            none = 0,
            users = 1,
            documents = 2,
            sites = 4,
            tags = 8,
            /** The set excludes documents and sites that do not have feeds. */
            excludeContentWithoutFeeds = 268435456,
            all = 15
        }
        /** Specifies whether the action is to navigate to the attachment or to perform some action dependent on the context in which the attachment is presented to the user. */
        export enum SocialAttachmentActionKind {
            /** This value specifies that the action is to navigate to the attachment. */
            navigate = 0,
            /** This value specifies that the action is dependent on the context that the attachment is displayed to the user. */
            adHocAction = 1
        }

        export enum SocialAttachmentKind {
            image = 0,
            video = 1,
            document = 2
        }

        /** Specifies whether the item being inserted is a user, document, site, tag, or link. */
        export enum SocialDataItemType {
            user = 0,
            document = 1,
            site = 2,
            tag = 3,
            link = 4
        }

        /** Specifies whether the overlay is a link or one or more actors. */
        export enum SocialDataOverlayType {
            link = 0,
            actors = 1
        }

        /** Specifies whether the sort order is by creation time or modification time. */
        export enum SocialFeedSortOrder {
            byModifiedTime = 0,
            byCreatedTime = 1
        }

        /** Identifies the kind of post to be retrieved.  */
        export enum SocialFeedType {
            personal = 0,
            news = 1,
            timeline = 2,
            likes = 3,
            everyone = 4
        }

        // For some reasons this enum doesn't exist
        //export enum SocialFollowResult {
        //    ok = 0,
        //    alreadyFollowing = 1,
        //    limitReached = 2,
        //    internalError = 3
        //}

        /** Provides information about the feed.
            This type provides information about whether the feed on the server contains additional threads that were not returned. */
        export enum SocialFeedAttributes {
            none = 0,
            moreThreadsAvailable = 1
        }

        /** Specifies attributes of the post, such as whether the current user can like or delete the post. */
        export enum SocialPostAttributes {
            none = 0,
            canLike = 1,
            canDelete = 2,
            useAuthorImage = 4,
            useSmallImage = 8,
            canFollowUp = 16
        }

        /** Defines the type of item being specified in the SocialPostDefinitionDataItem.
            This type is only available in server-to-server calls. */
        export enum SocialPostDefinitionDataItemType {
            text = 0,
            user = 1,
            document = 2,
            site = 3,
            tag = 4,
            link = 5
        }

        export enum SocialPostType {
            root = 0,
            reply = 1
        }

        /** Specifies a status or error code. */
        export enum SocialStatusCode {
            OK = 0,
            /** This value specifies that an invalid request was encountered. */
            invalidRequest = 1,
            /** This value specifies that access was denied to the current user. */
            accessDenied = 2,
            itemNotFound = 3,
            /** This value specifies that an invalid operation was attempted. */
            invalidOperation = 4,
            /** This value specifies that the item was not changed by the operation. */
            itemNotModified = 5,
            internalError = 6,
            /** This value specifies that there was an error reading the cache. */
            cacheReadError = 7,
            /** This value specifies that there was an error updating the cache. */
            cacheUpdateError = 8,
            personalSiteNotFound = 9,
            failedToCreatePersonalSite = 10,
            notAuthorizedToCreatePersonalSite = 11,
            cannotCreatePersonalSite = 12,
            /** This value specifies that a server limit was reached. */
            limitReached = 13,
            /** This value specifies that the operation failed because there was an error handling an attachment. */
            attachmentError = 14,
            /** This value specifies that the operation completed with recoverable errors and that the returned data is incomplete. */
            partialData = 15,
            /** This value specifies that the operation failed because a required server feature was disabled by administrative action. */
            featureDisabled = 16
        }

        /** Specifies properties of the thread. */
        export enum SocialThreadAttributes {
            none = 0,
            isDigest = 1,
            canReply = 2,
            canLock = 4,
            isLocked = 8,
            replyLimitReached = 16
        }

        export enum SocialThreadType {
            normal = 0,
            likeReference = 1,
            replyReference = 2,
            mentionReference = 3,
            tagReference = 4
        }

        /** Contains information about an actor retrieved from server. An actor is a user, document, site, or tag. */
        export class SocialActor extends SP.ClientValueObject {
            /** The AccountName property returns the user account name. 
                This property is only available for social actors of type "user". */
            get_accountName(): string;
            /** Identifies whether the actor is a user, document, site, or tag. */
            get_actorType(): SocialActorType;
            /** Specifies whether the actor can be followed by the current user. */
            get_canFollow(): bool;
            /** Returns the URI of the document or site content.
                This property is only available for social actors of type Document or Site. */
            get_contentUri(): string;
            get_emailAddress(): string;
            /** Returns the URI of the user's followed content folder.
                This property is only available for social actors of type "user". */
            get_followedContentUri(): string;
            /** Returns the actor's unique identifier. */
            get_id(): string;
            /** Returns the URI of the image representing the actor.
                This property is only available if actor is User, Document, or Site. */
            get_imageUri(): string;
            /** Returns true if the current user is following the actor; otherwise, it returns false. */
            get_isFollowed(): bool;
            /** Returns the URI of the library containing the document.
                This property is only available for social actors of type "document". */
            get_libraryUri(): string;
            /** The Name property returns the actor's display name. */
            get_name(): string;
            /** Returns the URI of the user's personal site.
                This property is only available for social actors of type "user". */
            get_personalSiteUri(): string;
            /** Represents the status of retrieving the actor */
            get_status(): SocialStatusCode;
            /** The StatusText property returns the most recent post of the user. 
                This property is only available for social actors of type "user". */
            get_statusText(): string;
            /** Returns the GUID of the tag.
                Only available for social actors of type "tag" */
            get_tagGuid(): string;
            /** Returns the user's title
                This property is only available for social actors of type "user". */
            get_title(): string;
            /** Returns the URI of the actor. */
            get_uri(): string;
        }

        /** Identifies an actor to the server. An actor can be a user, document, site, or tag. */
        export class SocialActorInfo extends SP.ClientValueObject {
            /** User account name. 
                This property is only available for social actors of type "user". */
            get_accountName(): string;
            /** User account name. 
                This property is only available for social actors of type "user". */
            set_accountName(value: string): string;
            /** Identifies whether the actor is a user, document, site, or tag. */
            get_actorType(): SocialActorType;
            /** Identifies whether the actor is a user, document, site, or tag. */
            set_actorType(value: SocialActorType): SocialActorType;
            /** URI of the document or site content.
                This property is only available for social actors of type Document or Site. */
            get_contentUri(): string;
            /** URI of the document or site content.
                This property is only available for social actors of type Document or Site. */
            set_contentUri(value: string): string;
            /** Actor's unique identifier. */
            get_id(): string;
            /** Actor's unique identifier. */
            set_id(value: string): string;
            /** GUID of the tag.
                Only available for social actors of type "tag" */
            get_tagGuid(): string;
            /** GUID of the tag.
                Only available for social actors of type "tag" */
            set_tagGuid(value: string): string;
        }

        /** Represents an image, document preview, or video preview attachment.  */
        export class SocialAttachment extends SP.ClientValueObject {
            /** Specifies the type of object that the attachment contains. */
            get_attachmentKind(): SocialAttachmentKind;
            /** Specifies the type of object that the attachment contains. */
            set_attachmentKind(value: SocialAttachmentKind): SocialAttachmentKind;
            /** Specifies the action to take when the user selects the attachment.
                This property is only present if the AttachmentKind is Video. */
            get_clickAction(): SocialAttachmentAction;
            /** Specifies the action to take when the user selects the attachment.
                This property is only present if the AttachmentKind is Video. */
            set_clickAction(value: SocialAttachmentAction): SocialAttachmentAction;
            /** Specifies the URI of the attachment content. */
            get_contentUri(): string;
            /** Specifies the URI of the attachment content. */
            set_contentUri(value: string): string;
            /** Provides a text description of the attachment. */
            get_description(): string;
            /** Provides a text description of the attachment. */
            set_description(value: string): string;
            /** Specifies the height of the attachment or of the attachment preview. */
            get_height(): number;
            /** Specifies the height of the attachment or of the attachment preview. */
            set_height(value: number): number;
            /** Specifies the duration of the attachment in seconds. This property is only present if the AttachmentKind is Video. */
            get_length(): number;
            /** Specifies the duration of the attachment in seconds. This property is only present if the AttachmentKind is Video. */
            set_length(value: number): number;
            /** Provides the attachment name. */
            get_name(): string;
            /** Provides the attachment name. */
            set_name(value: string): string;
            /** Specifies the URI of the attachment�s preview thumbnail.
                This property is only present if the AttachmentKind is Document or Video. */
            get_previewUri(): string;
            /** Specifies the URI of the attachment�s preview thumbnail.
                This property is only present if the AttachmentKind is Document or Video. */
            set_previewUri(value: string): string;
            /** Provides the attachment URI. */
            get_uri(): string;
            /** Provides the attachment URI. */
            set_uri(value: string): string;
            /** Specifies the width of the attachment or of the attachment preview. */
            get_width(): number;
            /** Specifies the width of the attachment or of the attachment preview. */
            set_width(value: number): number;
        }
        /** Specifies the user actions that are allowed for the attachment object. */
        export class SocialAttachmentAction extends SP.ClientValueObject {
            /** Specifies whether the action is to navigate to a URI or an action that is dependent on the context in which the object is presented to the user. */
            get_actionKind(): SocialAttachmentActionKind;
            /** Specifies whether the action is to navigate to a URI or an action that is dependent on the context in which the object is presented to the user. */
            set_actionKind(value: SocialAttachmentActionKind): SocialAttachmentActionKind;
            /** Specifies the URI associated with the action. */
            get_actionUri(): string;
            /** Specifies the URI associated with the action. */
            set_actionUri(value: string): string;
        }

        /** Defines a user, document, site, tag, or link to be inserted in a new post.
            The SocialPostCreationData class defines the content text that contains substitution strings.
            Each substitution string is replaced by a SocialDataItem value. */
        export class SocialDataItem extends SP.ClientValueObject {
            /** Identifies the user.  */
            get_accountName(): string;
            /** Identifies the user.  */
            set_accountName(value: string): string;
            /** Specifies whether the item being inserted is a user, document, site, tag, or link. */
            get_itemType(): SocialDataItemType;
            /** Specifies whether the item being inserted is a user, document, site, tag, or link. */
            set_itemType(value: SocialDataItemType): SocialDataItemType;
            /** Identifies the tag.  */
            get_tagGuid(): string;
            /** Identifies the tag.  */
            set_tagGuid(value: string): string;
            /** Specifies the plain text to be inserted in the created post. The server can use the specified text or can use text that identifies the item, for example the name specified in a user profile.  */
            get_text(): string;
            /** Specifies the plain text to be inserted in the created post. The server can use the specified text or can use text that identifies the item, for example the name specified in a user profile.  */
            set_text(value: string): string;
            /** Identifies the site, document, or link.  */
            get_uri(): string;
            /** Identifies the site, document, or link.  */
            set_uri(value: string): string;
        }

        /** Provides information about an overlay.
            An overlay is a substring in a post that represents a user, document, site, tag, or link. 
            The SocialPost class contains an array of SocialDataOverlay objects.
            Each of the SocialDataOverlay objects specifies a link or one or more actors. */
        export class SocialDataOverlay extends SP.ClientValueObject {
            /** Specifies one or more actors as an array of integers where each integer specifies an index into the SocialThreadActors array.
                This property is only available if the get_overlayType() has a value of SocialDataOverlayType.actors. */
            get_actorIndexes(): number[];
            /** The Index property specifies the starting position of the overlay in the SocialPostText string  */
            get_index(): number;
            /** The Length property specifies the number of characters in the overlay.  */
            get_length(): number;
            /** The LinkUri property specifies the URI of the link.
                This property is only available if the get_overlayType() has a value of SocialDataOverlayType.link.  */
            get_linkUri(): string;
            /** Specifies whether the overlay is a link or one or more actors. */
            get_overlayType(): SocialDataOverlayType;
        }

        /** Specifies information about errors that the server has encountered. */
        export class SocialExceptionDetails extends SP.ClientValueObject {
            get_internalErrorCode(): number;
            get_internalMessage(): string;
            get_internalStackTrace(): string;
            /** Specifies a type name associated with the internal error if a type name is available. */
            get_internalTypeName(): string;
            get_status(): SocialStatusCode;
        }

        /** Specifies a feed, which contains an array of SocialThreads, each of which specifies a root SocialPost object and an array of response SocialPost objects. */
        export class SocialFeed extends SP.ClientValueObject {
            /** Specifies attributes of the returned feed.
                The attributes specify if the requested feed has additional threads that were not included in the returned thread. */
            get_attributes(): SocialFeedAttributes;
            /** Returns the date-time of the most recent post that was requested.
                The most recent post that was requested can be removed from the feed if the current user does not have access to it.
                Consequently, the feed does not always contain the post with the date specified in this property. */
            get_newestProcessed(): string;
            /** The OldestProcessed property returns the date-time of the oldest post that was requested. 
                The oldest post that was requested can be removed from the feed if the current user does not have access to it. 
                Consequently, the feed does not always contain the post with the date specified in this property */
            get_oldestProcessed(): string;
            /** Contains the social threads in the feed. */
            get_threads(): SocialThread[];
            /** Returns the number of mentions of the current user that have been added to the feed on the server since the time that the unread mention count was cleared for the current user. */
            get_unreadMentionCount(): number;
        }

        /** Provides access to social feeds.
            It provides methods to create posts, delete posts, read posts, and perform other operations on posts. */
        export class SocialFeedManager extends SP.ClientObject {
            constructor();
            /** Returns the current user */
            get_owner(): SocialActor;
            /** Specifies the URI of the personal site portal. */
            get_personalSitePortalUri(): string;
            /** Creates a post in the current user's newsfeed, in the specified user's feed, or in the specified thread. 
                This method returns a new or a modified thread.
                @param targetId Optional, specifies the target of the post.
                                If this parameter is null, the post is created as a root post in the current user's feed.
                                If this parameter is set to a site URL or a site actor identification, the post is created as a root post in the specified site feed.
                                If this parameter is set to a thread identification, the post is created as a reply post in the specified thread.
                @param creationData Specifies the format and content of the post. */
            createPost(targetId: string, creationData: SocialPostCreationData): SocialThread;
            /** Deletes the specified post.
                This method returns a digest of the modified thread.
                If the entire thread is deleted, this method returns null.
                If the post being deleted is the root post of a thread, all reply posts are also deleted.
                @param postId   Specifies the post to be deleted.
                                Corresponds the value returned from SocialPost.get_id(). */
            deletePost(postId: string): SocialThread;
            /** Returns the set of users who have liked the specified post.
                @param postId   Specifies the post being queried for information about users that like the post.
                                Corresponds the value returned from SocialPost.get_id().*/
            getAllLikers(postId: string): SocialActor[];
            /** Returns a feed for the current user.
                The feed consists of an array of message threads.
                Each thread consists of a root post and an array of reply posts. */
            getFeed(type: SocialFeedType, options: SocialFeedOptions): SocialFeed;
            /** Returns the public feed for a user or for a site.
                The feed lists activity by the user and posts created by the server for that user.
                For example, the feed can include posts indicating the user's birthday or indicating that the user liked a post.
                @param actorId  Corresponds to the value returned by SocialActor.get_id().
                                If the actorId specifies the current user, this method returns the public feed for the current user. */
            getFeedFor(actorId: string, options: SocialFeedOptions): SocialFeed;
            /** Returns the root post and all reply posts in the thread. */
            getFullThread(threadId: string): SocialThread;
            /** Returns a feed containing mention reference threads from the current user's personal feed. */
            getMentions(clearUnreadMentions: bool, options: SocialFeedOptions): SocialFeed;
            /** Returns the server's count of unread mentions of the current user. 
                The server maintains a count of unread mentions in posts, but does not track which mentions have been read. 
                When a new mention is stored on the server, it increments the unread mention for the user specified by the mention. 
                The unread mention count is cleared by the GetMentions method. */
            getUnreadMentionCount(): SP.IntResult;
            /** Specifies that the current user likes the specified post. 
                Returns a digest thread containing the specified post. 
                A digest thread contains the root post and a selection of reply posts */
            likePost(postId: string): SocialThread;
            /** Specifies that the current user does not like the specified post. 
                Returns a digest thread containing the specified post.  */
            unlikePost(postId: string): SocialThread;
            /** Prevents any user from adding a new reply post to the specified thread. 
                Once a thread is locked, no new reply posts can be added until after the thread has been unlocked with the unlockThread method.
                This method returns a digest of the locked thread */
            lockThread(threadId: string): SocialThread;
            /** Allows users to add new reply posts to the specified thread. */
            unlockThread(threadId: string): SocialThread;
            /** Suppresses activity notifications for the current user of updates to the specified thread. */
            suppressThreadNotifications(threadId: string): void;
            /** Creates an image attachment for a future post. */
            createImageAttachment(name: string, description: string, imageData: any): SocialAttachment;
            /** Generates a preview for the content specified by the URL. */
            getPreview(itemUrl: string): SocialAttachment;
            /** Returns the preview image data for an image attachment.
                @param url Specifies the URL of the preview image relative to the personal site portal.
                @param key Specifies the URL-encoded key to decrypt the image.
                @param iv Specifies the URL-encoded initialization vector for decrypting the image. */
            getPreviewImage(url: string, key: string, iv: string): any;
        }

        export class SocialFeedOptions extends SP.ClientObject {
            get_maxThreadCount(): number;
            set_maxThreadCount(value: number): number;
            get_newerThan(): string;
            set_newerThan(value: string): string;
            get_olderThan(): string;
            set_olderThan(value: string): string;
            get_sortOrder():SocialFeedSortOrder;
            set_sortOrder(value: SocialFeedSortOrder): SocialFeedSortOrder;
        }

        /** Provides properties and methods for managing a user's list of followed actors.
            Actors can be users, documents, sites, and tags. */
        export class SocialFollowingManager extends SP.ClientObject {
            constructor(context: SP.ClientRuntimeContext);
            /** URI to a site  that lists the current user's followed documents. */
            get_followedDocumentsUri(): string;
            /** URI to a site  that lists the current user's followed sites. */
            get_followedSitesUri(): string;
            /** Adds the specified actor to the current user's list of followed items.
                Returns one of the following values, wrapped into the SP.IntResult object:
                0 = ok, 
                1 = alreadyFollowing, 
                2 = limitReached, 
                3 = internalError */
            follow(actor: SocialActorInfo): SP.IntResult;
            stopFollowing(actor: SocialActorInfo): SP.BooleanResult;
            isFollowed(actor: SocialActorInfo): SP.BooleanResult;
            getFollowed(types: SocialActorTypes): SocialActor[];
            getFollowedCount(types: SocialActorTypes): SP.IntResult;
            /** Returns the users who are followers of the current user. */
            getFollowers(): SocialActor[];
            getSuggestions(): SocialActor[];
        }

        /** Defines a link that includes a URI and text representation.
            This class is used to represent the location of a web site.  */
        export class SocialLink extends SP.ClientValueObject {
            get_text(): string;
            set_text(value: string): string;
            get_uri(): string;
            set_uri(value: string): string;
        }

        /** Specifies a post read from the server. */
        export class SocialPost extends SP.ClientValueObject {
            /** Specifies an image, document preview, or video preview attachment */
            get_attachment(): SocialAttachment;
            /** Describes attributes about the post, such as whether the current user can delete or like the post.  */
            get_attributes(): SocialPostAttributes;
            /** Specifies the author of the post as an index to the social thread's Actors array. */
            get_authorIndex(): number;
            /** Specifies the date and time that the post was created on the server. */
            get_createdTime(): string;
            /** Specifies the unique identifier of the post. */
            get_id(): string;
            /** Specifies information about users who like the post. */
            get_likerInfo(): SocialPostActorInfo;
            /** Specifies the date and time that the post was last modified on the server. */
            get_modifiedTime(): string;
            /** An array of objects in a post, where each object represents a user, document, site, tag, or link. */
            get_overlays(): SocialDataOverlay[];
            /** Specifies whether a post is the root post or a reply post in a thread */
            get_postType(): SocialPostType;
            /** Specifies the URI of the image to be displayed with the post.  */
            get_preferredImageUri(): string;
            /** Specifies the link to a web site associated with the application that created the post. */
            get_source(): SocialLink;
            /** Specifies the text of the post. */
            get_text(): string;
        }

        /** Specifies a set of users, documents, sites, and tags by an index into the SocialThreadActors array  */
        export class SocialPostActorInfo extends SP.ClientValueObject {
            get_includesCurrentUser(): bool;
            /** Specifies an array of indexes into the SocialThreadActors array.
                The server can choose to return a limited set of actors. For example, the server can choose to return a subset of the users that like a post. */
            get_indexes(): number[];
            get_totalCount(): number;
        }

        /** Specifies the content of a post in the SocialFeedManager.createPost method.
            The post consists of a text message, which can optionally include social tags, mentions of users, and links. */
        export class SocialPostCreationData extends SP.ClientValueObject {
            /** Specifies an image, document preview, or video preview to be used in the post. */
            get_attachment(): SocialAttachment;
            /** Specifies an image, document preview, or video preview to be used in the post. */
            set_attachment(value: SocialAttachment): SocialAttachment;
            /** Specifies an array consisting of social tags, user mentions, links to documents, links to sites, and generic links.
                Each element in the array is inserted into the ContentText string if there is a substitution reference to the array element in the string. */
            get_contentItems(): SocialDataItem;
            /** Specifies an array consisting of social tags, user mentions, links to documents, links to sites, and generic links.
                Each element in the array is inserted into the ContentText string if there is a substitution reference to the array element in the string. */
            set_contentItems(value: SocialDataItem): SocialDataItem;
            /** Contains the text body of the post. */
            get_contentText(): string;
            /** Contains the text body of the post.
                It can optionally contain one or more substitution references to elements in the zero-based ContentItems array.
                A substitution reference consists of a series of characters that consist of an open-brace character ({) followed by one of more digits in the range 0 to 9 and terminated by a close-brace character (}).
                The substitution reference is replaced by the text value of the element in the in the array at the offset specified by the value of the digits.
                For example, the text string "{0}" is replaced by the first element in the ContentItems array. */
            set_contentText(value: string): string;
            /** Specifies additional information when creating server-generated posts */
            get_definitionData(): SocialPostDefinitionData;
            /** Specifies additional information when creating server-generated posts */
            set_definitionData(value: SocialPostDefinitionData): SocialPostDefinitionData;
            /** Specifies the link to a web site associated with the application that created the post */
            get_source(): SocialLink;
            /** Specifies the link to a web site associated with the application that created the post */
            set_source(value: SocialLink): SocialLink;
            /** Specifies that access to the post SHOULD be restricted to users that have access to the objects identified by the array of URIs */
            get_securityUris(): string[];
            /** Specifies that access to the post SHOULD be restricted to users that have access to the objects identified by the array of URIs */
            set_securityUris(value: string[]): string[];
            /** Indicates whether the post is to be used as the current user's new status message. */
            get_updateStatusText(): bool;
            /** Indicates whether the post is to be used as the current user's new status message. */
            set_updateStatusText(value: bool): bool;
        }

        /** Provides additional information about server-generated posts.
            This type can only be specified in a server-to-server call. */
        export class SocialPostDefinitionData extends SP.ClientValueObject {
            get_items(): SocialPostDefinitionDataItem[];
            set_items(value: SocialPostDefinitionDataItem[]): SocialPostDefinitionDataItem[];
            get_name(): string;
            set_name(value: string): string;
        }

        /** Specifies an item to be inserted in a post by replacing a token in the post definition.
            This type can only be specified in a server-to-server call. */
        export class SocialPostDefinitionDataItem extends SP.ClientValueObject {
            /** Specifies the name of the user.
                This property is only used if the ItemType property specifies that the item is a User. */
            get_accountName(): string;
            /** Specifies the name of the user.
                This property is only used if the ItemType property specifies that the item is a User. */
            set_accountName(value: string): string;
            /** Specifies whether the item being formatted is a text element, a user, a document, a site, a tag, or a link. */
            get_itemType(): SocialPostDefinitionDataItemType;
            /** Specifies whether the item being formatted is a text element, a user, a document, a site, a tag, or a link. */
            set_itemType(value: SocialPostDefinitionDataItemType): SocialPostDefinitionDataItemType;
            /** Specifies the post definition token to be replaced by the item */
            get_placeholderName(): string;
            /** Specifies the post definition token to be replaced by the item */
            set_placeholderName(value: string): string;
            /** Specifies the GUID that identifies the tag.
                This property is only used if the ItemType property specifies that the item is a Tag. */
            get_tagGuid(): string;
            /** Specifies the GUID that identifies the tag.
                This property is only used if the ItemType property specifies that the item is a Tag. */
            set_tagGuid(value: string): string;
            /** Specifies the text that is substituted for the placeholder */
            get_text(): string;
            /** Specifies the text that is substituted for the placeholder */
            set_text(value: string): string;
            /** Specifies the URI of the document, site, or link. 
                This property is only available if the ItemType property specifies that the item is a Document, Link, or Site. */
            get_uri(): string;
            /** Specifies the URI of the document, site, or link. 
                This property is only available if the ItemType property specifies that the item is a Document, Link, or Site. */
            set_uri(value: string): string;
        }

        /** Specifies a reference to a post in another thread.
            The referenced post can be a post with a tag, a post that is liked, a post that mentions a user, or a post that is a reply. */
        export class SocialPostReference extends SP.ClientValueObject {
            /** Provides a digest of the thread containing the referenced post */
            get_digest(): SocialThread;
            get_post(): SocialPost;
            /** Specifies the unique identifier of the thread containing the referenced post. */
            get_threadId(): string;
            /** Specifies the current owner of the thread as an index into the SocialThreadActors array. */
            get_threadOwnerIndex(): number;
        }

        /** Specifies a thread that is stored on the server.
            The thread contains a root post and zero or more reply posts. */
        export class SocialThread extends SP.ClientValueObject {
            /** Specifies the users who have created a post in the returned thread and also contains any users, documents, sites, and tags that are referenced in any of the posts in the returned thread. */
            get_actors(): SocialActor[];
            /** Specifies attributes of the thread, such as whether the current user can reply or lock the thread and whether the thread is a digest of a thread on the server, whether the number of replies has reached the maximum, and whether the thread is locked. */
            get_attributes(): SocialThreadAttributes;
            /** Specifies the unique identification of the thread. */
            get_id(): string;
            /** Specifies the thread owner as an index into the Actors array.
                Typically, the thread owner is the user who created the root post, but the thread owner can be any user included in the Actors array. */
            get_ownerIndex(): number;
            /** Specifies a URI that is a permanent reference to the thread, if such a permanent reference is available.  */
            get_permalink(): string;
            /** Specifies a reference to a post in another thread.
                The PostReference property is available only if the ThreadType has a value of ReplyReference, LikeReference, MentionReference, or TagReference.  */
            get_postReference(): SocialPostReference;
            /** Returns an array of zero or more reply posts.
                The server can return a subset of the reply posts that are stored on the server. */
            get_replies(): SocialPost[];
            get_rootPost(): SocialPost;
            /** Provides information about conditions that were encountered retrieving the thread that did not prevent the operation from completing. */
            get_status(): SocialStatusCode;
            /** Specifies if the thread is a normal thread created by one or more CreatePost calls or a reference post generated by the server when a user replies to a post, likes a post, or creates a post with a tag or mention */
            get_threadType(): SocialThreadType;
            get_totalReplyCount(): number;
        }

    }

}
declare module SP {
    declare module Taxonomy {
        export enum StringMatchOption {
            startsWith = 0,
            exactMatch = 1
        };

        export enum ChangeItemType {
            unknown = 0,
            term = 1,
            termSet = 2,
            group = 3,
            termStore = 4,
            site = 5
        };

        export enum ChangeOperationType {
            unknown = 0,
            add = 1,
            edit = 2,
            deleteObject = 3,
            move = 4,
            copy = 5,
            pathChange = 6,
            merge = 7,
            importObject = 8,
            restore = 9
        };


        export class TaxonomySession extends SP.ClientObject {
            static getTaxonomySession(context: SP.ClientContext): TaxonomySession;
            get_offlineTermStoreNames(): string[];
            get_termStores(): TermStoreCollection;
            getTerms(termLabel: string, trimUnavailable: bool): TermCollection;
            getTerms(labelMatchInformation: LabelMatchInformation): TermCollection;
            updateCache(): void;
            getTerm(guid: SP.Guid): Term;
            getTermsById(termIds: SP.Guid[]): TermCollection;
            getTermsInDefaultLanguage(
                termLabel: string,
                defaultLabelOnly: bool,
                stringMatchOption: StringMatchOption,
                resultCollectionSize: number,
                trimUnavailable: bool,
                trimDeprecated: bool): TermCollection;

            getTermsInWorkingLocale(
                termLabel: string,
                defaultLabelOnly: bool,
                stringMatchOption: StringMatchOption,
                resultCollectionSize: number,
                trimUnavailable: bool,
                trimDeprecated: bool): TermCollection;

            getTermsWithCustomProperty(customPropertyName: string, trimUnavailable: bool): TermCollection;
            getTermsWithCustomProperty(customPropertyMatchInformation: CustomPropertyMatchInformation): TermCollection;
            getTermSetsByName(termSetName: string, lcid: number): TermSetCollection;
            getTermSetsByTermLabel(requiredTermLabels: string[], lcid: number): TermSetCollection;
            getDefaultKeywordsTermStore(): TermStore;
            getDefaultSiteCollectionTermStore(): TermStore;
        }

        export class TermStoreCollection extends SP.ClientObjectCollection {
            itemAt(index: number): TermStore;
            get_item(index: number): TermStore;
            getById(id: SP.Guid): TermStore;
            getByName(name: string): TermStore;
        }

        export class TermStore extends SP.ClientObject {
            get_contentTypePublishingHub(): string;
            get_defaultLanguage(): number;
            set_defaultLanguage(value: number): void;
            get_groups(): TermGroupCollection;
            get_hashTagsTermSet(): TermSet;
            get_id(): SP.Guid;
            get_isOnline(): bool;
            get_keywordsTermSet(): TermSet;
            get_languages(): number[];
            get_name(): string;
            get_orphanedTermsTermSet(): TermSet;
            get_systemGroup(): TermGroup;
            get_workingLanguage(): number;
            set_workingLanguage(value: number): void;

            addLanguage(lcid: number): void;
            commitAll(): void;
            createGroup(name: string): TermGroup;
            createGroup(name: string, groupId: SP.Guid): TermGroup;

            deleteLanguage(lcid: number): void;

            getChanges(changeInformation: ChangeInformation): ChangedItemCollection;

            getGroup(id: SP.Guid): TermGroup;
            getTerm(termId: SP.Guid): Term;
            getTermInTermSet(termSetId: SP.Guid, termId: SP.Guid): Term;
            getTermsById(termIds: SP.Guid[]): TermCollection;
            getTerms(termLabel: string, trimUnavailable: bool): TermCollection;
            getTerms(labelMatchInformation: LabelMatchInformation): TermCollection;
            getTermSetsByName(termSetName: string, lcid: number): TermSetCollection;
            getTermSetsByTermLabel(requiredTermLabels: string[], lcid: number): TermSetCollection;
            getTermsWithCustomProperty(customPropertyName: string, trimUnavailable: bool): TermCollection;
            getTermsWithCustomProperty(customPropertyMatchInformation: CustomPropertyMatchInformation): TermCollection;

            getTermSet(termSetId: SP.Guid): TermSet;
            getTermSetsWithCustomProperty(customPropertyMatchInformation: CustomPropertyMatchInformation): TermSetCollection;
            rollbackAll(): void;
            updateCache(): void;
            getSiteCollectionGroup(currentSite: SP.Site, createIfMissing: bool): TermGroup;
            updateUsedTermsOnSite(currentSite: SP.Site): void;
        }

        export class TaxonomyItem extends SP.ClientObject {
            static normalizeName(context: SP.ClientContext, name: string): SP.StringResult;
            get_createdDate(): Date;
            get_id(): SP.Guid;
            get_lastModifiedDate(): Date;
            get_name(): string;
            set_name(value: string): void;
            get_termStore(): TermStore;
            deleteObject(): void;
        }

        export class TermGroupCollection extends SP.ClientObjectCollection {
            itemAt(index: number): TermGroup;
            get_item(index: number): TermGroup;
            getById(id: SP.Guid): TermGroup;
            getByName(name: string): TermGroup;
        }

        export class TermGroup extends TaxonomyItem {
            get_description(): string;
            set_description(value: string): void;
            get_isSiteCollectionGroup(): bool;
            get_isSystemGroup(): bool;
            get_termSets(): TermSetCollection;
            createTermSet(name: string, newTermSetId: SP.Guid, lcid: number): TermSet;
            exportObject(): SP.StringResult;
            getChanges(changeInformation: ChangeInformation): ChangedItemCollection;
            getTermSetsWithCustomProperty(customPropertyMatchInformation: CustomPropertyMatchInformation): TermSetCollection;
        };

        export class TermSetItem extends TaxonomyItem {
            get_customProperties(): { [key: string]: string; };
            get_customSortOrder(): string;
            set_customSortOrder(value: string): void;
            get_isAvailableForTagging(): bool;
            set_isAvailableForTagging(value: bool): void;
            get_owner(): string;
            set_owner(value: string): void;
            get_terms(): TermCollection;
            createTerm(name: string, lcid: number, newTermId: SP.Guid): Term;
            /*getTerms(pagingLimit: number): TermCollection;*/ //Moved to descendants to void TypeScript errors
            reuseTerm(sourceTerm: Term, reuseBranch: bool): Term;
            reuseTermWithPinning(sourceTerm: Term): Term;
            deleteCustomProperty(name: string): void;
            deleteAllCustomProperties(): void;
            setCustomProperty(name: string, value: string): void;
        }

        export class TermSetCollection extends SP.ClientObjectCollection {
            itemAt(index: number): TermSet;
            get_item(index: number): TermSet;
            getById(id: SP.Guid): TermSet;
            getByName(name: string): TermSet;
        }

        export class TermSet extends TermSetItem {
            get_contact(): string;
            set_contact(value: string): void;
            get_description(): string;
            set_description(value: string): void;
            get_group(): TermGroup;
            get_isOpenForTermCreation(): bool;
            set_isOpenForTermCreation(value: bool): void;
            get_stakeholders(): string[];
            addStakeholder(stakeholderName: string): void;
            copy(): TermSet;
            deleteStakeholder(stakeholderName: string): void;
            exportObject(): SP.StringResult;
            getAllTerms(): TermCollection;
            getChanges(changeInformation: ChangeInformation): ChangedItemCollection;
            getTerm(termId: SP.Guid): Term;
            getTerms(pagingLimit: number): TermCollection;
            getTerms(termLabel: string, trimUnavailable: bool): TermCollection;
            getTerms(labelMatchInformation: LabelMatchInformation): TermCollection;
            getTermsWithCustomProperty(customPropertyName: string, trimUnavailable: bool): TermCollection;
            getTermsWithCustomProperty(customPropertyMatchInformation: CustomPropertyMatchInformation): TermCollection;
            move(targetGroup: TermGroup): void;
        }

        export class TermCollection extends SP.ClientObjectCollection {
            itemAt(index: number): Term;
            get_item(index: number): Term;
            getById(id: SP.Guid): Term;
            getByName(name: string): Term;
        }

        export class Term extends TermSetItem {
            get_description(): string;
            get_isDeprecated(): bool;
            get_isKeyword(): bool;
            get_isPinned(): bool;
            get_isPinnedRoot(): bool;
            get_isReused(): bool;
            get_isRoot(): bool;
            get_isSourceTerm(): bool;
            get_labels: LabelCollection;
            get_localCustomProperties(): { [key: string]: string; };
            get_mergedTermIds(): SP.Guid[];
            get_parent(): Term;
            get_pathOfTerm(): string;
            get_pinSourceTermSet(): TermSet;
            get_reusedTerms(): TermCollection;
            get_sourceTerm(): Term;
            get_termsCount(): number;
            get_termSet(): TermSet;
            get_termSets(): TermSetCollection;
            copy(doCopyChildren: bool): Term;
            createLabel(labelName: string, lcid: number, isDefault: bool): Label;
            deleteLocalCustomProperty(name: string): void;
            deleteAllLocalCustomProperties(): void;
            deprecate(doDepricate: bool): void;
            getAllLabels(lcid: number): LabelCollection;
            getDefaultLabel(lcid: number): Label;
            getDescription(lcid: number): SP.StringResult;

            getTerms(pagingLimit: number): TermCollection;
            getTerms(
                termLabel: string,
                lcid: number,
                defaultLabelOnly: bool,
                stringMatchOption: StringMatchOption,
                resultCollectionSize: number,
                trimUnavailable: bool): TermCollection;

            merge(termToMerge: Term): void;
            move(newParnt: TermSetItem): void;
            reassignSourceTerm(reusedTerm: Term): void;
            setDescription(description: string, lcid: number): void;
            setLocalCustomProperty(name: string, value: string): void;
            getIsDescendantOf(ancestorTerm: Term): SP.BooleanResult;
            getPath(lcid: number): SP.StringResult;
        }


        export class LabelCollection extends SP.ClientObjectCollection {
            itemAt(index: number): Label;
            get_item(index: number): Label;
            getByValue(name: string): Label;
        }

        export class Label extends SP.ClientObject {
            get_isDefaultForLanguage(): bool;
            get_language(): number;
            set_language(value: number): void;
            get_term(): Term;
            get_value(): string;
            set_value(value: string): void;
            deleteObject(): void;
            setAsDefaultForLanguage(): void;
        }

        export class LabelMatchInformation extends SP.ClientObject {
            constructor(context: SP.ClientContext);
            get_defaultLabelOnly(): bool;
            set_defaultLabelOnly(value: bool): void;
            get_excludeKeyword(): bool;
            set_excludeKeyword(value: bool): void;
            get_lcid(): number;
            set_lcid(value: number): void;
            get_resultCollectionSize(): number;
            set_resultCollectionSize(value: number): void;
            get_stringMatchOption(): StringMatchOption;
            set_stringMatchOption(value: StringMatchOption): void;
            get_termLabel(): string;
            set_termLabel(value: string): void;
            get_trimDeprecated(): bool;
            set_trimDeprecated(value: bool): void;
            get_trimUnavailable(): bool;
            set_trimUnavailable(value: bool): void;
        }

        export class CustomPropertyMatchInformation extends SP.ClientObject {
            constructor(context: SP.ClientContext);
            get_customPropertyName(): string;
            set_customPropertyName(value: string): void;
            get_customPropertyValue(): string;
            set_customPropertyValue(value: string): void;
            get_resultCollectionSize(): number;
            set_resultCollectionSize(value: number): void;
            get_stringMatchOption(): StringMatchOption;
            set_stringMatchOption(value: StringMatchOption): void;
            get_trimUnavailable(): bool;
            set_trimUnavailable(value: bool): void;
        }

        export class ChangeInformation extends SP.ClientObject {
            constructor(context: SP.ClientContext);
            get_itemType(): ChangeItemType;
            set_itemType(value: ChangeItemType): void;
            get_operationType(): ChangeOperationType;
            set_operationType(value: ChangeOperationType): void;
            get_startTime(): Date;
            set_startTime(value: Date): void;
            get_withinTimeSpan(): number;
            set_withinTimeSpan(value: number): void;
        }

        export class ChangedItemCollection extends SP.ClientObjectCollection {
            itemAt(index: number): ChangedItem;
            get_item(index: number): ChangedItem;
        }

        export class ChangedItem extends SP.ClientObject {
            get_changedBy(): string;
            get_changedTime(): Date;
            get_id(): SP.Guid;
            get_itemType(): ChangeItemType;
            get_operation(): ChangeOperationType;
        }

        export class ChangedSite extends ChangedItem {
            get_siteId(): SP.Guid;
            get_termId(): SP.Guid;
            get_termSetId(): SP.Guid;
        }

        export class ChangedGroup extends ChangedItem {
        }

        export class ChangedTerm extends ChangedItem {
            get_changedCustomProperties(): string[];
            get_changedLocalCustomProperties(): string[];
            get_groupId(): SP.Guid;
            get_lcidsForChangedDescriptions(): number[];
            get_lcidsForChangedLabels(): number[];
            get_termSetId(): SP.Guid;
        }

        export class ChangedTermSet extends ChangedItem {
            get_fromGroupId(): SP.Guid;
            get_groupId(): SP.Guid;
        }
        export class ChangedTermStore extends ChangedItem {
            get_changedLanguage(): number;
            get_isDefaultLanguageChanged(): bool;
            get_isFullFarmRestore(): bool;
        }

        export class TaxonomyField extends SP.FieldLookup {
            constructor(context: SP.ClientContext, fields: SP.FieldCollection, filedName: string);
            get_anchorId(): SP.Guid;
            set_anchorId(value: SP.Guid): void;
            get_createValuesInEditForm(): bool;
            set_createValuesInEditForm(value: bool): void;
            get_isAnchorValid(): bool;
            get_isKeyword(): bool;
            set_isKeyword(value: bool): void;
            get_isPathRendered(): bool;
            set_isPathRendered(value: bool): void;
            get_isTermSetValid(): bool;
            get_open(): bool;
            set_open(value: bool): void;
            get_sspId(): SP.Guid;
            set_sspId(value: SP.Guid): void;
            get_targetTemplate(): string;
            set_targetTemplate(value: string): void;
            get_termSetId(): SP.Guid;
            set_termSetId(value: SP.Guid): void;
            get_textField(): SP.Guid;
            get_userCreated(): SP.Guid;
            set_userCreated(value: SP.Guid): void;

            getFieldValueAsText(value: TaxonomyFieldValue): SP.StringResult;
            getFieldValueAsTaxonomyFieldValue(value: string): TaxonomyFieldValue;
            getFieldValueAsTaxonomyFieldValueCollection(value: string): TaxonomyFieldValueCollection;
            setFieldValueByTerm(listItem: SP.ListItem, term: Term, lcid: number): void;
            setFieldValueByTermCollection(listItem: SP.ListItem, terms: TermCollection, lcid: number): void;
            setFieldValueByCollection(listItem: SP.ListItem, terms: Term[], lcid: number): void;
            setFieldValueByValue(listItem: SP.ListItem, taxValue: TaxonomyFieldValue): void;
            setFieldValueByValueCollection(listItem: SP.ListItem, taxValueCollection: TaxonomyFieldValueCollection): void;
            getFieldValueAsHtml(value: TaxonomyFieldValue): SP.StringResult;
            getValidatedString(value: TaxonomyFieldValue): SP.StringResult;

        }

        export class TaxonomyFieldValueCollection extends SP.ClientObjectCollection {
            constructor(context: SP.ClientContext, fieldValue: string, creatingField: SP.Field);
            itemAt(index: number): TaxonomyFieldValue;
            get_item(index: number): TaxonomyFieldValue;
            populateFromLabelGuidPairs(text: string): void;
        }

        export class TaxonomyFieldValue extends SP.ClientValueObject {
            get_label(): string;
            set_label(value: string): void;
            get_termGuid(): SP.Guid;
            set_termGuid(value: SP.Guid): void;
            get_wssId(): SP.Guid;
            set_wssId(value: SP.Guid): void;
        }

        export class MobileTaxonomyField extends SP.ClientObject {
            get_readOnly(): bool;
        }
    }
}

declare module SP {
    export module UI {
        export module ApplicationPages {
            export class SelectorSelectionEventArgs extends Sys.EventArgs {
                constructor(entities: any);
                get_entities(): any;
            }
            export interface ISelectorComponent {
                get_selectedEntities(): any;
                set_selectedEntities(value: any): void;
                get_callback(): (sender: any, e: Sys.EventArgs) => void;
                set_callback(value: (sender: any, e: Sys.EventArgs) => void ): void;
                get_scopeKey(): string;
                get_componentType(): SP.UI.ApplicationPages.SelectorType;
                revertTo(ent: SP.UI.ApplicationPages.ResolveEntity): void;
                removeEntity(ent: SP.UI.ApplicationPages.ResolveEntity): void;
                setEntity(ent: SP.UI.ApplicationPages.ResolveEntity): void;
            }
            export enum SelectorType {
                none,
                resource,
                people,
                people_And_Resource,
                event,
            }
            export class CalendarSelector extends Sys.Component {
                static instance(): SP.UI.ApplicationPages.CalendarSelector;
                registerSelector(selector: SP.UI.ApplicationPages.ISelectorComponent): void;
                getSelector(type: SP.UI.ApplicationPages.SelectorType, scopeKey: string): SP.UI.ApplicationPages.ISelectorComponent;
                addHandler(scopeKey: string, people: bool, resource: bool, handler: (sender: any, selection: SP.UI.ApplicationPages.SelectorSelectionEventArgs) => void ): void;
                revertTo(scopeKey: string, ent: SP.UI.ApplicationPages.ResolveEntity): void;
                removeEntity(scopeKey: string, ent: SP.UI.ApplicationPages.ResolveEntity): void;
                constructor();
            }
            export class BaseSelectorComponent implements SP.UI.ApplicationPages.ISelectorComponent {
                constructor(key: string, type: SP.UI.ApplicationPages.SelectorType);
                get_scopeKey(): string;
                get_componentType(): SP.UI.ApplicationPages.SelectorType;
                get_selectedEntities(): any;
                set_selectedEntities(value: any): void;
                get_callback(): (sender: any, e: Sys.EventArgs) => void;
                set_callback(value: (sender: any, e: Sys.EventArgs) => void ): void;
                revertTo(ent: SP.UI.ApplicationPages.ResolveEntity): void;
                removeEntity(ent: SP.UI.ApplicationPages.ResolveEntity): void;
                setEntity(ent: SP.UI.ApplicationPages.ResolveEntity): void;
            }
            export interface ICalendarController {
                moveToDate(date: string): void;
                moveToViewType(viewType: string): void;
                moveToViewDate(scope: SP.UI.ApplicationPages.CalendarScope, date: string): void;
                moveToView(scope: SP.UI.ApplicationPages.CalendarScope): void;
                expandAll(): void;
                collapseAll(): void;
                refreshItems(): void;
                getActiveScope(): SP.UI.ApplicationPages.CalendarScope;
                newItemDialog(contentTypeId: string): void;
                deleteItem(itemId: string): void;
            }
            export enum CalendarScope {
                nothing,
                monthly,
                weeklyGroup,
                daily,
                weekly,
                dailyGroup,
            }
            export class CalendarInstanceRepository {
                static registerInstance(instanceId: string, contoller: SP.UI.ApplicationPages.ICalendarController): void;
                static lookupInstance(instanceId: string): SP.UI.ApplicationPages.ICalendarController;
                static firstInstance(): SP.UI.ApplicationPages.ICalendarController;
            }
            export class ResolveEntity {
                tYPE_EVENT: string;
                tYPE_USER: string;
                tYPE_RESOURCE: string;
                tYPE_EXCHANGE: string;
                entityType: string;
                displayName: string;
                email: string;
                accountName: string;
                id: string;
                members: SP.UI.ApplicationPages.ResolveEntity[];
                needResolve: bool;
                isGroup: bool;
                get_key(): string;
                constructor();
            }
            export class ClientPeoplePickerQueryParameters extends SP.ClientValueObject {
                get_allowEmailAddresses(): bool;
                set_allowEmailAddresses(value: bool): void;
                get_allowMultipleEntities(): bool;
                set_allowMultipleEntities(value: bool): void;
                get_allUrlZones(): bool;
                set_allUrlZones(value: bool): void;
                get_enabledClaimProviders(): string;
                set_enabledClaimProviders(value: string): void;
                get_forceClaims(): bool;
                set_forceClaims(value: bool): void;
                get_maximumEntitySuggestions(): number;
                set_maximumEntitySuggestions(value: number): void;
                get_principalSource(): SP.Utilities.PrincipalSource;
                set_principalSource(value: SP.Utilities.PrincipalSource): void;
                get_principalType(): SP.Utilities.PrincipalType;
                set_principalType(value: SP.Utilities.PrincipalType): void;
                get_queryString(): string;
                set_queryString(value: string): void;
                get_required(): bool;
                set_required(value: bool): void;
                get_sharePointGroupID(): number;
                set_sharePointGroupID(value: number): void;
                get_urlZone(): SP.UrlZone;
                set_urlZone(value: SP.UrlZone): void;
                get_urlZoneSpecified(): bool;
                set_urlZoneSpecified(value: bool): void;
                get_web(): SP.Web;
                set_web(value: SP.Web): void;
                get_webApplicationID(): SP.Guid;
                set_webApplicationID(value: SP.Guid): void;
                get_typeId(): string;
                writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
                constructor();
            }
            export class ClientPeoplePickerWebServiceInterface {
                static clientPeoplePickerSearchUser(context: SP.ClientRuntimeContext, queryParams: SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters): SP.StringResult;
                static clientPeoplePickerResolveUser(context: SP.ClientRuntimeContext, queryParams: SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters): SP.StringResult;
            }
            export class PeoplePickerWebServiceInterface {
                static getSearchResultsByHierarchy(context: SP.ClientRuntimeContext, providerID: string, hierarchyNodeID: string, entityTypes: string, contextUrl: string): SP.StringResult;
                static getSearchResults(context: SP.ClientRuntimeContext, searchPattern: string, providerID: string, hierarchyNodeID: string, entityTypes: string): SP.StringResult;
            }
        }
    }
}

declare module SP {
    export module UI {
        export class PopoutMenu implements Sys.IDisposable {
            constructor(launcherId: string, menuId: string, iconId: string, launcherOpenCssClass: string, textDirection: string, closeIconUrl: string, isClustered: bool, closeIconOffsetLeft: number, closeIconOffsetTop: number, closeIconHeight: number, closeIconWidth: number);
            launchMenu(): void;
            closeMenu(): void;
            static createPopoutMenuInstanceAndLaunch(anchorId: string, menuId: string, iconId: string, anchorOpenCss: string, textDirection: string, closeIconUrl: string, isClustered: bool, x: number, y: number, height: number, width: number): void;
            static closeActivePopoutMenuInstance(): void;
            dispose(): void;
        }
        export class AttractModeControl extends Sys.UI.Control {
            defaultAttractModeIcon: string;
            cssAttractMode: string;
            cssAttractModeBackground: string;
            cssAttractModeCell: string;
            cssAttractModeWrapper: string;
            cssAttractModeIcon: string;
            cssAttractModeText: string;
            get_imageElement(): any;
            get_textElement(): HTMLElement;
            constructor();
        }
        export class Notify {
            static addNotification(strHtml: string, bSticky: bool): string;
            static removeNotification(nid: string): void;
            constructor();
        }
        export enum ContainerID {
            Basic,
            Status,
        }
        export enum EventID {
            OnShow,
            OnHide,
            OnDisplayNotification,
            OnRemoveNotification,
            OnNotificationCountChanged,
        }
        export class SPNotification {
            constructor(containerId: SP.UI.ContainerID, strHtml: string, bSticky: bool, strTooltip: string, onclickHandler: () => void , extraData: any);
            constructor(containerId: SP.UI.ContainerID, strHtml: string, bSticky: bool, strTooltip: string, onclickHandler: () => void );
            constructor(containerId: SP.UI.ContainerID, strHtml: string, bSticky: bool, strTooltip: string);
            constructor(containerId: SP.UI.ContainerID, strHtml: string, bSticky: bool);
            constructor(containerId: SP.UI.ContainerID, strHtml: string);
            get_id(): string;
            Show(bNoAnimate: bool): void;
            Hide(bNoAnimate: bool): void;
        }
        export class SPNotificationContainer {
            constructor(id: number, element: any, layer: number, notificationLimit: number);
            constructor(id: number, element: any, layer: number);
            Clear(): void;
            GetCount(): number;
            SetEventHandler(eventId: SP.UI.EventID, eventHandler: any): void;
        }
        export class Status {
            static addStatus(strTitle: string, strHtml: string, atBegining: bool): string;
            static appendStatus(sid: string, strTitle: string, strHtml: string): string;
            static updateStatus(sid: string, strHtml: string): void;
            static setStatusPriColor(sid: string, strColor: string): void;
            static removeStatus(sid: string): void;
            static removeAllStatus(hide: bool): void;
            constructor();
        }
        export class Workspace {
            static add_resized(handler: () => void ): void;
            static remove_resized(handler: () => void ): void;
        }
        export class Menu {
            static create(id: string): SP.UI.Menu;
            addMenuItem(text: string, actionScriptText: string, imageSourceUrl: string, imageAlternateText: string, sequenceNumber: number, description: string, id: string): HTMLElement;
            addSeparator(): void;
            addSubMenu(text: string, imageSourceUrl: string, imageAlternateText: string, sequenceNumber: number, description: string, id: string): SP.UI.Menu;
            show(relativeElement: HTMLElement, forceRefresh: bool, flipTopLevelMenu: bool, yOffset: number): void;
            showFilterMenu(relativeElement: HTMLElement, forceRefresh: bool, flipTopLevelMenu: bool, yOffset: number, fShowClose: bool, fShowCheckBoxes: bool): void;
            hideIcons(): void;
            showIcons(): void;
        }
        export class MenuTest {
            static setup(relativeElement: HTMLElement): void;
            constructor();
        }
        /** Result of a modal dialog execution */
        export enum DialogResult {
            /** Do not use this */
            invalid = -1,
            /** User closed dialog, cancelling the action */
            cancel = 0,
            /** Dialog actions completed successfully */
            OK = 1
        }
        /** Callback which processes dialog result value after dialog is closed */
        export interface DialogReturnValueCallback {
            (dialogResult: DialogResult, returnValue: any): void;
        }
        /** Options for dialog creation */
        export interface IDialogOptions {
            /** url of the page which is shown in the modal dialog. You should use either html or url attribute, but not both. */
            url?: string;
            /** specifies if close button should be shown on the dialog */
            showClose?: bool;
            /** specifies if maximize button should be shown on the dialog */
            allowMaximize?: bool;
            /** callback that is called after dialog is closed */
            dialogReturnValueCallback?: DialogReturnValueCallback;
            /** automatically determine size of the dialog based on its contents. */
            autoSize?: bool;
            /** minimum width of the dialog when using autoSize option */
            autoSizeStartWidth?: number;
            /** include padding for adding a scrollbar */
            includeScrollBarPadding?: bool;
            /** width of the dialog. if not specified, will be determined automatically based on the contents of the dialog */
            width?: number;
            /** height of the dialog. if not specified, will be determined automatically based on the contents of the dialog */
            height?: number;
            /** html element which will be used as contents of the dialog. You should use either html or url attribute, but not both. */
            html?: HTMLElement;
            /** custom arguments to be passed to the dialog */
            args?: any;
        }
        export class DialogOptions implements IDialogOptions {
            /** url of the page which is shown in the modal dialog. You should use either html or url attribute, but not both. */
            url: string;
            /** specifies if close button should be shown on the dialog */
            showClose: bool;
            /** specifies if maximize button should be shown on the dialog */
            allowMaximize: bool;
            /** callback that is called after dialog is closed */
            dialogReturnValueCallback: DialogReturnValueCallback;
            /** automatically determine size of the dialog based on its contents. */
            autoSize: bool;
            /** minimum width of the dialog when using autoSize option */
            autoSizeStartWidth: number;
            /** include padding for adding a scrollbar */
            includeScrollBarPadding: bool;
            /** width of the dialog. if not specified, will be determined automatically based on the contents of the dialog */
            width: number;
            /** height of the dialog. if not specified, will be determined automatically based on the contents of the dialog */
            height: number;
            /** html element which will be used as contents of the dialog. You should use either html or url attribute, but not both. */
            html: HTMLElement;
            /** custom arguments to be passed to the dialog */
            args: any;
        }
        /** Represents a dialog. Do not use this class directly from your code. */
        export class Dialog {
            get_firstTabStop(): HTMLElement;
            get_lastTabStop(): HTMLElement;
            get_url(): string;
            get_html(): string;
            get_title(): string;
            get_args(): any;
            get_allowMaximize(): bool;
            get_showClose(): bool;
            get_returnValue(): any;
            set_returnValue(value: any): void;
            get_frameElement(): HTMLFrameElement;
            get_dialogElement(): HTMLElement;
            get_isMaximized(): bool;
            get_closed(): bool;
            autoSizeSuppressScrollbar(resizePageCallBack: any): void;
            autoSize(): void;
        }
        /** Represents a modal dialog */
        export class ModalDialog extends SP.UI.Dialog {
            /** Displays a modal dialog defined by the specified options. */
            static showModalDialog(options: SP.UI.IDialogOptions): SP.UI.ModalDialog;
            /** Should be called from an existing dialog. */
            static commonModalDialogClose(dialogResult: SP.UI.DialogResult, returnValue: any): void;
            /** Shows a modal dialog, specified by url, callback, args, and options. Internally, uses SP.UI.ModalDialog.showModalDialog.
                @param url overrides options.url
                @param callback overrides options.dialogResultValueCallback
                @param args overrides options.args */
            static commonModalDialogOpen(url: string, options: SP.UI.IDialogOptions, callback: SP.UI.DialogReturnValueCallback, args: any): void;
            /** Refresh the page if specified dialogResult equals to SP.UI.DialogResult.OK */
            static RefreshPage(dialogResult: SP.UI.DialogResult): void;
            /** Show page specified by the url in a modal dialog. If the dialog returns SP.UI.DialogResult.OK, the page is refreshed. */
            static ShowPopupDialog(url: string): void;
            /** Show modal dialog specified by url, callback, height and width. */
            static OpenPopUpPage(url: string, callback: SP.UI.DialogReturnValueCallback, width: number, height: number): void;
            /** Displays a wait/loading modal dialog with the specified title, message, height and width. Height and width are defined in pixels. Cancel/close button is not shown. */
            static showWaitScreenWithNoClose(title: string, message: string, height: number, width: number): SP.UI.ModalDialog;
            /** Displays a wait/loading modal dialog with the specified title, message, height and width. Height and width are defined in pixels. Cancel button is shown. If user clicks it, the callbackFunc is called. */
            static showWaitScreenSize(title: string, message: string, callbackFunc: SP.UI.DialogReturnValueCallback, height: number, width: number): SP.UI.ModalDialog;
            static showPlatformFirstRunDialog(url: string, callbackFunc: SP.UI.DialogReturnValueCallback): SP.UI.ModalDialog;
            static get_childDialog: any;
            /** Closes the dialog using the specified dialog result. */
            close(dialogResult: SP.UI.DialogResult): void;
        }

    }
}

declare module SP {

    export module UserProfiles {
        /** Specifies types of changes made in the user profile store. */
        export enum ChangeTypes {
            /** No change was made */
            none = 0,
            /** An object was added */
            add = 1,
            /** An object was modified */
            modify = 2,
            /** An object was removed */
            remove = 4,
            /** The metadata of an object was modified */
            metadata = 8,
            /** Multiple operations were performed on an object */
            all = 15
        }

        export class HashTag extends ClientValueObject {
            get_name(): string;
            get_useCount(): number;
        }

        export class HashTagCollection extends SP.ClientObjectCollection {
            itemAt(index: number): HashTag;
            get_item(index: number): HashTag;
        }

        /** Specifies types of user-related objects that can be changed in the user profile store. */
        export enum ObjectTypes {
            none = 0,
            singleValueProperty = 1,
            multiValueProperty = 2,
            anniversary = 4,
            dlMembership = 8,
            siteMembership = 16,
            quickLink = 32,
            colleague = 64,
            personalizationSite = 128,
            userProfile = 256,
            webLog = 512,
            custom = 1024,
            organizationProfile = 2048,
            organizationMembership = 4096,
            all = 8191
        }

        /** Provides methods for operations related to people.
            Note: The SocialFollowingManager object is the recommended object for performing Following People and Following Content tasks.
            However, PeopleManager provides some methods that SocialFollowingManager doesn�t. */
        export class PeopleManager extends SP.ClientObject {
            constructor(context: SP.ClientRuntimeContext);
            static getTrendingTags(context: SP.ClientRuntimeContext): HashTagCollection;
            /** Checks whether the first user is following the second user. */
            static isFollowing(context: SP.ClientRuntimeContext, possibleFollowerAccountName: string, possibleFolloweeAccountName: string): SP.BooleanResult;
            /** Gets the URL of the edit profile page for the current user. */
            get_editProfileLink(): string;
            /** Gets a Boolean value that indicates whether the current user's People I'm Following list is public. */
            get_isMyPeopleListPublic(): bool;
            /** Gets tags that the user is following. */
            getFollowedTags(numberOfTagsToFetch: number): string[];
            /** Gets user properties for the current user. */
            getMyProperties(): PersonProperties;
            getPropertiesFor(accountName: string): PersonProperties;
            /** Gets the specified user profile property for the specified user. */
            getUserProfilePropertyFor(accountName: string, propertyName: string): string;
            /** Gets the specified user profile properties for the specified user. */
            getUserProfilePropertiesFor(propertiesForUser: UserProfilePropertiesForUser): any[];
            /** Gets suggestions for who the current user might want to follow.
                Note: The recommended API to use for this task is SocialFollowingManager.getSuggestions.
                Returns list of PersonProperties objects */
            getMySuggestions(): SP.ClientObjectList;
            /** Removes the specified user from the user's list of suggested people to follow. */
            hideSuggestion(accountName: string): void;
            follow(accountName: string): void;
            stopFollowing(accountName: string): void;
            /** Add the specified tag to the current user's list of followed tags.
                @param tagId GUID of the tag to start following. */
            followTag(tagId: string): void;
            /** Remove the specified tag from the current user's list of followed tags.
                @param tagId GUID of the tag to stop following. */
            stopFollowingTag(tagId: string): void;
            amIFollowing(accountName: string): SP.BooleanResult;
            getPeopleFollowedByMe(): SP.ClientObjectList;
            getPeopleFollowedBy(accountName: string): SP.ClientObjectList;
            getMyFollowers(): SP.ClientObjectList;
            getFollowersFor(accountName: string): SP.ClientObjectList;
            amIFollowedBy(accountName: string): SP.BooleanResult;
            /** Uploads and sets the user profile picture.
                Pictures in bmp, jpg and png formats and up to 5,000,000 bytes are supported.
                A user can upload a picture only to the user's own profile.
                @param data Binary content of an image file */
            setMyProfilePicture(data): void;
        }

        /** Specifies the capabilities of a personal site. */
        export enum PersonalSiteCapabilities {
            none = 0,
            profile = 1,
            social = 2,
            storage = 4,
            myTasksDashboard = 8,
            education = 16,
            guest = 32
        }

        /** Specifies an exception or status code for the state of a personal site instantiation. */
        export enum PersonalSiteInstantiationState {
            uninitialized = 0,
            enqueued = 1,
            created = 2,
            deleted = 3,
            permissionsGeneralFailure = 4096,
            permissionsUPANotGranted = 4097,
            permissionsUserNotLicensed = 4098,
            permissionsSelfServiceSiteCreationDisabled = 4099,
            permissionsNoMySitesInPeopleLight = 4100,
            permissionsEmptyHostUrl = 4101,
            permissionsHostFailedToInitializePersonalSiteContext = 4102,
            errorGeneralFailure = 8192,
            errorManagedPathDoesNotExist = 8193,
            errorLanguageNotInstalled = 8194,
            errorPartialCreate = 8195,
            errorPersonalSiteAlreadyExists = 8196,
            errorRootSiteNotPresent = 8197,
            errorSelfServiceSiteCreateCallFailed = 8198
        }

        export enum SocialDataStoreExceptionCode {
            socialListNotFound = 0,
            personalSiteNotFound = 1,
            cannotCreatePersonalSite = 2,
            noSocialFeatures = 3
        }

        /** Represents user properties. */
        export class PersonProperties extends SP.ClientObject {
            /** Specifies the person's account name */
            get_accountName(): string;
            /** Specifies an array of strings containing the account names of a person's direct reports. */
            get_directReports(): string[];
            /** Specifies the person's name. */
            get_displayName(): string;
            /** Specifies the person's email address. */
            get_email(): string;
            /** Specifies an array of strings that specify the account names of a person's managers. */
            get_extendedManagers(): string[];
            /** Specifies an array of strings that specify the account names of person's extended reports. */
            get_extendedReports(): string[];
            /** Represents whether or not the current user is following this person. */
            get_isFollowed(): bool;
            /** Specifies the person's latest microblog post. */
            get_latestPost(): string;
            /** Specifies an array of strings that specify the account names of person's peers, that is, those who have the same manager. */
            get_peers(): string[];
            /** Specifies the absolute URL of the person's personal page. */
            get_personalUrl(): string;
            /** Specifies the URL for the person's profile picture. */
            get_pictureUrl(): string;
            /** Specifies the person's title. */
            get_title(): string;
            /** Represents all user profile properties including custom.
                The privacy settings affect which properties can be retrieved. 
                Multiple values are delimited by the vertical bar "|".
                Null values are specified as empty strings. */
            get_userProfileProperties(): { [name: string]: string; };
            /** Specifies the URL for the person's profile. */
            get_userUrl(): string;
        }

        /** Provides an alternate entry point to user profiles rather than calling methods directly. */
        export class ProfileLoader extends SP.ClientObject {
            static getProfileLoader(context: SP.ClientRuntimeContext): ProfileLoader;
            getUserProfile(): UserProfile;
        }

        /** Represents a client-side user profile for a person.
            Note: The client-side UserProfile object provides methods you can use to create a personal site for the current user.
            However, it does not contain the user properties that the server-side UserProfile object contains.
            To access user properties from client-side code, use PeopleManager */
        export class UserProfile extends SP.ClientObject {
            constructor();
            /** Represents the content that the user is following. */
            get_followedContent(): FollowedContent;
            /** Retrieves SP.Site object that represents the user's personal site. */
            get_personalSite(): SP.Site;
            /** Specifies attributes of the user's personal site. */
            get_personalSiteCapabilities(): PersonalSiteCapabilities;
            /** Provides the state of the user's personal site */
            get_personalSiteInstantiationState(): PersonalSiteInstantiationState;
            /** Specifies whether the user can import pictures */
            get_pictureImportEnabled(): bool;
            /** Specifies the URL to allow the current user to create a personal site. */
            get_urlToCreatePersonalSite(): string;
            /** Specifies whether the current user's social data is to be shared. */
            shareAllSocialData(shareAll: bool): void;
            /** This member is reserved for internal use and is not intended to be used directly from your code.
                Use the createPersonalSiteEnque method to create a personal site. */
            createPersonalSite(lcid: number): void;
            /** Enquees creation of a personal site for the current user.
                @param isInteractive Has a true value if the request is from a web browser and a false value if the request is from a client application. */
            createPersonalSiteEnque(isInteractive: bool): void;
        }

        /** Provides access to followed content items. */
        export class FollowedContent extends SP.ClientObject {
            constructor(context: SP.ClientRuntimeContext);
            static newObject(context: SP.ClientRuntimeContext): FollowedContent;
            /** Gets the location of the followed sites view */
            get_followedDocumentsUrl(): string;
            /** Gets the location of the followed documents view. */
            get_followedSitesUrl(): string;
            /** The Follow method adds the specified document or site to the list of followed content.
                @param url  URL that identifies the item to follow.
                            The url parameter can identify an existing document or site using the url property of the original item.
                            The url parameter can also identify a document with the following format: http://host/site?listId=<listGuid>&itemId=<itemId>
                @param data Optional parameter that holds application-defined data for the item.
                */
            follow(url: string, data?: FollowedItemData): FollowResult;
            /** The FollowItem method is reserved for server-to-server use only.
                The server sets the specified item to be followed by the current user.
                This method cannot be called from the client. */
            followItem(item: FollowedItem): FollowResult;
            /** Removes the specified document or site from list of followed content.
                @param url  URL that identifies the item to stop following.
                            The url parameter can identify an existing document or site using the url property of the original item.
                            The url parameter can also identify a document with the following format: http://host/site?listId=<listGuid>&itemId=<itemId> */
            stopFollowing(url: string): void;
            /** Determines if the specified document or site is being followed.
                @param url  URL that identifies the item that is supposed to be followed.
                            The url parameter can identify an existing document or site using the url property of the original item.
                            The url parameter can also identify a document with the following format: http://host/site?listId=<listGuid>&itemId=<itemId> */
            isFollowed(url: string): SP.BooleanResult;
            /** Retrieves the followed status of the specified document or site.
                Returns a value of type FollowedStatus, wrapped into a SP.IntResult object.
                @param url  URL that identifies the followed item.
                            The url parameter can identify an existing document or site using the url property of the original item.
                            The url parameter can also identify a document with the following format: http://host/site?listId=<listGuid>&itemId=<itemId> */
            getFollowedStatus(url: string): SP.IntResult;
            /** Returns the followed item identified by a given URL or returns null if the item does not exist.
                @param url  URL that identifies the followed item.
                            The url parameter can identify an existing document or site using the url property of the original item.
                            The url parameter can also identify a document with the following format: http://host/site?listId=<listGuid>&itemId=<itemId> */
            getItem(url: string): FollowedItem;
            /** Returns an array of zero or more followed items described by the type and subtype parameters.
                @param options Describes the type of item to return.
                @param subType Integer that identifies the sites to return by the web template. */
            getItems(options: FollowedContentQueryOptions, subtype: number): FollowedItem[];
            /** Updates the properties for followed item with specified URL.
                @param url  URL that identifies the followed item.
                            The url parameter can identify an existing document or site using the url property of the original item.
                            The url parameter can also identify a document with the following format: http://host/site?listId=<listGuid>&itemId=<itemId> 
                @param data Application-defined data stored with the followed item. */
            updateData(url: string, data: FollowedItemData): void;
            /** Returns the refreshed item that is being pointed to in the Social list.
                @param item The original item as stored in the Followed Content list. */
            refreshFollowedItem(item: FollowedItem): FollowedItem;
            /** Finds the original item that is being pointed to in the Followed Content list and updates the Title, Url, and IconUrl fields if they have been changed.
                @param url The URL of the original item as stored in the Followed Content list. */
            findAndUpdateFollowedItem(url: string): FollowedItem;
        }

        /** Represents a followed content resource. */
        export class FollowedItem extends SP.ClientValueObject {
            /** Additional metadata associated with this item */
            get_data(): { [name: string]: any; };
            /** Additional metadata associated with this item */
            set_data(value: { [name: string]: any; }): { [name: string]: any; };
            /** Specifies the type of the file if this item is a file. Otherwise, this property is the empty string. */
            get_fileType(): string;
            /** Specifies the type of the file if this item is a file. Otherwise, this property is the empty string. */
            set_fileType(value: string): string;
            /** Provides information about the application that opens a followed document. */
            get_fileTypeProgid(): string;
            /** Provides information about the application that opens a followed document. */
            set_fileTypeProgid(value: string): string;
            /** Specifies additional information about the followed item.
                The server stores the data so that it can return it to the client. */
            get_flags(): string;
            /** Specifies additional information about the followed item.
                The server stores the data so that it can return it to the client. */
            set_flags(value: string): string;
            /** Indicates whether the followed site has a feed. */
            get_hasFeed(): bool;
            /** Indicates whether the followed site has a feed. */
            set_hasFeed(value: bool): bool;
            /** Specifies if the item is hidden from the user. If true this item will not generate activity in the user's feed. */
            get_hidden(): bool;
            /** Specifies if the item is hidden from the user. If true this item will not generate activity in the user's feed. */
            set_hidden(value: bool): bool;
            /** Specifies the URL of an icon to represent this item. */
            get_iconUrl(): string;
            /** Specifies the URL of an icon to represent this item. */
            set_iconUrl(value: string): string;
            /** Specifies the identification for this item in the Content database. */
            get_itemId(): number;
            /** Specifies the identification for this item in the Content database. */
            set_itemId(value: number): number;
            /** Specifies the type of this item. */
            get_itemType(): FollowedItemType;
            /** Specifies the type of this item. */
            set_itemType(value: FollowedItemType): FollowedItemType;
            /** The ListId property specifies the list identification (GUID) for this item in the Content database if this item is a list or the list identification for its parent list.
                If the ItemType is Document, this property is specified, but if the ItemType is Site, then this property is not specified. */
            get_listId(): string;
            /** The ListId property specifies the list identification (GUID) for this item in the Content database if this item is a list or the list identification for its parent list.
                If the ItemType is Document, this property is specified, but if the ItemType is Site, then this property is not specified. */
            set_listId(value: string): string;
            /** Specifies the URL of this item's parent list or web. */
            get_parentUrl(): string;
            /** Specifies the URL of this item's parent list or web. */
            set_parentUrl(value: string): string;
            /** Provides information about the followed document to the application that opens it. */
            get_serverUrlProgid(): string;
            /** Provides information about the followed document to the application that opens it. */
            set_serverUrlProgid(value: string): string;
            /** Specifies the site identification (GUID) in the Content database for this item if this item is a site, or for its parent site if this item is not a site. */
            get_siteId(): string;
            /** Specifies the site identification (GUID) in the Content database for this item if this item is a site, or for its parent site if this item is not a site. */
            set_siteId(value: string): string;
            /** Specifies the subtype of this item.
                If the ItemType is Site, the Subtype specifies the web template identification. 
                If the ItemType is Document, the Subtype has a value of 1. */
            get_subtype(): number;
            /** Specifies the subtype of this item.
                If the ItemType is Site, the Subtype specifies the web template identification. 
                If the ItemType is Document, the Subtype has a value of 1. */
            set_subtype(value: number): number;
            /** Specifies the item of this item */
            get_title(): string;
            /** Specifies the item of this item */
            set_title(value: string): string;
            /** Specifies the GUID for this item in the Content database. */
            get_uniqueId(): any;
            /** Specifies the GUID for this item in the Content database. */
            set_uniqueId(value): any;
            /** Specifies the URL of this item. */
            get_url(): string;
            /** Specifies the URL of this item. */
            set_url(value: string): string;
            /** Specifies the site identification (GUID) in the Content database for this item if it is a site, or the identification of its parent site if this item is a document. */
            get_webId(): string;
            /** Specifies the site identification (GUID) in the Content database for this item if it is a site, or the identification of its parent site if this item is a document. */
            set_webId(value: any): any;
        }

        export enum FollowedItemType {
            unknown = 0,
            document = 1,
            site = 2,
            all = 3
        }

        export enum FollowedContentExceptionType {
            itemAlreadyExists = 3,
            itemDoesNotExist = 4,
            invalidQueryString = 5,
            invalidSubtypeValue = 6,
            unsupportedItemType = 7,
            followLimitReached = 8,
            untrustedSource = 9,
            unsupportedSite = 10,
            internalError = 11
        }

        export enum FollowedContentQueryOptions {
            unset = 0,
            sites = 1,
            documents = 2,
            hidden = 4,
            nonFeed = 8,
            defaultOptions = 15,
            all = 255
        }

        export enum FollowedStatus {
            followed = 0,
            notFollowed = 1,
            notFollowable = 2
        }


        /** Contains additional data that can be attached to a FollowedItem object */
        export class FollowedItemData extends SP.ClientObject {
            /** An unordered collection of key/value pairs for custom properties to be set on the item. */
            get_properties(): { [name: string]: any; };
        }

        /** Returns information about a request to follow an item. */
        export class FollowResult extends SP.ClientValueObject {
            /** Contains the item being followed. */
            get_item(): FollowedItem;
            /** Provides information about the attempt to follow an item. */
            get_resultType(): FollowResultType;
        }

        export enum FollowResultType {
            /** Result is unknown */
            unknown = 0,
            /** The request succeeded and the item is being followed. */
            followed = 1,
            /** The item was already being followed by the current user so there is no change in status. */
            refollowed = 2,
            /** The request encountered the maximum follow limit. */
            hitFollowLimit = 3,
            /** The request failed. */
            failed = 4
        }

        /** Represents a set of user profile properties for a specified user. */
        export class UserProfilePropertiesForUser extends SP.ClientObject {
            /** Creates new UserProfilePropertiesForUser object
                @param accountName Specifies the user by account name.
                @propertyNames Specifies an array of strings that specify the properties to retrieve. */
            constructor(accountName: string, propertyNames: string[]);
            /** Specifies the user account name */
            get_accountName(): string;
            /** Specifies the user account name */
            set_accountName(value: string): string;
            /** Gets an array of strings that specify the user profile property names. */
            getPropertyNames(): string[];
        }
    }

}

declare module SP {

    export module Utilities {
        export class Utility {
            lAYOUTS_LATESTVERSION_RELATIVE_URL: string;
            lAYOUTS_LATESTVERSION_URL: string;
            static get_layoutsLatestVersionRelativeUrl(): string;
            static get_layoutsLatestVersionUrl(): string;
            static getLayoutsPageUrl(pageName: string): string;
            static getImageUrl(imageName: string): string;
            static createWikiPageInContextWeb(context: SP.ClientRuntimeContext, parameters: SP.Utilities.WikiPageCreationInformation): SP.File;
            static localizeWebPartGallery(context: SP.ClientRuntimeContext, items: SP.ListItemCollection): SP.ClientObjectList;
            static getAppLicenseInformation(context: SP.ClientRuntimeContext, productId: SP.Guid): SP.AppLicenseCollection;
            static importAppLicense(context: SP.ClientRuntimeContext, licenseTokenToImport: string, contentMarket: string, billingMarket: string, appName: string, iconUrl: string, providerName: string, appSubtype: number): void;
            static getAppLicenseDeploymentId(context: SP.ClientRuntimeContext): SP.GuidResult;
            static logCustomAppError(context: SP.ClientRuntimeContext, error: string): SP.IntResult;
            static logCustomRemoteAppError(context: SP.ClientRuntimeContext, productId: SP.Guid, error: string): SP.IntResult;
            static getLocalizedString(context: SP.ClientRuntimeContext, source: string, defaultResourceFile: string, language: number): SP.StringResult;
            static createNewDiscussion(context: SP.ClientRuntimeContext, list: SP.List, title: string): SP.ListItem;
            static createNewDiscussionReply(context: SP.ClientRuntimeContext, parent: SP.ListItem): SP.ListItem;
            static markDiscussionAsFeatured(context: SP.ClientRuntimeContext, listID: string, topicIDs: string): void;
            static unmarkDiscussionAsFeatured(context: SP.ClientRuntimeContext, listID: string, topicIDs: string): void;
            static searchPrincipals(context: SP.ClientRuntimeContext, web: SP.Web, input: string, scopes: SP.Utilities.PrincipalType, sources: SP.Utilities.PrincipalSource, usersContainer: SP.UserCollection, maxCount: number): SP.Utilities.PrincipalInfo[];
            static getCurrentUserEmailAddresses(context: SP.ClientRuntimeContext): SP.StringResult;
            static createEmailBodyForInvitation(context: SP.ClientRuntimeContext, pageAddress: string): SP.StringResult;
            static getPeoplePickerURL(context: SP.ClientRuntimeContext, web: SP.Web, fieldUser: SP.FieldUser): SP.StringResult;
            static resolvePrincipal(context: SP.ClientRuntimeContext, web: SP.Web, input: string, scopes: SP.Utilities.PrincipalType, sources: SP.Utilities.PrincipalSource, usersContainer: SP.UserCollection, inputIsEmailOnly: bool): SP.Utilities.PrincipalInfo;
            static getLowerCaseString(context: SP.ClientRuntimeContext, sourceValue: string, lcid: number): SP.StringResult;
            static formatDateTime(context: SP.ClientRuntimeContext, web: SP.Web, datetime: Date, format: SP.Utilities.DateTimeFormat): SP.StringResult;
            static isUserLicensedForEntityInContext(context: SP.ClientRuntimeContext, licensableEntity: string): SP.BooleanResult;
        }
        export enum DateTimeFormat {
            dateTime,
            dateOnly,
            timeOnly,
            iSO8601,
            monthDayOnly,
            monthYearOnly,
            longDate,
            unknownFormat,
        }
        export class EmailProperties extends SP.ClientValueObject {
            get_additionalHeaders(): any;
            set_additionalHeaders(value: any): void;
            get_bCC(): string[];
            set_bCC(value: string[]): void;
            get_body(): string;
            set_body(value: string): void;
            get_cC(): string[];
            set_cC(value: string[]): void;
            get_from(): string;
            set_from(value: string): void;
            get_subject(): string;
            set_subject(value: string): void;
            get_to(): string[];
            set_to(value: string[]): void;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
        export enum IconSize {
            size16,
            size32,
            size256,
        }
        export enum LogAppErrorResult {
            success,
            errorsThrottled,
            accessDenied,
        }
        export class PrincipalInfo extends SP.ClientValueObject {
            get_department(): string;
            get_displayName(): string;
            get_email(): string;
            get_jobTitle(): string;
            get_loginName(): string;
            get_mobile(): string;
            get_principalId(): number;
            get_principalType(): SP.Utilities.PrincipalType;
            get_sIPAddress(): string;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
        export enum PrincipalSource {
            none,
            userInfoList,
            windows,
            membershipProvider,
            roleProvider,
            all,
        }
        export enum PrincipalType {
            none,
            user,
            distributionList,
            securityGroup,
            sharePointGroup,
            all,
        }
        export enum SPWOPIFrameAction {
            view,
            edit,
            mobileView,
            interactivePreview,
        }
        export class WikiPageCreationInformation extends SP.ClientValueObject {
            get_serverRelativeUrl(): string;
            set_serverRelativeUrl(value: string): void;
            get_wikiHtmlContent(): string;
            set_wikiHtmlContent(value: string): void;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
        export class DateUtility {
            static isLeapYear(year: number): bool;
            static dateToJulianDay(year: number, month: number, day: number): number;
            static julianDayToDate(julianDay: number): SP.DateTimeUtil.SimpleDate;
            static daysInMonth(year: number, month: number): number;
        }
        export class HttpUtility {
            /** Official version of STSHtmlEncode. Calls it internally. */
            static htmlEncode(stringToEncode: string): string;
            static urlPathEncode(stringToEncode: string): string;
            static urlKeyValueEncode(keyOrValueToEncode: string): string;
            static ecmaScriptStringLiteralEncode(scriptLiteralToEncode: string): string;
            static navigateTo(url: string): void;
            /** Appends correct "Source" parameter to the specified url, and then navigates to this url.
                "Source" parameter is recognized in many places in SharePoint, usually to determine "Cancel" behavior. */
            static appendSourceAndNavigateTo(url: string): void;
            static escapeXmlText(stringToEscape: string): string;
            static navigateHttpFolder(urlSrc: string, frameTarget: string): void;
        }
        export class UrlBuilder {
            constructor(path: string);
            static urlCombine(path1: string, path2: string): string;
            static replaceOrAddQueryString(url: string, key: string, value: string): string;
            static removeQueryString(url: string, key: string): string;
            combinePath(path: string): void;
            addKeyValueQueryString(key: string, value: string): void;
            /** Returns the resulting url */
            get_url(): string;
            /** Same as get_url() */
            toString(): string;
        }
    }
    
    export module DateTimeUtil {
        export class SimpleDate {
            construction(year: number, month: number, day: number, era: number);
            get_year(): number;
            set_year(value: number): void;
            get_month(): number;
            set_month(value: number): void;
            get_day(): number;
            set_day(value: number): void;
            get_era(): number;
            set_era(value: number): void;
            static dateEquals(date1: SimpleDate, date2: SimpleDate): bool;
            static dateLessEqual(date1: SimpleDate, date2: SimpleDate): bool;
            static dateGreaterEqual(date1: SimpleDate, date2: SimpleDate): bool;
            static dateLess(date1: SimpleDate, date2: SimpleDate): bool;
            static dateGreater(date1: SimpleDate, date2: SimpleDate): bool;
        }
    }
}

declare module SP {
    export module WebParts {
        export class LimitedWebPartManager extends SP.ClientObject {
            get_hasPersonalizedParts(): bool;
            get_scope(): SP.WebParts.PersonalizationScope;
            get_webParts(): SP.WebParts.WebPartDefinitionCollection;
            addWebPart(webPart: SP.WebParts.WebPart, zoneId: string, zoneIndex: number): SP.WebParts.WebPartDefinition;
            importWebPart(webPartXml: string): SP.WebParts.WebPartDefinition;
        }
        export enum PersonalizationScope {
            user,
            shared,
        }
        export class TileData extends SP.ClientValueObject {
            get_backgroundImageLocation(): string;
            set_backgroundImageLocation(value: string): void;
            get_description(): string;
            set_description(value: string): void;
            get_iD(): number;
            set_iD(value: number): void;
            get_linkLocation(): string;
            set_linkLocation(value: string): void;
            get_tileOrder(): number;
            set_tileOrder(value: number): void;
            get_title(): string;
            set_title(value: string): void;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
        export class WebPart extends SP.ClientObject {
            get_hidden(): bool;
            set_hidden(value: bool): void;
            get_isClosed(): bool;
            get_properties(): SP.PropertyValues;
            get_subtitle(): string;
            get_title(): string;
            set_title(value: string): void;
            get_titleUrl(): string;
            set_titleUrl(value: string): void;
            get_zoneIndex(): number;
        }
        export class WebPartDefinition extends SP.ClientObject {
            get_id(): SP.Guid;
            get_webPart(): SP.WebParts.WebPart;
            saveWebPartChanges(): void;
            closeWebPart(): void;
            openWebPart(): void;
            deleteWebPart(): void;
            moveWebPartTo(zoneID: string, zoneIndex: number): void;
        }
        export class WebPartDefinitionCollection extends SP.ClientObjectCollection {
            itemAt(index: number): SP.WebParts.WebPartDefinition;
            get_item(index: number): SP.WebParts.WebPartDefinition;
            getById(id: SP.Guid): SP.WebParts.WebPartDefinition;
            getByControlId(controlId: string): SP.WebParts.WebPartDefinition;
        }
    }
}

declare module SP {
    export module Workflow {
        export class WorkflowAssociation extends SP.ClientObject {
            get_allowManual(): bool;
            set_allowManual(value: bool): void;
            get_associationData(): string;
            set_associationData(value: string): void;
            get_autoStartChange(): bool;
            set_autoStartChange(value: bool): void;
            get_autoStartCreate(): bool;
            set_autoStartCreate(value: bool): void;
            get_baseId(): SP.Guid;
            get_created(): Date;
            get_description(): string;
            set_description(value: string): void;
            get_enabled(): bool;
            set_enabled(value: bool): void;
            get_historyListTitle(): string;
            set_historyListTitle(value: string): void;
            get_id(): SP.Guid;
            get_instantiationUrl(): string;
            get_internalName(): string;
            get_isDeclarative(): bool;
            get_listId(): SP.Guid;
            get_modified(): Date;
            get_name(): string;
            set_name(value: string): void;
            get_taskListTitle(): string;
            set_taskListTitle(value: string): void;
            get_webId(): SP.Guid;
            update(): void;
            deleteObject(): void;
        }
        export class WorkflowAssociationCollection extends SP.ClientObjectCollection {
            itemAt(index: number): SP.Workflow.WorkflowAssociation;
            get_item(index: number): SP.Workflow.WorkflowAssociation;
            getById(associationId: SP.Guid): SP.Workflow.WorkflowAssociation;
            add(parameters: SP.Workflow.WorkflowAssociationCreationInformation): SP.Workflow.WorkflowAssociation;
            getByName(name: string): SP.Workflow.WorkflowAssociation;
        }
        export class WorkflowAssociationCreationInformation extends SP.ClientValueObject {
            get_contentTypeAssociationHistoryListName(): string;
            set_contentTypeAssociationHistoryListName(value: string): void;
            get_contentTypeAssociationTaskListName(): string;
            set_contentTypeAssociationTaskListName(value: string): void;
            get_historyList(): SP.List;
            set_historyList(value: SP.List): void;
            get_name(): string;
            set_name(value: string): void;
            get_taskList(): SP.List;
            set_taskList(value: SP.List): void;
            get_template(): SP.Workflow.WorkflowTemplate;
            set_template(value: SP.Workflow.WorkflowTemplate): void;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
        export class WorkflowTemplate extends SP.ClientObject {
            get_allowManual(): bool;
            get_associationUrl(): string;
            get_autoStartChange(): bool;
            get_autoStartCreate(): bool;
            get_description(): string;
            get_id(): SP.Guid;
            get_isDeclarative(): bool;
            get_name(): string;
            get_permissionsManual(): SP.BasePermissions;
        }
        export class WorkflowTemplateCollection extends SP.ClientObjectCollection {
            itemAt(index: number): SP.Workflow.WorkflowTemplate;
            get_item(index: number): SP.Workflow.WorkflowTemplate;
            getById(templateId: SP.Guid): SP.Workflow.WorkflowTemplate;
            getByName(name: string): SP.Workflow.WorkflowTemplate;
        }
    }
}

declare module SP.WorkflowServices {

    export enum WorkflowStatus {
        notStarted = 0,
        started = 1,
        suspended = 2,
        canceling = 3,
        canceled = 4,
        terminated = 5,
        completed = 6,
        notSpecified = 7,
        invalid = 8
    }

    // TODO: comments, types
    export class InteropService extends SP.ClientObject {
        constructor(context: SP.ClientRuntimeContext, objectPath: SP.ObjectPathStaticProperty);
        static getCurrent(context: SP.ClientRuntimeContext): InteropService;
        enableEvents(listId, itemGuid): void;
        disableEvents(listId, itemGuid): void;
        startWorkflow(associationName, correlationId, listId, itemGuid, workflowParameters): SP.GuidResult;
        cancelWorkflow(instanceId): void;
    }

    /** Represents a workflow definition and associated properties. */
    export class WorkflowDefinition extends SP.ClientObject {
        constructor(context: SP.ClientRuntimeContext);
        /** Url of the association form */
        get_associationUrl(): string;
        /** Url of the association form */
        set_associationUrl(value: string): string;
        get_description(): string;
        set_description(value: string): string;
        get_displayName(): string;
        set_displayName(value: string): string;
        /** Identifier for a draft version of the workflow definition */
        get_draftVersion(): string;
        /** Identifier for a draft version of the workflow definition */
        set_draftVersion(value: string): string;
        /** Defines the fields of the workflow initiation forms and association forms (CAML string)  */
        get_formField(): string;
        /** Defines the fields of the workflow initiation forms and association forms (CAML string)  */
        set_formField(value: string): string;
        get_id(): string;
        set_id(value: string): string;
        get_initiationUrl(): string;
        set_initiationUrl(value: string): string;
        /** Gets custom properties of the workflow definition */
        get_properties(): { [propertyName: string]: any; };
        /** true if the workflow definition has been published to the external workflow host; false if the workflow definition is only saved on the site  */
        get_published(): bool;
        /** Determines whether to automatically generate an association form for this workflow.
            If the value is true, and the associationUrl is not already set, a default association form is automatically generated for the workflow when saveDefinition is called.  */
        get_requiresAssociationForm(): bool;
        /** Determines whether to automatically generate an association form for this workflow.
            If the value is true, and the associationUrl is not already set, a default association form is automatically generated for the workflow when saveDefinition is called.  */
        set_requiresAssociationForm(value: bool): bool;
        /** Determines whether to automatically generate an initiation form for this workflow.
            If the value is true, and the initiationUrl is not already set, a default initiation form is automatically generated for the workflow when saveDefinition is called.  */
        get_requiresInitiationForm(): bool;
        /** Determines whether to automatically generate an initiation form for this workflow.
            If the value is true, and the initiationUrl is not already set, a default initiation form is automatically generated for the workflow when saveDefinition is called.  */
        set_requiresInitiationForm(value: bool): bool;
        /** RestrictToScope is a GUID value, used in conjunction with the RestrictToType property to further restrict the scope of the definition.
            For example, if the RestrictToType is "List", then setting the RestrictToScope to a particular list identifier limits the definition to be associable only to the specified list.
            If the RestrictToType is "List" but the RestrictToScope is null or the empty string, then the definition is associable to any list. */
        get_restrictScope(): string;
        /** RestrictToScope is a GUID value, used in conjunction with the RestrictToType property to further restrict the scope of the definition.
            For example, if the RestrictToType is "List", then setting the RestrictToScope to a particular list identifier limits the definition to be associable only to the specified list.
            If the RestrictToType is "List" but the RestrictToScope is null or the empty string, then the definition is associable to any list. */
        set_restrictScope(value: string): string;
        /** RestrictToType determines the possible event source type for a workflow subscription that uses this definition.
            Possible values include "List", "Site", the empty string, or null.  */
        get_restrictToType(): string;
        /** RestrictToType determines the possible event source type for a workflow subscription that uses this definition.
            Possible values include "List", "Site", the empty string, or null.  */
        set_restrictToType(value: string): string;
        /** XAML definition of the workflow */
        get_xaml(): string;
        /** XAML definition of the workflow */
        set_xaml(value: string): string;
        /** This method adds a key-value pair (propertyName, value) to the workflow definition object�s property bag.  */
        setProperty(propertyName: string, value: string): void;
        /** This method is internal and is not intended to be used in your code. */
        initPropertiesFromJson(parentNode: any): void;
    }

    /** Represents a collection of WorkflowDefinition objects */
    export class WorkflowDefinitionCollection extends SP.ClientObjectCollection {
        itemAt(index: number): WorkflowDefinition;
        get_item(index: number): WorkflowDefinition;
        /** returns SP.WorkflowDefinition class */
        get_childItemType(): any;
    }

    /** Manages workflow definitions and workflow activity authoring. */
    export class WorkflowDeploymentService extends SP.ClientObject {
        constructor(context: SP.ClientRuntimeContext, objectPath: SP.ObjectPathStaticProperty);
        /** Returns an XML representation of a list of valid Workflow Manager Client 1.0 actions for the specified web (WorkflowInfo element). */
        getDesignerActions(web: SP.Web): SP.StringResult;
        /** Returns an XML representation of a collection of XAML class signatures for workflow definitions.
            @param lastChanges Date time value representing the latest changes; class signatures older than this time are excluded from the result set.  */
        getActivitySignatures(lastChanged: string): SP.ClientResult;
        /** Saves a SharePoint workflow definition to the workflow store.  */
        saveDefinition(definition: WorkflowDefinition): SP.GuidResult;
        /** Validates the specified activity against workflow definitions in the workflow store.  */
        validateActivity(activityXaml: string): SP.StringResult;
        /** Publishes a workflow definition to the workflow store.  */
        publishDefinition(definitionId: string): void;
        /** Marks a workflow definition as deprecated. Currently running workflow instances are allowed to complete, but new instances of the workflow definition are prevented from starting.  */
        deprecateDefinition(definitionId: string): void;
        /** Deletes a workflow definition.
            @param definitionId The guid identifier of the workflow definition.  */
        deleteDefinition(definitionId: string): void;
        /** Retrieves workflow definitions from the workflow store that match the tags. */
        enumerateDefinitions(publishedOnly: bool): WorkflowDefinitionCollection;
        /** Retrieves a specified workflow definition from the workflow store.
            @param definitionId The guid identifier of the workflow definition.  */
        getDefinition(definitionId: string): WorkflowDefinition;
        /** Saves the collateral file of a workflow definition.
            @param workflowDefinitionId The guid identifier of the workflow definition.*/
        saveCollateral(workflowDefinitionId: string, leafFileName: string, fileContent): void;
        /** Deletes the URL of a workflow definition's collateral file.
            @param workflowDefinitionId The guid identifier of the workflow definition.  */
        deleteCollateral(workflowDefinitionId: string, leafFileName: string): void;
        /** Retrieves the URL of the collateral file of the workflow definition.
            @param workflowDefinitionId The guid identifier of the workflow definition.
            @param leafFileName The leaf name of the collateral file. */
        getCollateralUri(workflowDefinitionId: string, leafFileName: string): SP.StringResult;
        /** Packages a single workflow definition into a SharePoint solution package (.wsp file) and saves the package to the Site Assets library.
            Returns the URL of the package file in the Site Asset library.
            Remarks:
            1. This method does not activate the package.
            2. If a package with the same name already exists in the Site Assets library, the method adds an integer suffix in braces to the file name, e.g. packageDefaultFilename{2}.wsp
            @param definitionId The guid identifier of the workflow definition.
            @param packageDefaultFilename The default filename to choose for the new package.
            @param packageTitle The title of the package.
            @param packageDescription The description of the package. */
        packageDefinition(definitionId, packageDefaultFilename, packageTitle, packageDescription): SP.StringResult;
    }

    /** Represents an instance of a workflow association that performs on a list item the process that is defined in a workflow template */
    export class WorkflowInstance extends SP.ClientObject {
        /** Contains the error string or exception information if the workflow faults. */
        get_faultInfo(): string;
        /** Unique identifier (GUID) for the workflow instance */
        get_id(): string;
        /** Gets the Coordinated Universal Time (UTC) when this workflow instance was created. */
        get_instanceCreated(): string;
        /** Gets the Coordinated Universal Time (UTC) when the workflow instance state was last persisted */
        get_lastUpdated(): string;
        /** Specifies properties of this workflow instance */
        get_properties(): { [name: string]: string; };
        /** Returns runtime status of the workflow instance */
        get_status(): WorkflowStatus;
        /** Specifies the custom status set by workflow authors. */
        get_userStatus(): string;
        /** Specifies the custom status set by workflow authors. */
        set_userStatus(value: string): string;
        /** Gets the unique identifier (GUID) of the subscription that instantiates the WorkflowInstance */
        get_workflowSubscriptionId(): string;
        /** This method is internal and is not intended to be used in your code. */
        initPropertiesFromJson(parentNode: any): void;

    }

    /** Represents a collection of WorkflowInstance objects */
    export class WorkflowInstanceCollection extends SP.ClientObjectCollection {
        itemAt(index: number): WorkflowInstance;
        get_item(index: number): WorkflowInstance;
        /** returns SP.WorkflowInstance class */
        get_childItemType(): any;
    }

    /** Reads the SharePoint workflow instances from the external workflow host and manages the instance execution. */
    export class WorkflowInstanceService extends SP.ClientObject {
        /** Starts a Workflow Manager Client 1.0 instance specified by the subscription and passes the supplied parameters.
            Returns GUID of the instance object.
            @param payload Object that contains name-value pairs of parameter names and values to pass into the workflow instance. */
        startWorkflow(subscription: WorkflowSubscription, payload: { [name: string]: any; }): SP.GuidResult;
        /** Starts a Workflow Manager Client 1.0 instance specified by the subscription and passes the supplied parameters.
            Returns GUID of the instance object.
            @param subscription The subscription associated with the workflow instance.
            @param itemId The integer id of the list item on which to start the workflow instance.
            @param payload Object that contains name-value pairs of parameter names and values to pass into the workflow instance. */
        startWorkflowOnListItem(subscription: WorkflowSubscription, itemId: number, payload: { [name: string]: any; }): SP.GuidResult;
        /** Gets workflow instance specified by the provided instance GUID */
        getInstance(instanceId: string): WorkflowInstance;
        /** Gets a workflow instance collection comprising the 100 most recent workflow instances started by a specified subscription.  */
        enumerate(parentSubscription: WorkflowSubscription): WorkflowInstanceCollection;
        /** Gets a workflow instance collection comprising 100 workflow instances starting at the specified offset.  */
        enumerateWithOffset(parentSubscription: WorkflowSubscription, offset: number): WorkflowInstanceCollection;
        /** Gets the list of instances for the specified list item. */
        enumerateInstancesForListItem(listId: string, itemId: number): WorkflowInstanceCollection;
        /** Gets the list of instances for the specified list item. */
        enumerateInstancesForListItemWithOffset(listId: string, itemId: number, offset: number): WorkflowInstanceCollection;
        /** Gets the list of instances for the current site. */
        enumerateInstancesForSite(): WorkflowInstanceCollection;
        /** Gets the list of instances for the current site. */
        enumerateInstancesForSiteWithOffset(offset: number): WorkflowInstanceCollection;
        /** Retrieves a count of all the instances of the specified WorkflowSubscription. */
        countInstances(parentSubscription: WorkflowSubscription): SP.IntResult;
        /** Retrieves a count of the instances of the specified WorkflowSubscription that have a specified status. */
        countInstancesWithStatus(parentSubscription: WorkflowSubscription, status: WorkflowStatus): SP.IntResult;
        /** Sends a cancel message to the specified workflow instance and permits the instance to execute a cancellation scope. */
        cancelWorkflow(instance: WorkflowInstance): void;
        /** Terminate a workflow instance forcefully by deleting it from memory. The instance is not allowed to execute a cancellation scope */
        terminateWorkflow(instance: WorkflowInstance): void;
        suspendWorkflow(instance: WorkflowInstance): void;
        resumeWorkflow(instance: WorkflowInstance): void;
        /** Sends a custom event to a running workflow with the event payload. */
        publishCustomEvent(instance: WorkflowInstance, eventName: string, payload: string): void;
        getDebugInfo(instance: WorkflowInstance): SP.StringResult;
    }

    /** Describes the workflow host configuration states and provides service objects that interact with the workflow */
    export class WorkflowServicesManager extends SP.ClientObject {
        constructor(context: SP.ClientRuntimeContext, web: SP.Web);
        static newObject(context: SP.ClientRuntimeContext, web: SP.Web): WorkflowServicesManager;
        /** The current application identifier.*/
        get_appId(): string;
        /** Indicates whether this workflow service is actively connected to a workflow host. */
        get_isConnected(): bool;
        /** Returns the path of the current scope in the workflow host. */
        get_scopePath(): string;
        getWorkflowDeploymentService(): WorkflowDeploymentService;
        getWorkflowInstanceService(): WorkflowInstanceService;
        getWorkflowInteropService(): InteropService;
        getWorkflowSubscriptionService(): WorkflowSubscriptionService;
        /** This method is internal and is not intended to be used in your code. */
        initPropertiesFromJson(parentNode: any): void;
    }

    /** Base class representing subscriptions for the external workflow host. */
    export class WorkflowSubscription extends SP.ClientObject {
        /** Gets the unique ID of the workflow definition to activate. */
        get_definitionId();
        /** Sets the unique ID of the workflow definition to activate. */
        set_definitionId(value);
        /** Gets a boolean value that specifies if the workflow subscription is enabled.
            When disabled, new instances of the subscription cannot be started, but existing instances will continue to run.  */
        get_enabled(): bool;
        /** Sets a boolean value that enables or disables the workflow subscription.
            When disabled, new instances of the subscription cannot be started, but existing instances will continue to run.  */
        set_enabled(value: bool): bool;
        /** Gets the logical source instance name of the event. (GUID) */
        get_eventSourceId(): string;
        /** Sets the logical source instance name of the event. (GUID) */
        set_eventSourceId(value: string): string;
        /** Gets or sets the list of event types for which the subscription is listening.
            For SharePoint events, these will map to a value in the SPEventReceiverType enumeration. */
        get_eventTypes(): string[];
        /** Gets or sets the list of event types for which the subscription is listening.
            For SharePoint events, these will map to a value in the SPEventReceiverType enumeration. */
        set_eventTypes(value: string[]): string[];
        /** Unique identifier (GUID) of the workflow subscription */
        get_id(): string;
        /** Unique identifier (GUID) of the workflow subscription */
        set_id(value: string): string;
        /** Boolean value that specifies whether multiple workflow instances can be started manually on the same list item at the same time. This property can be used for list workflows only.  */
        get_manualStartBypassesActivationLimit(): bool;
        /** Boolean value that specifies whether multiple workflow instances can be started manually on the same list item at the same time. This property can be used for list workflows only.  */
        set_manualStartBypassesActivationLimit(value: bool): bool;
        /** Gets the name of the workflow subscription for the specified event source.  */
        get_name();
        /** Sets the name of the workflow subscription for the specified event source.  */
        set_name(value);
        /** Gets the properties and values to pass to the workflow definition when the subscription is matched. */
        get_propertyDefinitions();
        /** Gets the name of the workflow status field on the specified list.  */
        get_statusFieldName(): string;
        /** Gets or sets the name of the workflow status field on the specified list.  */
        set_statusFieldName(value: string): string;
        /** Sets the name-value pairs for workflow definition initiation parameters that are stored in the PropertyDefinitions property  */
        setProperty(propertyName: string, value: string): void;
        /** This method is internal and is not intended to be used in your code. */
        initPropertiesFromJson(parentNode: any): void;
    }

    /** Represents a collection of WorkflowSubscription objects */
    export class WorkflowSubscriptionCollection extends SP.ClientObjectCollection {
        itemAt(index: number): WorkflowSubscription;
        get_item(index: number): WorkflowSubscription;
        /** returns SP.WorkflowInstance class */
        get_childItemType(): any;
    }

    export class WorkflowSubscriptionService extends SP.ClientObject {
        constructor(context: SP.ClientRuntimeContext, objectPath: SP.ObjectPathStaticProperty);
        static getCurrent(context: SP.ClientRuntimeContext): WorkflowSubscriptionService;
        /** Creates a workflow subscription for a workflow, and returns the unique identifier of the new subscription. */
        publishSubscription(subscription: WorkflowSubscription): SP.GuidResult;
        /** Creates a workflow subscription for a workflow and if necessary an event receiver on the specified list.
            Also writes an EventSourceId that matches the list as the event source.
            Returns the unique identifier of the new subscription.
            @param listId Unique identifier (GUID) for the specified list. */
        publishSubscriptionForList(subscription: WorkflowSubscription, listId: string): SP.GuidResult;
        /** Ensures that an event receiver will monitor a list for the specified event.
            @param listId Unique identifier (GUID) for the specified list.
            @eventName eventName The name of the event to be monitored. */
        registerInterestInList(listId: string, eventName: string): void;
        /** Removes monitoring for an event receiver on the specified list with the specified event.
            @param listId GUID of the list containing the event receiver to be unregistered.
            @eventName eventName The name of the event to be removed. */
        unregisterInterestInList(listId: string, eventName: string): void;
        getSubscription(subscriptionId): WorkflowSubscription;
        deleteSubscription(subscriptionId): WorkflowSubscription;
        /** Retrieves workflow subscriptions that contains all of the workflow subscriptions on the Web  */
        enumerateSubscriptions(): WorkflowSubscriptionCollection;
        /** Retrieves workflow subscriptions based on workflow definition */
        enumerateSubscriptionsByDefinition(definitionId: string): WorkflowSubscriptionCollection;
        /** Retrieves workflow subscriptions based on the specified EventSourceId */
        enumerateSubscriptionsByEventSource(eventSourceId: string): WorkflowSubscriptionCollection;
        /** Retrieves workflow subscriptions based on the specified list.
            @param listId The unique identifier (GUID) of the list on which to filter the subscriptions. */
        enumerateSubscriptionsByList(listId: string): WorkflowSubscriptionCollection;
    }

}


