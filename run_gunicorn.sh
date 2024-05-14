#!/bin/bash
source /root/.cache/pypoetry/virtualenvs/backend-eYy_52AU-py3.11/bin/activate
exec gunicorn backend.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --timeout 120
