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

export interface User {
    /**
     * Email
     * @format email
     * @minLength 1
     * @maxLength 254
     */
    email: string;
    /**
     * Пароль
     * @minLength 1
     * @maxLength 128
     */
    password: string;
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
    /**
     * Preview image url
     * @format uri
     * @maxLength 200
     */
    preview_image_url?: string;
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

export interface FileInWidget {
    /** ID */
    id?: number;
    /**
     * Url
     * @minLength 1
     */
    url: string;
    /**
     * Size
     * @minLength 1
     */
    size: string;
}

export interface WidgetPublic {
    /**
     * Name
     * @minLength 1
     * @maxLength 100
     */
    name: string;
    /**
     * Preview image url
     * @format uri
     * @maxLength 200
     */
    preview_image_url?: string;
    video: FileInWidget;
    /** Settings */
    settings?: object;
}

export interface WidgetRetrieve {
    /** ID */
    id?: number;
    /**
     * Name
     * @minLength 1
     * @maxLength 100
     */
    name: string;
    /**
     * Preview image url
     * @format uri
     * @maxLength 200
     */
    preview_image_url?: string;
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
    video_id: number;
    /** Settings */
    settings?: object;
}
