#!/bin/bash
python3 manage.py runserver 0.0.0.0:8000 &
cd ./ui
npm run start&
if [[ ! -e "./setup_key" ]]; then
    echo "$(openssl rand -hex 16)" | sudo tee ./setup_key
    cat ./setup_key
fi