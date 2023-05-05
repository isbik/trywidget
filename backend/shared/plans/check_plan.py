from datetime import datetime

from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied


def check_plan_permission(user, subject_type=None):
    data = {
        'widgets': {
            'name': 'widgets',
            'multiple': 1,
            'field': 'widgets',
        },
        'videos': {
            'name': 'videos',
            'multiple': 2,
            'field': 'file_set',
        },
    }
    subject = data.get(subject_type, None)
    if subject is None:
        raise ValueError('Subject is required.')

    current_count = getattr(user, subject['field']).count()
    current_datetime = datetime.now().timestamp()

    if user.next_payment_date is None:
        if user.trial_end.timestamp() < current_datetime:
            raise PermissionDenied(
                detail='Trial has expired',
                code=403,
            )
        if current_count >= (1 * subject['multiple']):
            raise PermissionDenied(
                detail=f'Cannot add more {subject["name"]} in trial period.',
                code=403,
            )
    else:
        try:
            plan = user.userplan.plan
            if not plan.active:
                raise PermissionDenied(
                    detail='Plan is not active',
                    code=403,
                )
            if current_count >= (plan.max_widgets * subject['multiple']):
                raise PermissionDenied(
                    detail=f'Cannot add more {subject["name"]} in this plan.',
                    code=403,
                )
            if user.next_payment_date.timestamp() < current_datetime:
                raise PermissionDenied(
                    detail='Need to pay.',
                    code=403,
                )
        except get_user_model().userplan.RelatedObjectDoesNotExist:
            raise PermissionDenied(
                detail='Need to bay plan',
                code=403,
            )
