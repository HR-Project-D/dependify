#!/bin/bash
if [[ ! -e "./data/setup_key" ]]; then
    
    cd data
    echo "Generating setup key"
    echo -n "$(openssl rand -hex 16)" | tee ./setup_key
    cd ../
fi
python3 manage.py runserver 0.0.0.0:8000 &
cd ./ui
npm run start 
