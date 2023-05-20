#!/bin/bash
if [[ ! -e "./keys/setup_key" ]]; then
    
    cd keys
    echo "Generating setup key"
    echo "$(openssl rand -hex 16)" | tee ./setup_key
    cd ../
fi
python3 manage.py runserver 0.0.0.0:8000 &
cd ./ui
npm run start 
