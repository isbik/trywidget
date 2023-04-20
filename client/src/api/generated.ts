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

export interface Security {
    /** @example "Error" */
    status?: string;
    /** @example "Invalid credentials." */
    description?: string;
}

export interface Login {
    token?: string;
    refreshToken?: string;
}

export interface Refresh {
    /** @example "root" */
    refreshToken?: string;
}

export interface ConstraintViolation {
    /** @example "incomes" */
    propertyPath?: string;
    /** @example "Эта коллекция должна содержать только уникальные элементы." */
    title?: string;
    /** @example "urn:uuid:7911c98d-b845-4da0-94b7-a8dac36bc55a" */
    type?: string;
    /** @example {"{{ value }}":"array"} */
    parameters?: Record<string, any>;
}

/** List errors validations */
export interface ConstraintViolationList {
    /** @example "Bad request" */
    type?: string;
    /** @example "Validation Failed" */
    title?: string;
    /** @example "incomes: Эта коллекция должна содержать только уникальные элементы." */
    detail?: string;
    violations?: ConstraintViolation[];
}

export interface ErrorResponse {
    /** @example "https://tools.ietf.org/html/rfc2616#section-10" */
    type?: string;
    /** @example "An error occurred" */
    title?: string;
    /** @example 400 */
    status?: number;
    /** @example "Bad request" */
    detail?: string;
}

export interface InternalServerErrorResponse {
    /** @example "https://tools.ietf.org/html/rfc2616#section-10" */
    type?: string;
    /** @example "An error occurred" */
    title?: string;
    /** @example 500 */
    status?: number;
    /** @example "Syntax error" */
    detail?: string;
}

export interface ShortApplication {
    id?: UuidInterface;
    status?: ApplicationStatus;
    number?: number;
    studyDirection?: string;
    typeEducation?: string;
    university?: string | null;
    errorMessage?: string | null;
}

export interface InitApplication {
    typeEducation?: TypeEducation;
    typeEducationDocument?: TypeEducationDocument;
    /**
     * @format uuid
     * @example "20956f69-2821-4afb-956c-12c6a42e2e4c"
     */
    studyDirection?: string;
    /**
     * @format uuid
     * @example "20956f69-2821-4afb-956c-12c6a42e2e4c"
     */
    universityId?: string | null;
    exam?: UserExam[];
}

export interface ApplicationDetail {
    id?: UuidInterface;
    typeEducation?: IdName;
    typeEducationDocument?: IdName;
    number?: number;
    status?: ApplicationStatus;
    studyDirection?: StudyDirection2 | null;
    semesters?: number | null;
    errorMessage?: string | null;
    profession?: string | null;
    universityId?: string | null;
    region?: string | null;
}

export interface EditApplication {
    typeEducation?: TypeEducation;
    typeEducationDocument?: TypeEducationDocument;
    /**
     * @format uuid
     * @example "20956f69-2821-4afb-956c-12c6a42e2e4c"
     */
    studyDirection?: string | null;
}

export interface FillApplication {
    email: string;
    /**
     * @minLength 3
     * @maxLength 255
     */
    fio: string;
    semesters?: number;
    snils?: string | null;
    /**
     * @format uuid
     * @example "20956f69-2821-4afb-956c-12c6a42e2e4c"
     */
    region?: string | null;
}

export interface PayInfo {
    price?: number;
    tradeId?: number | null;
    loanId?: string | null;
}

export interface ApplicationDocument {
    id?: UuidInterface;
    type?: ApplicationFileType;
    link?: string;
}

export interface ApplicationDocument2 {
    type: ApplicationFileType;
    content?: string;
}

export interface Link {
    id?: UuidInterface;
    link?: string;
}

export interface Document {
    id?: UuidInterface;
    type?: UserFileType;
    link?: string;
}

export interface UserDocument {
    type: UserFileType;
    content?: string;
}

export interface ExamCourse {
    id?: UuidInterface;
    name?: string;
}

export interface StudyDirection {
    id?: UuidInterface;
    name?: string;
    typeEducation?: string[];
}

export interface MetaData {
    totalPages?: number;
    currentPage?: number;
    limit?: number;
    currentCount?: number;
    totalCount?: number;
}

export interface UniversityShort {
    id?: UuidInterface;
    name?: string;
    logo?: string;
    image?: string;
    slug?: string;
    address?: Address;
    price?: number;
    styleNumber?: number;
}

export interface UniversityDetail {
    id?: UuidInterface;
    address?: Address;
    name?: string;
    logo?: string;
    styleNumber?: number;
    price?: number;
    professions?: DirectionProfession[];
    files?: UniversityFile[];
    score?: number | null;
    description?: string | null;
    additions?: Addition[];
}

export interface Addition {
    id?: UuidInterface;
    name?: string;
    image?: string | null;
}

export interface UniversityProfessionView {
    name?: string;
    logo?: string;
    address?: string;
    price?: number;
    countSeats?: number;
    styleNumber?: number;
    directions?: DirectionProfessionForFilter[];
}

export interface UpdateApplication {
    status?: ApplicationStatus;
    message?: string | null;
}

export interface CallBackUser {
    /** @example "+79994652397" */
    phone: string;
    /**
     * @minLength 3
     * @maxLength 255
     */
    fio: string;
}

export interface SendAuthCode {
    /** @example "+79994652397" */
    phone: string;
}

export interface SendAuthCodeView {
    authId?: UuidInterface;
}

export interface Login2 {
    /**
     * @format uuid
     * @example "20956f69-2821-4afb-956c-12c6a42e2e4c"
     */
    authId: string;
    /**
     * @minLength 4
     * @maxLength 4
     */
    code?: number;
}

export interface Profile {
    id?: UuidInterface;
    exams?: NameResult[];
    phone?: string;
    email?: string | null;
    fio?: string | null;
    snils?: string | null;
    region?: UuidInterface | null;
}

export interface Profile2 {
    exam?: UserExam2[];
    personalData?: PersonalData;
}

export interface Region {
    id?: UuidInterface;
    name?: string;
}

export interface SendVerifyCodeRequest {
    /** @example "+79994652397" */
    phone: string;
}

export interface SendVerifyMessageView {
    id?: UuidInterface | null;
    hasAttempts?: boolean;
}

export interface VerifyCodeRequest {
    /**
     * @format uuid
     * @example "20956f69-2821-4afb-956c-12c6a42e2e4c"
     */
    verifyMessageId: string;
    /**
     * @minLength 4
     * @maxLength 4
     */
    code?: number;
}

/**
 * @format uuid
 * @example "20956f69-2821-4afb-956c-12c6a42e2e4c"
 */
export type UuidInterface = string;

export type ApplicationStatus =
    | 'UNIVERSITY'
    | 'CONTRACT'
    | 'SENDED'
    | 'PENDING_CONTRACT'
    | 'PAY'
    | 'REJECTED';

export type TypeEducation = 'FULL_TIME' | 'EXTRAMURAL' | 'DISTANCE' | 'PART_TIME';

export type TypeEducationDocument = 'DIPLOMA' | 'EXAM';

export interface UserExam {
    id?: UuidInterface;
    result?: number;
}

export interface IdName {
    id?: string;
    name?: string;
}

export interface StudyDirection2 {
    id?: UuidInterface;
    name?: string;
}

export type ApplicationFileType = 'EMPTY_CONTRACT' | 'CONTRACT' | 'PAYMENT_DETAILS' | 'CHEQUE';

export type UserFileType =
    | 'SELFIE_PHOTO'
    | 'HEALTH_CERTIFICATE'
    | 'DIPLOMA'
    | 'SCHOOL_CERTIFICATE'
    | 'PASSPORT_FIRST'
    | 'PASSPORT_SECOND'
    | 'SNILS';

export interface Address {
    city?: string;
    street?: string;
    country?: string | null;
}

export interface DirectionProfession {
    studyDirection?: string;
    professions?: ProfessionDetail[];
}

export interface UniversityFile {
    name?: string;
    path?: string;
}

export interface DirectionProfessionForFilter {
    id?: UuidInterface;
    studyDirection?: string;
    professions?: Profession[];
}

export interface NameResult {
    id?: UuidInterface;
    name?: string;
    result?: number;
}

export interface UserExam2 {
    id?: UuidInterface;
    result?: number;
}

export interface PersonalData {
    email?: string | null;
    /**
     * @minLength 3
     * @maxLength 255
     */
    fio?: string | null;
    /** @example "+79994652397" */
    phone: string;
    snils?: string | null;
    /**
     * @format uuid
     * @example "20956f69-2821-4afb-956c-12c6a42e2e4c"
     */
    region?: string | null;
}

export interface ProfessionDetail {
    name?: string;
    typeEducationDocument?: TypeEducationDocument[];
    examCourse?: ExamWithCount[];
    typeEducation?: string[];
    price?: number;
}

export interface Profession {
    id?: UuidInterface;
    name?: string;
}

export interface ExamWithCount {
    name?: string;
    count?: number;
    require?: boolean;
}
