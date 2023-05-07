from datetime import datetime

from django.contrib.auth import get_user_model
from shared import errors


def check_plan_permission(user, subject_type=None):
    data = {
        'widgets': {
            'multiple': 1,
            'field': 'widgets',
            'errors': {
                'trial': errors.too_many_widgets_trial_error,
                'plan': errors.too_many_widgets_plan_error,
            },
        },
        'videos': {
            'multiple': 2,
            'field': 'file_set',
            'errors': {
                'trial': errors.too_many_videos_trial_error,
                'plan': errors.too_many_videos_plan_error,
            },
        },
    }
    subject = data.get(subject_type, None)
    if subject is None:
        raise ValueError('Subject is required.')

    current_count = getattr(user, subject['field']).count()
    current_datetime = datetime.now().timestamp()

    if user.next_payment_date is None:
        if user.trial_end.timestamp() < current_datetime:
            return errors.bay_plan_required_error
        if current_count >= (1 * subject['multiple']):
            return subject['errors']['trial']
    else:
        try:
            plan = user.userplan.plan
            if not plan.active:
                return errors.not_active_plan_error
            if user.next_payment_date.timestamp() < current_datetime:
                return errors.payment_required_error
            if current_count >= (plan.max_widgets * subject['multiple']):
                return subject['errors']['plan']
        except get_user_model().userplan.RelatedObjectDoesNotExist:
            return errors.bay_plan_required_error
