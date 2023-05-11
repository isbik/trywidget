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

export interface Login {
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

export interface ChangePassword {
    /**
     * Old password
     * @minLength 8
     */
    old_password: string;
    /**
     * New password
     * @minLength 8
     */
    new_password: string;
}

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

export interface Plan {
    /** ID */
    id?: number;
    /**
     * Display name
     * @minLength 1
     * @maxLength 56
     */
    display_name: string;
    /**
     * Price
     * @min -2147483648
     * @max 2147483647
     */
    price: number;
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
    /** Active */
    active: boolean;
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
    video?: FileInWidget;
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

export interface AnalyticUpdate {
    /**
     * Open widget
     * @default false
     */
    open_widget?: boolean;
    /**
     * Full watched
     * @default false
     */
    full_watched?: boolean;
    /**
     * Click cta
     * @default false
     */
    click_cta?: boolean;
    /**
     * Unique watched
     * @default false
     */
    unique_watched?: boolean;
}

export interface UserMe {
    /** ID */
    id?: number;
    plan: Plan;
    /**
     * Последний вход
     * @format date-time
     */
    last_login?: string | null;
    /** Is active */
    is_active?: boolean;
    /** Is admin */
    is_admin?: boolean;
    /**
     * Email
     * @format email
     * @minLength 1
     * @maxLength 254
     */
    email: string;
    /**
     * Next payment date
     * @format date-time
     */
    next_payment_date?: string | null;
    /**
     * Trial end
     * @format date-time
     */
    trial_end?: string;
    /**
     * Created at
     * @format date-time
     */
    created_at?: string;
    /**
     * Email verify token
     * @minLength 1
     * @maxLength 255
     */
    email_verify_token?: string | null;
    /**
     * Password token
     * @minLength 1
     * @maxLength 255
     */
    password_token?: string | null;
    /**
     * Visit count
     * @min -2147483648
     * @max 2147483647
     */
    visit_count?: number;
    /**
     * Last login at
     * @format date-time
     */
    last_login_at?: string;
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
    video?: FileInWidget;
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
    video?: FileInWidget;
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

export interface AnalyticRetrieve {
    /**
     * Open widget
     * @min 0
     * @max 2147483647
     */
    open_widget?: number;
    /**
     * Full watched
     * @min 0
     * @max 2147483647
     */
    full_watched?: number;
    /**
     * Click cta
     * @min 0
     * @max 2147483647
     */
    click_cta?: number;
    /**
     * Unique watched
     * @min 0
     * @max 2147483647
     */
    unique_watched?: number;
}
