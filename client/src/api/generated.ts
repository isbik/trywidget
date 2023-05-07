/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Email {
    /**
     * Email
     * @format email
     * @minLength 1
     */
    email: string;
}

export interface Password {
    /**
     * Password
     * @minLength 8
     */
    password: string;
}

export interface User {
    /**
     * Email
     * @format email
     * @minLength 1
     */
    email: string;
    /**
     * Password
     * @minLength 8
     */
    password: string;
}

export interface File {
    /** ID */
    id?: number;
    /**
     * Name
     * @minLength 1
     * @maxLength 256
     */
    name: string;
    /**
     * Url
     * @format uri
     * @minLength 1
     */
    url: string;
    /**
     * Size
     * @minLength 1
     */
    size: string;
    /**
     * Preview image url
     * @format uri
     * @minLength 1
     */
    preview_image_url: string;
    /**
     * Created at
     * @format date-time
     */
    created_at?: string;
}

export interface Feedback {
    /**
     * Name
     * @minLength 1
     * @maxLength 56
     */
    name: string;
    /**
     * Email
     * @format email
     * @minLength 1
     * @maxLength 254
     */
    email: string;
    /**
     * Text
     * @minLength 1
     * @maxLength 256
     */
    text: string;
}

export interface FileInWidget {
    /** ID */
    id?: number;
    /**
     * Name
     * @minLength 1
     * @maxLength 256
     */
    name: string;
    /**
     * Url
     * @format uri
     * @minLength 1
     */
    url: string;
    /**
     * Size
     * @minLength 1
     */
    size: string;
    /**
     * Preview image url
     * @format uri
     * @minLength 1
     */
    preview_image_url: string;
}

export interface WidgetPublic {
    /**
     * Name
     * @minLength 1
     * @maxLength 100
     */
    name: string;
    video: FileInWidget;
    /** Settings */
    settings?: object;
}

export type PlanInPublic = {
    /** ID */
    id?: number;
    /**
     * Max widgets
     * @min -2147483648
     * @max 2147483647
     */
    max_widgets: number;
    /** Is hide logo */
    is_hide_logo: boolean;
    /** Is support */
    is_support: boolean;
} | null;

export interface PublicData {
    widget: WidgetPublic;
    plan: PlanInPublic;
}

export interface WidgetsList {
    /** ID */
    id?: number;
    /**
     * Name
     * @minLength 1
     * @maxLength 100
     */
    name: string;
    video: FileInWidget;
    /**
     * Slug
     * @format uuid
     */
    slug?: string;
}

export interface WidgetCreate {
    /** ID */
    id?: number;
    /**
     * Name
     * @minLength 1
     * @maxLength 100
     */
    name: string;
    /** Video */
    video?: number | null;
}

export interface WidgetRetrieve {
    /** ID */
    id?: number;
    /**
     * Slug
     * @format uuid
     */
    slug?: string;
    /**
     * Name
     * @minLength 1
     * @maxLength 100
     */
    name: string;
    video: FileInWidget;
    /**
     * Updated at
     * @format date
     */
    updated_at?: string;
    /**
     * Created at
     * @format date
     */
    created_at?: string;
    /** Settings */
    settings?: object;
}

export interface WidgetUpdate {
    /** ID */
    id?: number;
    /**
     * Name
     * @minLength 1
     * @maxLength 100
     */
    name: string;
    /** Video id */
    video_id?: number | null;
    /** Settings */
    settings?: object;
}
