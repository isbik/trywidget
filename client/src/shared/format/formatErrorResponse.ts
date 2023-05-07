import { ConstraintViolationList } from '../../api/generated';

export const formatErrorResponse = (error: ConstraintViolationList) => {
    return (error.violations || []).reduce<Record<string, string>>((acc, v) => {
        if (v.propertyPath && v.title) {
            acc[v.propertyPath] = v.title;
        }
        return acc;
    }, {});
};
